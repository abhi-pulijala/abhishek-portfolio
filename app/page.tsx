"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"; import { type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  MonitorCog,
  Moon,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

const colors = {
  primary: "#00C2FF",
  secondary: "#7C3AED",
  accent: "#06D6A0",
  background: "#0F172A",
};

const navItems = ["About", "Skills", "Experience", "Projects", "Journey", "Resume", "Contact"];

const roles = [
  "Linux Administrator",
  "Infrastructure Analyst",
  "Automation Enthusiast",
  "Future DevOps Engineer",
];

const skillGroups = [
  {
    title: "Linux & Infrastructure",
    icon: Server,
    color: "#00C2FF",
    skills: [
      ["Linux Administration", 90],
      ["RHEL", 86],
      ["System Troubleshooting", 88],
      ["System Monitoring", 82],
      ["NFS", 84],
      ["SSH", 88],
      ["SAN Storage", 78],
    ],
  },
  {
    title: "Automation",
    icon: Terminal,
    color: "#06D6A0",
    skills: [
      ["Ansible", 78],
      ["Bash Scripting", 74],
      ["Python", 56],
    ],
  },
  {
    title: "Cloud",
    icon: Cloud,
    color: "#7C3AED",
    skills: [
      ["AWS", 48],
      ["Microsoft Azure", 46],
    ],
  },
  {
    title: "DevOps",
    icon: GitBranch,
    color: "#F59E0B",
    skills: [
      ["Docker", 62],
      ["Kubernetes", 48],
      ["Git", 68],
      ["GitHub Actions", 48],
      ["Jenkins", 50],
      ["Terraform", 42],
    ],
  },
  {
    title: "Monitoring",
    icon: MonitorCog,
    color: "#FB7185",
    skills: [
      ["Prometheus", 52],
      ["Grafana", 58],
      ["ELK Stack", 44],
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Enterprise Linux Server Administration",
    description:
      "Managing enterprise Linux systems, troubleshooting production issues, validating patches, maintaining mounts, and supporting reliable day-to-day operations.",
    tech: ["RHEL", "NFS", "SAN", "Bash"],
    icon: Server,
    glow: "from-cyan-500/20 to-blue-600/5",
  },
  {
    number: "02",
    title: "Ansible Automation Framework",
    description:
      "Automation workflows for server validation, health checks, support-data collection, and repetitive operational tasks across infrastructure estates.",
    tech: ["Ansible", "YAML", "Linux", "Python"],
    icon: Terminal,
    glow: "from-emerald-500/20 to-cyan-600/5",
  },
  {
    number: "03",
    title: "DevOps Lab Environment",
    description:
      "A hands-on learning lab covering containers, orchestration, CI/CD pipelines, Infrastructure as Code, and cloud deployment patterns.",
    tech: ["Docker", "Kubernetes", "Terraform", "CI/CD"],
    icon: Code2,
    glow: "from-violet-500/20 to-purple-600/5",
  },
  {
    number: "04",
    title: "Monitoring Dashboard Implementation",
    description:
      "Monitoring and alerting concepts designed to improve infrastructure visibility, proactive response, and operational decision-making.",
    tech: ["Grafana", "Prometheus", "Alerting", "SRE"],
    icon: MonitorCog,
    glow: "from-amber-500/20 to-orange-600/5",
  },
];

const journey = [
  { label: "Current", title: "Linux Administration", icon: Server, state: "done" },
  { label: "Next", title: "Python · Ansible · Git", icon: Terminal, state: "active" },
  { label: "Then", title: "AWS & Azure", icon: Cloud, state: "future" },
  { label: "Then", title: "Docker & Kubernetes", icon: Database, state: "future" },
  { label: "Then", title: "Terraform & CI/CD", icon: GitBranch, state: "future" },
  { label: "Target", title: "DevOps Engineer / SRE", icon: Zap, state: "target" },
];

const certifications = [
  { area: "Linux Certifications", detail: "Enterprise Linux track", icon: Server },
  { area: "AWS Certifications", detail: "Cloud foundations track", icon: Cloud },
  { area: "Azure Certifications", detail: "Microsoft cloud track", icon: Cloud },
  { area: "DevOps Certifications", detail: "Automation & delivery track", icon: GitBranch },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </div>
      <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">{title}</h2>
      {copy ? <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">{copy}</p> : null}
    </motion.div>
  );
}

function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border border-white/10 bg-white/[0.045] shadow-2xl shadow-slate-950/25 backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}

function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIndex];
    const doneTyping = text === target;
    const doneDeleting = text === "";
    const speed = deleting ? 34 : doneTyping ? 1400 : 62;
    const timer = window.setTimeout(() => {
      if (doneTyping && !deleting) return setDeleting(true);
      if (doneDeleting && deleting) {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
        return;
      }
      setText(target.slice(0, text.length + (deleting ? -1 : 1)));
    }, speed);
    return () => window.clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <div className="flex min-h-9 items-center text-lg font-semibold text-cyan-300 sm:text-xl">
      <span>{text}</span><span className="ml-1 h-6 w-0.5 animate-pulse bg-cyan-300" aria-hidden="true" />
    </div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame = 0;
    const frames = 50;
    const timer = window.setInterval(() => {
      frame += 1;
      setCount(Math.round((value * frame) / frames));
      if (frame >= frames) window.clearInterval(timer);
    }, 28);
    return () => window.clearInterval(timer);
  }, [value]);
  return <>{count}{suffix}</>;
}

