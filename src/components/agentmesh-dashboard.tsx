"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cpu,
  DatabaseZap,
  Eye,
  GitBranchPlus,
  Layers3,
  Play,
  RefreshCcw,
  Rocket,
  Shield,
  Sparkles,
  TimerReset,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { AgentMeshProvider, useAgentMesh } from "@/components/agentmesh-provider";
import { MeshScene } from "@/components/mesh-scene";
import { cn } from "@/lib/utils";
import type { TemplateRecord } from "@/lib/agentmesh/types";

const navItems = [
  { id: "overview", label: "Overview", icon: Layers3 },
  { id: "runs", label: "Runs", icon: Activity },
  { id: "approvals", label: "Approvals", icon: Shield },
  { id: "providers", label: "Providers", icon: Cpu },
  { id: "tools", label: "Tools", icon: DatabaseZap },
];

function DashboardContent() {
  const { state, launchTemplate, replayRun, resolveApproval, resetDemo } = useAgentMesh();
  const [activeTab, setActiveTab] = useState<(typeof navItems)[number]["id"]>("overview");
  const [selectedRunId, setSelectedRunId] = useState<string>(state.runs[0]?.id ?? "");

  const selectedRun = useMemo(
    () => state.runs.find((run) => run.id === selectedRunId) ?? state.runs[0],
    [selectedRunId, state.runs],
  );

  const stats = useMemo(() => {
    const totalCost = state.runs.reduce((sum, run) => sum + run.costUsd, 0);
    const avgLatency = Math.round(
      state.runs.reduce((sum, run) => sum + run.latencyMs, 0) / Math.max(1, state.runs.length),
    );
    const activeApprovals = state.approvals.filter((approval) => approval.status === "pending").length;
    const trust = Math.round(
      state.runs.reduce((sum, run) => sum + run.successScore, 0) / Math.max(1, state.runs.length),
    );

    return {
      totalCost: totalCost.toFixed(2),
      avgLatency,
      activeApprovals,
      trust,
    };
  }, [state.approvals, state.runs]);

  const launch = (template: TemplateRecord) => {
    launchTemplate(template.id, {
      goal: template.defaultGoal,
      environment: template.id === "template_release_orchestration" ? "production" : "sandbox",
      priority: template.preferredTone === "speed" ? "high" : "normal",
      requiresApproval: template.requiredToolIds.some((toolId) =>
        state.tools.some((tool) => tool.id === toolId && tool.approvalRequired),
      ),
    });
    setActiveTab("runs");
  };

  return (
    <div className="min-h-screen bg-[#040816] text-white">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(67,130,255,0.18),transparent_32%),radial-gradient(circle_at_75%_20%,rgba(77,235,196,0.08),transparent_26%),linear-gradient(180deg,#030712_0%,#040816_100%)]" />
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 py-4 lg:px-6">
        <aside className="hidden w-[280px] shrink-0 rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl lg:flex lg:flex-col">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-[#071122]/80 p-4">
              <p className="text-xs uppercase tracking-[0.32em] text-white/35">Workspace</p>
              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">AgentMesh Demo</h1>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Premium control plane for multi-agent routing, trust, replay, and approvals.
              </p>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition",
                  activeTab === id
                    ? "border-cyan-300/20 bg-cyan-300/[0.08] text-white"
                    : "border-white/8 bg-white/[0.03] text-white/55 hover:bg-white/[0.05] hover:text-white/90",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">Ops state</p>
            <div className="mt-4 space-y-3">
              {state.insights.map((insight) => (
                <div key={insight.id} className="rounded-2xl border border-white/8 bg-[#091224] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{insight.title}</p>
                      <p className="mt-1 text-xs leading-6 text-white/48">{insight.description}</p>
                    </div>
                    <span
                      className={cn(
                        "mt-1 h-2.5 w-2.5 rounded-full",
                        insight.severity === "good"
                          ? "bg-emerald-300"
                          : insight.severity === "warning"
                            ? "bg-amber-300"
                            : "bg-rose-300",
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <header className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_110px_rgba(11,17,34,0.55)] backdrop-blur-2xl">
            <MeshScene intensity="panel" />
            <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-cyan-100">
                  <Sparkles className="h-3.5 w-3.5" />
                  Multi-agent mission control
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Build, route, replay, and govern the agent workflows that power your company.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">
                  Tonight&apos;s MVP is local-first and deployable: premium command center UX, route-aware task runs,
                  replay branching, approval queues, provider health, and MCP-ready tool governance.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => resetDemo()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/75 transition hover:bg-white/[0.08]"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Reset demo
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:shadow-[0_20px_60px_rgba(255,255,255,0.16)]"
                >
                  <Rocket className="h-4 w-4" />
                  Launch site view
                </Link>
              </div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Average trust", value: `${stats.trust}%`, hint: "Success-weighted across all recent runs", icon: Shield },
              { label: "Average latency", value: `${stats.avgLatency}ms`, hint: "Cross-runtime median orchestration time", icon: Clock3 },
              { label: "Pending approvals", value: `${stats.activeApprovals}`, hint: "Human gates currently waiting for review", icon: TimerReset },
              { label: "Tracked spend", value: `$${stats.totalCost}`, hint: "Demo workspace cumulative runtime cost", icon: BrainCircuit },
            ].map(({ label, value, hint, icon: Icon }) => (
              <div key={label} className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/35">{label}</p>
                  <Icon className="h-4 w-4 text-cyan-200" />
                </div>
                <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{value}</p>
                <p className="mt-3 text-sm leading-6 text-white/50">{hint}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Template launchpad</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Start a new orchestrated run</h3>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                    workspace live
                  </div>
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  {state.templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => launch(template)}
                      className="group rounded-[24px] border border-white/10 bg-[#081224] p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-[#0a152a]"
                    >
                      <p className="text-xs uppercase tracking-[0.28em] text-white/35">{template.subtitle}</p>
                      <h4 className="mt-3 text-lg font-semibold">{template.name}</h4>
                      <p className="mt-2 text-sm leading-6 text-white/52">{template.description}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-200">
                        Launch template
                        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Run history</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Replayable execution traces</h3>
                  </div>
                  <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/50 sm:block">
                    {state.runs.length} tracked runs
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {state.runs.map((run) => (
                    <button
                      key={run.id}
                      onClick={() => {
                        setSelectedRunId(run.id);
                        setActiveTab("runs");
                      }}
                      className={cn(
                        "w-full rounded-[22px] border p-4 text-left transition",
                        selectedRun?.id === run.id
                          ? "border-cyan-300/20 bg-cyan-300/[0.06]"
                          : "border-white/8 bg-[#081224] hover:bg-[#0a1528]",
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">{run.title}</p>
                          <p className="mt-1 text-sm leading-6 text-white/50">{run.summary}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-white/60">
                            {run.selectedProviderName}
                          </span>
                          <span
                            className={cn(
                              "rounded-full border px-2.5 py-1",
                              run.status === "completed"
                                ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                                : run.status === "awaiting_approval"
                                  ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
                                  : "border-rose-300/20 bg-rose-300/10 text-rose-100",
                            )}
                          >
                            {run.status.replaceAll("_", " ")}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs text-white/45">
                        <div>
                          <p className="uppercase tracking-[0.24em]">trust</p>
                          <p className="mt-1 text-sm text-white/80">{run.successScore}%</p>
                        </div>
                        <div>
                          <p className="uppercase tracking-[0.24em]">cost</p>
                          <p className="mt-1 text-sm text-white/80">${run.costUsd.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="uppercase tracking-[0.24em]">latency</p>
                          <p className="mt-1 text-sm text-white/80">{run.latencyMs}ms</p>
                        </div>
                        <div>
                          <p className="uppercase tracking-[0.24em]">branch</p>
                          <p className="mt-1 text-sm text-white/80">{run.parentRunId ? "Replay" : "Primary"}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Selected run</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{selectedRun?.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        selectedRun &&
                        replayRun(selectedRun.id, {
                          selectedProviderName: "OpenAI Codex",
                          goal: `${selectedRun.goal} (faster replay path)`,
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75 transition hover:bg-white/[0.08]"
                    >
                      <GitBranchPlus className="h-4 w-4" />
                      Replay
                    </button>
                    <button
                      onClick={() => selectedRun && setActiveTab("approvals")}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
                    >
                      <Play className="h-4 w-4" />
                      Inspect
                    </button>
                  </div>
                </div>
                {selectedRun ? (
                  <>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {[
                        [selectedRun.selectedProviderName, selectedRun.selectedModel],
                        [selectedRun.environment, selectedRun.routingDecision.matchedRule],
                        [selectedRun.approvalStatus.replaceAll("_", " "), selectedRun.routingDecision.strategy],
                      ].map(([headline, body]) => (
                        <div key={headline} className="rounded-[22px] border border-white/8 bg-[#081224] p-4">
                          <p className="text-sm font-medium capitalize text-white">{headline}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/35">{body}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 space-y-3">
                      {selectedRun.steps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.04 }}
                          className="rounded-[22px] border border-white/8 bg-[#081224] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs uppercase tracking-[0.24em] text-white/35">{step.type}</span>
                                <span
                                  className={cn(
                                    "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.22em]",
                                    step.status === "completed"
                                      ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                                      : step.status === "waiting"
                                        ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
                                        : "border-white/10 bg-white/[0.03] text-white/45",
                                  )}
                                >
                                  {step.status}
                                </span>
                              </div>
                              <p className="mt-2 text-base font-medium text-white">{step.label}</p>
                              <p className="mt-2 text-sm leading-6 text-white/55">{step.detail}</p>
                            </div>
                            <div className="text-right text-xs text-white/32">
                              {new Date(step.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Approval queue</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Human-in-the-loop gates</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55">
                    {state.approvals.filter((approval) => approval.status === "pending").length} pending
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {state.approvals.map((approval) => {
                    const run = state.runs.find((item) => item.id === approval.runId);
                    return (
                      <div key={approval.id} className="rounded-[22px] border border-white/8 bg-[#081224] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-white">{approval.title}</p>
                            <p className="mt-1 text-sm leading-6 text-white/55">{approval.reason}</p>
                            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/35">{run?.title}</p>
                          </div>
                          <div className="text-right">
                            <div
                              className={cn(
                                "inline-flex rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.22em]",
                                approval.status === "approved"
                                  ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                                  : approval.status === "rejected"
                                    ? "border-rose-300/20 bg-rose-300/10 text-rose-100"
                                    : "border-amber-300/20 bg-amber-300/10 text-amber-100",
                              )}
                            >
                              {approval.status}
                            </div>
                            <p className="mt-2 text-xs text-white/35">{approval.scope}</p>
                          </div>
                        </div>
                        {approval.status === "pending" ? (
                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={() => resolveApproval(approval.runId, "approve")}
                              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-100"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => resolveApproval(approval.runId, "reject")}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/72"
                            >
                              <TriangleAlert className="h-4 w-4" />
                              Reject
                            </button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/35">Provider mesh</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Connected runtimes</h3>
                </div>
                <BadgeCheck className="h-5 w-5 text-cyan-200" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {state.providers.map((provider) => (
                  <div key={provider.id} className="rounded-[22px] border border-white/8 bg-[#081224] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">{provider.name}</p>
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          provider.status === "online"
                            ? "bg-emerald-300"
                            : provider.status === "degraded"
                              ? "bg-amber-300"
                              : "bg-rose-300",
                        )}
                      />
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/35">{provider.model}</p>
                    <div className="mt-4 space-y-2 text-sm text-white/55">
                      <div className="flex items-center justify-between"><span>Trust</span><span>{provider.trustScore}%</span></div>
                      <div className="flex items-center justify-between"><span>Latency</span><span>{provider.latencyMs}ms</span></div>
                      <div className="flex items-center justify-between"><span>Cost</span><span>${provider.costPerRun.toFixed(2)}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/35">Tool and MCP catalog</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Governed tool surface</h3>
                </div>
                <Eye className="h-5 w-5 text-cyan-200" />
              </div>
              <div className="mt-5 space-y-3">
                {state.tools.map((tool) => (
                  <div key={tool.id} className="rounded-[22px] border border-white/8 bg-[#081224] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{tool.name}</p>
                        <p className="mt-1 text-sm leading-6 text-white/55">{tool.description}</p>
                      </div>
                      <div className="flex gap-2 text-[10px] uppercase tracking-[0.24em]">
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-white/55">{tool.source}</span>
                        <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-2.5 py-1 text-cyan-100">{tool.category}</span>
                        {tool.approvalRequired ? (
                          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-amber-100">approval</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function AgentMeshDashboard() {
  return (
    <AgentMeshProvider>
      <DashboardContent />
    </AgentMeshProvider>
  );
}
