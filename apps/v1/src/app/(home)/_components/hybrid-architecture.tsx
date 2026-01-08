"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  Eye,
  GitBranch,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

// ============================================================================
// DATA
// ============================================================================

const keyMetrics = [
  {
    label: "Table Score",
    before: "0.49",
    after: "0.93",
    change: "+90%",
    badge: "#1",
    icon: Target,
  },
  {
    label: "Reading Order",
    before: "0.91",
    after: "0.93",
    change: "+2%",
    badge: "#1",
    icon: TrendingUp,
  },
  {
    label: "Speed",
    value: "0.45s",
    subtitle: "/page",
    badge: "38% faster",
    icon: Clock,
  },
];

const backends = [
  {
    icon: Zap,
    title: "docling-fast",
    description: "High-speed processing via FastAPI. Achieves 3.3× faster performance with SDK singleton.",
    status: "available",
    statusLabel: "Available",
    color: "cyan",
  },
  {
    icon: Eye,
    title: "VLM",
    description: "Vision Language Model backend. Handles scanned documents, handwriting, and complex visual layouts.",
    status: "planned",
    statusLabel: "Coming Soon",
    color: "violet",
  },
  {
    icon: Building2,
    title: "Hancom",
    description: "Hancom Document AI integration. Optimized for Korean document processing.",
    status: "in-progress",
    statusLabel: "In Progress",
    color: "amber",
  },
];

