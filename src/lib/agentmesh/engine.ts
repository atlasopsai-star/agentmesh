import type {
  ApprovalRecord,
  LaunchInput,
  ProviderRecord,
  ReplayInput,
  RoutingDecision,
  RunRecord,
  RunStep,
  TemplateRecord,
  ToolRecord,
  WorkspaceInsight,
  WorkspaceState,
} from "./types";

const now = () => new Date().toISOString();
const id = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function pickProvider(
  providers: ProviderRecord[],
  template: TemplateRecord,
  input: LaunchInput,
): { provider: ProviderRecord; decision: RoutingDecision } {
  if (input.priority === "high") {
    const premium =
      providers.find((provider) => provider.tone === "premium" && provider.status !== "offline") ??
      providers[0];

    return {
      provider: premium,
      decision: {
        strategy: "priority-aware",
        reason: "High-priority task detected. AgentMesh selected the highest-trust premium runtime.",
        matchedRule: "priority=high -> premium",
      },
    };
  }

  const preferred =
    providers.find((provider) => provider.tone === template.preferredTone && provider.status !== "offline") ??
    providers[0];

  return {
    provider: preferred,
    decision: {
      strategy: "template-default",
      reason: `Template preference matched ${preferred.name} for ${template.preferredTone} execution.`,
      matchedRule: `preferredTone=${template.preferredTone}`,
    },
  };
}

function buildSteps(
  input: LaunchInput,
  tools: ToolRecord[],
  selectedProvider: ProviderRecord,
  decision: RoutingDecision,
): RunStep[] {
  const activeTools = tools.filter((tool) => tool.approvalRequired || tool.source === "mcp");
  const waiting = !!input.requiresApproval;

  return [
    {
      id: id("step"),
      label: "Route execution",
      type: "route",
      status: "completed",
      detail: decision.reason,
      timestamp: now(),
    },
    {
      id: id("step"),
      label: "Generate execution plan",
      type: "plan",
      status: "completed",
      detail: `Prepared a ${selectedProvider.name} orchestration plan with ${activeTools.length} connected tools.`,
      timestamp: now(),
    },
    {
      id: id("step"),
      label: "Approval gate",
      type: "approval",
      status: waiting ? "waiting" : "completed",
      detail: waiting
        ? "Awaiting human confirmation before executing sensitive tools."
        : "No approval gate triggered for this run.",
      timestamp: now(),
    },
    {
      id: id("step"),
      label: "Execute tools",
      type: "tool",
      status: waiting ? "pending" : "completed",
      detail: waiting
        ? "Tool actions are queued until approval is granted."
        : `Executed ${activeTools.map((tool) => tool.name).join(", ")} with policy tracing enabled.`,
      timestamp: now(),
    },
    {
      id: id("step"),
      label: "Model synthesis",
      type: "model",
      status: waiting ? "pending" : "completed",
      detail: waiting
        ? `${selectedProvider.name} is paused pending approval.`
        : `${selectedProvider.name} completed the orchestration synthesis.` ,
      timestamp: now(),
    },
    {
      id: id("step"),
      label: "Result package",
      type: "result",
      status: waiting ? "pending" : "completed",
      detail: waiting
        ? "Final output will be materialized after approval."
        : "Replay-ready bundle, reasoning summary, and action diff prepared.",
      timestamp: now(),
    },
  ];
}

function finalizeRun(run: RunRecord): RunRecord {
  const next = clone(run);
  next.status = "completed";
  next.approvalStatus = next.approvalStatus === "pending" ? "approved" : next.approvalStatus;
  next.endedAt = now();
  next.costUsd = Number((next.costUsd + 0.84).toFixed(2));
  next.latencyMs += 1800;
  next.successScore = Math.min(99, next.successScore + 8);
  next.summary = "Execution completed with approval-aware routing, replay artifacts, and an auditable result package.";
  next.steps = next.steps.map((step) => ({
    ...step,
    status:
      step.type === "approval" && step.status === "waiting"
        ? "completed"
        : step.status === "pending"
          ? "completed"
          : step.status,
    detail:
      step.type === "approval" && step.status === "waiting"
        ? "Human approval granted. Execution resumed under policy controls."
        : step.type === "tool" && step.status === "pending"
          ? "Connected tools executed successfully after approval."
          : step.type === "model" && step.status === "pending"
            ? `${next.selectedProviderName} finalized the run and generated the orchestration summary.`
            : step.type === "result" && step.status === "pending"
              ? "Result package created with replay checkpoints and trust metadata."
              : step.detail,
  }));
  return next;
}

