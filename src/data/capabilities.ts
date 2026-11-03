// ─── UNREAL PorT — CAPABILITIES DATA (PHASE 02.1) ───────────────────────────
// Verified architectural case studies, confirmed hard skills, and self-aware cognitive traits.

export interface ArchitectureLayer {
  layer: string;
  title: string;
  status: 'implemented' | 'partial' | 'conceptual';
  statusLabel: string;
  sourceVerification: string;
  details: string;
  technologies: string[];
  honestBoundary: string;
}

export interface SourceReference {
  repository: 'frontend' | 'backend';
  path: string;
}

export interface EngineeringExample {
  title: string;
  problem: string;
  implementation: string;
  significance: string;
  tradeoff: string;
  sourceReferences: SourceReference[];
  status?: 'verified' | 'partial' | 'conceptual';
  personalNote?: string;
}

export interface EngineeringDecision {
  title: string;
  selected: string;
  alternatives: string;
  tradeoff: string;
  futureIteration: string;
  sourceReferences: SourceReference[];
}

export interface ShabulabCaseStudy {
  problem: string;
  attributionNote: string;
  architectureLayers: VerifiedArchitectureLayer[];
  engineeringExamples: EngineeringExample[];
  decisions: EngineeringDecision[];
  limitations: string[];
  lesson: string;
}

export interface VerifiedArchitectureLayer {
  layer: string;
  title: string;
  status: 'implemented' | 'partial' | 'conceptual';
  statusLabel: string;
  details: string;
  boundary: string;
  sourceReferences: SourceReference[];
}

export interface KeyHighlight {
  id: string;
  claim: string;
  verifiedInSource: string;
}

export interface HardSkill {
  id: 'system-design' | 'reverse-engineering';
  index: string;
  category: string;
  title: string;
  tagline: string;
  focus: string;
  description: string;
  confirmedWork?: {
    name: string;
    role: string;
    context: string;
    frontendRepoUrl: string;
    backendRepoUrl: string;
    keyHighlights: KeyHighlight[];
    honestExclusions: string[];
  };
  principles: {
    label: string;
    detail: string;
  }[];
  architectureLayers?: ArchitectureLayer[];
}

export interface SoftSkill {
  id: string;
  index: string;
  type: 'STRENGTH' | 'TENDENCY';
  title: string;
  vector: string;
  description: string;
  analyticalImpact: string;
  engineeringRisk: string;
  mitigation: string;
}