const backendColorClasses = {
  cyan: {
    bg: "from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-800/20",
    ring: "ring-cyan-200/50 dark:ring-cyan-800/30",
    icon: "text-cyan-600 dark:text-cyan-400",
    status: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
  violet: {
    bg: "from-violet-100 to-violet-50 dark:from-violet-900/30 dark:to-violet-800/20",
    ring: "ring-violet-200/50 dark:ring-violet-800/30",
    icon: "text-violet-600 dark:text-violet-400",
    status: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400",
  },
  amber: {
    bg: "from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20",
    ring: "ring-amber-200/50 dark:ring-amber-800/30",
    icon: "text-amber-600 dark:text-amber-400",
    status: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  },
};

// ============================================================================
// COMPONENTS
// ============================================================================

function ArchitectureDiagram() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const nodeW = 90;
  const nodeH = 40;

  const nodes = [
    { id: "input", label: "PDF Input", x: 70, y: 170, type: "input" },
    { id: "filter", label: "ContentFilter", x: 195, y: 170, type: "process" },
    { id: "triage", label: "Triage", x: 320, y: 170, type: "decision", isNew: true },
    { id: "heuristic", label: "Heuristic", x: 490, y: 80, type: "heuristic", subtitle: "Java" },
    { id: "docai", label: "DocAI", x: 490, y: 170, type: "docai", isNew: true, subtitle: "docling · hancom" },
    { id: "vlm", label: "VLM", x: 490, y: 260, type: "vlm", isPlanned: true, subtitle: "smoldocling" },
    { id: "merger", label: "Merger", x: 660, y: 170, type: "process", isNew: true },
    { id: "output", label: "Output", x: 785, y: 170, type: "output" },
  ];

  const getNodeStyle = (type: string) => {
    switch (type) {
      case "input":
      case "output":
        return "fill-blue-500/30 stroke-blue-400/50 dark:fill-blue-500/20 dark:stroke-blue-400/40";
      case "decision":
        return "fill-amber-500/30 stroke-amber-400/50 dark:fill-amber-500/20 dark:stroke-amber-400/40";
      case "heuristic":
        return "fill-violet-500/30 stroke-violet-400/50 dark:fill-violet-500/20 dark:stroke-violet-400/40";
      case "docai":
        return "fill-cyan-500/30 stroke-cyan-400/50 dark:fill-cyan-500/20 dark:stroke-cyan-400/40";
      case "vlm":
        return "fill-rose-500/30 stroke-rose-400/50 dark:fill-rose-500/20 dark:stroke-rose-400/40";
      default:
        return "fill-emerald-500/30 stroke-emerald-400/50 dark:fill-emerald-500/20 dark:stroke-emerald-400/40";
    }
  };

  return (
    <div className="overflow-x-auto">
      <svg viewBox="0 0 850 320" className="w-full min-w-[650px]" style={{ height: "300px" }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concurrent processing box */}
        <rect
          x="430"
          y="30"
          width="120"
          height="260"
          rx="12"
          className="fill-slate-100/50 stroke-slate-300 dark:fill-white/[0.03] dark:stroke-white/20"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1000ms",
          }}
        />
        <text
          x="490"
          y="50"
          textAnchor="middle"
          className="fill-slate-500 text-[10px] font-medium uppercase tracking-widest dark:fill-gray-400"
        >
          Concurrent
        </text>

        {/* Connections */}
        <g style={{ opacity: mounted ? 1 : 0, transition: "opacity 700ms" }}>
          <line x1="115" y1="170" x2="150" y2="170" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 3" className="animate-dash" />
          <line x1="240" y1="170" x2="275" y2="170" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 3" className="animate-dash" />

          <path d="M 365 170 C 400 170, 400 80, 445 80" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="6 3" className="animate-dash" />
          <line x1="365" y1="170" x2="445" y2="170" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="6 3" className="animate-dash" />
          <path d="M 365 170 C 400 170, 400 260, 445 260" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="6 3" strokeOpacity="0.5" className="animate-dash" />

          <path d="M 535 80 C 580 80, 580 170, 615 170" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="6 3" className="animate-dash" />
          <line x1="535" y1="170" x2="615" y2="170" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="6 3" className="animate-dash" />
          <path d="M 535 260 C 580 260, 580 170, 615 170" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="6 3" strokeOpacity="0.5" className="animate-dash" />

          <line x1="705" y1="170" x2="740" y2="170" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 3" className="animate-dash" />
        </g>

        {/* Labels for branches */}
        <text x="395" y="115" className="fill-violet-500 text-[9px] font-medium dark:fill-violet-400">Simple</text>
        <text x="395" y="162" className="fill-cyan-500 text-[9px] font-medium dark:fill-cyan-400">Complex</text>
        <text x="395" y="235" className="fill-rose-400/70 text-[9px] font-medium">Super</text>
        <text x="390" y="246" className="fill-rose-400/70 text-[9px] font-medium">Complex</text>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <g
            key={node.id}
            style={{
              opacity: mounted ? 1 : 0,
              transition: `opacity 500ms ${index * 80}ms`,
            }}
          >
            <rect
              x={node.x - nodeW/2}
              y={node.y - nodeH/2}
              width={nodeW}
              height={nodeH}
              rx="10"
              className={getNodeStyle(node.type)}
              strokeWidth="1.5"
              filter="url(#glow)"
              opacity={"isPlanned" in node && node.isPlanned ? 0.5 : 1}
            />
            <text
              x={node.x}
              y={"subtitle" in node ? node.y : node.y + 4}
              textAnchor="middle"
              className="fill-slate-800 text-[11px] font-medium dark:fill-white"
              opacity={"isPlanned" in node && node.isPlanned ? 0.7 : 1}
            >
              {node.label}
            </text>
            {"subtitle" in node && (
              <text
                x={node.x}
                y={node.y + 12}
                textAnchor="middle"
                className="fill-slate-500 text-[8px] dark:fill-gray-300"
                opacity={"isPlanned" in node && node.isPlanned ? 0.7 : 1}
              >
                {node.subtitle}
              </text>
            )}
            {"isNew" in node && node.isNew && (
              <>
                <rect
                  x={node.x + nodeW/2 - 8}
                  y={node.y - nodeH/2 - 8}
                  width="28"
                  height="16"
                  rx="8"
                  fill="#10b981"
                />
                <text
                  x={node.x + nodeW/2 + 6}
                  y={node.y - nodeH/2 + 3}
                  textAnchor="middle"
                  className="fill-white text-[7px] font-bold uppercase"
                >
                  New
                </text>
              </>
            )}
            {"isPlanned" in node && node.isPlanned && (
              <>
                <rect
                  x={node.x + nodeW/2 - 8}
                  y={node.y - nodeH/2 - 8}
                  width="42"
                  height="16"
                  rx="8"
                  fill="#f43f5e"
                  opacity="0.8"
                />
                <text
                  x={node.x + nodeW/2 + 13}
                  y={node.y - nodeH/2 + 3}
                  textAnchor="middle"
                  className="fill-white text-[7px] font-bold uppercase"
                >
                  Planned
                </text>
              </>
            )}
          </g>
        ))}

        <style>{`
          @keyframes dashFlow {
            to { stroke-dashoffset: -18; }
          }
          .animate-dash {
            animation: dashFlow 1s linear infinite;
          }
        `}</style>
      </svg>
    </div>
  );
}

