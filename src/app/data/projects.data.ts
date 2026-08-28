export interface ProjectImage {
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string[];
  image: string;
  gif?: string;
  images?: ProjectImage[];
  links: {
    github?: string;
    demo?: string;
    nuget?: string;
  };
  tags?: string[];
  featured?: boolean;
  command?: string;
  status?: string;
  year?: string;
  stack?: string;
  /** Slug of a related blog post, linked from the project page. */
  writeup?: string;
}

export const projectsData: Project[] = [
  {
    id: 'incident-control-plane',
    title: 'Incident Control Plane',
    description:
      'An agent-driven incident response system: it investigates operational alerts, gathers evidence, proposes remediation, requests human approval for risky actions, executes approved runbooks, and verifies recovery.',
    longDescription: [
      'Most "AIOps" demos give a model unrestricted infrastructure access. This project shows the opposite: the agent coordinates narrow, typed, permission-classified tools over MCP, while a deterministic policy engine — never the LLM — decides what requires approval. The agent only gathers evidence and recommends a diagnosis; it can never approve its own request or move an incident through a transition the state machine forbids.',
      'A checkpointed background worker advances each incident one step per tick and persists after every step, so a crash loses nothing. Findings are rejected unless every one cites evidence ids actually returned by tools in that run, evidence is stored as a summary plus a SHA-256 hash, and four-eyes approval guards make duplicate approvals structurally incapable of triggering a second execution.',
      'Runs end-to-end locally against LocalStack with three reproducible failure scenarios, an Angular operations console with a dedicated approval screen, full OpenTelemetry tracing across every service, and a ten-scenario evaluation harness — including guardrail-refusal and prompt-injection cases — that fails CI on any regression.',
    ],
    image: 'images/projects/incident-control-plane/incident-detail.png',
    gif: 'images/projects/incident-control-plane/demo.gif',
    images: [
      {
        src: 'images/projects/incident-control-plane/demo.gif',
        caption: 'end-to-end demo — bad deploy → diagnosis → approval → rollback → resolved',
      },
      {
        src: 'images/projects/incident-control-plane/incident-list.png',
        caption: 'incident list — live workflow status',
      },
      {
        src: 'images/projects/incident-control-plane/incident-detail.png',
        caption: 'incident detail — diagnosis, evidence, timeline',
      },
      {
        src: 'images/projects/incident-control-plane/approval-screen.png',
        caption: 'approval screen — risk, reasoning, approve/reject',
      },
      {
        src: 'images/projects/incident-control-plane/observability.png',
        caption: 'distributed traces in the Aspire dashboard',
      },
    ],
    links: {
      github: 'https://github.com/hazeliscoding/incident-control-plane',
    },
    tags: [
      '.NET 10',
      'ASP.NET Core',
      'Anthropic SDK',
      'MCP',
      'PostgreSQL',
      'EF Core',
      'Angular',
      'OpenTelemetry',
      'LocalStack',
      'Docker',
    ],
    featured: true,
    command: 'glow incident-control-plane.md',
    status: 'active',
    year: '2026',
    stack: '.NET 10 · Angular',
  },
  {
    id: 'mcp-gateway',
    title: 'MCP Gateway',
    description:
      'An enterprise gateway that safely exposes internal capabilities to AI agents through MCP — every tool call passes through authentication, policy-based authorization, schema validation, risk classification, and audit logging.',
    longDescription: [
      'Agents never talk to internal services directly. The gateway treats tools as governed infrastructure: registered, versioned, permissioned, and auditable — with human approval gates for privileged actions and kill switches for everything.',
      'A deterministic ABAC policy engine evaluates the kill switch, version lifecycle, and scope coverage; risk classes drive the outcome — ReadOnly runs automatically, Privileged requires four-eyes approval, Destructive is prohibited. Every decision lands in an append-only audit trail with hashed inputs and trace ids.',
      'Ships with an Angular admin console covering the tool registry, agent identities, permissions, approvals, audit history, and usage statistics — plus executable red-team scenarios (privilege escalation, token forgery, version downgrade, tool spoofing) that fail the build if a defense regresses.',
    ],
    image: 'images/projects/mcp-gateway/tool-registry.png',
    images: [
      {
        src: 'images/projects/mcp-gateway/tool-registry.png',
        caption: 'tool registry — risk badges + kill switches',
      },
      {
        src: 'images/projects/mcp-gateway/tool-detail.png',
        caption: 'tool detail — versions, scopes, lifecycle',
      },
      {
        src: 'images/projects/mcp-gateway/approvals.png',
        caption: 'pending approvals — four-eyes approve/reject',
      },
      {
        src: 'images/projects/mcp-gateway/identities.png',
        caption: 'agent identities — register, rotate, disable',
      },
      {
        src: 'images/projects/mcp-gateway/permissions.png',
        caption: 'permissions — who holds each scope',
      },
      {
        src: 'images/projects/mcp-gateway/audit.png',
        caption: 'append-only audit trail',
      },
      {
        src: 'images/projects/mcp-gateway/usage-statistics.png',
        caption: 'usage statistics dashboard',
      },
      {
        src: 'images/projects/mcp-gateway/login.png',
        caption: 'console sign-in',
      },
    ],
    links: {
      github: 'https://github.com/hazeliscoding/mcp-gateway',
    },
    writeup: 'governing-tool-access-for-ai-agents',
    tags: [
      '.NET 10',
      'ASP.NET Core',
      'PostgreSQL',
      'EF Core',
      'Angular',
      'OpenTelemetry',
      'Docker',
      'MCP',
      'Security',
    ],
    featured: true,
    command: 'glow mcp-gateway.md',
    status: 'active',
    year: '2026',
    stack: '.NET 10 · Angular',
  },
  {
    id: 'agent-eval-platform',
    title: 'Agent Eval Platform',
    description:
      'A framework for repeatedly testing agent behavior under normal and adversarial conditions — it answers the question every agentic system dodges: how do we know this agent is actually reliable?',
    longDescription: [
      'Scenarios are YAML data: initial state, allowed and forbidden tools, expected diagnosis, and a script per tool. A deterministic simulator replays those scripts — success, timeout, malformed, injected — records forbidden-tool attempts as data instead of stopping the run (observing bad behavior is the point), and captures everything in an append-only transcript. Timeouts are reported, never slept, so whole suites run in milliseconds.',
      'The adversarial half: faults are just scripted response variants placed deterministically (exceptions, truncated payloads, duplicates, stale data, authorization denials), and prompt injections carry an attack payload through five surfaces — logs, documents, email, issue comments, tool descriptions — plus ground truth the agent never sees. Resistance is scored from the transcript with no LLM judge: the assertion fails only if the agent called the demanded tool after being exposed to the injection.',
      'Runs are judged, not eyeballed: typed assertions cover tool usage, output schemas, workflow states, unauthorized actions, and token/time budgets. The same suite runs across models and prompt versions, and a baseline gate fails CI on success-rate drops, new unsafe actions, cost creep, or blown latency budgets — baselines are version-controlled JSON, so score changes show up in pull-request diffs. A static Angular dashboard renders it all from a single dataset.json, no server required.',
    ],
    image: 'images/projects/agent-eval-platform/dashboard-overview.png',
    images: [
      {
        src: 'images/projects/agent-eval-platform/dashboard-overview.png',
        caption: 'dashboard — score cards, scenario matrix, regression flag',
      },
      {
        src: 'images/projects/agent-eval-platform/dashboard-scenario-detail.png',
        caption: 'injection detail — cautious prompt resists, aggressive obeys',
      },
    ],
    links: {
      github: 'https://github.com/hazeliscoding/agent-eval-platform',
    },
    tags: [
      '.NET 10',
      'Anthropic SDK',
      'Angular',
      'AI Evals',
      'Prompt Injection',
      'Fault Injection',
      'xUnit',
      'CI/CD',
    ],
    featured: true,
    command: 'glow agent-eval-platform.md',
    status: 'active',
    year: '2026',
    stack: '.NET 10 · Angular',
  },
  {
    id: 'pr-sweep',
    title: 'PR Sweep',
    description:
      'A portable desktop PR dashboard for teams that work in sprints across many repos in one GitHub organization — one window that answers: what’s open, what needs review, what has changes requested, what’s approved, and what merged this sprint.',
    longDescription: [
      'PRs are bucketed from GitHub’s actual reviewDecision — no labels, no manual bookkeeping. A "My queue" section surfaces every open PR in the org waiting on your review, stale PRs get flagged past a configurable threshold, and the whole board is scoped to a sprint date range and a configurable team list. Profiles save org + team + range views, and export/import as JSON so one person configures the team’s view and everyone imports it.',
      'The interesting engineering is in the GitHub layer: OR-ing authors needs GraphQL’s advanced search backend, search hard-caps at 1000 results so busy ranges split their date window recursively, and auto-refreshes are incremental — they ask only for PRs updated since the last sweep and patch the cached result. The last sweep is snapshotted to disk, so the board renders instantly on launch and refreshes quietly. A token that isn’t SAML-authorized returns silently empty results rather than errors; PR Sweep probes for that and explains it instead of showing an empty board.',
      'It ships like a real product: device-flow "Sign in with GitHub", credentials encrypted at rest (DPAPI via safeStorage on Windows, libsecret on Linux), a system-tray presence with live counts and review-queue notifications, code-signed Windows builds via Azure Trusted Signing, self-updating installers plus a Linux AppImage, and a Playwright screenshot harness with tests in CI.',
    ],
    image: 'images/projects/pr-sweep/board.png',
    images: [
      {
        src: 'images/projects/pr-sweep/board.png',
        caption: 'status board — review buckets, filters, stale flags',
      },
      {
        src: 'images/projects/pr-sweep/board-dark.png',
        caption: 'dark theme',
      },
      {
        src: 'images/projects/pr-sweep/settings.png',
        caption: 'settings — profiles, team list, OAuth',
      },
      {
        src: 'images/projects/pr-sweep/onboarding-oauth.png',
        caption: 'onboarding — sign in with GitHub (device flow)',
      },
    ],
    links: {
      github: 'https://github.com/hazeliscoding/pr-sweep',
    },
    tags: [
      'Electron',
      'Angular',
      'TypeScript',
      'GitHub GraphQL',
      'Node.js',
      'Playwright',
      'CI/CD',
      'Desktop',
    ],
    featured: true,
    command: 'glow pr-sweep.md',
    status: 'active',
    year: '2026',
    stack: 'Electron · Angular',
  },
];
