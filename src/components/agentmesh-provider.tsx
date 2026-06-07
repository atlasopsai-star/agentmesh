"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  approveRun,
  branchReplayFromRun,
  createRunFromTemplate,
  seedWorkspaceState,
} from "@/lib/agentmesh/engine";
import type { LaunchInput, ReplayInput, WorkspaceState } from "@/lib/agentmesh/types";

const STORAGE_KEY = "agentmesh-workspace-v1";

function getInitialWorkspaceState(): WorkspaceState {
  if (typeof window === "undefined") {
    return seedWorkspaceState();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedWorkspaceState();
    return JSON.parse(raw) as WorkspaceState;
  } catch {
    return seedWorkspaceState();
  }
}

type AgentMeshContextValue = {
  state: WorkspaceState;
  launchTemplate: (templateId: string, input: LaunchInput) => void;
  resolveApproval: (runId: string, action: "approve" | "reject") => void;
  replayRun: (runId: string, input: ReplayInput) => void;
  resetDemo: () => void;
};

const AgentMeshContext = createContext<AgentMeshContextValue | null>(null);

export function AgentMeshProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(getInitialWorkspaceState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AgentMeshContextValue>(
    () => ({
      state,
      launchTemplate: (templateId, input) => {
        setState((current) => createRunFromTemplate(current, templateId, input));
      },
      resolveApproval: (runId, action) => {
        setState((current) => approveRun(current, runId, action));
      },
      replayRun: (runId, input) => {
        setState((current) => branchReplayFromRun(current, runId, input));
      },
      resetDemo: () => {
        const next = seedWorkspaceState();
        setState(next);
      },
    }),
    [state],
  );

  return <AgentMeshContext.Provider value={value}>{children}</AgentMeshContext.Provider>;
}

export function useAgentMesh() {
  const context = useContext(AgentMeshContext);
  if (!context) {
    throw new Error("useAgentMesh must be used within AgentMeshProvider");
  }
  return context;
}
