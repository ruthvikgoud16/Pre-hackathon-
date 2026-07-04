'use client';

import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Node as MockNode, Edge as MockEdge } from '@/lib/mockData';

interface MoneyFlowGraphProps {
  nodes: MockNode[];
  edges: MockEdge[];
  isFrozen: boolean;
  onSelectNode: (nodeId: string | null) => void;
}

export default function MoneyFlowGraph({ nodes, edges, isFrozen, onSelectNode }: MoneyFlowGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Map Mock Nodes to vis.js Nodes
    const visNodes = nodes.map((node) => {
      let bg = '#27272A'; // Zinc 800
      let border = '#3F3F46'; // Zinc 700
      let text = '#FFFFFF'; // White text
      
      // Determine colors based on status/roles
      if (isFrozen) {
        // Under isolation, mule hub stays red; others fade to grey
        if (node.type === 'target') {
          bg = '#EF4444'; // Red 500
          border = '#DC2626';
        } else {
          bg = '#18181B'; // Faded Zinc 900
          border = '#27272A';
          text = '#71717A'; // Gray text
        }
      } else {
        switch (node.type) {
          case 'victim':
            bg = '#10B981'; // Emerald 500
            border = '#059669';
            break;
          case 'intermediary':
            bg = '#F59E0B'; // Amber 500
            border = '#D97706';
            break;
          case 'target':
            bg = '#EF4444'; // Red 500
            border = '#DC2626';
            break;
          case 'cash_out':
            bg = '#3B82F6'; // Blue 500
            border = '#2563EB';
            break;
        }
      }

      let roleLabel = '';
      switch (node.type) {
        case 'victim': roleLabel = 'VICTIM'; break;
        case 'intermediary': roleLabel = 'MULE INT'; break;
        case 'target': roleLabel = 'MULE HUB'; break;
        case 'cash_out': roleLabel = 'CASH OUT'; break;
      }
      const nodeLabel = `${node.label}\n[${roleLabel}]\n(${node.id})`;

      return {
        id: node.id,
        label: nodeLabel,
        color: {
          background: bg,
          border: border,
          highlight: {
            background: '#7C3AED', // Violet highlight
            border: '#6D28D9',
          },
          hover: {
            background: bg,
            border: '#7C3AED',
          }
        },
        font: { color: text, size: 10, face: 'Inter, system-ui, sans-serif', bold: true },
        borderWidth: 2,
        shape: 'dot',
        size: 15,
        shadow: {
          enabled: true,
          color: node.type === 'target' && !isFrozen ? 'rgba(239, 68, 68, 0.4)' : 'rgba(124, 58, 237, 0.2)',
          size: node.type === 'target' && !isFrozen ? 12 : 8,
          x: 0,
          y: 3
        }
      };
    });

    // 2. Map Mock Edges to vis.js Edges
    const visEdges = edges.map((edge) => {
      let edgeColor = '#3F3F46'; // default Zinc 700
      if (isFrozen) {
        edgeColor = '#991B1B'; // Red 800
      } else {
        switch (edge.channel) {
          case 'ZELLE':
            edgeColor = '#3B82F6'; // Blue 500
            break;
          case 'ACH':
            edgeColor = '#10B981'; // Emerald 500
            break;
          case 'WIRE':
            edgeColor = '#EF4444'; // Red 500
            break;
        }
      }

      return {
        id: edge.id,
        from: edge.from,
        to: edge.to,
        label: edge.label,
        font: {
          color: '#E4E4E7', // Zinc 200 labels
          size: 9,
          face: 'Courier New, Courier, monospace',
          strokeWidth: 2,
          strokeColor: '#09090B' // Outlined with dark background
        },
        arrows: {
          to: { enabled: true, scaleFactor: 0.75 }
        },
        color: {
          color: edgeColor,
          highlight: '#7C3AED',
          hover: '#7C3AED'
        },
        width: isFrozen ? 2.5 : 1.5,
        dashes: true,
        smooth: {
          type: 'cubicBezier',
          forceDirection: 'none',
          roundness: 0.25
        }
      };
    });

    const data: any = {
      nodes: visNodes,
      edges: visEdges
    };

    // 3. Network options
    const options = {
      physics: {
        enabled: true,
        solver: 'barnesHut',
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 150,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0.5
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        selectable: true,
        selectConnectedEdges: true
      },
      layout: {
        randomSeed: 42 // Constant seed for stable demo positions
      }
    };

    // 4. Initialize Network
    const network = new Network(containerRef.current, data, options);
    networkRef.current = network;

    // Connect node selection event handler
    network.on('selectNode', (params) => {
      if (params.nodes && params.nodes.length > 0) {
        onSelectNode(params.nodes[0]);
      }
    });

    network.on('deselectNode', () => {
      onSelectNode(null);
    });

    // Add node hover lift effect
    network.on('hoverNode', (params) => {
      const net = network as any;
      if (net.body.nodes[params.node]) {
        net.body.nodes[params.node].setOptions({ 
          shadow: { size: 14, color: 'rgba(124, 58, 237, 0.45)', y: 4, x: 0 },
          size: 16 
        });
      }
    });

    network.on('blurNode', (params) => {
      const net = network as any;
      if (net.body.nodes[params.node]) {
        net.body.nodes[params.node].setOptions({ 
          shadow: { size: 8, color: 'rgba(124, 58, 237, 0.2)', y: 3, x: 0 },
          size: 15 
        });
      }
    });

    // Clean up
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [nodes, edges, isFrozen]); // Re-render when nodes, edges, or freeze state changes

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