function ParticleField() {
  const particles = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      top: `${(i * 61) % 100}%`,
      size: 1 + (i % 3),
      delay: (i % 8) * 0.45,
      duration: 5 + (i % 6),
    })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-300/60 shadow-[0_0_12px_rgba(0,194,255,.75)]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -22, 0], opacity: [0.2, 0.85, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [visitors, setVisitors] = useState(1284);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    const prior = Number(localStorage.getItem("abhishek-portfolio-visits") || "1283");
    const next = prior + 1;
    localStorage.setItem("abhishek-portfolio-visits", String(next));
    setVisitors(next);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
    window.setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0F172A] text-slate-100 selection:bg-cyan-400/30 selection:text-white">
      <motion.div className="fixed left-0 right-0 top-0 z-[80] h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400" style={{ scaleX }} />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#0F172A]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo("home")} className="group flex items-center gap-2" aria-label="Go to home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 font-black text-slate-950 shadow-lg shadow-cyan-500/20">AP</span>
            <span className="hidden font-bold tracking-tight text-white sm:block">Abhishek<span className="text-cyan-400">.</span></span>
          </button>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">{item}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollTo("contact")} className="hidden rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-300 sm:block">Let's connect</button>
            <button className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 bg-slate-950/95 px-5 py-3 lg:hidden">
              {navItems.map((item) => <button key={item} onClick={() => scrollTo(item)} className="block w-full rounded-lg px-3 py-3 text-left text-slate-300 hover:bg-white/5">{item}</button>)}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
          <ParticleField />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,194,255,.12),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(124,58,237,.13),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(6,214,160,.07),transparent_32%)]" />
          <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
            <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Open to DevOps & Cloud opportunities
              </div>
              <p className="mb-3 font-mono text-sm tracking-[0.22em] text-cyan-300/90">HELLO, I'M</p>
              <h1 className="max-w-4xl text-5xl font-black leading-[.98] tracking-[-.045em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Abhishek <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-violet-500 bg-clip-text text-transparent">Pulijala</span>
              </h1>
              <div className="mt-6"><TypingRole /></div>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Enterprise infrastructure professional managing Linux production environments, solving complex operational issues, and building an automation-first path toward DevOps, Cloud Engineering, and SRE.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/Abhishek-Pulijala-Resume.pdf" download className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-1">
                  <Download className="h-4 w-4" /> Download Resume
                </a>
                <button onClick={() => scrollTo("contact")} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/10">
                  <Mail className="h-4 w-4" /> Contact Me
                </button>
                <button onClick={() => scrollTo("projects")} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-300 transition hover:text-cyan-300">
                  View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-400" /> Bengaluru, India</span>
                <span className="flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4 text-violet-400" /> Analyst</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Production Infrastructure</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.92, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-cyan-400/20 via-violet-500/15 to-emerald-400/10 blur-3xl" />
              <Glass className="relative overflow-hidden rounded-[2rem] p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] bg-gradient-to-br from-slate-800 to-slate-950">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,194,255,.18),transparent_30%)]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="grid h-32 w-32 place-items-center rounded-full border border-cyan-400/25 bg-cyan-400/5 shadow-[0_0_50px_rgba(0,194,255,.12)]">
                      <span className="text-5xl font-black text-cyan-300">AP</span>
                    </div>
                    <p className="mt-5 font-semibold text-white">Professional photograph</p>
                    <p className="mt-1 text-sm text-slate-500">Replace this placeholder with your portrait</p>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div><p className="text-xs text-slate-500">Current focus</p><p className="mt-1 font-semibold text-white">DevOps · Cloud · SRE</p></div>
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300"><Zap className="h-5 w-5" /></div>
                    </div>
                  </div>
                </div>
              </Glass>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-slate-950/25 py-7">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 md:grid-cols-4 lg:px-8">
            {[
              ["Production mindset", "24/7", "Operational focus"],
              ["Automation", 35, "Tasks optimized"],
              ["Core technologies", 20, "And growing"],
              ["Portfolio visits", visitors, "Local preview counter"],
            ].map(([title, value, label], i) => (
              <div key={String(title)} className="border-white/10 px-3 text-center md:border-r md:last:border-0">
                <p className="text-2xl font-black text-white sm:text-3xl">{typeof value === "number" ? <Counter value={value} suffix={i === 1 || i === 2 ? "+" : ""} /> : value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">{title}</p>
                <p className="mt-1 text-xs text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="About me" title="Infrastructure discipline. Automation mindset." />
            <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Glass className="h-full rounded-3xl p-7 sm:p-9">
                  <p className="text-xl font-semibold leading-8 text-slate-100 sm:text-2xl">
                    I support enterprise Linux environments where reliability, precise troubleshooting, and clear execution matter.
                  </p>
                  <div className="mt-6 space-y-4 leading-7 text-slate-400">
                    <p>My experience includes Linux server management, production support, incident resolution, storage and SAN troubleshooting, NFS mount management, system health checks, and operational automation using Ansible.</p>
                    <p>I approach repetitive work with an automation-first mindset. I enjoy converting manual validation and support workflows into repeatable, safer, and auditable processes.</p>
                    <p>I am continuously expanding my capabilities in AWS, Microsoft Azure, Docker, Kubernetes, Terraform, Python, CI/CD, and Infrastructure as Code as I progress toward a high-impact DevOps, Cloud Engineering, or SRE role.</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Reliable operations", "Root-cause thinking", "Automation", "Continuous learning"].map((item) => (
                      <span key={item} className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1.5 text-xs font-semibold text-cyan-200">{item}</span>
                    ))}
                  </div>
                </Glass>
              </motion.div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { icon: Server, title: "Enterprise foundation", copy: "Hands-on experience supporting Linux infrastructure and production operations.", color: "text-cyan-300 bg-cyan-400/10" },
                  { icon: Terminal, title: "Automation driven", copy: "Building repeatable Ansible and scripting workflows that reduce manual effort.", color: "text-emerald-300 bg-emerald-400/10" },
                  { icon: Cloud, title: "Cloud focused", copy: "Developing the platform skills required for modern DevOps and SRE environments.", color: "text-violet-300 bg-violet-400/10" },
                ].map((item, i) => (
                  <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Glass className="group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20">
                      <div className={cn("mb-4 grid h-11 w-11 place-items-center rounded-xl", item.color)}><item.icon className="h-5 w-5" /></div>
                      <h3 className="font-bold text-white">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{item.copy}</p>
                    </Glass>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="bg-slate-950/25 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Technical capabilities" title="Skills built for modern infrastructure" copy="A practical toolkit grounded in Linux operations and expanding across automation, cloud, delivery, and observability." />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map((group, groupIndex) => (
                <motion.div key={group.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} transition={{ delay: groupIndex * 0.06 }}>
                  <Glass className="group h-full rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10" style={{ backgroundColor: `${group.color}15`, color: group.color }}><group.icon className="h-5 w-5" /></div>
                      <h3 className="font-bold text-white">{group.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {group.skills.map(([name, level], index) => (
                        <div key={String(name)}>
                          <div className="mb-1.5 flex items-center justify-between text-xs"><span className="font-medium text-slate-300">{name}</span><span className="text-slate-600">{level}%</span></div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${level}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: index * 0.07 }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${group.color}, #00C2FF)` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Glass>
                </motion.div>
              ))}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Glass className="relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-3xl p-6">
                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/20 blur-3xl" />
                  <div className="relative"><div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><Sparkles className="h-5 w-5" /></div><h3 className="mt-5 text-2xl font-bold text-white">Always learning.</h3><p className="mt-3 leading-7 text-slate-400">Current focus: strengthening Python, cloud fundamentals, container orchestration, Infrastructure as Code, and modern CI/CD practices.</p></div>
                  <button onClick={() => scrollTo("journey")} className="relative mt-8 inline-flex items-center gap-2 self-start text-sm font-bold text-cyan-300 hover:text-cyan-200">Explore learning roadmap <ChevronRight className="h-4 w-4" /></button>
                </Glass>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-24 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <SectionHeading eyebrow="Experience" title="Operating where reliability matters" copy="A timeline centered on enterprise infrastructure support, disciplined troubleshooting, and continuous operational improvement." />
            <div className="relative">
              <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-cyan-400 via-violet-500 to-transparent sm:left-1/2" />
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative grid gap-8 sm:grid-cols-2">
                <div className="hidden pr-12 text-right sm:block"><p className="text-sm font-semibold text-cyan-300">Current position</p><p className="mt-1 text-sm text-slate-500">Enterprise Infrastructure</p></div>
                <div className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border-4 border-[#0F172A] bg-cyan-400 text-slate-950 shadow-[0_0_28px_rgba(0,194,255,.35)] sm:left-1/2 sm:-translate-x-1/2"><BriefcaseBusiness className="h-4 w-4" /></div>
                <Glass className="ml-14 rounded-3xl p-6 sm:ml-12 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-300">Present</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">Analyst</h3>
                  <p className="mt-1 text-sm text-slate-500">Bengaluru, India</p>
                  <div className="mt-6 grid gap-3">
                    {["Linux server administration", "Production support and incident troubleshooting", "Storage and SAN issue resolution", "Automation development using Ansible", "Performance and system-health monitoring", "Operational excellence and continuous improvement"].map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{item}</span></div>
                    ))}
                  </div>
                </Glass>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="projects" className="bg-slate-950/25 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Selected work" title="Projects that show the journey" copy="Operational expertise today, platform-engineering capability tomorrow." />
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, i) => (
                <motion.article key={project.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}>
                  <Glass className="group relative h-full overflow-hidden rounded-3xl p-7">
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70", project.glow)} />
                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300"><project.icon className="h-6 w-6" /></div>
                        <span className="font-mono text-4xl font-black text-white/[0.06]">{project.number}</span>
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
                      <p className="mt-3 leading-7 text-slate-400">{project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">{project.tech.map((t) => <span key={t} className="rounded-lg border border-white/10 bg-slate-950/30 px-2.5 py-1 text-xs font-semibold text-slate-300">{t}</span>)}</div>
                      <div className="mt-7 flex gap-3">
                        <a href="#" onClick={(e) => e.preventDefault()} aria-label={`${project.title} GitHub placeholder`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"><ExternalLink className="h-4 w-4" /> GitHub</a>
                        <a href="#" onClick={(e) => e.preventDefault()} aria-label={`${project.title} live demo placeholder`} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-400 transition hover:text-white"><ExternalLink className="h-4 w-4" /> Live demo</a>
                      </div>
                    </div>
                  </Glass>
                </motion.article>
              ))}
            </div>

            <Glass className="mt-8 overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-300">GitHub activity</p><h3 className="mt-2 text-xl font-bold text-white">Contribution graph preview</h3></div><p className="text-xs text-slate-500">Connect GitHub API for live activity</p></div>
              <div className="mt-6 grid grid-flow-col grid-rows-7 gap-1 overflow-hidden" aria-label="Decorative GitHub contribution activity preview">
                {Array.from({ length: 154 }, (_, i) => {
                  const intensity = (i * 7 + i * i) % 6;
                  return <div key={i} className={cn("aspect-square min-w-2 rounded-[3px]", intensity < 2 ? "bg-slate-800" : intensity === 2 ? "bg-emerald-950" : intensity === 3 ? "bg-emerald-800" : intensity === 4 ? "bg-emerald-600" : "bg-emerald-400")} />;
                })}
              </div>
            </Glass>
          </div>
        </section>

        <section id="certifications" className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Certifications" title="Credentials in progress" copy="Structured placeholders ready to be replaced with earned certifications, verification links, and issue dates." />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert, i) => (
                <motion.div key={cert.area} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * .07 }}>
                  <Glass className="group h-full rounded-3xl p-6 transition hover:-translate-y-1 hover:border-violet-400/30">
                    <div className="flex items-start justify-between"><div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><cert.icon className="h-5 w-5" /></div><Award className="h-5 w-5 text-slate-700 transition group-hover:text-violet-400" /></div>
                    <h3 className="mt-6 font-bold text-white">{cert.area}</h3><p className="mt-2 text-sm text-slate-500">{cert.detail}</p><div className="mt-5 rounded-xl border border-dashed border-white/10 px-3 py-2 text-center text-xs text-slate-600">Add credential</div>
                  </Glass>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="bg-slate-950/25 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Learning journey" title="A deliberate path to DevOps & SRE" copy="Building on a strong Linux foundation through automation, cloud, containers, Infrastructure as Code, and reliable delivery systems." />
            <div className="relative grid gap-4 lg:grid-cols-6">
              <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400 lg:block" />
              {journey.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .11 }} className="relative">
                  <Glass className={cn("h-full rounded-2xl p-5 transition hover:-translate-y-1", step.state === "active" && "border-cyan-400/35 shadow-[0_0_35px_rgba(0,194,255,.08)]", step.state === "target" && "border-emerald-400/30")}>
                    <div className={cn("relative z-10 grid h-12 w-12 place-items-center rounded-2xl border", step.state === "done" ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300" : step.state === "active" ? "border-violet-400/40 bg-violet-400/10 text-violet-300" : step.state === "target" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-slate-900 text-slate-500")}><step.icon className="h-5 w-5" /></div>
                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[.2em] text-slate-600">{step.label}</p><h3 className="mt-2 text-sm font-bold leading-5 text-white">{step.title}</h3>
                  </Glass>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="resume" className="py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <SectionHeading eyebrow="Resume" title="A concise view of my professional story" />
            <Glass className="overflow-hidden rounded-[2rem]">
              <div className="grid lg:grid-cols-[.8fr_1.2fr]">
                <div className="relative flex min-h-96 flex-col justify-between overflow-hidden bg-gradient-to-br from-cyan-500/15 via-violet-600/10 to-transparent p-8 sm:p-10">
                  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
                  <div className="relative"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Professional resume</p><h3 className="mt-4 text-3xl font-black text-white">Abhishek Pulijala</h3><p className="mt-2 text-slate-400">Analyst · Linux · Infrastructure · Automation</p></div>
                  <a href="/Abhishek-Pulijala-Resume.pdf" download className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-1"><Download className="h-4 w-4" /> Download PDF</a>
                </div>
                <div className="p-8 sm:p-10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-sm font-bold text-white">Resume preview</p><p className="mt-1 text-xs text-slate-500">Replace the sample PDF path with your final resume</p></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><BriefcaseBusiness className="h-5 w-5" /></div></div>
                  <div className="mt-6 space-y-6">
                    <div><p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Profile</p><p className="mt-2 text-sm leading-6 text-slate-400">Enterprise infrastructure professional with experience in Linux administration, production support, troubleshooting, storage operations, and Ansible automation.</p></div>
                    <div><p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Core strengths</p><div className="mt-3 flex flex-wrap gap-2">{["Linux", "RHEL", "Ansible", "NFS", "SAN", "Monitoring", "Incident response"].map(x => <span key={x} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300">{x}</span>)}</div></div>
                    <div><p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Career direction</p><p className="mt-2 text-sm leading-6 text-slate-400">DevOps Engineering · Cloud Engineering · Site Reliability Engineering</p></div>
                  </div>
                </div>
              </div>
            </Glass>
          </div>
        </section>

        <section id="contact" className="relative bg-slate-950/35 py-24 sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(124,58,237,.12),transparent_35%)]" />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <SectionHeading eyebrow="Contact" title="Let's build reliable systems together" copy="Interested in Linux infrastructure, automation, cloud engineering, DevOps, and SRE opportunities." />
            <div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
              <Glass className="rounded-3xl p-7 sm:p-8">
                <h3 className="text-xl font-bold text-white">Connect with me</h3><p className="mt-3 text-sm leading-6 text-slate-400">Use the contact form or connect through one of the channels below. Replace placeholder links before publishing.</p>
                <div className="mt-7 space-y-3">
                  {[
                    { icon: Mail, label: "Email", value: "abhishek@example.com", href: "mailto:abhishek@example.com" },
                    { icon: MapPin, label: "Location", value: "Bengaluru, India", href: "#" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} onClick={item.href === "#" ? (e) => e.preventDefault() : undefined} className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-cyan-400/20 hover:bg-white/[0.05]">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><item.icon className="h-4 w-4" /></div><div className="min-w-0"><p className="text-xs text-slate-600">{item.label}</p><p className="truncate text-sm font-semibold text-slate-300 group-hover:text-white">{item.value}</p></div>
                    </a>
                  ))}
                </div>
              </Glass>
              <Glass className="rounded-3xl p-7 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">Name</span><input required name="name" autoComplete="name" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10" placeholder="Your name" /></label>
                    <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">Email</span><input required type="email" name="email" autoComplete="email" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10" placeholder="you@example.com" /></label>
                  </div>
                  <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">Message</span><textarea required name="message" rows={6} className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10" placeholder="Tell me about the opportunity or project..." /></label>
                  <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/15 transition hover:-translate-y-1" type="submit"><Send className="h-4 w-4" /> Send message</button>
                  <AnimatePresence>{submitted && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Thanks! This preview form is ready to connect to your email service.</motion.p>}</AnimatePresence>
                </form>
              </Glass>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row sm:text-left lg:px-8">
          <div><p className="text-sm font-semibold text-white">Built with passion by Abhishek Pulijala</p><p className="mt-1 text-xs text-slate-600">Linux foundation · Cloud ambition · SRE mindset</p></div>
          <div className="flex items-center gap-3"><a href="#" onClick={(e) => e.preventDefault()} aria-label="GitHub placeholder" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><ExternalLink className="h-4 w-4" /></a><a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn placeholder" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><ExternalLink className="h-4 w-4" /></a><span className="ml-2 text-xs text-slate-700">© 2026</span></div>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && <motion.button initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .8 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-xl border border-cyan-400/25 bg-slate-900/90 text-cyan-300 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-slate-800" aria-label="Back to top"><ArrowUp className="h-5 w-5" /></motion.button>}
      </AnimatePresence>
    </div>
  );
}

export default App;
