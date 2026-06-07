"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChartNoAxesCombined,
  CircuitBoard,
  CloudLightning,
  Eye,
  LockKeyhole,
  Play,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { MeshScene } from "@/components/mesh-scene";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Route,
    title: "Adaptive orchestration",
    description: "Route work across Claude Code, Codex, OpenCode, MCP tools, browser automation, and future runtimes with policy-aware fallbacks.",
  },
  {
    icon: LockKeyhole,
    title: "Permissioned autonomy",
    description: "Define which agents can read, draft, mutate, or ship — and pause sensitive actions behind elegant human approvals.",
  },
  {
    icon: Eye,
    title: "Replay everything",
    description: "Inspect every branch, tool call, approval, and output. Turn agent work into a replayable system artifact instead of opaque magic.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Trust and economics",
    description: "Track latency, quality, reliability, spend, and success rate per run, template, provider, or team.",
  },
];

const useCases = [
  "Ship production changes with replay + approval gates",
  "Run browser workflows with secure human sign-off",
  "Benchmark agents and models before rollout",
  "Give platform teams one trusted AI control plane",
];

const demoTabs = [
  {
    label: "Replay",
    headline: "Step-by-step run timelines with instant branch and retry.",
    body: "Every AgentMesh run becomes an inspectable trace: route decisions, prompts, tool calls, approvals, outputs, and final trust score.",
  },
  {
    label: "Approvals",
    headline: "Sensitive actions pause at exactly the right moment.",
    body: "From browser automation to deploy mutations, AgentMesh shows the exact action preview before humans approve or reject the run.",
  },
  {
    label: "Routing",
    headline: "Send the right task to the right runtime every time.",
    body: "Mix premium trust paths with speed-focused execution and failover policies across models, tools, and environments.",
  },
];