export function seedWorkspaceState(): WorkspaceState {
  const providers: ProviderRecord[] = [
    {
      id: "provider_claude_code",
      name: "Claude Code",
      model: "claude-sonnet-4-6",
      tone: "premium",
      latencyMs: 2400,
      costPerRun: 2.8,
      trustScore: 98,
      status: "online",
    },
    {
      id: "provider_codex",
      name: "OpenAI Codex",
      model: "gpt-5-codex",
      tone: "speed",
      latencyMs: 1600,
      costPerRun: 1.6,
      trustScore: 94,
      status: "online",
    },
    {
      id: "provider_opencode",
      name: "OpenCode Cloud",
      model: "opencode-max",
      tone: "balanced",
      latencyMs: 1900,
      costPerRun: 1.2,
      trustScore: 91,
      status: "degraded",
    },
  ];

  const tools: ToolRecord[] = [
    {
      id: "tool_mcp_docs",
      name: "MCP Docs Search",
      source: "mcp",
      description: "Routes knowledge lookups through an MCP-indexed workspace graph.",
      approvalRequired: false,
      category: "knowledge",
    },
    {
      id: "tool_browser_ops",
      name: "Browser Ops",
      source: "http",
      description: "Executes high-fidelity browser workflows with action previews.",
      approvalRequired: true,
      category: "browser",
    },
    {
      id: "tool_deploy_guard",
      name: "Deploy Guard",
      source: "local",
      description: "Validates deployment diffs, environments, and rollback readiness.",
      approvalRequired: true,
      category: "ops",
    },
  ];

  const templates: TemplateRecord[] = [
    {
      id: "template_release_orchestration",
      name: "Release Orchestration",
      subtitle: "Governed multi-agent ship pipeline",
      defaultGoal: "Prepare a production-ready release plan with verification and approvals.",
      preferredTone: "premium",
      requiredToolIds: ["tool_mcp_docs", "tool_deploy_guard"],
      description: "Coordinates planning, validation, replay, and approval-aware deployment routing.",
    },
    {
      id: "template_browser_research",
      name: "Browser Research Run",
      subtitle: "Tool-aware browsing and capture",
      defaultGoal: "Research a market and capture a structured briefing using live browser actions.",
      preferredTone: "balanced",
      requiredToolIds: ["tool_browser_ops", "tool_mcp_docs"],
      description: "Routes tasks through browser execution with guardrails and evidence capture.",
    },
    {
      id: "template_incident_triage",
      name: "Incident Triage",
      subtitle: "High-priority response mesh",
      defaultGoal: "Diagnose incident state and prepare an auditable remediation plan.",
      preferredTone: "speed",
      requiredToolIds: ["tool_mcp_docs", "tool_deploy_guard"],
      description: "Optimized for low-latency, high-trust task routing under pressure.",
    },
  ];

  const insights: WorkspaceInsight[] = [
    {
      id: "insight_latency",
      title: "Codex is the fastest active route",
      description: "OpenAI Codex is outperforming other runtimes on sub-2s orchestration tasks this week.",
      severity: "good",
    },
    {
      id: "insight_approval",
      title: "Approval queues are protecting sensitive browser actions",
      description: "41% of browser operations are currently paused for human review before execution.",
      severity: "warning",
    },
    {
      id: "insight_degraded",
      title: "OpenCode Cloud is in degraded mode",
      description: "Latency and trust scores dropped after the last routing window; premium tasks are being diverted.",
      severity: "critical",
    },
  ];

  const runA: RunRecord = {
    id: "run_prod_release_01",
    templateId: "template_release_orchestration",
    title: "Release orchestration / AtlasDrive workspace",
    goal: "Prepare the production launch sequence for AgentMesh with staged approvals.",
    status: "completed",
    approvalStatus: "approved",
    environment: "production",
    selectedProviderName: "Claude Code",
    selectedModel: "claude-sonnet-4-6",
    toolIds: ["tool_mcp_docs", "tool_deploy_guard"],
    startedAt: now(),
    endedAt: now(),
    costUsd: 4.12,
    latencyMs: 4820,
    successScore: 95,
    routingDecision: {
      strategy: "policy-weighted",
      reason: "Production release tasks prioritize trust and replay depth over cost efficiency.",
      matchedRule: "environment=production -> premium",
    },
    summary: "Release validation, trust review, and replay package completed successfully.",
    riskFlags: ["Deployment guard engaged", "Replay snapshot captured"],
    steps: [
      {
        id: id("step"),
        label: "Route execution",
        type: "route",
        status: "completed",
        detail: "Routed to Claude Code under premium production policy.",
        timestamp: now(),
      },
      {
        id: id("step"),
        label: "Generate execution plan",
        type: "plan",
        status: "completed",
        detail: "Created a phased rollout plan with validation checkpoints.",
        timestamp: now(),
      },
      {
        id: id("step"),
        label: "Approval gate",
        type: "approval",
        status: "completed",
        detail: "Human approval confirmed production mutation rights.",
        timestamp: now(),
      },
      {
        id: id("step"),
        label: "Execute tools",
        type: "tool",
        status: "completed",
        detail: "Deploy Guard verified environment deltas and rollback state.",
        timestamp: now(),
      },
      {
        id: id("step"),
        label: "Model synthesis",
        type: "model",
        status: "completed",
        detail: "Claude Code generated a release narrative, command summary, and safety notes.",
        timestamp: now(),
      },
      {
        id: id("step"),
        label: "Result package",
        type: "result",
        status: "completed",
        detail: "Replay timeline and action diff prepared for audit review.",
        timestamp: now(),
      },
    ],
  };

  const runBBase = createRunFromTemplate(
    {
      providers,
      tools,
      templates,
      runs: [],
      approvals: [],
      insights,
    },
    "template_browser_research",
    {
      goal: "Research a competitive launch using browser automation and verify outbound steps.",
      priority: "high",
      requiresApproval: true,
      environment: "production",
    },
  );

  const approvals = runBBase.approvals.map((approval) => ({ ...approval }));
  const runs = [runA, ...runBBase.runs];

  return {
    providers,
    tools,
    templates,
    runs,
    approvals,
    insights,
  };
}

