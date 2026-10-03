// SkilBridge In-Browser Mock Backend & State Store
// Enables full functionality on Vercel / static hosting without needing a separate backend server.

export interface MockSkill {
  id: string;
  name: string;
  category: string;
}

export interface MockAssessment {
  id: string;
  title: string;
  skill: string;
  difficulty: string;
  timeLimitMinutes: number;
  passingScore: number;
  description: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

const DEFAULT_SKILLS: MockSkill[] = [
  { id: 'sk-1', name: 'React', category: 'Frontend' },
  { id: 'sk-2', name: 'TypeScript', category: 'Frontend' },
  { id: 'sk-3', name: 'Node.js', category: 'Backend' },
  { id: 'sk-4', name: 'PostgreSQL', category: 'Database' },
  { id: 'sk-5', name: 'Cloud & AWS', category: 'Cloud & DevOps' },
  { id: 'sk-6', name: 'System Design', category: 'Architecture' },
  { id: 'sk-7', name: 'REST APIs', category: 'Backend' },
  { id: 'sk-8', name: 'Docker & CI/CD', category: 'Cloud & DevOps' },
];

const DEFAULT_ASSESSMENTS: MockAssessment[] = [
  {
    id: 'as-1',
    title: 'Modern React Architecture & State Management',
    skill: 'React',
    difficulty: 'Intermediate',
    timeLimitMinutes: 20,
    passingScore: 70,
    description: 'Practical scenario assessment evaluating React 18/19 features, custom hooks, memory leak prevention, and state optimization.',
    questions: [
      {
        id: 'q1',
        question: 'In React 18+, which hook is specifically designed to defer updating a non-urgent part of the UI to keep input responsive?',
        options: ['useDeferredValue', 'useCallback', 'useMemo', 'useLayoutEffect'],
        correctIndex: 0,
        explanation: 'useDeferredValue accepts a value and returns a new copy that defers updating to keep user interactions snappy.',
      },
      {
        id: 'q2',
        question: 'Consider: `useEffect(() => { const sub = api.subscribe(); return () => sub.unsubscribe(); }, [])`. What is the purpose of the returned function?',
        options: [
          'It handles initial component mounting errors',
          'It is the cleanup function that prevents memory leaks when the component unmounts',
          'It triggers a re-render when dependencies change',
          'It caches the subscription result in the browser session',
        ],
        correctIndex: 1,
        explanation: 'The returned function in useEffect serves as the cleanup phase, cancelling subscriptions on unmount.',
      },
      {
        id: 'q3',
        question: 'When should you choose `useReducer` over `useState` in a React application?',
        options: [
          'Only when you need asynchronous operations inside components',
          'When the state logic is complex, involves multiple sub-values, or next state depends on previous state',
          'Whenever you want to completely avoid component re-renders',
          'When you are fetching data from an external REST API only',
        ],
        correctIndex: 1,
        explanation: 'useReducer is preferred for managing complex state transitions and maintaining clean predictable actions across multi-step flows.',
      },
      {
        id: 'q4',
        question: 'What is the primary advantage of React Server Components (RSC) compared to traditional client-side rendering?',
        options: [
          'They eliminate the need for any CSS styling',
          'They execute on the server, zeroing out client bundle size for those components and reducing waterfall requests',
          'They disable browser security headers automatically',
          'They convert all state into LocalStorage automatically',
        ],
        correctIndex: 1,
        explanation: 'RSC allows components to execute on the server without shipping extra JavaScript to the client bundle.',
      },
    ],
  },
  {
    id: 'as-2',
    title: 'Node.js REST API & Architecture Challenge',
    skill: 'Node.js',
    difficulty: 'Intermediate',
    timeLimitMinutes: 20,
    passingScore: 70,
    description: 'Evaluates asynchronous patterns, Express middleware chaining, error propagation, and JWT authentication security.',
    questions: [
      {
        id: 'q1',
        question: 'In Express.js, what is the mandatory signature for an error-handling middleware?',
        options: ['(req, res, next)', '(err, req, res, next)', '(err, req, res)', '(req, res, err)'],
        correctIndex: 1,
        explanation: 'Express recognizes error middleware specifically when it accepts exactly four arguments: (err, req, res, next).',
      },
      {
        id: 'q2',
        question: 'Which method should be used to protect JWT authentication cookies against Cross-Site Scripting (XSS)?',
        options: [
          'Storing tokens in localStorage',
          'Setting the cookie with HttpOnly and SameSite=Strict flags',
          'Encoding the token in Base64',
          'Sending the token in the URL query string',
        ],
        correctIndex: 1,
        explanation: 'HttpOnly prevents JavaScript from reading cookies, effectively mitigating token theft via XSS vulnerabilities.',
      },
      {
        id: 'q3',
        question: 'In Node.js event loop architecture, in which phase are `process.nextTick()` callbacks processed?',
        options: [
          'After the poll phase completes',
          'Immediately after the current operation finishes, before the event loop advances to the next phase',
          'During the timers phase along with setTimeout',
          'Only during idle CPU cycles',
        ],
        correctIndex: 1,
        explanation: 'process.nextTick queue is processed immediately after the current operation finishes, prioritized over regular microtasks.',
      },
      {
        id: 'q4',
        question: 'How should CPU-intensive computation (e.g. cryptographic hashing) be handled in a high-traffic Node.js service?',
        options: [
          'Execute it synchronously in the main Express request handler',
          'Offload to Worker Threads, child processes, or external worker queues to avoid blocking the single-threaded event loop',
          'Wrap it inside Promise.resolve() to make it run in parallel on CPU cores',
          'Increase the process memory limit via --max-old-space-size',
        ],
        correctIndex: 1,
        explanation: 'Heavy CPU operations block the event loop. Offloading to worker threads or background tasks ensures responsive request handling.',
      },
    ],
  },
  {
    id: 'as-3',
    title: 'TypeScript for Enterprise Frontends',
    skill: 'TypeScript',
    difficulty: 'Intermediate',
    timeLimitMinutes: 15,
    passingScore: 70,
    description: 'Tests strict type systems, generics, utility types (Pick, Omit, Partial), union discriminants, and narrowing.',
    questions: [
      {
        id: 'q1',
        question: 'Which TypeScript utility type creates a type with all properties of Type set to optional?',
        options: ['Required<T>', 'Partial<T>', 'Omit<T, K>', 'Record<K, T>'],
        correctIndex: 1,
        explanation: 'Partial<T> marks all properties of type T as optional.',
      },
      {
        id: 'q2',
        question: 'What is a Discriminated Union pattern in TypeScript and why is it useful?',
        options: [
          'A union type with an explicitly shared literal property that enables exhaustive type narrowing with switch/case',
          'A way to merge two class definitions dynamically',
          'A syntax for importing multiple modules at once',
          'A runtime compiler check that strips private methods',
        ],
        correctIndex: 0,
        explanation: 'A common property with literal types acts as the discriminant tag, allowing TypeScript to narrow the union with complete type safety.',
      },
      {
        id: 'q3',
        question: 'What is the key difference between `unknown` and `any` in TypeScript?',
        options: [
          'They are completely identical and interchangeable',
          'unknown is type-safe; you cannot perform arbitrary operations on it without type narrowing or assertions',
          'any requires type casting before usage, whereas unknown does not',
          'unknown can only represent null or undefined',
        ],
        correctIndex: 1,
        explanation: 'unknown enforces type safety by requiring verification or narrowing before you can invoke methods or access properties.',
      },
    ],
  },
  {
    id: 'as-4',
    title: 'PostgreSQL Query Optimization & Data Modeling',
    skill: 'PostgreSQL',
    difficulty: 'Intermediate',
    timeLimitMinutes: 20,
    passingScore: 70,
    description: 'Assesses relational schema design, indexes (B-tree, GIN), EXPLAIN ANALYZE query plans, and transactions.',
    questions: [
      {
        id: 'q1',
        question: 'What does `EXPLAIN ANALYZE` do in PostgreSQL that regular `EXPLAIN` does not?',
        options: [
          'It automatically rewrites the query for optimal performance',
          'It actually executes the SQL query, showing actual run times and memory statistics alongside planner estimates',
          'It generates index recommendations',
          'It formats the query into JSON format only',
        ],
        correctIndex: 1,
        explanation: 'EXPLAIN ANALYZE runs the query to capture actual execution time, rows returned, and buffer hit metrics.',
      },
      {
        id: 'q2',
        question: 'Which index type is best suited for searching JSONB columns or full-text arrays in PostgreSQL?',
        options: ['B-Tree', 'GIN (Generalized Inverted Index)', 'BRIN', 'Hash Index'],
        correctIndex: 1,
        explanation: 'GIN indexes excel at indexing composite items such as JSONB keys, array elements, and full-text documents.',
      },
    ],
  },
  {
    id: 'as-5',
    title: 'Distributed System Design & Scalability',
    skill: 'System Design',
    difficulty: 'Advanced',
    timeLimitMinutes: 25,
    passingScore: 75,
    description: 'High-level architectural scenarios covering caching layers, message queues, database sharding, and resilience.',
    questions: [
      {
        id: 'q1',
        question: 'In a write-heavy distributed notification system, which pattern prevents overwhelming downstream push notification providers?',
        options: [
          'Synchronous HTTP calls on every user trigger',
          'Decoupled message queue (e.g. RabbitMQ/Kafka) with rate-limited consumer workers and dead letter queues',
          'In-memory JavaScript arrays on each web server instance',
          'Direct client-to-client peer polling',
        ],
        correctIndex: 1,
        explanation: 'Message queues buffer sudden spikes, allow backpressure management, and provide reliable retry policies.',
      },
      {
        id: 'q2',
        question: 'What is the purpose of a Circuit Breaker pattern in microservice architectures?',
        options: [
          'To cut off power to physical server racks during overheating',
          'To detect service failures and prevent cascading failure by failing fast without overloading a degraded dependency',
          'To automatically encrypt all network packets in transit',
          'To compress HTTP responses',
        ],
        correctIndex: 1,
        explanation: 'A circuit breaker trips when failure thresholds are crossed, giving downstream systems time to recover while serving fallbacks.',
      },
    ],
  },
];

export interface MockCandidateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  targetRole: string;
  careerBreakYears: number;
  bio: string;
  profilePhoto: string;
  pipelineStage: number; // 1 to 8
  readinessScore: number;
  careerHistories: Array<{
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  candidateSkills: Array<{
    id: string;
    name: string;
    category: string;
    yearsExperience: number;
    status: 'VERIFIED' | 'ASSESSED' | 'NEEDS_REFRESH';
    selfRating: number;
  }>;
  evidences: Array<{
    id: string;
    skill: string;
    evidenceType: string;
    description: string;
    score: number;
    status: 'VERIFIED' | 'PENDING';
    verificationUrl?: string;
  }>;
  submissions: Array<{
    id: string;
    assessmentId: string;
    assessmentTitle: string;
    skill: string;
    score: number;
    passed: boolean;
    submittedAt: string;
  }>;
}

const DEFAULT_CANDIDATE_PROFILE: MockCandidateProfile = {
  id: 'cand-priya-01',
  name: 'Priya Sharma',
  email: 'candidate@skilbridge.com',
  phone: '+91 98765 43210',
  location: 'Bangalore, India (Open to Remote / Hybrid)',
  targetRole: 'Senior Full Stack Engineer',
  careerBreakYears: 3.5,
  bio: 'Full-stack software engineer with 6 years of solid industry experience prior to a 3.5-year career break for family caregiving. Re-energized and refreshed in modern React 19, TypeScript, microservices, and system design. Proven through verified practical assessments and real-world evidence projects.',
  profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  pipelineStage: 6, // Evidence Profile stage
  readinessScore: 88,
  careerHistories: [
    {
      id: 'ch-1',
      company: 'Infosys Ltd',
      role: 'Senior Software Engineer',
      startDate: 'Jan 2017',
      endDate: 'Jun 2021',
      description: 'Architected scalable customer portal modules using React and Node.js. Led an agile sub-team of 5 engineers, improving API response times by 35% and establishing automated test coverage.',
    },
    {
      id: 'ch-2',
      company: 'TechTree Labs',
      role: 'Full Stack Web Developer',
      startDate: 'Jul 2015',
      endDate: 'Dec 2016',
      description: 'Built customer dashboards and high-volume billing integrations with React, Express, and PostgreSQL. Reduced query latency by 40% through index optimization.',
    },
  ],
  candidateSkills: [
    { id: 'cs-1', name: 'React', category: 'Frontend', yearsExperience: 5.5, status: 'VERIFIED', selfRating: 5 },
    { id: 'cs-2', name: 'TypeScript', category: 'Frontend', yearsExperience: 4.0, status: 'VERIFIED', selfRating: 4 },
    { id: 'cs-3', name: 'Node.js', category: 'Backend', yearsExperience: 5.0, status: 'VERIFIED', selfRating: 4 },
    { id: 'cs-4', name: 'PostgreSQL', category: 'Database', yearsExperience: 4.5, status: 'ASSESSED', selfRating: 4 },
    { id: 'cs-5', name: 'Cloud & AWS', category: 'Cloud & DevOps', yearsExperience: 2.5, status: 'NEEDS_REFRESH', selfRating: 3 },
    { id: 'cs-6', name: 'System Design', category: 'Architecture', yearsExperience: 4.0, status: 'ASSESSED', selfRating: 4 },
    { id: 'cs-7', name: 'REST APIs', category: 'Backend', yearsExperience: 6.0, status: 'VERIFIED', selfRating: 5 },
    { id: 'cs-8', name: 'Docker & CI/CD', category: 'Cloud & DevOps', yearsExperience: 2.0, status: 'NEEDS_REFRESH', selfRating: 3 },
  ],
  evidences: [
    {
      id: 'ev-1',
      skill: 'React',
      evidenceType: 'ASSESSMENT_VERIFIED',
      description: 'Completed SkilBridge React 19 Architecture & State Management practical assessment with top tier score.',
      score: 94,
      status: 'VERIFIED',
      verificationUrl: 'https://skilbridge.verify/eval/react-priya-94',
    },
    {
      id: 'ev-2',
      skill: 'TypeScript',
      evidenceType: 'GITHUB_PROJECT',
      description: 'Engineered a modern open-source SaaS Kanban with strict TypeScript, React Query, and Tailwind. 100% type safety.',
      score: 92,
      status: 'VERIFIED',
      verificationUrl: 'https://github.com/skilbridge-demo/react-typescript-kanban-saas',
    },
    {
      id: 'ev-3',
      skill: 'Node.js',
      evidenceType: 'ASSESSMENT_VERIFIED',
      description: 'Completed Node.js REST API & Microservice Performance challenge, demonstrating error handling, JWT auth, and concurrency.',
      score: 88,
      status: 'VERIFIED',
      verificationUrl: 'https://skilbridge.verify/eval/node-priya-88',
    },
    {
      id: 'ev-4',
      skill: 'PostgreSQL',
      evidenceType: 'PORTFOLIO_CASE_STUDY',
      description: 'Comprehensive database redesign case study with connection pooling, index optimization, and transaction handling.',
      score: 86,
      status: 'VERIFIED',
      verificationUrl: 'https://github.com/skilbridge-demo/postgres-query-tuning-case-study',
    },
  ],
  submissions: [
    {
      id: 'sub-1',
      assessmentId: 'as-1',
      assessmentTitle: 'Modern React Architecture & State Management',
      skill: 'React',
      score: 94,
      passed: true,
      submittedAt: '2026-09-28T10:30:00Z',
    },
    {
      id: 'sub-2',
      assessmentId: 'as-2',
      assessmentTitle: 'Node.js REST API & Architecture Challenge',
      skill: 'Node.js',
      score: 88,
      passed: true,
      submittedAt: '2026-10-01T15:45:00Z',
    },
  ],
};

const DEFAULT_EMPLOYER_PROFILE = {
  id: 'emp-techcorp-01',
  companyName: 'TechCorp Solutions',
  industry: 'Enterprise Cloud & FinTech',
  location: 'Bangalore / Hybrid & Remote',
  companyDescription: 'Leading digital transformation firm passionate about skills-first hiring and dedicated returnships. We evaluate professionals based on current verified capability rather than career gap duration.',
  website: 'https://techcorp.example.com',
  name: 'Arun Mehta',
  email: 'employer@techcorp.com',
};

const DEFAULT_JOBS = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer (Return-to-Work Program)',
    company: 'TechCorp Solutions',
    description: 'We are seeking an experienced Frontend Engineer re-entering the workforce. Build customer-facing web apps with modern React, TypeScript, and Tailwind CSS. We offer flexible onboarding and structured mentorship.',
    location: 'Bangalore (Hybrid / Remote)',
    experienceRequired: '4+ years prior experience',
    status: 'OPEN',
    salaryRange: '₹22,00,000 - ₹30,00,000 / $85k - $110k',
    workMode: 'Hybrid',
    requiredSkills: ['React', 'TypeScript', 'REST APIs'],
    preferredSkills: ['System Design'],
    postedAt: '2 days ago',
  },
  {
    id: 'job-2',
    title: 'Full Stack Cloud Developer',
    company: 'TechCorp Solutions',
    description: 'Join our Cloud Services team to architect reliable microservices and responsive dashboards. Great opportunity for returning engineers with solid Node.js and database foundations.',
    location: 'Remote (Pan India)',
    experienceRequired: '3-6 years prior experience',
    status: 'OPEN',
    salaryRange: '₹20,00,000 - ₹28,00,000 / $80k - $105k',
    workMode: 'Remote',
    requiredSkills: ['Node.js', 'PostgreSQL', 'TypeScript'],
    preferredSkills: ['Cloud & AWS'],
    postedAt: '1 week ago',
  },
  {
    id: 'job-3',
    title: 'Technical Lead - Platform Architecture',
    company: 'TechCorp Solutions',
    description: 'Lead engineering decisions and architecture for our enterprise products. Ideal for senior returners with deep past technical depth and passion for mentoring.',
    location: 'Bangalore (On-site / Flexible)',
    experienceRequired: '6+ years prior experience',
    status: 'OPEN',
    salaryRange: '₹32,00,000 - ₹45,00,000 / $120k - $150k',
    workMode: 'Hybrid',
    requiredSkills: ['System Design', 'React', 'Node.js'],
    preferredSkills: ['Docker & CI/CD'],
    postedAt: '3 days ago',
  },
  {
    id: 'job-4',
    title: 'Senior Full Stack Engineer (Returnship)',
    company: 'Apex Digital Global',
    description: 'Flexible 6-month returnship transitioning directly into a full-time senior role. Dedicated mentorship and pair programming included.',
    location: 'Pune / Remote',
    experienceRequired: '5+ years prior experience',
    status: 'OPEN',
    salaryRange: '₹24,00,000 - ₹32,00,000',
    workMode: 'Remote',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL'],
    preferredSkills: ['TypeScript', 'Cloud & AWS'],
    postedAt: 'Just now',
  },
];