export const HARD_SKILLS: HardSkill[] = [
  {
    id: 'system-design',
    index: 'CAP.01',
    category: 'PRIMARY TECHNICAL DISCIPLINE',
    title: 'System Design & Architecture',
    tagline: 'Designing for the User, Not for the Systems.',
    focus: 'Component boundaries, explicit interface contracts, and distributed service isolation.',
    description:
      'A deliberate approach to decomposing complex problem spaces into modular, maintainable subsystems. Emphasis on defining rigid boundary conditions, understanding how data cascades through client-server pipelines, and protecting UI ergonomics without accumulating architectural debt.',
    confirmedWork: {
      name: 'ShabulabX',
      role: 'Restaurant operations interface and API',
      context:
        'The linked repositories contain an operator-facing React app and an Express API for catalog and inventory data, with order, user, and analytics areas in the frontend.',
      frontendRepoUrl: 'https://github.com/silasukkasem9/SHABULAB.frontend',
      backendRepoUrl: 'https://github.com/silasukkasem9/SHABULAB.backend',
      keyHighlights: [
        {
          id: 'highlight-decoupled-client',
          claim: 'Decoupled Client Architecture',
          verifiedInSource:
            'React 19 + Vite frontend (SHABULAB.frontend) operates as an isolated single-page application with zero Prisma or database dependencies.',
        },
        {
          id: 'highlight-centralized-contract',
          claim: 'Centralized Contract & Bearer Auth',
          verifiedInSource:
            'src/api/client.js centralizes REST communications, reading shabulab.auth.token and shabulab.auth.restaurantId with structured ApiError classification.',
        },
        {
          id: 'highlight-multitenant-rbac',
          claim: 'Multi-Tenant RBAC Routing',
          verifiedInSource:
            'Backend Express middleware (auth.middleware.js) verifies JWT tokens and enforces requireTenantRole across OWNER, MANAGER, STAFF, and TECHNICIAN roles.',
        },
        {
          id: 'highlight-relational-schema',
          claim: 'Relational Schema Modeling',
          verifiedInSource:
            'Prisma ORM schema (prisma/schema.prisma) models categories, products, inventory movements, audit logs, and machine records with composite foreign keys.',
        },
      ],
      honestExclusions: [
        'Kiosk hardware telemetry is modeled as database status records, not live IoT streaming sockets.',
        'Payment processing and third-party POS integrations are not implemented in the current repositories.',
        'Data honesty rule: development mock data in src/mock/ is strictly isolated and never presented as live telemetry.',
      ],
    },
    principles: [
      {
        label: 'Boundary Integrity',
        detail:
          'Subsystems communicate strictly via published contracts. The frontend never accesses persistence layers or server internals directly.',
      },
      {
        label: 'Data Honesty',
        detail:
          'Development states, mock data, and conceptual roadmaps are explicitly acknowledged. Reality is never disguised with artificial visual statistics.',
      },
      {
        label: 'Operator Ergonomics',
        detail:
          'Software architecture exists to serve human operators. Systems designed for architectural vanity rather than real utility are considered flawed.',
      },
    ],
    architectureLayers: [
      {
        layer: 'L1',
        title: 'Operator Client Surface',
        status: 'implemented',
        statusLabel: 'VERIFIED IMPLEMENTATION',
        sourceVerification: 'SHABULAB.frontend (src/api/client.js, src/features, src/mock)',
        details:
          'React 19 single-page application built with Vite and modular CSS. Dispatches REST requests via a standalone ApiClient adapter with automatic 401 interception.',
        technologies: ['React 19', 'Vite', 'Vitest', 'JavaScript'],
        honestBoundary:
          'Completely decoupled from backend runtime. Consumes JSON API over HTTP; development screens use explicit mock modules in src/mock/.',
      },
      {
        layer: 'L2',
        title: 'Contract Gate & RBAC Middleware',
        status: 'implemented',
        statusLabel: 'VERIFIED IMPLEMENTATION',
        sourceVerification: 'SHABULAB.backend (src/middleware/auth.middleware.js, src/routes)',
        details:
          'Express middleware pipeline enforcing Bearer JWT authentication and tenant role validation (OWNER, MANAGER, STAFF, TECHNICIAN). Scopes queries to tenant IDs.',
        technologies: ['Node.js', 'Express', 'JWT', 'RBAC Guards'],
        honestBoundary:
          'Stateless token inspection and role validation. Handles 401/403/409 error responses; external OAuth and distributed rate-limiting are not in current scope.',
      },
      {
        layer: 'L3',
        title: 'Relational Persistence Engine',
        status: 'implemented',
        statusLabel: 'VERIFIED IMPLEMENTATION',
        sourceVerification: 'SHABULAB.backend (prisma/schema.prisma, src/lib/prisma.js)',
        details:
          'Prisma ORM mapping relational MySQL tables: Category, Product, Inventory, InventoryMovement, AuditLog, Restaurant, and Machine.',
        technologies: ['Prisma ORM', 'MySQL', 'Relational Schemas'],
        honestBoundary:
          'Standard relational database schema with foreign key cascades. Multi-region database replication and sharding are not implemented.',
      },
      {
        layer: 'L4',
        title: 'Machine Telemetry & Kiosk Bus',
        status: 'conceptual',
        statusLabel: 'CONCEPTUAL ROADMAP',
        sourceVerification: 'SHABULAB.backend (src/routes/machine.routes.js database queries)',
        details:
          'Machine records and maintenance histories are stored in MySQL and queried over REST. Continuous physical hardware telemetry streaming is a planned architectural target.',
        technologies: ['REST Query Stub', 'IoT Planned Bus', 'Roadmap Spec'],
        honestBoundary:
          'Physical kiosk serial buses and live sensor telemetry streams are not yet implemented. Database status records represent machine entities without live hardware streaming.',
      },
    ],
  },
  {
    id: 'reverse-engineering',
    index: 'CAP.02',
    category: 'FOUNDATIONAL METHODOLOGY',
    title: 'Basic Reverse Engineering',
    tagline: 'Deconstructing software behavior from external observation.',
    focus: 'Protocol inspection, black-box analysis, and architectural inference.',
    description:
      'Exploration of how existing systems, network protocols, and client runtimes behave when documentation is sparse or absent. Focused on reading execution flow, tracing state transitions, and understanding underlying structures without overstating capabilities.',
    principles: [
      {
        label: 'Behavioral Tracing',
        detail:
          'Inspecting live runtime network payloads, WebSocket events, and DOM mutations to infer internal state machines.',
      },
      {
        label: 'Structural Deduction',
        detail:
          'Reconstructing data models and API schemas purely from observed input-output transformations and HTTP exchanges.',
      },
      {
        label: 'Scope Discipline',
        detail:
          'Strictly confined to ethical exploration, interoperability, and system comprehension — explicitly excluding binary exploitation or vulnerability hunting.',
      },
    ],
  },
];