export function createRunFromTemplate(
  state: WorkspaceState,
  templateId: string,
  input: LaunchInput,
): WorkspaceState {
  const next = clone(state);
  const template = next.templates.find((record) => record.id === templateId);
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }

  const { provider, decision } = pickProvider(next.providers, template, input);
  const runSteps = buildSteps(
    input,
    next.tools.filter((tool) => template.requiredToolIds.includes(tool.id)),
    provider,
    decision,
  );
  const requiresApproval = Boolean(input.requiresApproval);
  const runId = id("run");

  const run: RunRecord = {
    id: runId,
    templateId: template.id,
    title: `${template.name} / ${input.goal}`,
    goal: input.goal,
    status: requiresApproval ? "awaiting_approval" : "completed",
    approvalStatus: requiresApproval ? "pending" : "not_required",
    environment: input.environment ?? "sandbox",
    selectedProviderName: provider.name,
    selectedModel: provider.model,
    toolIds: template.requiredToolIds,
    startedAt: now(),
    endedAt: requiresApproval ? undefined : now(),
    costUsd: Number(provider.costPerRun.toFixed(2)),
    latencyMs: provider.latencyMs,
    successScore: requiresApproval ? provider.trustScore - 12 : provider.trustScore,
    routingDecision: decision,
    summary: requiresApproval
      ? "Run is paused behind a policy approval gate before sensitive actions execute."
      : "Run completed successfully with a generated replay package.",
    riskFlags: requiresApproval ? ["Approval required", "Sensitive tool path"] : ["Replay snapshot captured"],
    steps: requiresApproval ? runSteps : finalizeRun({
      id: runId,
      templateId: template.id,
      title: `${template.name} / ${input.goal}`,
      goal: input.goal,
      status: "running",
      approvalStatus: "not_required",
      environment: input.environment ?? "sandbox",
      selectedProviderName: provider.name,
      selectedModel: provider.model,
      toolIds: template.requiredToolIds,
      startedAt: now(),
      costUsd: Number(provider.costPerRun.toFixed(2)),
      latencyMs: provider.latencyMs,
      successScore: provider.trustScore,
      routingDecision: decision,
      summary: "",
      riskFlags: [],
      steps: runSteps,
    }).steps,
  };

  next.runs.unshift(run);

  if (requiresApproval) {
    const approval: ApprovalRecord = {
      id: id("approval"),
      runId,
      title: `Approve ${template.name}`,
      scope: "Sensitive tool execution",
      requestedAt: now(),
      status: "pending",
      reason: "This run invokes a guarded browser or deployment action that requires human sign-off.",
    };
    next.approvals.unshift(approval);
  }

  return next;
}