const DEFAULT_TALENT_POOL = [
  {
    id: 'cand-priya-01',
    name: 'Priya Sharma',
    targetRole: 'Senior Full Stack Engineer',
    careerBreakYears: 3.5,
    location: 'Bangalore, India (Hybrid / Remote)',
    readinessScore: 88,
    profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: 'Full-stack software engineer with 6 years experience prior to 3.5y family care break. Re-skilled in modern React, TypeScript, and microservices.',
    verifiedSkills: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    status: 'SHORTLISTED',
    notes: 'Demonstrated strong assessment scores in React (94%) and Node.js (88%). Shortlisted for interview.',
  },
  {
    id: 'cand-rahul-02',
    name: 'Rahul Verma',
    targetRole: 'Backend & Data Engineer',
    careerBreakYears: 4.0,
    location: 'Pune / Remote',
    readinessScore: 92,
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Backend specialist with 7 years prior distributed systems experience before taking a 4-year break. Refreshed in modern Node.js and SQL.',
    verifiedSkills: ['Node.js', 'PostgreSQL', 'REST APIs'],
    status: 'NEW',
    notes: 'Passed Node.js Enterprise Microservices Assessment with distinction (91%).',
  },
  {
    id: 'cand-ananya-03',
    name: 'Ananya Sen',
    targetRole: 'Lead Frontend Developer',
    careerBreakYears: 2.0,
    location: 'Hyderabad, India (Hybrid)',
    readinessScore: 94,
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Former Frontend Lead with 5 years experience returning after a 2-year maternity hiatus. Extensive React and component design system mastery.',
    verifiedSkills: ['React', 'TypeScript', 'System Design'],
    status: 'INTERVIEWING',
    notes: 'React Modern Hooks & State Management verified test (96%).',
  },
];