export const SHABULAB_CASE_STUDY: ShabulabCaseStudy = {
  problem:
    'ShabulabX is an operator-facing restaurant-management app and API. The frontend contains catalog and inventory workflows, plus order, user, and analytics areas. No project brief or usage history was available, so this is a description of the implemented code rather than a claim about deployed impact.',
  attributionNote:
    'The repositories confirm that these implementations exist, but the inspected files do not establish who authored each subsystem. This case study describes the linked code without claiming sole authorship.',
  architectureLayers: [
    {
      layer: 'L1',
      title: 'React operator client',
      status: 'implemented',
      statusLabel: 'VERIFIED IN SOURCE',
      details:
        'A Vite/React application whose product service calls the backend product API through a shared client. Inventory service functions also make API calls, but two inventory URLs do not match the backend routes.',
      boundary:
        'The frontend is a separate repository and does not access Prisma directly. Product read/write paths correspond to the mounted backend product routes; inventory adjustment is an identified mismatch.',
      sourceReferences: [
        { repository: 'frontend', path: 'src/features/inventory/InventoryPage.jsx' },
        { repository: 'frontend', path: 'src/api/client.js' },
        { repository: 'frontend', path: 'src/services/productService.js' },
      ],
    },
    {
      layer: 'L2',
      title: 'Express REST API',
      status: 'implemented',
      statusLabel: 'VERIFIED IN SOURCE',
      details:
        'The Express app mounts product, inventory, authentication, machine, and additional route groups beneath /api. Route middleware applies authentication and tenant context where configured.',
      boundary:
        'Routes define their own role policy; the repository does not establish one uniform permission rule across every endpoint.',
      sourceReferences: [
        { repository: 'backend', path: 'src/app.js' },
        { repository: 'backend', path: 'src/routes/product.routes.js' },
        { repository: 'backend', path: 'src/routes/inventory.routes.js' },
        { repository: 'backend', path: 'src/middleware/auth.middleware.js' },
      ],
    },
    {
      layer: 'L3',
      title: 'Prisma + MySQL persistence',
      status: 'implemented',
      statusLabel: 'VERIFIED IN SOURCE',
      details:
        'The backend initializes Prisma against a MySQL datasource. The schema defines restaurant, membership, product, category, inventory, inventory movement, and machine records, among other models.',
      boundary:
        'The schema and database client establish persistence code; they do not prove a production deployment, operational data, or physical hardware connectivity.',
      sourceReferences: [
        { repository: 'backend', path: 'src/lib/prisma.js' },
        { repository: 'backend', path: 'prisma/schema.prisma' },
        { repository: 'backend', path: 'src/controllers/inventory.controller.js' },
      ],
    },
  ],
  engineeringExamples: [
    {
      title: 'A shared HTTP client with explicit failures',
      problem:
        'Feature services need a consistent place to construct requests and interpret success and failure responses.',
      implementation:
        'The product service calls /products and /products/:id with GET, POST, PUT, and DELETE through the shared client; matching backend product routes are mounted. The client applies the configured API base, attaches request context, parses responses, and classifies HTTP, network, and malformed-JSON failures. Its tests mock fetch to cover these cases.',
      significance:
        'Transport and error parsing are centralized instead of being reimplemented in each feature service.',
      tradeoff:
        'Mocked client tests establish adapter behavior, not compatibility with a running backend or every service contract.',
      sourceReferences: [
        { repository: 'frontend', path: 'src/api/client.js' },
        { repository: 'frontend', path: 'src/api/client.test.js' },
        { repository: 'frontend', path: 'src/services/productService.js' },
      ],
    },
    {
      title: 'Tenant and role checks at route boundaries',
      problem:
        'Requests need to be associated with a restaurant membership and restricted according to route policy.',
      implementation:
        'Authentication middleware verifies the token and tenant context; inventory routes apply their declared ADMIN/STAFF role gate before invoking controller handlers.',
      significance:
        'The access check is placed on the server route rather than relying on the frontend to hide controls.',
      tradeoff:
        'Policies are not uniform across the app: route groups declare differing roles, so each protected path needs to be reviewed on its own.',
      sourceReferences: [
        { repository: 'backend', path: 'src/middleware/auth.middleware.js' },
        { repository: 'backend', path: 'src/routes/inventory.routes.js' },
        { repository: 'frontend', path: 'src/api/client.js' },
      ],
    },
    {
      title: 'Transactional inventory update and movement record',
      problem:
        'Changing the current stock value while omitting the corresponding movement would leave the two persisted views inconsistent.',
      implementation:
        'The controller validates inventory IDs and non-negative integer quantities, returns 404 for missing or out-of-restaurant records, and forwards unexpected errors to centralized JSON error middleware. Valid quantity changes update inventory and insert a movement delta/reason inside a Prisma transaction.',
      significance:
        'Both database writes commit or roll back together when a quantity change is recorded.',
      tradeoff:
        'The frontend calls POST /inventory/:id/adjust and PATCH /inventory/:id/availability, but the inspected backend mounts GET /, GET /:id, and PUT /:id only. This inventory write flow is therefore only partially verified across repositories.',
      sourceReferences: [
        { repository: 'backend', path: 'src/controllers/inventory.controller.js' },
        { repository: 'backend', path: 'src/routes/inventory.routes.js' },
        { repository: 'backend', path: 'src/middleware/error.middleware.js' },
        { repository: 'frontend', path: 'src/services/inventoryService.js' },
        { repository: 'frontend', path: 'src/features/inventory/InventoryPage.jsx' },
      ],
      status: 'partial',
      personalNote:
        'My instinct: align the contract before building a clever adapter around the mismatch. Cleverness is cheaper than debugging only on paper.',
    },
  ],
  decisions: [
    {
      title: 'Centralize frontend request handling',
      selected:
        'Retrospective analysis: feature services use a shared client for request setup and response/error handling.',
      alternatives:
        'The code does not document historical deliberations; implementing fetch separately in each service is the straightforward alternative.',
      tradeoff:
        'Centralization reduces duplicated transport logic but makes the client a shared contract whose assumptions must match all API routes.',
      futureIteration:
        'Add cross-repository contract tests for representative service calls and backend responses.',
      sourceReferences: [
        { repository: 'frontend', path: 'src/api/client.js' },
        { repository: 'frontend', path: 'src/api/client.test.js' },
      ],
    },
    {
      title: 'Write inventory changes and movement history together',
      selected:
        'Retrospective analysis: the backend uses one database transaction for a quantity update and its movement record.',
      alternatives:
        'The source does not record historical alternatives; a simpler approach would update only the current quantity.',
      tradeoff:
        'The transaction keeps those two writes consistent, but the inspected implementation does not establish a complete audit narrative or concurrency strategy.',
      futureIteration:
        'First align the frontend inventory mutation contract with the mounted route, then test validation and transactional behavior against a backend test database.',
      sourceReferences: [
        { repository: 'backend', path: 'src/controllers/inventory.controller.js' },
        { repository: 'backend', path: 'src/routes/inventory.routes.js' },
        { repository: 'frontend', path: 'src/services/inventoryService.js' },
      ],
    },
  ],
  limitations: [
    'No project-specific brief, deployment details, user evidence, or outcome metrics were available. The frontend README is generic Vite template text.',
    'The frontend API-client tests mock fetch; they are not backend or end-to-end tests. The backend package has no test script, and no backend test suite was found in the inspected sources.',
    'The frontend inventory adjustment and availability URLs are not mounted by the backend inventory router.',
    'Machine records and REST status routes exist, but physical device connectivity and live sensor telemetry were not verified.',
    'The shared Product model has no dedicated subtype field for sets or add-ons; the frontend catalog service notes the limitation.',
  ],
  lesson:
    'A clean boundary is only useful while both sides agree on its contract. The shared client and transactional persistence are inspectable foundations; the inventory mismatch shows why cross-repository contract checks and backend tests matter.',
};