function MetricCard({ metric, index }: { metric: (typeof keyMetrics)[0]; index: number }) {
  const Icon = metric.icon;

  return (
    <AnimateOnScroll delay={100 + index * 100}>
      <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-emerald-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-emerald-500/30">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-100/50 blur-2xl transition-all group-hover:bg-emerald-200/70 dark:bg-emerald-500/5 dark:group-hover:bg-emerald-500/10" />

        <div className="relative">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-gray-400">
              {metric.label}
            </span>
            <Icon className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          </div>

          {"before" in metric ? (
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-sm text-slate-400 line-through dark:text-gray-500">{metric.before}</span>
              <ArrowRight className="h-3 w-3 text-slate-400 dark:text-gray-500" />
              <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white">{metric.after}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                {metric.change}
              </span>
              {"badge" in metric && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-xs font-semibold text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  {metric.badge}
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</span>
              {"subtitle" in metric && (
                <span className="text-sm text-slate-500 dark:text-gray-400">{metric.subtitle}</span>
              )}
              {"badge" in metric && (
                <span className="rounded-full bg-cyan-100 px-2 py-0.5 font-mono text-xs font-semibold text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                  {metric.badge}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimateOnScroll>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HybridArchitecture() {
  return (
    <section
      id="hybrid-architecture"
      className="relative bg-slate-50 py-20 dark:bg-slate-900"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 dark:border-cyan-800/50 dark:bg-cyan-950/50 dark:text-cyan-300">
            <Zap className="h-3.5 w-3.5" />
            Adaptive Processing
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Hybrid PDF Processing System
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-300">
            Java heuristics + External AI backends with intelligent page-level triage.
          </p>
        </AnimateOnScroll>

        {/* Key Metrics */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {keyMetrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        {/* Architecture Diagram */}
        <AnimateOnScroll className="mt-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 ring-1 ring-emerald-200/50 dark:from-emerald-500/20 dark:to-cyan-500/20 dark:ring-white/10">
                <GitBranch className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Architecture Overview</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">Processing pipeline flow</p>
              </div>
            </div>
            <ArchitectureDiagram />

            <div className="mt-6 grid gap-3 border-t border-slate-200 pt-6 md:grid-cols-3 dark:border-slate-700">
              {[
                { label: "Per-page Triage", desc: "Individual page complexity analysis" },
                { label: "Concurrent Processing", desc: "Java & Backend paths run in parallel" },
                { label: "Conservative Strategy", desc: "Minimize FN, route uncertain to Backend" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 dark:bg-white/[0.02]">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Backends */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {backends.map((backend, index) => {
            const colors = backendColorClasses[backend.color as keyof typeof backendColorClasses];
            return (
              <AnimateOnScroll key={backend.title} delay={100 + index * 100}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colors.bg} ring-1 ${colors.ring}`}
                  >
                    <backend.icon className={`h-6 w-6 ${colors.icon}`} />
                  </div>

                  {/* Title & Status */}
                  <div className="mb-2 flex items-center gap-2">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {backend.title}
                    </h4>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.status}`}>
                      {backend.statusLabel}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {backend.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* CTA Link */}
        <AnimateOnScroll className="mt-10 text-center">
          <Link
            href="/docs/hybrid-mode"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:border-slate-500 dark:hover:bg-slate-700"
          >
            View Full Architecture Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
