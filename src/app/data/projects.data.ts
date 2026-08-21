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