export const SOFT_SKILLS: SoftSkill[] = [
  {
    id: 'critical-thinking',
    index: 'THINK.01',
    type: 'STRENGTH',
    title: 'Critical Thinking',
    vector: 'First-Principles Deconstruction',
    description:
      'Evaluating technical challenges by dismantling assumptions rather than adopting pre-packaged consensus. Constantly probing where a solution fails when edge conditions converge.',
    analyticalImpact:
      'Eliminates structural flaws before they crystallize into unmaintainable production code.',
    engineeringRisk:
      'Can slow down initial consensus when team members expect immediate, unquestioned execution.',
    mitigation:
      'Focus critiques on measurable system constraints and deliver concrete alternatives rather than abstract objections.',
  },
  {
    id: 'overthinking',
    index: 'THINK.02',
    type: 'TENDENCY',
    title: 'Overthinking',
    vector: 'Recursive Possibility Mapping',
    description:
      'A self-aware habit of exploring twelve hypothetical branches when the first three already cover 99% of probable usage. Pushing analysis beyond the threshold of diminishing returns.',
    analyticalImpact:
      'Uncovers subtle race conditions and failure states that casual inspection routinely misses.',
    engineeringRisk:
      'Analysis paralysis; postponing working software to debate theoretical contingencies.',
    mitigation:
      'Hard time-boxing on architectural evaluation and adopting iterative "good-enough-to-test" milestones.',
  },
  {
    id: 'overdesigning',
    index: 'THINK.03',
    type: 'TENDENCY',
    title: 'Overdesigning',
    vector: 'Premature Structural Layering',
    description:
      'An instinct to wrap modest components in enterprise-grade abstraction layers, generic factories, and multi-tier state adapters before necessity demands it.',
    analyticalImpact:
      'Produces robust, decoupled modules that thrive when high scalability is actually needed.',
    engineeringRisk:
      'Creates cognitive overhead and indirection where a straightforward 30-line script was enough.',
    mitigation:
      'Strictly applying YAGNI (You Aren\'t Gonna Need It) and enforcing that abstractions are only introduced after three concrete repetitions.',
  },
  {
    id: 'overplanning',
    index: 'THINK.04',
    type: 'TENDENCY',
    title: 'Overplanning',
    vector: 'Complete Blueprint Compulsion',
    description:
      'A deep preference for having the complete schema topology, failure recovery tree, and dependency graph mentally resolved before typing the first line of code.',
    analyticalImpact:
      'Minimizes mid-flight rewrites and prevents architectural dead-ends during development.',
    engineeringRisk:
      'Delays the feedback loop that only live code in a browser can provide.',
    mitigation:
      'Treat plans as living hypotheses; build the thinnest vertical slice first to validate assumptions against reality.',
  },
];

export const PULL_QUOTE =
  'I can find twelve ways to build it. The real challenge is knowing when the first one was enough.';
