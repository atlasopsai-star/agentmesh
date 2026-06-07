export type ProviderTone = "premium" | "balanced" | "speed";

export type ProviderRecord = {
  id: string;
  name: string;
  model: string;
  tone: ProviderTone;
  latencyMs: number;
  costPerRun: number;
  trustScore: number;
  status: "online" | "degraded" | "offline";
};

export type ToolRecord = {
  id: string;
  name: string;
  source: "local" | "http" | "mcp";
  description: string;
  approvalRequired: boolean;
  category: "code" | "browser" | "knowledge" | "ops";
};

export type RoutingDecision = {
  strategy: string;
  reason: string;
  matchedRule: string;
};

export type RunStep = {
  id: string;
  label: string;
  type: "route" | "plan" | "approval" | "tool" | "model" | "result";
  status: "pending" | "running" | "completed" | "waiting";
  detail: string;
  timestamp: string;
};

export type RunRecord = {
  id: string;
  templateId: string;
  parentRunId?: string;
  branchLabel?: string;
  title: string;
  goal: string;
  status: "running" | "awaiting_approval" | "completed" | "failed";
  approvalStatus: "not_required" | "pending" | "approved" | "rejected";
  environment: "sandbox" | "production";
  selectedProviderName: string;
  selectedModel: string;
  toolIds: string[];
  startedAt: string;
  endedAt?: string;
  costUsd: number;
  latencyMs: number;
  successScore: number;
  routingDecision: RoutingDecision;
  summary: string;
  riskFlags: string[];
  steps: RunStep[];
};

export type TemplateRecord = {
  id: string;
  name: string;
  subtitle: string;
  defaultGoal: string;
  preferredTone: ProviderTone;
  requiredToolIds: string[];
  description: string;
};

export type ApprovalRecord = {
  id: string;
  runId: string;
  title: string;
  scope: string;
  requestedAt: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
};

export type WorkspaceInsight = {
  id: string;
  title: string;
  description: string;
  severity: "good" | "warning" | "critical";
};

export type WorkspaceState = {
  providers: ProviderRecord[];
  tools: ToolRecord[];
  templates: TemplateRecord[];
  runs: RunRecord[];
  approvals: ApprovalRecord[];
  insights: WorkspaceInsight[];
};

export type LaunchInput = {
  goal: string;
  priority?: "low" | "normal" | "high";
  requiresApproval?: boolean;
  environment?: "sandbox" | "production";
};

export type ReplayInput = {
  selectedProviderName?: string;
  goal?: string;
};