export function approveRun(
  state: WorkspaceState,
  runId: string,
  action: "approve" | "reject",
): WorkspaceState {
  const next = clone(state);
  next.approvals = next.approvals.map((approval) =>
    approval.runId === runId && approval.status === "pending"
      ? { ...approval, status: action === "approve" ? "approved" : "rejected" }
      : approval,
  );

  next.runs = next.runs.map((run) => {
    if (run.id !== runId) return run;
    if (action === "reject") {
      return {
        ...run,
        status: "failed",
        approvalStatus: "rejected",
        endedAt: now(),
        summary: "Run was rejected before sensitive actions executed.",
        steps: run.steps.map((step) =>
          step.type === "approval"
            ? { ...step, status: "completed", detail: "Approval request rejected by a human reviewer." }
            : step.status === "pending"
              ? { ...step, status: "completed", detail: "Execution halted after rejection." }
              : step,
        ),
      };
    }

    return finalizeRun({ ...run, approvalStatus: "pending" });
  });

  return next;
}

export function branchReplayFromRun(
  state: WorkspaceState,
  runId: string,
  replayInput: ReplayInput,
): WorkspaceState {
  const next = clone(state);
  const original = next.runs.find((run) => run.id === runId);
  if (!original) {
    throw new Error(`Run ${runId} not found`);
  }

  const matchedProvider = replayInput.selectedProviderName
    ? next.providers.find((provider) => provider.name === replayInput.selectedProviderName)
    : next.providers.find((provider) => provider.name === original.selectedProviderName);

  const provider = matchedProvider ?? next.providers[0];
  const titleGoal = replayInput.goal ?? original.goal;

  const replay: RunRecord = finalizeRun({
    ...clone(original),
    id: id("run"),
    parentRunId: original.id,
    branchLabel: `Replay from ${original.id}`,
    title: `${original.title} / Replay`,
    goal: titleGoal,
    selectedProviderName: provider.name,
    selectedModel: provider.model,
    startedAt: now(),
    endedAt: undefined,
    status: "running",
    approvalStatus: "not_required",
    costUsd: Number((provider.costPerRun + 0.45).toFixed(2)),
    latencyMs: provider.latencyMs,
    successScore: provider.trustScore,
    routingDecision: {
      strategy: "replay-override",
      reason: `Replay was branched from ${original.id} and rerouted to ${provider.name}.`,
      matchedRule: replayInput.selectedProviderName
        ? `provider override -> ${provider.name}`
        : "replay exact",
    },
    summary: "",
    riskFlags: ["Replay branch", `Source run ${original.id}`],
    steps: clone(original.steps).map((step) => ({
      ...step,
      id: id("step"),
      detail:
        step.type === "route"
          ? `Replayed through ${provider.name} with the same orchestration topology.`
          : step.detail,
    })),
  });

  next.runs.unshift(replay);
  return next;
}
