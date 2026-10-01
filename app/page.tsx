'use client'

import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { 
  ArrowUpRight, 
  Sparkles, 
  Compass, 
  Check, 
  ChevronRight,
  Shield,
  Sliders,
  Flame,
  ArrowRight,
  Award,
  Layers,
  FileCheck2,
  Lock,
  Cpu,
  Clock,
  UserCheck
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const container = useRef<HTMLDivElement>(null)
  const videoCardRef = useRef<HTMLDivElement>(null)
  
  // Interactive Simulator States
  const [activeTab, setActiveTab] = useState<'eu' | 'bias' | 'shadow' | 'assurance'>('eu')
  const [selectedPillar, setSelectedPillar] = useState(0)
  const [governanceScore, setGovernanceScore] = useState(96)

  // 3D Card Mouse Parallax & Satellite Floating Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoCardRef.current) return
    const rect = videoCardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(videoCardRef.current, {
      rotateY: x * 0.04,
      rotateX: -y * 0.04,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1200,
    })

    gsap.to('.hero-float-card', {
      x: (i) => (i % 2 === 0 ? x * 0.025 : -x * 0.025),
      y: (i) => (i % 2 === 0 ? y * 0.02 : -y * 0.02),
      duration: 0.7,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!videoCardRef.current) return
    gsap.to(videoCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
    })

    gsap.to('.hero-float-card', {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
  }

  // Interactive GSAP Pillar Selector (Hover-triggered)
  const handleSelectPillar = (idx: number) => {
    if (idx === selectedPillar) return
    setSelectedPillar(idx)
    gsap.fromTo('.eco-detail-pane',
      { opacity: 0.3, y: 6 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    )
  }

  useGSAP(() => {
    // 1. Hero Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo('.hero-tag', 
      { opacity: 0, y: -20, scale: 0.96 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
    .fromTo('.hero-anim-title', 
      { y: 35, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.15 }, 
      '-=0.4'
    )
    .fromTo('.hero-anim-video', 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, 
      '-=0.6'
    )
    .fromTo('.hero-float-card', 
      { opacity: 0, y: 25 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 
      '-=0.6'
    )

    // 2. Stagger reveal for capability cards
    const cards = gsap.utils.toArray('.stagger-card')
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      )
    })

    // 3. Stagger reveal for ecosystem pillar rows
    const ecoRows = gsap.utils.toArray('.eco-pillar-row')
    ecoRows.forEach((row: any, idx: number) => {
      gsap.fromTo(row,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: idx * 0.08,
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
          }
        }
      )
    })

  }, { scope: container })

  const entryPoints = [
    {
      num: '01',
      badge: 'DIAGNOSTIC BASELINE',
      category: 'STAGE // UNVERIFIED DEPLOYMENTS',
      title: 'AI is already live, but unverified',
      problem: 'Autonomous models and LLM tools are active across business units, but ownership, risk registers, and regulatory liabilities remain unmapped.',
      outcomeLabel: 'DEFENDED OUTCOME',
      solution: 'AI Governance & Risk Baseline Audit™',
      desc: 'Complete organizational diagnostic across 6 operational dimensions. Fast, board-ready clarity in 3 weeks.',
      metrics: ['3-Week Board Dossier', 'EU AI Act Annex III Ready', '6 Operational Dimensions'],
      link: '#session',
      linkText: 'Initiate Diagnostic Audit',
      offsetClass: 'md:translate-y-0'
    },
    {
      num: '02',
      badge: 'EXECUTIVE ADVISORY',
      category: 'STAGE // HIGH-STAKES DECISIONS',
      title: 'Big AI decisions need experienced counsel',
      problem: 'High-stakes investments, vendor partnerships, and board accountability require executive counsel who have built and run systems at enterprise scale.',
      outcomeLabel: 'DEFENDED OUTCOME',
      solution: 'Strategic Advisory & C-Suite Counsel',
      desc: 'Direct partner-level engagement led by Olga Troeger (ex-eBay operations) and Promit Ray (AI systems architecture).',
      metrics: ['90-Min C-Suite Sessions', 'Direct Founder Partnership', 'Credited Toward Baseline Audit'],
      link: '#session',
      linkText: 'Book C-Suite Session',
      offsetClass: 'md:translate-y-8'
    },
    {
      num: '03',
      badge: 'PROPRIETARY RUNTIME TECH',
      category: 'STAGE // SCALED AUTONOMOUS AGENTS',
      title: 'Ready to scale with operational governance',
      problem: 'Engineering teams want to deploy intelligent agent systems without creating legal exposure, model drift, or black-box reputational risk.',
      outcomeLabel: 'DEFENDED OUTCOME',
      solution: 'R-AI™ Platform & VAIL™ Sandbox',
      desc: 'Sub-4ms inference runtime gateway with continuous bias telemetry and synthetic adversarial red-teaming sandboxes.',
      metrics: ['Sub-4ms Gateway Latency', 'Synthetic Red-Teaming', 'Zero Shadow AI'],
      link: '#ecosystem',
      linkText: 'Explore Proprietary Stack',
      offsetClass: 'md:translate-y-4'
    }
  ]

  const ecosystem = [
    {
      id: '01',
      code: 'PILLAR // 01',
      title: 'AI Governance Baseline Audit™',
      tagline: 'Where you stand, what is exposed, and what to do next.',
      body: 'A rigorous enterprise diagnostic covering 6 operational dimensions. Identifies high-risk shadow models, unmonitored agent interactions, and regulatory gaps under the EU AI Act.',
      timeline: '3 Weeks • Board-Level Dossier',
      icon: Compass,
      specs: [
        { label: 'EVALUATION VECTORS', val: 'Data Readiness, Bias, Transparency, Evidence' },
        { label: 'REGULATORY MAPPING', val: 'EU AI Act Annex III & ISO/IEC 42001' },
        { label: 'KEY DELIVERABLE', val: 'Board-Level Risk Register & Remediation Roadmap' },
        { label: 'SLA TURNAROUND', val: '3 Weeks Fixed-Fee Engagement' },
      ],
      metricsBadge: '6-DIMENSIONAL DIAGNOSTIC',
      status: 'AUDIT ACCREDITED',
      cta: 'Book Diagnostic Audit',
      href: '#session'
    },
    {
      id: '02',
      code: 'PILLAR // 02',
      title: 'R-AI™ Governance Gateway',
      tagline: 'Operational oversight embedded into inference pipelines.',
      body: 'Proprietary software under continuous development since 2025. Real-time bias telemetry, shadow AI detection, cryptographically signed audit evidence, and automated compliance logging.',
      timeline: 'Sub-4ms Gateway • REST / SDK / SSO',
      icon: Sliders,
      specs: [
        { label: 'INFERENCE OVERHEAD', val: '< 3.8ms Gateway Processing' },
        { label: 'INTEGRATION MODES', val: 'REST Proxy / Python SDK / TypeScript' },
        { label: 'DRIFT & BIAS TELEMETRY', val: 'Automated Kolmogorov-Smirnov Statistical Testing' },
        { label: 'CRYPTOGRAPHIC AUDIT', val: 'Tamper-Evident SHA-256 Audit Trail' },
      ],
      metricsBadge: 'SUB-4MS LATENCY',
      status: 'GATEWAY ACTIVE',
      cta: 'Request Sandbox Credentials',
      href: '#simulator'
    },
    {
      id: '03',
      code: 'PILLAR // 03',
      title: 'VAIL™ Stress-Testing Sandbox',
      tagline: 'Validation & AI Implementation Lab.',
      body: 'An isolated technical sandbox for adversarial red-teaming, stress-testing LLM agents against prompt injections, model poisoning, and autonomous policy violations before production rollout.',
      timeline: 'Synthetic Red-Teaming • Benchmarking',
      icon: Flame,
      specs: [
        { label: 'TEST VECTORS', val: 'Prompt Injection, Jailbreaking, Hallucination Vectors' },
        { label: 'AGENT VALIDATION', val: 'Multi-Step Autonomous Tool Execution Stress Test' },
        { label: 'COMPLIANCE BENCHMARK', val: 'NIST AI RMF & EU AI Act Conformity' },
        { label: 'EVIDENCE LOGGING', val: 'Automated Proof of Testing for Regulators' },
      ],
      metricsBadge: 'ADVERSARIAL RED-TEAMING',
      status: 'SANDBOX v2.4',
      cta: 'Explore VAIL™ Protocols',
      href: '#session'
    },
    {
      id: '04',
      code: 'PILLAR // 04',
      title: 'Strategic C-Suite Advisory',
      tagline: 'Senior operators alongside your own teams.',
      body: 'Direct partnership with your Chief Risk Officers, General Counsels, and CTOs. Navigating high-stakes partnership contracts, EU AI Act obligations, board accountability, and organizational AI architecture.',
      timeline: 'Retainer Counsel • C-Suite Sessions',
      icon: Shield,
      specs: [
        { label: 'PARTNERSHIP DIRECTORS', val: 'Led by Olga Troeger (ex-eBay) & Promit Ray' },
        { label: 'ENGAGEMENT MODES', val: '90-Min C-Suite Value Session & Ongoing Retainer' },
        { label: 'CREDIT TOWARD AUDIT', val: 'Initial 90-min session credited to full engagement' },
        { label: 'EXECUTIVE CLEARANCE', val: 'Strict Enterprise NDA & Non-Disclosure' },
      ],
      metricsBadge: 'PARTNER-LED COUNSEL',
      status: 'DIRECT ENGAGEMENT',
      cta: 'Book C-Suite Session',
      href: '#session'
    }
  ]

  const leadership = [
    {
      name: 'Olga Troeger',
      role: 'Co-Founder & Chief Executive Officer',
      image: '/Olgaman.png',
      code: 'LEADERSHIP // 01',
      credentials: 'Ethics of AI Certified • MBA • Lean Six Sigma Black Belt',
      tags: ['Ex-eBay Operations', 'Ethics of AI Certified', 'MBA', 'Lean Six Sigma Black Belt'],
      superpower: 'Translates board strategy into people-centered, KPI-driven execution.',
      experience: '20+ years leading tech-enabled operational excellence at eBay (customer support, logistics, fintech integration). 2+ years leading AI startups and a decisive voice for ethical and responsible enterprise technology.',
      linkedin: 'https://www.linkedin.com/in/olga-troeger/',
      highlights: [
        '20+ Years Scaling Operational Excellence at eBay',
        'Direct Board & C-Suite Governance Advisor',
        'Certified in Ethics of AI & Responsible Innovation'
      ]
    },
    {
      name: 'Promit Ray',
      role: 'Co-Founder & Chief AI Officer',
      image: '/Promitsir.png',
      code: 'LEADERSHIP // 02',
      credentials: 'Deep-Tech Specialist • AI Systems Architecture • Bias Mitigation',
      tags: ['AI Systems Architecture', 'Deep-Tech Specialist', 'Bias Mitigation', 'Autonomous Agent Verification'],
      superpower: 'Deep-tech engineering meets real-world operational rigor.',
      experience: 'Data scientist and AI researcher with full-stack experience building enterprise AI systems that have to comply, scale, and hold up under intense regulatory scrutiny and mathematical runtime audits.',
      linkedin: 'https://www.linkedin.com/in/promit-ray/',
      highlights: [
        'Architect of Proprietary R-AI™ & VAIL™ Platform',
        'Specialist in Mathematical Runtime Guardrails',
        'Pioneer in Synthetic Adversarial Red-Teaming'
      ]
    }
  ]

  return (
    <main ref={container} className="relative w-full bg-[#fbfbfa] text-[#111113] min-h-screen selection:bg-black selection:text-white overflow-hidden font-sans">
      
      {/* 1. LUXURY STICKY NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fbfbfa]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/rayolpng.png" 
              alt="Rayol AI Solutions" 
              className="w-8 h-8 object-contain" 
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-tight text-black flex items-center gap-1.5">
                RAYOL AI SOLUTIONS
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </span>
              <span className="text-[8px] text-zinc-400 font-technical uppercase tracking-widest hidden sm:inline">
                Operational Governance by Design™
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-600">
            <a href="#why-rayol" className="hover:text-black transition-colors">Why Rayol</a>
            <a href="#ecosystem" className="hover:text-black transition-colors">Product Ecosystem</a>
            <a href="#leadership" className="hover:text-black transition-colors">Leadership</a>
            <a href="#simulator" className="hover:text-black transition-colors">Risk Telemetry</a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#session" 
              className="px-5 py-2 rounded-full bg-black text-white text-xs font-medium tracking-wide hover:bg-zinc-800 transition-all shadow-sm hover:shadow"
            >
              Book C-Suite Session
            </a>
          </div>
        </div>
      </nav>

      {/* 2. THE HERO SECTION — CENTRAL KINETIC ART ARCHITECTURE */}
      <section 
        className="relative h-[calc(100vh-4rem)] max-h-[720px] flex flex-col justify-between py-4 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* TOP STATUS TICKER */}
        <div className="w-full flex items-center justify-between text-[10px] font-technical text-zinc-500 uppercase tracking-widest border-b border-black/[0.08] pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-zinc-900">TOP COMPANY IN RESPONSIBLE AI — F6S</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>EU AI ACT ANNEX III READY</span>
            <span>•</span>
            <span>ISO/IEC 42001 STANDARD</span>
          </div>
        </div>

        {/* MONUMENTAL TOP HEADLINE (Centered) */}
        <div className="w-full text-center relative z-10 pt-1">
          <h1 className="hero-anim-title text-5xl sm:text-7xl lg:text-[6.5rem] font-extrabold tracking-[-0.04em] text-black leading-none uppercase">
            Governable
          </h1>
        </div>

        {/* THE CENTRAL ART STAGE: Sphere in the exact center, flanked by refined presentable typography */}
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center h-[320px] sm:h-[360px] lg:h-[390px]">

          {/* ASYMMETRICAL EDITORIAL ELEMENT 1: Upper-Left (The System Thesis) */}
          <div className="hero-float-card absolute left-2 sm:left-4 lg:left-6 top-1 max-w-[250px] lg:max-w-[280px] text-left hidden sm:block z-10 pl-4 border-l-2 border-black/80">
            <div className="text-[10px] font-technical text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>01 // THE GOVERNANCE THESIS</span>
            </div>
            <p className="text-xs sm:text-[13px] text-zinc-900 font-semibold leading-snug">
              “Autonomous AI deployed without mathematical runtime guardrails is an uninsurable liability.”
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[9px] font-technical text-zinc-600">
              <span className="px-2 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.07] font-medium">EU AI ACT ANNEX III</span>
              <span className="px-2 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.07] font-medium">ISO/IEC 42001</span>
            </div>
          </div>

          {/* ASYMMETRICAL EDITORIAL ELEMENT 2: Lower-Left (Executive Action & Founders) */}
          <div className="hero-float-card absolute left-2 sm:left-4 lg:left-6 bottom-1 max-w-[250px] lg:max-w-[290px] text-left hidden sm:block z-10">
            <div className="text-[9px] font-technical text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>03 // BOARD-LEVEL ADVISORY</span>
            </div>
            <div className="text-xs font-bold text-black tracking-tight mb-1">
              90-Min C-Suite Value Creation
            </div>
            <div className="text-[10px] text-zinc-500 mb-2.5 font-technical leading-tight">
              Direct partnership led by Olga Troeger (ex-eBay) &amp; Promit Ray.
            </div>
            <a 
              href="#session"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black text-white text-[11px] font-technical uppercase tracking-wider font-semibold hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <span>Book C-Suite Session</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <div className="mt-1.5">
              <a href="#ecosystem" className="text-[9px] font-technical text-zinc-400 hover:text-black transition-colors underline underline-offset-2">
                Or begin with 3-Week Diagnostic Baseline Audit™ ↘
              </a>
            </div>
          </div>

          {/* THE 1:1 NEURAL SPHERE IN THE EXACT CENTER (Calibrated Balanced Scale) */}
          <div 
            ref={videoCardRef}
            className="hero-anim-video relative aspect-square w-[280px] sm:w-[340px] lg:w-[390px] xl:w-[420px] flex items-center justify-center select-none z-20 pointer-events-none"
            style={{
              maskImage: 'radial-gradient(circle at center, black 55%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 55%, transparent 85%)'
            }}
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-contain scale-[1.55] mix-blend-multiply select-none"
              style={{
                filter: 'contrast(1.08) brightness(1.02)',
              }}
              src="/rayol.mp4"
            />
          </div>

          {/* ASYMMETRICAL EDITORIAL ELEMENT 3: Upper-Right (Live Telemetry Gauge) */}
          <div className="hero-float-card absolute right-2 sm:right-4 lg:right-6 top-1 max-w-[250px] lg:max-w-[280px] text-right hidden sm:block z-10 pr-4 border-r-2 border-black/80">
            <div className="text-[10px] font-technical text-zinc-400 uppercase tracking-widest mb-1 flex items-center justify-end gap-2">
              <span>02 // RUNTIME TELEMETRY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="flex items-baseline justify-end gap-2 leading-none">
              <span className="text-4xl sm:text-5xl font-black font-technical text-black tracking-tight">
                98.4%
              </span>
              <span className="text-[9px] font-technical font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                AUDIT GRADE
              </span>
            </div>
            <div className="text-[10px] font-technical text-zinc-500 mt-1 uppercase">
              R-AI™ Inference Gateway Conformity
            </div>
            <div className="mt-1.5 flex items-center justify-end gap-3 text-[9px] font-technical text-zinc-400">
              <span>LATENCY: <strong className="text-black">&lt; 3.8ms</strong></span>
              <span>•</span>
              <span>SHADOW AI: <strong className="text-emerald-700">ZERO</strong></span>
            </div>
          </div>

          {/* ASYMMETRICAL EDITORIAL ELEMENT 4: Lower-Right (Proprietary Stack & VAIL™) */}
          <div className="hero-float-card absolute right-2 sm:right-6 lg:right-8 bottom-1 max-w-[260px] lg:max-w-[290px] text-right hidden sm:block z-10">
            <div className="text-[9px] font-technical text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-end gap-1.5">
              <span>04 // PROPRIETARY TECH</span>
              <span className="text-[8px] px-1.5 py-0.2 rounded bg-black text-white font-technical">VAIL™</span>
            </div>
            <div className="text-xs font-bold text-black tracking-tight mb-1">
              VAIL™ Validation &amp; Stress Sandbox
            </div>
            <p className="text-[10px] text-zinc-500 mb-2 font-technical leading-tight">
              Synthetic adversarial red-teaming, automated audit evidence, and inference runtime policies.
            </p>
            <a 
              href="#ecosystem"
              className="inline-flex items-center gap-1.5 text-[11px] font-technical uppercase tracking-wider font-semibold text-zinc-900 hover:text-black group transition-colors"
            >
              <span>Explore Product Stack</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="mt-1.5 text-[9px] font-technical text-zinc-400 flex items-center justify-end gap-2">
              <span>AUDIT™</span>
              <span>•</span>
              <span>R-AI™ GATEWAY</span>
              <span>•</span>
              <span>VAIL™ LAB</span>
            </div>
          </div>

        </div>

        {/* MONUMENTAL BOTTOM HEADLINE (Centered) */}
        <div className="w-full text-center relative z-10">
          <h2 className="hero-anim-title font-editorial italic text-5xl sm:text-6xl lg:text-[6.2rem] font-normal text-zinc-500 leading-none">
            Intelligence.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 font-normal max-w-2xl mx-auto px-4 leading-relaxed">
            Operational Governance by Design™ — Embedding human judgment, mathematical guardrails, and cryptographically verified audit trails into enterprise AI systems.
          </p>
        </div>

        {/* MOBILE ACTIONS (Shown only when screen width hides side text) */}
        <div className="md:hidden mt-6 flex flex-col items-center gap-3 w-full max-w-xs mx-auto z-30">
          <a 
            href="#session"
            className="w-full py-3 px-6 rounded-full bg-black text-white text-xs font-technical font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
          >
            <span>Book 90-Min C-Suite Session</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a 
            href="#ecosystem"
            className="w-full py-3 px-6 rounded-full border border-black/15 bg-white text-zinc-900 text-xs font-technical font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Explore Stack</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* BOTTOM METRICS LEDGER (Swiss alignment) */}
        <div className="mt-6 pt-4 border-t border-black/[0.08] w-full flex flex-wrap items-center justify-between gap-4 text-[10px] font-technical text-zinc-500 uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-black" /> 3-Week Diagnostic Baseline</span>
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-black" /> Sub-4ms R-AI™ Gateway</span>
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-black" /> EU AI Act Annex III Ready</span>
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-black" /> ISO/IEC 42001 Standard</span>
        </div>

      </section>

      {/* 3. FOUNDERS' QUOTE BANNER */}
      <section className="py-14 border-y border-black/[0.06] bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-editorial italic text-2xl sm:text-3xl text-zinc-800 leading-snug">
            “Technology must grow with us, not instead of us.”
          </p>
          <div className="mt-4 text-xs font-technical text-zinc-400 uppercase tracking-widest">
            — RAYOL AI FOUNDING CREED
          </div>
        </div>
      </section>

      {/* FOUNDER'S EXECUTIVE BRIEFING VIDEO THEATER */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="border border-black/[0.08] bg-white p-5 sm:p-8 lg:p-10 relative overflow-hidden shadow-sm">
          {/* Architectural corner registration marks */}
          <div className="absolute top-2 left-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
          <div className="absolute top-2 right-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
          <div className="absolute bottom-2 left-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
          <div className="absolute bottom-2 right-2 text-[9px] font-technical text-zinc-300 select-none">+</div>

          {/* Video Header / Metadata Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-black/[0.06] gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-technical font-bold text-black uppercase tracking-wider">
                FOUNDER’S BRIEFING: OPERATIONAL GOVERNANCE BY DESIGN™
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-technical text-zinc-500">
              <span className="px-2.5 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.06] font-medium">
                SPEAKER: OLGA TROEGER (CO-FOUNDER &amp; CEO)
              </span>
              <span className="hidden sm:inline">1080P HD STREAM</span>
            </div>
          </div>

          {/* Responsive 16:9 Iframe Player Container */}
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-xl border border-black/10">
            <iframe 
              src="https://drive.google.com/file/d/1BTZpBtFvvtAycWLtlonCHqG9VzlDUjb4/preview" 
              title="Rayol AI — Founder's Briefing by Olga Troeger"
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>

          {/* Video Footer Key Takeaways */}
          <div className="mt-5 pt-4 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-technical text-zinc-600">
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">01 //</span>
              <span>Why uninsurable AI liabilities arise before companies realize models are live in production.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">02 //</span>
              <span>Translating board-level strategy into mathematical runtime guardrails and verifiable evidence.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">03 //</span>
              <span>How Rayol partners directly with executive risk leaders in 3-week baseline diagnostics.</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHERE ARE YOU TODAY (3 Entry Points) — EDITORIAL BROADSIDE LEDGER */}
      <section id="why-rayol" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-black/[0.08] pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-technical text-zinc-500 uppercase tracking-widest">
                01 // ENGAGEMENT ARCHITECTURE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] text-black leading-[1.08]">
              Three Entry Points. <br />
              <span className="font-editorial italic font-normal text-zinc-400">One Goal: Clarity and Control.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              Each engagement starts from a problem you can name and ends with an outcome you can defend before regulators and boards.
            </p>
            <div className="flex items-center gap-5 text-[10px] font-technical text-zinc-400 uppercase tracking-wider">
              <span>DIAGNOSTIC</span>
              <span>•</span>
              <span>ADVISORY</span>
              <span>•</span>
              <span>RUNTIME TECH</span>
            </div>
          </div>
        </div>

        {/* METHODOLOGY MOTION BLUEPRINT (about.mp4) */}
        <div className="mb-16 border border-black/[0.08] bg-white p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-sm">
          {/* Architectural corner registration marks */}
          <div className="absolute top-2 left-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
          <div className="absolute top-2 right-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
          <div className="absolute bottom-2 left-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
          <div className="absolute bottom-2 right-2 text-[9px] font-technical text-zinc-300 select-none">+</div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-black/[0.06] gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-technical font-bold text-black uppercase tracking-wider">
                METHODOLOGY SPECIFICATION: THE RAYOL EIGHT™ &amp; OPERATIONAL GOVERNANCE
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-technical text-zinc-500">
              <span className="px-2.5 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.06]">
                FRAMEWORK: GOVERN • ADOPT • SUSTAIN
              </span>
              <span className="hidden sm:inline">OFFICIAL OVERVIEW</span>
            </div>
          </div>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#fbfbfa] border border-black/[0.06]">
            <video 
              ref={(el) => {
                if (el) el.playbackRate = 0.85
              }}
              onLoadedMetadata={(e) => {
                e.currentTarget.playbackRate = 0.85
              }}
              onPlay={(e) => {
                e.currentTarget.playbackRate = 0.85
              }}
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-contain pointer-events-none select-none"
              src="/about.mp4"
            />
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.06] flex flex-wrap items-center justify-between text-xs font-technical text-zinc-600 gap-3">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
              <span>“AI is scaling faster than the ability to govern it.”</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-zinc-400 uppercase">
              <span>01 GOVERN</span>
              <span>•</span>
              <span>02 ADOPT</span>
              <span>•</span>
              <span>03 SUSTAIN</span>
            </div>
          </div>
        </div>

        {/* 3-COLUMN ARCHITECTURAL LEDGER (Asymmetric Stagger, Zero Boxy Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-black/[0.08] border-y border-black/[0.08]">
          {entryPoints.map((entry) => (
            <div 
              key={entry.num}
              className={`stagger-card relative group pt-8 pb-12 px-6 sm:px-8 lg:px-10 flex flex-col justify-between transition-all duration-500 hover:bg-black/[0.015] ${entry.offsetClass}`}
            >
              {/* Kinetic top hairline accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div>
                {/* Numerals & Status Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl sm:text-6xl font-light font-technical text-zinc-300 group-hover:text-black transition-colors duration-500 tracking-tighter">
                    {entry.num}
                  </span>
                  <span className="text-[9px] font-technical px-2.5 py-1 rounded-full bg-black/[0.04] text-zinc-700 border border-black/[0.06] uppercase tracking-wider font-semibold">
                    {entry.badge}
                  </span>
                </div>

                {/* Category Breadcrumb */}
                <div className="text-[10px] font-technical text-zinc-400 uppercase tracking-widest mb-2.5">
                  {entry.category}
                </div>

                {/* Problem Statement */}
                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-3 leading-snug">
                  {entry.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-500 mb-8 leading-relaxed">
                  {entry.problem}
                </p>
              </div>

              {/* Defended Outcome & Deliverables Blueprint */}
              <div className="pt-6 border-t border-black/[0.08]">
                <div className="text-[9px] font-technical uppercase tracking-widest text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                  <span>{entry.outcomeLabel}</span>
                </div>
                <div className="text-sm font-bold text-black uppercase tracking-tight mb-2">
                  {entry.solution}
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mb-5">
                  {entry.desc}
                </p>

                {/* Key Deliverables Bulleted Matrix */}
                <div className="space-y-1.5 mb-6">
                  {entry.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-[10px] font-technical text-zinc-600">
                      <span className="w-1 h-1 rounded-full bg-zinc-400 group-hover:bg-black transition-colors"></span>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>

                {/* High-Touch Action Link */}
                <a 
                  href={entry.link} 
                  className="inline-flex items-center gap-2 text-xs font-technical uppercase tracking-wider font-semibold text-black hover:text-zinc-600 transition-colors group/link"
                >
                  <span>{entry.linkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 5. PRODUCT & ADVISORY ECOSYSTEM — KINETIC ARCHITECTURAL CONSOLE (Zero Cards) */}
      <section id="ecosystem" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-black/[0.08]">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-black/[0.08] pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-technical text-zinc-500 uppercase tracking-widest">
                02 // PRODUCT &amp; ADVISORY ECOSYSTEM
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] text-black leading-[1.08]">
              Proprietary Technology, <br />
              <span className="font-editorial italic font-normal text-zinc-400">Built Alongside Advisory Work.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              Both R-AI™ and VAIL™ are proprietary systems under continuous development since 2025, shaped directly by enterprise client engagements.
            </p>
            <div className="flex items-center gap-5 text-[10px] font-technical text-zinc-400 uppercase tracking-wider">
              <span>R-AI™ GATEWAY</span>
              <span>•</span>
              <span>VAIL™ SANDBOX</span>
              <span>•</span>
              <span>C-SUITE COUNSEL</span>
            </div>
          </div>
        </div>

        {/* GSAP-ANIMATED ARCHITECTURAL SPLIT STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT 6 COLS: DYNAMIC ARCHITECTURAL DOSSIER INSPECTOR (Interactive Details) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="eco-detail-pane border border-black/[0.08] p-8 sm:p-10 relative overflow-hidden bg-white/70 backdrop-blur-sm">
              {/* Corner Registration Marks */}
              <div className="absolute top-2 left-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
              <div className="absolute top-2 right-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
              <div className="absolute bottom-2 left-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
              <div className="absolute bottom-2 right-2 text-[9px] font-technical text-zinc-300 select-none">+</div>

              {/* Status Header */}
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-technical font-semibold text-zinc-900 uppercase tracking-widest">
                    {ecosystem[selectedPillar].status}
                  </span>
                </div>
                <span className="text-[9px] font-technical text-zinc-500 px-2.5 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.06]">
                  {ecosystem[selectedPillar].metricsBadge}
                </span>
              </div>

              {/* Number & Headline */}
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-5xl sm:text-6xl font-extralight font-technical text-zinc-300 select-none tracking-tighter">
                  {ecosystem[selectedPillar].id}
                </span>
                <div>
                  <div className="text-[9px] font-technical text-zinc-400 uppercase tracking-wider mb-0.5">
                    {ecosystem[selectedPillar].code}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight leading-tight">
                    {ecosystem[selectedPillar].title}
                  </h3>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-editorial italic text-base sm:text-lg text-zinc-500 mb-4 leading-snug">
                “{ecosystem[selectedPillar].tagline}”
              </p>

              {/* Body */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                {ecosystem[selectedPillar].body}
              </p>

              {/* Specs Matrix */}
              <div className="border-t border-black/[0.08] pt-5 mb-6">
                <div className="text-[9px] font-technical uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-black"></span>
                  <span>TECHNICAL ARCHITECTURE SPECIFICATION</span>
                </div>
                <div className="space-y-2.5">
                  {ecosystem[selectedPillar].specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1 border-b border-black/[0.03] pb-1.5 font-technical">
                      <span className="text-zinc-400 text-[10px] uppercase tracking-wider">{spec.label}</span>
                      <span className="font-semibold text-black text-right text-[11px]">{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-technical text-zinc-400">
                  {ecosystem[selectedPillar].timeline}
                </span>
                <a 
                  href={ecosystem[selectedPillar].href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-[11px] font-technical uppercase tracking-wider font-semibold hover:bg-zinc-800 transition-all shadow-sm group"
                >
                  <span>{ecosystem[selectedPillar].cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          </div>

          {/* RIGHT 6 COLS: 4 EXPANSIVE KINETIC EDITORIAL ROWS */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-black/[0.08] border-y border-black/[0.08]">
            {ecosystem.map((eco, idx) => {
              const isSelected = selectedPillar === idx
              return (
                <div 
                  key={eco.id}
                  onMouseEnter={() => handleSelectPillar(idx)}
                  onClick={() => handleSelectPillar(idx)}
                  className={`eco-pillar-row relative p-6 sm:p-7 cursor-pointer transition-all duration-300 group ${
                    isSelected ? 'bg-black/[0.03]' : 'hover:bg-black/[0.015]'
                  }`}
                >
                  {/* Left kinetic indicator bar */}
                  <div className={`absolute top-0 bottom-0 left-0 w-[3px] bg-black transition-all duration-300 ${
                    isSelected ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-40'
                  }`}></div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className={`text-3xl sm:text-4xl font-light font-technical tracking-tighter transition-colors select-none ${
                        isSelected ? 'text-black font-semibold' : 'text-zinc-300 group-hover:text-black'
                      }`}>
                        {eco.id}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-technical uppercase tracking-widest text-zinc-400">
                            {eco.code}
                          </span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          )}
                        </div>
                        <h4 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                          isSelected ? 'text-black' : 'text-zinc-800 group-hover:text-black'
                        }`}>
                          {eco.title}
                        </h4>
                        <p className="text-xs text-zinc-500 mt-1 max-w-md line-clamp-1">
                          {eco.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected ? 'bg-black text-white shadow-sm' : 'bg-black/[0.04] text-zinc-500 group-hover:bg-black group-hover:text-white'
                      }`}>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-technical text-zinc-400 hidden sm:inline">
                        {eco.timeline.split('•')[0]}
                      </span>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>

      </section>

      {/* 6. STRIPE-STYLE INTERACTIVE RISK & TELEMETRY LAB */}
      <section id="simulator" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="rounded-[3rem] bg-white border border-black/[0.08] p-8 sm:p-14 soft-glow-pearl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-technical text-zinc-400 uppercase tracking-widest block mb-2">
                03 // R-AI™ TELEMETRY SIMULATOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
                Simulate Your Governance Posture.
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-[#f4f3ee] p-1.5 rounded-full text-xs font-technical">
              <button 
                onClick={() => setActiveTab('eu')}
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'eu' ? 'bg-black text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-black'}`}
              >
                EU AI Act
              </button>
              <button 
                onClick={() => setActiveTab('bias')}
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'bias' ? 'bg-black text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-black'}`}
              >
                Bias &amp; Drift
              </button>
              <button 
                onClick={() => setActiveTab('shadow')}
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'shadow' ? 'bg-black text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-black'}`}
              >
                Shadow AI
              </button>
              <button 
                onClick={() => setActiveTab('assurance')}
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'assurance' ? 'bg-black text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-black'}`}
              >
                Evidence Vault
              </button>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#fbfbfa] border border-black/[0.06]">
            {activeTab === 'eu' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">CLASSIFICATION TIER</span>
                  <span className="text-xl font-bold text-black block mb-2">HIGH RISK // ANNEX III</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">Automated underwriting and autonomous HR decisions subject to strict conformity assessment.</p>
                </div>
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">CONFORMITY SCORE</span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-black">{governanceScore}%</span>
                    <input 
                      type="range" 
                      min="75" 
                      max="100" 
                      value={governanceScore} 
                      onChange={(e) => setGovernanceScore(Number(e.target.value))}
                      className="w-28 accent-black cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-emerald-700 font-medium mt-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Technical documentation dynamically generated
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">HUMAN OVERSIGHT (HITL)</span>
                  <span className="text-xl font-bold text-black block mb-2">MANDATORY // ACTIVE</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">Discretionary sign-off logged with biometric cryptographic signatures.</p>
                </div>
              </div>
            )}

            {activeTab === 'bias' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">DISPARATE IMPACT RATIO</span>
                  <span className="text-xl font-bold text-black block mb-2">0.96 (TARGET &gt; 0.80)</span>
                  <p className="text-xs text-emerald-700 font-medium">Zero critical demographic variance detected across validation runs.</p>
                </div>
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">DATASET DRIFT VECTOR</span>
                  <span className="text-xl font-bold text-black block mb-2">0.014 // NOMINAL</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">Production inference matches baseline distribution within tolerance.</p>
                </div>
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">REASONING AUDITABILITY</span>
                  <span className="text-xl font-bold text-black block mb-2">100% TRACEABLE</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">Chain-of-thought embeddings preserved in immutable cold vaults.</p>
                </div>
              </div>
            )}

            {activeTab === 'shadow' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">DETECTED UNGOVERNED ENDPOINTS</span>
                  <span className="text-xl font-bold text-rose-700 block mb-2">4 ENDPOINTS BLOCKED</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">Unauthorized consumer OpenAI/Anthropic API keys intercepted at gateway.</p>
                </div>
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">ENTERPRISE INVENTORY</span>
                  <span className="text-xl font-bold text-black block mb-2">38 REGISTERED MODELS</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">Mapped directly to operational risk and compliance registers.</p>
                </div>
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">PII &amp; DATA RESIDENCY</span>
                  <span className="text-xl font-bold text-black block mb-2">ZERO EXFILTRATION</span>
                  <p className="text-xs text-emerald-700 font-medium">Customer data strictly restricted to EEA sovereign cloud environments.</p>
                </div>
              </div>
            )}

            {activeTab === 'assurance' && (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-technical text-zinc-400 uppercase block mb-1">LATEST EVIDENCE RECORD HASH</span>
                  <span className="text-sm font-technical font-bold text-black break-all">
                    SHA256: 9e107d9d372bb6826bd81d3542a419d6a3f9e9a117d3d2983c55204ef96e8312
                  </span>
                </div>
                <div className="px-4 py-2 rounded-full border border-emerald-700/30 bg-emerald-50 text-emerald-800 text-xs font-bold whitespace-nowrap">
                  VERIFIED IMMUTABLE
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/[0.06] text-xs text-zinc-500 font-technical">
            <span>Integrated with SOC2 Type II, ISO 42001, and EU AI Act validation regimes.</span>
            <a href="#session" className="text-black font-semibold flex items-center gap-1.5 hover:underline">
              Request Full Telemetry Report <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 7. MEET THE LEADERSHIP & EXECUTIVE BRIEFING */}
      <section id="leadership" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-black/[0.08]">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-black/[0.08] pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-technical text-zinc-500 uppercase tracking-widest">
                04 // LEADERSHIP &amp; EXECUTIVE BRIEFING
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] text-black leading-[1.08]">
              You Work Directly with the Founders. <br />
              <span className="font-editorial italic font-normal text-zinc-400">Accountable by Design.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              No junior layers, no handovers. Senior operators with two decades of enterprise technology leadership leading every diagnostic and engagement.
            </p>
            <div className="flex items-center gap-5 text-[10px] font-technical text-zinc-400 uppercase tracking-wider">
              <span>FOUNDER LED</span>
              <span>•</span>
              <span>EX-EBAY OPERATIONS</span>
              <span>•</span>
              <span>AI SYSTEMS ARCHITECTURE</span>
            </div>
          </div>
        </div>

        {/* LEADERSHIP PROFILES (Olga Troeger & Promit Ray) — ELEGANT HORIZONTAL ARCHITECTURAL DOSSIER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leadership.map((leader) => (
            <div 
              key={leader.name}
              className="border border-black/[0.08] bg-white p-6 sm:p-8 relative group flex flex-col justify-between transition-all duration-300 hover:border-black/30 hover:bg-black/[0.005] shadow-sm"
            >
              {/* Corner registration marks */}
              <div className="absolute top-2 left-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
              <div className="absolute top-2 right-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
              <div className="absolute bottom-2 left-2 text-[9px] font-technical text-zinc-300 select-none">+</div>
              <div className="absolute bottom-2 right-2 text-[9px] font-technical text-zinc-300 select-none">+</div>

              <div>
                {/* Header Metadata Bar */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-technical uppercase tracking-widest text-zinc-500 font-semibold">
                      {leader.code}
                    </span>
                  </div>
                  <a 
                    href={leader.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all text-xs font-technical group-hover:border-black"
                    title="LinkedIn Profile"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Main Content: Portrait on left, details on right */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Portrait Image (Refined, taste-scaled ~150px) */}
                  <div className="relative w-32 sm:w-36 lg:w-40 aspect-[4/5] rounded-xl overflow-hidden shrink-0 border border-black/[0.08] bg-zinc-900 shadow-sm">
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Editorial Text Block */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-technical uppercase tracking-wider text-zinc-500 font-semibold mt-0.5 mb-3">
                      {leader.role}
                    </p>

                    {/* Founding Principle Quote */}
                    <p className="font-editorial italic text-base sm:text-lg text-zinc-800 leading-snug mb-3">
                      “{leader.superpower}”
                    </p>

                    {/* Bio */}
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      {leader.experience}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5">
                      {leader.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-[10px] font-technical text-zinc-600">
                          <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Credentials Footer */}
              <div className="mt-6 pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {leader.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[9px] font-technical px-2.5 py-0.5 rounded-full bg-black/[0.03] text-zinc-600 border border-black/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={leader.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[11px] font-technical uppercase tracking-wider font-semibold text-black hover:text-zinc-500 transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 8. C-SUITE AI VALUE CREATION SESSION (The Primary Call to Action) */}
      <section id="session" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="rounded-[3rem] bg-[#111114] text-white p-10 sm:p-16 relative overflow-hidden soft-glow-pearl">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/20 text-xs font-technical text-zinc-300 uppercase tracking-widest mb-6">
              <Clock className="w-3.5 h-3.5" /> 90 MINUTES • LED BY OUR CEO • FOR LEADERSHIP TEAMS
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
              C-Suite AI Value Creation Session.
            </h2>

            <p className="text-zinc-300 text-lg sm:text-xl font-normal leading-relaxed mb-8">
              A structured 90-minute executive session to clarify where AI delivers tangible ROI, what is currently exposed, and how to establish defensible operational governance.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 max-w-xl mb-10 text-xs text-zinc-300 font-technical">
              ★ Can be credited toward a full AI Governance &amp; Risk Baseline Audit™ engagement.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="mailto:contact@rayol.ai?subject=Booking%20C-Suite%20AI%20Value%20Creation%20Session" 
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-black font-technical font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Book C-Suite Session</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contact@rayol.ai" 
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-technical text-xs uppercase tracking-widest hover:bg-white/10 transition-all text-center"
              >
                <span>Contact Olga &amp; Promit</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 9. SCULPTURAL FOOTER */}
      <footer className="pt-20 pb-16 bg-white border-t border-black/[0.06] px-6 sm:px-12 text-xs font-technical text-zinc-500">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-black/[0.06]">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img 
                  src="/rayolpng.png" 
                  alt="Rayol AI Solutions" 
                  className="w-7 h-7 object-contain" 
                />
                <span className="text-black font-bold text-sm tracking-tight">RAYOL AI SOLUTIONS LTD.</span>
              </div>
              <p className="leading-relaxed text-zinc-600 mb-4">
                Operational Governance by Design™ for regulated and mid-market enterprise intelligence.
              </p>
              <div className="text-[11px] text-zinc-400">
                Top Company in Responsible AI — F6S
              </div>
            </div>

            <div>
              <div className="text-black font-semibold mb-3">METHODOLOGY</div>
              <ul className="space-y-2 text-zinc-600">
                <li>Operational Governance by Design™</li>
                <li>AI Governance Baseline Audit™</li>
                <li>R-AI™ Governance Platform</li>
                <li>VAIL™ Sandbox Testing Lab</li>
              </ul>
            </div>

            <div>
              <div className="text-black font-semibold mb-3">COMPLIANCE REGIMES</div>
              <ul className="space-y-2 text-zinc-600">
                <li>EU AI Act (Annex III Conformity)</li>
                <li>ISO/IEC 42001 Standard</li>
                <li>NIST AI Risk Management Framework</li>
                <li>GDPR-by-Design Architecture</li>
              </ul>
            </div>

            <div>
              <div className="text-black font-semibold mb-3">LEADERSHIP &amp; CONTACT</div>
              <p className="leading-relaxed text-zinc-600 mb-2">
                Co-Founders: Olga Troeger &amp; Promit Ray
              </p>
              <p className="text-zinc-600">contact@rayol.ai</p>
              <p className="text-zinc-400 text-[11px] mt-2">Made with 💙 in the European Union.</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
            <div>© 2026 RAYOL AI SOLUTIONS LTD. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center gap-6">
              <span>SECURITY: SOC2 TYPE II COMPLIANT</span>
              <span>//</span>
              <span>CONFIDENTIALITY GUARANTEED</span>
            </div>
          </div>

        </div>
      </footer>

    </main>
  )
}
