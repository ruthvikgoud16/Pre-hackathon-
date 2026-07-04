'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  ArrowRight, 
  Cpu, 
  Activity, 
  Lock, 
  CheckCircle, 
  Network, 
  FileText, 
  Zap, 
  Search, 
  Database, 
  Terminal, 
  MessageSquare,
  ChevronDown,
  Layers,
  Sparkles,
  BarChart
} from 'lucide-react';

const CountUp = ({ end, duration = 1200, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  return <>{count}{suffix}</>;
};

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const featureCards = [
    {
      icon: <Network className="h-6 w-6 text-[#7C3AED]" />,
      title: "GNN Network Tracing",
      description: "Map complex multi-hop transfer chains to trace romance scams and layerings across institutional accounts in real time."
    },
    {
      icon: <Cpu className="h-6 w-6 text-[#3B82F6]" />,
      title: "GraphSAGE Anomaly Scoring",
      description: "Our machine learning pipeline uses graph neural network node classification to evaluate transaction risk topology at scale."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-[#EC4899]" />,
      title: "Gemini Forensic Explainer",
      description: "Convert abstract transactional nodes and timing vectors into clean, structured human-readable case audit logs instantly."
    },
    {
      icon: <FileText className="h-6 w-6 text-[#06B6D4]" />,
      title: "Auto-Drafted SAR Filings",
      description: "Instantly draft FinCEN Form 111 compliance narratives aligned with regulatory standards, reducing investigation times by 95%."
    },
    {
      icon: <Lock className="h-6 w-6 text-[#7C3AED]" />,
      title: "Network Freeze Protocol",
      description: "Execute isolation directives to freeze target mule hubs and notify connected institutions with a single click."
    },
    {
      icon: <Zap className="h-6 w-6 text-[#EC4899]" />,
      title: "Active Risk Diagnostics",
      description: "Run automated audits over velocity anomalies, device collisions, IP deviations, and historical cybercrime tip indexes."
    }
  ];

  const workflowSteps = [
    {
      number: "01",
      title: "Ingestion & Parse",
      desc: "Financial ledger events and cybercrime notices are parsed dynamically."
    },
    {
      number: "02",
      title: "GNN Evaluation",
      desc: "GraphSAGE GNN evaluates multi-hop transaction topologies."
    },
    {
      number: "03",
      title: "Risk Telemetry",
      desc: "Diagnostics checklist scans for device collision and velocity spikes."
    },
    {
      number: "04",
      title: "Gemini Synthesis",
      desc: "Forensic LLM orchestrates risk explanations and evidence reviews."
    },
    {
      number: "05",
      title: "Isolation Lock",
      desc: "Suspect hub accounts are locked, isolating adjacent transfers."
    },
    {
      number: "06",
      title: "SAR Submission",
      desc: "Auto-drafted SAR reports are dispatched to the FinCEN gateway."
    }
  ];

  const faqs = [
    {
      q: "How does the Graph Neural Network detect money mules?",
      a: "Unlike traditional static rules engines that only look at transfer amounts, Sentinel's GraphSAGE GNN analyzes network relationships. It looks at the flow topology, analyzing how rapidly funds are dispersed and re-consolidated through intermediary chains."
    },
    {
      q: "Can Sentinel AI integrate with existing Core Banking APIs?",
      a: "Yes. Sentinel AI is designed with standard API hook wrappers that can communicate with core ledgers to retrieve node networks and dispatch isolation lock commands in real-time."
    },
    {
      q: "Is the Gemini Forensic Copilot secure and compliant?",
      a: "Absolutely. Sentinel AI structures local context securely before calling Gemini, ensuring PII is excluded and only anonymized network telemetry is processed."
    },
    {
      q: "How long does it take to deploy Sentinel AI?",
      a: "Sentinel's sandbox and demo-first interface can be integrated in under a day, while a production-grade GCP deployment typically reaches active staging in 6-8 weeks."
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-x-hidden font-sans relative selection:bg-[#7C3AED]/30 selection:text-white dark-grid-bg">
      {/* Background blobs */}
      <div className="radial-blob bg-[#7C3AED]/10 top-0 left-[-150px] w-[600px] h-[600px]" />
      <div className="radial-blob bg-[#3B82F6]/10 top-[20%] right-[-150px] w-[650px] h-[650px]" />
      <div className="radial-blob bg-[#EC4899]/5 bottom-[10%] left-[20%] w-[500px] h-[500px]" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 bg-[#7C3AED]/20 border border-[#7C3AED]/35 text-[#7C3AED] rounded-xl flex items-center justify-center shadow-md">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white uppercase">SENTINEL AI</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#workflow" className="hover:text-white transition-colors">How It Works</a>
          <a href="#tech" className="hover:text-white transition-colors">Technology</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <Link href="/login" className="text-xs font-bold text-gray-400 hover:text-white transition-colors px-4 py-2">
            Login
          </Link>
          <Link 
            href="/dashboard" 
            className="text-xs font-bold bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90 transition-all px-4.5 py-2.5 rounded-xl border border-white/10 shadow-md shadow-[#7C3AED]/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-[1.02]"
          >
            Live Demo
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
        >
          <span className="sr-only">Toggle Menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile menu content */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 right-0 glass-panel border-b border-white/10 p-6 flex flex-col space-y-4 md:hidden z-40"
            >
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-gray-300 hover:text-white">Features</a>
              <a href="#workflow" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-gray-300 hover:text-white">How It Works</a>
              <a href="#tech" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-gray-300 hover:text-white">Technology</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-gray-300 hover:text-white">FAQ</a>
              <div className="border-t border-white/5 pt-4 flex flex-col space-y-3">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-center text-gray-400 hover:text-white py-2">
                  Login
                </Link>
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-sm font-bold text-center bg-[#7C3AED] text-white py-3 rounded-xl"
                >
                  Live Demo
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#7C3AED] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Generation Fraud Investigation Copilot</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none text-white font-sans">
            Mule Account Intelligence <br />
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
              Powered by GNNs
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans">
            Sentinel AI maps financial ledgers as graph neural networks and evaluates transactional subgraphs in real time. Detect money mule structures and instantly write SAR compliance narratives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto text-sm font-bold bg-white text-[#09090B] hover:bg-gray-100 transition-all px-8 py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.02]"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto text-sm font-bold bg-white/5 text-white hover:bg-white/10 transition-all px-8 py-3.5 rounded-xl border border-white/10 flex items-center justify-center space-x-2"
            >
              <span>Live Demo</span>
            </Link>
          </div>
        </motion.div>

        {/* Counter Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full mt-24 border-y border-white/5 py-8"
        >
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white font-mono">
              <CountUp end={50} suffix="K+" />
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">Suspect Mapped</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white font-mono">
              <CountUp end={1} suffix="M+" />
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">Processed API Requests</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white font-mono">
              <CountUp end={99} suffix=".8%" />
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">System Accuracy</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white font-mono">
              <CountUp end={120} suffix="+" />
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">Protected Corridors</p>
          </div>
        </motion.div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="px-6 max-w-6xl mx-auto py-12 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel border border-white/10 rounded-2xl shadow-2xl p-2 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/5 flex items-center px-4 space-x-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#10B981]/60" />
            <span className="text-[9px] text-gray-400 font-mono pl-4">sentinel-dossier-dashboard-preview.sh</span>
          </div>

          <div className="pt-8 h-[380px] bg-[#09090B] rounded-xl flex items-stretch">
            {/* Sidebar Mock */}
            <div className="w-1/4 border-r border-white/5 p-4 space-y-4 hidden sm:block">
              <div className="h-3 bg-white/10 rounded-full w-2/3" />
              <div className="space-y-2.5 pt-4">
                <div className="h-16 bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
                  <div className="h-2 bg-white/10 rounded-full w-1/3" />
                  <div className="h-3 bg-white/15 rounded-full w-2/3" />
                </div>
                <div className="h-16 bg-white/5 rounded-xl p-2.5 flex flex-col justify-between opacity-50">
                  <div className="h-2 bg-white/10 rounded-full w-1/3" />
                  <div className="h-3 bg-white/15 rounded-full w-1/2" />
                </div>
              </div>
            </div>

            {/* Main Mock */}
            <div className="flex-1 p-5 flex flex-col justify-between space-y-5">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-5 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-lg w-40 flex items-center px-2">
                    <span className="text-[8px] text-[#7C3AED] font-bold uppercase font-mono tracking-widest">romance scam alert</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full w-60" />
                </div>
                <div className="flex space-x-2">
                  <div className="h-12 w-24 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-center items-center">
                    <span className="text-[6px] text-gray-400 font-mono">GNN SCORE</span>
                    <span className="text-lg font-bold text-[#EF4444] font-mono">94%</span>
                  </div>
                </div>
              </div>

              {/* Core preview visualization */}
              <div className="flex-1 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 dark-grid-bg opacity-40" />
                <div className="flex items-center space-x-8 z-10 relative">
                  <div className="h-10 w-10 rounded-full bg-[#10B981]/20 border border-[#10B981]/35 text-[#10B981] flex items-center justify-center text-[8px] font-bold uppercase">Victim</div>
                  <div className="h-[1px] w-12 bg-dashed border-t border-gray-500 relative flex items-center justify-center">
                    <span className="text-[6px] absolute -top-3 text-blue-400 font-mono">ZELLE</span>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/35 text-[#EF4444] flex items-center justify-center text-[8px] font-bold uppercase shadow-[0_0_15px_rgba(239,68,68,0.25)] animate-pulse">Mule</div>
                  <div className="h-[1px] w-12 bg-dashed border-t border-gray-500 relative flex items-center justify-center">
                    <span className="text-[6px] absolute -top-3 text-[#EF4444] font-mono">WIRE</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/35 text-[#3B82F6] flex items-center justify-center text-[8px] font-bold uppercase">Out</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest font-mono">[ feature suite ]</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Forensic Intelligence Tools
          </h3>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Sentinel AI combines graph neural architectures with generative narration APIs to deliver comprehensive money mule network mitigation tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-4"
            >
              <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-inner">
                {feat.icon}
              </div>
              <h4 className="text-sm font-bold text-white font-sans">{feat.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORKFLOW TIMELINE */}
      <section id="workflow" className="py-24 px-6 bg-white/1 flex flex-col justify-center items-center relative">
        <div className="max-w-7xl w-full space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest font-mono">[ process pipeline ]</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              End-to-End Forensic Path
            </h3>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Understand how Sentinel traces suspicious multi-hop trails and dispatch compliance locks.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-6 gap-8 pt-8">
            <div className="absolute top-1/2 left-6 right-6 h-[1px] bg-white/5 -translate-y-1/2 hidden md:block z-0" />
            {workflowSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-panel p-5 rounded-2xl space-y-3 z-10 relative flex flex-col justify-between hover:border-white/15"
              >
                <div>
                  <span className="text-xl font-black text-[#7C3AED] font-mono block">{step.number}</span>
                  <h4 className="text-xs font-bold text-white mt-3 font-sans">{step.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed mt-1 font-sans">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK BADGES */}
      <section id="tech" className="py-24 px-6 max-w-6xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest font-mono">[ architecture layer ]</h2>
          <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Technology Stack & Integrations
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {["React 19", "Next.js 16 (Turbopack)", "TypeScript", "Tailwind CSS v4", "Google Gen AI SDK", "Framer Motion", "Vis.js Networks", "FastAPI Core", "Python ML", "Docker Containers", "GCP Vertex AI", "GCP BigQuery"].map((t, idx) => (
            <span 
              key={idx}
              className="text-xs font-semibold px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest font-mono">[ user validations ]</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Compliance Investigator Reviews
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Marcus Vance",
              role: "Head of AML Investigations, FinTech Bank",
              text: "Sentinel's GNN trace changed the game. Tracing multi-hop networks that used to take hours of manual Excel tracing now takes only seconds. The Gemini SAR generation is incredibly accurate.",
              rating: "★★★★★"
            },
            {
              name: "Dr. Clara Sterling",
              role: "Lead AML Data Scientist",
              text: "Applying GraphSAGE classification straight over transactional network subgraphs is the mathematically correct way to solve mule account layering. Sentinel's visual interface is stellar.",
              rating: "★★★★★"
            },
            {
              name: "Ethan Thorne",
              role: "Regulatory Compliance Director",
              text: "The auto-generated Suspicious Activity Reports (SARs) are directly compatible with our FinCEN filing templates, allowing us to freeze hubs and dispatch reports with minimal friction.",
              rating: "★★★★★"
            }
          ].map((t, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[#F59E0B] font-mono tracking-wider">{t.rating}</span>
                <p className="text-xs text-gray-300 leading-relaxed italic">"{t.text}"</p>
              </div>
              <div className="border-t border-white/5 pt-3 mt-4">
                <h4 className="text-xs font-bold text-white">{t.name}</h4>
                <p className="text-[9px] text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest font-mono">[ q&a ]</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="glass-panel rounded-2xl overflow-hidden border border-white/10">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-xs font-bold text-white tracking-wide transition-all uppercase hover:bg-white/5 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4.5 w-4.5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#09090B] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 bg-[#7C3AED]/20 border border-[#7C3AED]/35 text-[#7C3AED] rounded-xl flex items-center justify-center">
              <Shield className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-xs tracking-tight text-white uppercase">SENTINEL AI</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
            <a href="https://github.com" target="_blank" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="/showcase" className="hover:text-white transition-colors">Validation</a>
            <a href="/dashboard" className="hover:text-white transition-colors">Live Demo</a>
          </div>

          <div className="text-[10px] text-gray-600 font-mono">
            &copy; 2026 Sentinel AI. Open Source Hackathon Project.
          </div>
        </div>
      </footer>
    </div>
  );
}
