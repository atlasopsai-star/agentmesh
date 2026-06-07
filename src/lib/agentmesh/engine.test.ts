import { describe, expect, it } from "vitest";
import {
  approveRun,
  branchReplayFromRun,
  createRunFromTemplate,
  seedWorkspaceState,
} from "./engine";

describe("agentmesh engine", () => {
  it("creates a new run using routing rules from a template", () => {
    const state = seedWorkspaceState();
    const template = state.templates[0];

    const next = createRunFromTemplate(state, template.id, {
      goal: "Summarize customer escalations",
      priority: "high",
      requiresApproval: true,
    });

    const created = next.runs.at(-1);
    expect(created).toBeDefined();
    expect(created?.status).toBe("awaiting_approval");
    expect(created?.selectedProviderName).toBe("Claude Code");
    expect(created?.routingDecision.reason).toContain("priority");
  });

  it("approves a pending run and completes the remaining steps", () => {
    const state = seedWorkspaceState();
    const pending = state.runs.find((run) => run.status === "awaiting_approval");
    expect(pending).toBeDefined();

    const next = approveRun(state, pending!.id, "approve");
    const updated = next.runs.find((run) => run.id === pending!.id);

    expect(updated?.status).toBe("completed");
    expect(updated?.approvalStatus).toBe("approved");
    expect(updated?.steps.at(-1)?.status).toBe("completed");
  });

  it("creates a replay branch that references the original run", () => {
    const state = seedWorkspaceState();
    const original = state.runs[0];

    const next = branchReplayFromRun(state, original.id, {
      selectedProviderName: "OpenAI Codex",
      goal: "Retry with a faster model",
    });

    const replay = next.runs[0];

    expect(replay?.parentRunId).toBe(original.id);
    expect(replay?.branchLabel).toContain("Replay");
    expect(replay?.selectedProviderName).toBe("OpenAI Codex");
  });
});