class MockStore {
  private candidate: MockCandidateProfile;
  private employer: any;
  private jobs: any[];
  private talentPool: any[];
  private assessments: MockAssessment[];
  private skills: MockSkill[];

  constructor() {
    this.candidate = this.loadFromStorage('skilbridge_candidate', DEFAULT_CANDIDATE_PROFILE);
    this.employer = this.loadFromStorage('skilbridge_employer', DEFAULT_EMPLOYER_PROFILE);
    this.jobs = this.loadFromStorage('skilbridge_jobs', DEFAULT_JOBS);
    this.talentPool = this.loadFromStorage('skilbridge_talent_pool', DEFAULT_TALENT_POOL);
    this.assessments = DEFAULT_ASSESSMENTS;
    this.skills = DEFAULT_SKILLS;
  }

  private loadFromStorage<T>(key: string, defaultValue: T): T {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return defaultValue;
  }

  private saveToStorage(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore
    }
  }

  // Auth Candidate
  loginCandidate(email: string) {
    const user = {
      id: this.candidate.id,
      name: this.candidate.name,
      email: email || this.candidate.email,
      role: 'CANDIDATE' as const,
      profile: this.candidate,
    };
    const token = 'mock-jwt-candidate-' + Date.now();
    return { token, user };
  }

  // Auth Employer
  loginEmployer(email: string) {
    const user = {
      id: this.employer.id,
      name: this.employer.name,
      email: email || this.employer.email,
      role: 'EMPLOYER' as const,
      profile: this.employer,
    };
    const token = 'mock-jwt-employer-' + Date.now();
    return { token, user };
  }

  // Register Candidate
  registerCandidate(data: any) {
    this.candidate.name = data.name || this.candidate.name;
    this.candidate.email = data.email || this.candidate.email;
    if (data.targetRole) this.candidate.targetRole = data.targetRole;
    if (data.careerBreakYears) this.candidate.careerBreakYears = Number(data.careerBreakYears);
    this.saveToStorage('skilbridge_candidate', this.candidate);
    return this.loginCandidate(data.email);
  }

  // Register Employer
  registerEmployer(data: any) {
    this.employer.name = data.name || this.employer.name;
    this.employer.companyName = data.companyName || this.employer.companyName;
    this.employer.email = data.email || this.employer.email;
    this.saveToStorage('skilbridge_employer', this.employer);
    return this.loginEmployer(data.email);
  }

  // Get Candidate Profile
  getCandidateProfile() {
    return {
      profile: this.candidate,
    };
  }

  // Update Target Role / Profile
  updateCandidateProfile(data: any) {
    if (data.targetRole) this.candidate.targetRole = data.targetRole;
    if (data.bio) this.candidate.bio = data.bio;
    if (data.careerBreakYears) this.candidate.careerBreakYears = Number(data.careerBreakYears);
    this.saveToStorage('skilbridge_candidate', this.candidate);
    return { profile: this.candidate };
  }

  // Add Career History
  addCareerHistory(data: any) {
    const newEntry = {
      id: 'ch-' + Date.now(),
      company: data.company,
      role: data.role,
      startDate: data.startDate,
      endDate: data.endDate || 'Present',
      description: data.description,
    };
    this.candidate.careerHistories.unshift(newEntry);
    this.saveToStorage('skilbridge_candidate', this.candidate);
    return { history: newEntry, profile: this.candidate };
  }

  // Delete Career History
  deleteCareerHistory(id: string) {
    this.candidate.careerHistories = this.candidate.careerHistories.filter(c => c.id !== id);
    this.saveToStorage('skilbridge_candidate', this.candidate);
    return { success: true };
  }

  // Add Evidence
  addEvidence(data: any) {
    const newEvidence = {
      id: 'ev-' + Date.now(),
      skill: data.skill,
      evidenceType: data.evidenceType || 'PORTFOLIO_PROJECT',
      description: data.description,
      score: data.score ? Number(data.score) : 85,
      status: 'VERIFIED' as const,
      verificationUrl: data.verificationUrl || 'https://skilbridge.verify/evidence/' + Date.now(),
    };
    this.candidate.evidences.unshift(newEvidence);
    // Recalculate readiness
    this.candidate.readinessScore = Math.min(98, this.candidate.readinessScore + 3);
    this.saveToStorage('skilbridge_candidate', this.candidate);
    return { evidence: newEvidence, profile: this.candidate };
  }

  // Delete Evidence
  deleteEvidence(id: string) {
    this.candidate.evidences = this.candidate.evidences.filter(e => e.id !== id);
    this.saveToStorage('skilbridge_candidate', this.candidate);
    return { success: true };
  }

  // Add / Update Skill
  addSkill(data: any) {
    const existing = this.candidate.candidateSkills.find(s => s.name.toLowerCase() === data.name.toLowerCase());
    if (existing) {
      existing.yearsExperience = Number(data.yearsExperience || existing.yearsExperience);
      existing.status = 'VERIFIED';
    } else {
      this.candidate.candidateSkills.push({
        id: 'cs-' + Date.now(),
        name: data.name,
        category: data.category || 'General',
        yearsExperience: Number(data.yearsExperience || 2),
        status: 'VERIFIED',
        selfRating: 4,
      });
    }
    this.saveToStorage('skilbridge_candidate', this.candidate);
    return { skills: this.candidate.candidateSkills };
  }

  // Skill Gap Analysis
  getSkillGapAnalysis() {
    const targetRole = this.candidate.targetRole;
    // Map required skills for target role
    const requiredForRole = [
      { name: 'React', requiredLevel: 'Expert', weight: 'High' },
      { name: 'TypeScript', requiredLevel: 'Proficient', weight: 'High' },
      { name: 'Node.js', requiredLevel: 'Proficient', weight: 'High' },
      { name: 'System Design', requiredLevel: 'Intermediate', weight: 'Medium' },
      { name: 'Cloud & AWS', requiredLevel: 'Intermediate', weight: 'Medium' },
      { name: 'Docker & CI/CD', requiredLevel: 'Working Knowledge', weight: 'Low' },
    ];

    const gaps = requiredForRole.map(req => {
      const candidateSkill = this.candidate.candidateSkills.find(s => s.name.toLowerCase() === req.name.toLowerCase());
      const hasEvidence = this.candidate.evidences.some(e => e.skill.toLowerCase() === req.name.toLowerCase());
      return {
        skill: req.name,
        requiredLevel: req.requiredLevel,
        currentStatus: candidateSkill ? candidateSkill.status : 'NEEDS_REFRESH',
        yearsExperience: candidateSkill ? candidateSkill.yearsExperience : 0,
        hasEvidence,
        gapLevel: hasEvidence ? 'VERIFIED_CURRENT' : (candidateSkill ? 'EVIDENCE_GAP' : 'NEEDS_UPSKILLING'),
      };
    });

    return {
      targetRole,
      readinessScore: this.candidate.readinessScore,
      gapCount: gaps.filter(g => g.gapLevel !== 'VERIFIED_CURRENT').length,
      verifiedCount: gaps.filter(g => g.gapLevel === 'VERIFIED_CURRENT').length,
      gaps,
    };
  }

  // Get Assessments
  getAssessments() {
    return {
      assessments: this.assessments.map(a => ({
        id: a.id,
        title: a.title,
        skill: a.skill,
        difficulty: a.difficulty,
        timeLimitMinutes: a.timeLimitMinutes,
        passingScore: a.passingScore,
        description: a.description,
        questionCount: a.questions.length,
        completed: this.candidate.submissions.some(s => s.assessmentId === a.id && s.passed),
      })),
    };
  }

  // Get Assessment Details
  getAssessmentById(id: string) {
    const assessment = this.assessments.find(a => a.id === id);
    if (!assessment) throw new Error('Assessment not found');
    return assessment;
  }

  // Submit Assessment
  submitAssessment(id: string, answers: Record<string, number>) {
    const assessment = this.assessments.find(a => a.id === id);
    if (!assessment) throw new Error('Assessment not found');

    let correctCount = 0;
    assessment.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / assessment.questions.length) * 100);
    const passed = score >= assessment.passingScore;

    const submission = {
      id: 'sub-' + Date.now(),
      assessmentId: assessment.id,
      assessmentTitle: assessment.title,
      skill: assessment.skill,
      score,
      passed,
      submittedAt: new Date().toISOString(),
    };

    this.candidate.submissions.unshift(submission);

    // If passed, add evidence and update skill
    if (passed) {
      const existingEvidence = this.candidate.evidences.find(e => e.skill.toLowerCase() === assessment.skill.toLowerCase());
      if (existingEvidence) {
        existingEvidence.score = Math.max(existingEvidence.score, score);
        existingEvidence.status = 'VERIFIED';
      } else {
        this.candidate.evidences.unshift({
          id: 'ev-' + Date.now(),
          skill: assessment.skill,
          evidenceType: 'ASSESSMENT_VERIFIED',
          description: `Passed SkilBridge ${assessment.title} with score ${score}%.`,
          score,
          status: 'VERIFIED',
          verificationUrl: `https://skilbridge.verify/eval/${assessment.skill.toLowerCase()}-priya-${score}`,
        });
      }

      // Update skill status to VERIFIED
      const candSkill = this.candidate.candidateSkills.find(s => s.name.toLowerCase() === assessment.skill.toLowerCase());
      if (candSkill) {
        candSkill.status = 'VERIFIED';
      }

      // Increase readiness score
      this.candidate.readinessScore = Math.min(98, Math.max(this.candidate.readinessScore, score));
    }

    this.saveToStorage('skilbridge_candidate', this.candidate);

    return {
      submission,
      score,
      passed,
      totalQuestions: assessment.questions.length,
      correctCount,
      feedback: passed
        ? `Congratulations! You scored ${score}%. A verified evidence badge has been added to your dossier.`
        : `You scored ${score}%. Passing threshold is ${assessment.passingScore}%. You can review materials and retry anytime.`,
    };
  }

  // Matched Jobs
  getMatchedJobs() {
    return {
      jobs: this.jobs,
      matchSummary: {
        totalJobs: this.jobs.length,
        strongMatches: 3,
        averageFitPercent: 88,
      },
    };
  }

  // Evidence Profile
  getEvidenceProfile() {
    return {
      candidate: {
        id: this.candidate.id,
        name: this.candidate.name,
        targetRole: this.candidate.targetRole,
        careerBreakYears: this.candidate.careerBreakYears,
        bio: this.candidate.bio,
        location: this.candidate.location,
        readinessScore: this.candidate.readinessScore,
        profilePhoto: this.candidate.profilePhoto,
      },
      verifiedEvidences: this.candidate.evidences,
      verifiedSkills: this.candidate.candidateSkills.filter(s => s.status === 'VERIFIED'),
      careerHistories: this.candidate.careerHistories,
      assessmentSubmissions: this.candidate.submissions,
      shareLink: `https://skilbridge.vercel.app/public/evidence/${this.candidate.id}`,
    };
  }

  // Employer Profile
  getEmployerProfile() {
    return {
      profile: this.employer,
      activeJobsCount: this.jobs.length,
      talentPoolCount: this.talentPool.length,
    };
  }

  // Employer Talent Pool
  getTalentPool(skillFilter?: string, roleFilter?: string) {
    let pool = [...this.talentPool];
    if (skillFilter) {
      pool = pool.filter(c => c.verifiedSkills.some((s: string) => s.toLowerCase().includes(skillFilter.toLowerCase())));
    }
    if (roleFilter) {
      pool = pool.filter(c => c.targetRole.toLowerCase().includes(roleFilter.toLowerCase()));
    }
    return { candidates: pool };
  }

  // Employer Candidate Dossier
  getCandidateDossier(candidateId: string) {
    if (candidateId === this.candidate.id) {
      return this.getEvidenceProfile();
    }
    const found = this.talentPool.find(c => c.id === candidateId);
    if (!found) return this.getEvidenceProfile();

    return {
      candidate: {
        id: found.id,
        name: found.name,
        targetRole: found.targetRole,
        careerBreakYears: found.careerBreakYears,
        bio: found.bio,
        location: found.location,
        readinessScore: found.readinessScore,
        profilePhoto: found.profilePhoto,
      },
      verifiedEvidences: [
        {
          id: 'ev-demo-1',
          skill: found.verifiedSkills[0] || 'Technical Expertise',
          evidenceType: 'ASSESSMENT_VERIFIED',
          description: `Passed SkilBridge verified skill assessment with ${found.readinessScore}%.`,
          score: found.readinessScore,
          status: 'VERIFIED',
          verificationUrl: 'https://skilbridge.verify/eval/' + found.id,
        },
      ],
      verifiedSkills: found.verifiedSkills.map((s: string, idx: number) => ({
        id: 'sk-' + idx,
        name: s,
        category: 'Engineering',
        yearsExperience: 5,
        status: 'VERIFIED',
        selfRating: 5,
      })),
      careerHistories: [
        {
          id: 'ch-demo-1',
          company: 'Top Tech Firm',
          role: found.targetRole,
          startDate: '2016',
          endDate: '2020',
          description: 'Engineered scalable production software with high throughput and test coverage.',
        },
      ],
      assessmentSubmissions: [],
      shareLink: `https://skilbridge.vercel.app/public/evidence/${found.id}`,
    };
  }

  // Employer Update Status
  updateCandidateStatus(candidateId: string, status: string, notes?: string) {
    const candidate = this.talentPool.find(c => c.id === candidateId);
    if (candidate) {
      candidate.status = status;
      if (notes) candidate.notes = notes;
      this.saveToStorage('skilbridge_talent_pool', this.talentPool);
    }
    return { success: true, status };
  }

  // Employer Jobs
  getEmployerJobs() {
    return { jobs: this.jobs };
  }

  createJob(jobData: any) {
    const newJob = {
      id: 'job-' + Date.now(),
      title: jobData.title,
      company: this.employer.companyName,
      description: jobData.description,
      location: jobData.location || 'Remote',
      experienceRequired: jobData.experienceRequired || '3+ years',
      status: 'OPEN',
      salaryRange: jobData.salaryRange || 'Competitive',
      workMode: jobData.workMode || 'Remote',
      requiredSkills: jobData.requiredSkills || ['React', 'TypeScript'],
      preferredSkills: jobData.preferredSkills || [],
      postedAt: 'Just now',
    };
    this.jobs.unshift(newJob);
    this.saveToStorage('skilbridge_jobs', this.jobs);
    return { job: newJob };
  }

  deleteJob(jobId: string) {
    this.jobs = this.jobs.filter(j => j.id !== jobId);
    this.saveToStorage('skilbridge_jobs', this.jobs);
    return { success: true };
  }

  // Public Jobs
  getAllJobs() {
    return { jobs: this.jobs };
  }

  // Public Evidence View
  getPublicEvidence(id: string) {
    return this.getCandidateDossier(id);
  }
}

export const mockStore = new MockStore();