export function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-[#030712] text-white">
      <div className="absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_top,rgba(108,92,231,0.22),transparent_38%),radial-gradient(circle_at_25%_20%,rgba(62,226,196,0.12),transparent_30%)]" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/60 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl border border-white/15 bg-white/5 shadow-[0_0_40px_rgba(91,156,255,0.25)]">
              <CircuitBoard className="h-4 w-4 text-cyan-200" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.28em] text-white/60 uppercase">AgentMesh</p>
              <p className="text-xs text-white/40">Control plane for reliable AI agents</p>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-white/65 md:flex">
            <a href="#product" className="hover:text-white">Product</a>
            <a href="#trust" className="hover:text-white">Trust</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <Link href="/workspace" className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-white transition hover:bg-white/[0.12]">
              Open workspace
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 pb-24 pt-16 lg:flex-row lg:items-center lg:px-10 lg:pt-24">
        <div className="max-w-2xl flex-1">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-xs font-medium tracking-[0.24em] text-cyan-100 uppercase"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Launching the AI control plane category
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-8 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
          >
            Route, govern, replay, and trust every agent action.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/66 lg:text-xl"
          >
            AgentMesh connects to your favorite agents and models, layers in approvals,
            routing, MCP tools, replay, and performance intelligence, then turns fragmented
            AI workflows into a premium system your team can actually trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/workspace"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] hover:shadow-[0_20px_80px_rgba(255,255,255,0.22)]"
            >
              Enter workspace
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:bg-white/[0.1]"
            >
              <Play className="h-4 w-4" />
              See the replay loop
            </a>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Multi-agent routing",
              "Approval-aware execution",
              "Replay + branching",
              "MCP and tool governance",
              "Trust and spend visibility",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.12 }}
          className="relative flex-1"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.045] p-6 shadow-[0_40px_140px_rgba(11,17,34,0.75)] backdrop-blur-2xl">
            <MeshScene intensity="hero" />
            <div className="relative grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4 rounded-[28px] border border-white/10 bg-[#060c1f]/85 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-white/35">Live orchestration</p>
                    <h3 className="mt-2 text-lg font-semibold">Release orchestration / production</h3>
                  </div>
                  <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                    approval armed
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between text-xs text-white/45">
                    <span>policy-weighted route</span>
                    <span>claude-sonnet-4-6</span>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                    {[
                      ["task", "queued"],
                      ["approval", "paused"],
                      ["deploy guard", "ready"],
                    ].map(([label, status]) => (
                      <div key={label} className="rounded-2xl border border-white/8 bg-[#091127] p-3">
                        <p className="text-white/35 uppercase tracking-[0.24em] text-[10px]">{label}</p>
                        <p className="mt-2 font-medium capitalize text-white">{status}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["trust", "98"],
                    ["cost", "$4.12"],
                    ["replay", "ready"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">{label}</p>
                      <p className="mt-2 text-lg font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 rounded-[28px] border border-white/10 bg-[#071020]/86 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.32em] text-white/35">Replay timeline</p>
                  <span className="rounded-full border border-cyan-400/18 bg-cyan-400/8 px-3 py-1 text-xs text-cyan-200">branchable</span>
                </div>
                <div className="space-y-3">
                  {[
                    ["Route selected", "Premium path based on production policy", true],
                    ["Approval gate", "Browser mutation paused for human review", true],
                    ["Deploy Guard", "Rollback validation precomputed", false],
                    ["Result package", "Replay diff and run artifacts ready", false],
                  ].map(([title, body, active]) => (
                    <div
                      key={String(title)}
                      className={cn(
                        "rounded-2xl border p-3 transition",
                        active
                          ? "border-cyan-300/20 bg-cyan-300/6 shadow-[0_0_0_1px_rgba(94,234,212,0.05)]"
                          : "border-white/8 bg-white/[0.03]",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">{title}</p>
                          <p className="mt-1 text-sm leading-6 text-white/55">{body}</p>
                        </div>
                        <span className={cn("mt-1 h-2.5 w-2.5 rounded-full", active ? "bg-cyan-300" : "bg-white/25")} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4 text-sm text-white/58">
                  <div className="flex items-center gap-2 text-white/80">
                    <ShieldCheck className="h-4 w-4 text-emerald-200" />
                    Trust surface
                  </div>
                  <p className="mt-2 leading-6">
                    AgentMesh treats approvals, replay, route explanations, and exact action previews as
                    first-class product surfaces — not buried admin settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/70">What AgentMesh does</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            The orchestration and trust layer around agents.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/60">
            Built for teams already using frontier models and agentic workflows — but missing the system
            that makes them safe, repeatable, and fast to operate.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.06]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] text-cyan-200 shadow-[0_0_36px_rgba(74,222,128,0.08)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-8 text-xl font-semibold">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/70">Replayable product demo</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Premium UX on top. Real operational gravity underneath.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/58">
              The best AI products now aren’t just chats. They are operational systems. AgentMesh makes
              trust, replay, approvals, and routing feel tangible and immediate.
            </p>
            <div className="mt-8 space-y-3">
              {useCases.map((item) => (
                <div key={item} className="flex items-start gap-3 text-white/70">
                  <BadgeCheck className="mt-0.5 h-5 w-5 text-cyan-200" />
                  <span className="leading-7">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_120px_rgba(11,17,34,0.55)] backdrop-blur-xl">
            <MeshScene intensity="panel" />
            <div className="relative rounded-[28px] border border-white/10 bg-[#060c1f]/92 p-4">
              <div className="flex flex-wrap gap-2">
                {demoTabs.map((tab, index) => (
                  <div
                    key={tab.label}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.25em]",
                      index === 0
                        ? "border-cyan-300/25 bg-cyan-300/8 text-cyan-100"
                        : "border-white/10 bg-white/[0.03] text-white/45",
                    )}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[24px] border border-white/10 bg-[#081124] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Run branch</p>
                    <h3 className="mt-2 text-2xl font-semibold">Replay from step 02 / browser approval</h3>
                  </div>
                  <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                    awaiting approval
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-[0.88fr_1.12fr]">
                  <div className="space-y-3">
                    {demoTabs.map((tab, index) => (
                      <div
                        key={tab.label}
                        className={cn(
                          "rounded-2xl border p-4",
                          index === 0 ? "border-cyan-300/20 bg-cyan-300/[0.06]" : "border-white/8 bg-white/[0.03]",
                        )}
                      >
                        <p className="font-medium text-white">{tab.headline}</p>
                        <p className="mt-2 text-sm leading-7 text-white/55">{tab.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/55">
                    <div className="flex items-center justify-between border-b border-white/8 pb-3 text-xs uppercase tracking-[0.26em] text-white/35">
                      <span>Action preview</span>
                      <span>Browser Ops</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl border border-white/8 bg-[#071122] p-3 text-white/72">
                        Navigate to Vercel deployment panel and validate env delta before promoting build.
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-[#071122] p-3 text-white/72">
                        Compare selected provider route, cost ceiling, and rollback confidence before execution.
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <button className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-50">
                        Approve
                      </button>
                      <button className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/70">
                        Inspect diff
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trust" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="rounded-[36px] border border-white/10 bg-white/[0.03] px-6 py-10 shadow-[0_30px_120px_rgba(13,20,44,0.45)] backdrop-blur-xl lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/70">Trust layer</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Trust is a product surface.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/58">
                AgentMesh makes autonomy legible. Every route, permission, approval, and outcome appears in
                a system your team can read, control, and replay.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Read", "Agents can inspect systems without changing them."],
                ["Draft", "Generate changes, messages, and artifacts before action."],
                ["Act with approval", "Pause every sensitive action behind a clear decision gate."],
                ["Autonomous", "Promote only the safest workflows into no-touch execution paths."],
              ].map(([title, body], index) => (
                <div
                  key={title}
                  className={cn(
                    "rounded-[28px] border p-5",
                    index === 2
                      ? "border-cyan-300/25 bg-cyan-300/[0.06]"
                      : "border-white/10 bg-white/[0.03]",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <CloudLightning className={cn("h-5 w-5", index === 2 ? "text-cyan-200" : "text-white/55")} />
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/55">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/70">Commercial model</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Monthly plus usage. Built to scale with the teams that ship the future.</h2>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {[
            ["Builder", "$29", "For solo operators connecting their favorite agents into one premium control plane."],
            ["Team", "$149", "For startups standardizing task runs, approvals, and replay across shared workflows."],
            ["Enterprise", "Custom", "For platform, security, and AI ops teams that need policy, audit, SSO, and managed infrastructure."],
          ].map(([name, price, body], index) => (
            <div
              key={name}
              className={cn(
                "rounded-[30px] border p-6 backdrop-blur-xl",
                index === 1
                  ? "border-cyan-300/25 bg-cyan-300/[0.08] shadow-[0_24px_90px_rgba(86,188,255,0.12)]"
                  : "border-white/10 bg-white/[0.03]",
              )}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">{name}</p>
              <p className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{price}</p>
              <p className="mt-4 text-sm leading-7 text-white/58">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(135deg,rgba(11,15,34,0.96),rgba(8,14,28,0.92))] px-6 py-10 shadow-[0_28px_140px_rgba(16,24,48,0.52)] lg:px-10 lg:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/70">Build mode</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Use AgentMesh like an AI-native startup team would.</h2>
              <p className="mt-4 text-lg leading-8 text-white/58">
                Connect the agents you trust. Route high-value work intelligently. Guard the dangerous steps.
                Replay everything. Ship the future with visibility.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/workspace" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:shadow-[0_24px_80px_rgba(255,255,255,0.18)]">
                Launch workspace
              </Link>
              <a href="mailto:founders@agentmesh.ai" className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/88 transition hover:bg-white/[0.08]">
                Book investor demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
