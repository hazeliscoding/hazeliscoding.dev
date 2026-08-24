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
];
