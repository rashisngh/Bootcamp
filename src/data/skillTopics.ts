export interface SkillTopic {
  level_number: number;
  topic: string;
}

export const SKILL_TOPICS_ROADMAP: Record<string, SkillTopic[]> = {
  "Data Structures & Algorithms": [
    { level_number: 1, topic: "Time & Space Complexity analysis (Big-O, Big-Omega, Big-Theta)" },
    { level_number: 2, topic: "Arrays, Strings manipulation, and Two-Pointer / Sliding Window techniques" },
    { level_number: 3, topic: "Linear structures: Singly & Doubly Linked Lists, Stacks, and Queues" },
    { level_number: 4, topic: "Hashing techniques, HashMaps, HashSets, and collision resolution" },
    { level_number: 5, topic: "Recursion fundamentals, Divide & Conquer, Merge Sort, Quick Sort" },
    { level_number: 6, topic: "Binary Trees, Binary Search Trees (BST), Traversals (BFS, DFS)" },
    { level_number: 7, topic: "Heaps, Priority Queues, Greedy Algorithms, Disjoint Set Union (DSU)" },
    { level_number: 8, topic: "Graph Algorithms: Topological Sort, Dijkstra, Bellman-Ford, MST" },
    { level_number: 9, topic: "Dynamic Programming: 1D/2D memoization, knapsack, LCS, bitmask DP" },
    { level_number: 10, topic: "Advanced structures: Tries, Segment Trees, Fenwick Trees, Flow networks" }
  ],
  "Object-Oriented Programming": [
    { level_number: 1, topic: "Core paradigms: Classes, Objects, State, Behavior, and Constructors" },
    { level_number: 2, topic: "Encapsulation, Data Hiding, Access Modifiers, and Getters/Setters" },
    { level_number: 3, topic: "Inheritance hierarchies, Method Overriding vs Overloading" },
    { level_number: 4, topic: "Polymorphism: Compile-time vs Runtime dispatch, Virtual functions" },
    { level_number: 5, topic: "Abstract Classes, Interfaces, Default methods, and Multiple inheritance" },
    { level_number: 6, topic: "SOLID Design Principles applied in enterprise application code" },
    { level_number: 7, topic: "Creational & Structural Patterns: Factory, Singleton, Adapter, Decorator" },
    { level_number: 8, topic: "Behavioral Patterns: Strategy, Observer, Command, Template Method" },
    { level_number: 9, topic: "Dependency Injection, Inversion of Control, and Decoupled Architecture" },
    { level_number: 10, topic: "Domain-Driven Design (DDD), Aggregates, Entities, and Eventual Consistency" }
  ],
  "SQL & Databases": [
    { level_number: 1, topic: "Relational Concepts: Tables, Rows, Primary Keys, and Foreign Keys" },
    { level_number: 2, topic: "Basic SQL queries: SELECT, WHERE, ORDER BY, GROUP BY, and HAVING" },
    { level_number: 3, topic: "Joins: INNER, LEFT, RIGHT, FULL OUTER, CROSS, and Self-Joins" },
    { level_number: 4, topic: "Aggregation, String/Date functions, and CASE statement conditionals" },
    { level_number: 5, topic: "Subqueries, Correlated Subqueries, and Common Table Expressions (CTEs)" },
    { level_number: 6, topic: "Database Normalization (1NF, 2NF, 3NF, BCNF) and Denormalization trade-offs" },
    { level_number: 7, topic: "Window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)" },
    { level_number: 8, topic: "Indexing strategies: B-Tree vs Hash indexes, Query execution plans" },
    { level_number: 9, topic: "Transactions, ACID properties, Isolation levels, Locks, and Concurrency" },
    { level_number: 10, topic: "Partitioning, Sharding, Replication, and Distributed database consistency" }
  ],
  "Cloud Fundamentals (AWS/Azure)": [
    { level_number: 1, topic: "Cloud Computing models: IaaS, PaaS, SaaS, and Shared Responsibility" },
    { level_number: 2, topic: "Core Compute services: AWS EC2 / Azure Virtual Machines and instances" },
    { level_number: 3, topic: "Cloud Storage solutions: Object (S3/Blob), Block (EBS), and File storage" },
    { level_number: 4, topic: "Virtual Networking basics: VPC/VNet, Subnets, Route Tables, Internet Gateways" },
    { level_number: 5, topic: "Security & Access: AWS IAM / Azure Entra ID, Roles, Policies, MFA" },
    { level_number: 6, topic: "Managed Databases: AWS RDS / Azure SQL, Multi-AZ, Read Replicas" },
    { level_number: 7, topic: "Serverless architectures: AWS Lambda / Azure Functions and API Gateways" },
    { level_number: 8, topic: "Monitoring & Observability: CloudWatch / Azure Monitor, Metrics, Alarms" },
    { level_number: 9, topic: "Infrastructure as Code (Terraform / CloudFormation) and CI/CD pipelines" },
    { level_number: 10, topic: "High Availability, Disaster Recovery, Multi-Region routing, and FinOps" }
  ],
  "Operating Systems": [
    { level_number: 1, topic: "OS Architecture: Kernel vs User mode, System calls, and Dual-mode operation" },
    { level_number: 2, topic: "Process management: Process state lifecycle, PCB, and Context switching" },
    { level_number: 3, topic: "Multithreading models, User vs Kernel threads, Race conditions" },
    { level_number: 4, topic: "CPU Scheduling algorithms: FCFS, SJF, Round Robin, Multi-level queues" },
    { level_number: 5, topic: "Process Synchronization: Critical Section, Mutex locks, Semaphores" },
    { level_number: 6, topic: "Deadlocks: Necessary conditions, Prevention, Avoidance (Banker's Algorithm)" },
    { level_number: 7, topic: "Memory Management: Contiguous allocation, Paging, Page tables, TLB" },
    { level_number: 8, topic: "Virtual Memory: Demand paging, Page replacement algorithms (FIFO, LRU)" },
    { level_number: 9, topic: "File Systems: Inodes, Directory structures, Allocation methods, Disk I/O" },
    { level_number: 10, topic: "Security & Virtualization: Containers, cgroups, Hypervisors, Memory isolation" }
  ],
  "Computer Networks": [
    { level_number: 1, topic: "Network Models: OSI 7-Layer reference model vs TCP/IP stack" },
    { level_number: 2, topic: "Physical & Data Link Layers: Framing, MAC addressing, CSMA/CD, Switches" },
    { level_number: 3, topic: "Network Layer: IPv4/IPv6 addressing, Subnetting, CIDR notation" },
    { level_number: 4, topic: "Routing Protocols: Distance Vector vs Link State (OSPF, BGP, RIP)" },
    { level_number: 5, topic: "Transport Layer: TCP 3-way handshake, UDP, Ports, and Multiplexing" },
    { level_number: 6, topic: "Reliable Transmission: Sliding Window, Flow control, TCP Congestion control" },
    { level_number: 7, topic: "Application Protocols: HTTP/HTTPS, DNS resolution lifecycle, DHCP" },
    { level_number: 8, topic: "Network Security: SSL/TLS handshake, Symmetric/Asymmetric encryption, Firewalls" },
    { level_number: 9, topic: "Web Infrastructure: Proxies, Reverse Proxies, Load Balancers, CDN caching" },
    { level_number: 10, topic: "Advanced Networking: HTTP/2 & HTTP/3 (QUIC), WebSockets, gRPC, VPN tunnels" }
  ],
  "Aptitude & Logical Reasoning": [
    { level_number: 1, topic: "Quantitative Arithmetic: Numbers, Fractions, Percentages, and Decimals" },
    { level_number: 2, topic: "Ratios, Proportions, Mixtures, Alligation, and Partnership arithmetic" },
    { level_number: 3, topic: "Profit, Loss, Discounts, Simple and Compound Interest calculations" },
    { level_number: 4, topic: "Time, Speed, Distance, Relative speed, Trains, and Boats & Streams" },
    { level_number: 5, topic: "Time and Work, Pipes & Cisterns, and Efficiency-based problems" },
    { level_number: 6, topic: "Permutations, Combinations, Probability, and Venn Diagram set theory" },
    { level_number: 7, topic: "Logical Reasoning: Number series, Coding-Decoding, and Blood relations" },
    { level_number: 8, topic: "Seating Arrangements (Linear & Circular), Direction sense, Syllogisms" },
    { level_number: 9, topic: "Data Interpretation: Bar charts, Pie charts, Line graphs, and Tabular data" },
    { level_number: 10, topic: "Critical Reasoning: Statement-Assumptions, Cause-Effect, Course of Action" }
  ],
  "Communication & Behavioral": [
    { level_number: 1, topic: "Professional Introduction: Crafting an impactful 90-second Elevator Pitch" },
    { level_number: 2, topic: "Active listening, Non-verbal cues, and Professional workplace etiquette" },
    { level_number: 3, topic: "Email writing, Structured status reporting, and Meeting communication" },
    { level_number: 4, topic: "STAR Method mastery: Situation, Task, Action, Result framework" },
    { level_number: 5, topic: "Behavioral interviews: Handling conflict, Disagreements, and Feedback" },
    { level_number: 6, topic: "Cross-functional collaboration and Technical-to-Business translation" },
    { level_number: 7, topic: "Public speaking, Presenting technical proposals, and Demoing solutions" },
    { level_number: 8, topic: "Leadership principles, Mentorship, Accountability, and Ownership" },
    { level_number: 9, topic: "High-stakes communication: Crisis management and Client-facing negotiation" },
    { level_number: 10, topic: "Executive presence, Strategic alignment, and Global team influence" }
  ],
  "Web Development Basics": [
    { level_number: 1, topic: "Semantic HTML5 structure, Accessibility (a11y), and Document Object Model" },
    { level_number: 2, topic: "CSS3 Fundamentals: Box model, Selectors, Specificity, Cascading" },
    { level_number: 3, topic: "Modern CSS Layouts: Flexbox, CSS Grid, and Responsive Media Queries" },
    { level_number: 4, topic: "Modern JavaScript (ES6+): Scopes, Closures, Promises, and Async/Await" },
    { level_number: 5, topic: "Client-side APIs: DOM manipulation, Event bubbling, Fetch / Axios requests" },
    { level_number: 6, topic: "Component-driven UI: React fundamentals, JSX, Props, and State hooks" },
    { level_number: 7, topic: "State management, Effect hooks, Lifecycle, and Context API patterns" },
    { level_number: 8, topic: "Client-side Routing, Form validation, and Error Boundary architectures" },
    { level_number: 9, topic: "Web Performance: Code-splitting, Lazy loading, Core Web Vitals" },
    { level_number: 10, topic: "Web Security: XSS prevention, CSRF protection, CORS headers, Content Security" }
  ],
  "System Design (Intro)": [
    { level_number: 1, topic: "Client-Server Architecture: Monolith vs Microservices fundamentals" },
    { level_number: 2, topic: "Scalability paradigms: Vertical (scale-up) vs Horizontal (scale-out)" },
    { level_number: 3, topic: "Load Balancing algorithms (Round-robin, Least connections, IP Hash)" },
    { level_number: 4, topic: "Caching strategies: Cache-aside, Write-through, Write-back, Redis/Memcached" },
    { level_number: 5, topic: "Database Scaling: Master-Slave replication, Read replicas, Data sharding" },
    { level_number: 6, topic: "CAP Theorem, PACELC theorem, ACID vs BASE consistency models" },
    { level_number: 7, topic: "Asynchronous processing: Message Queues (Kafka, RabbitMQ, SQS) & Workers" },
    { level_number: 8, topic: "API Design: RESTful conventions, GraphQL, RPC, Rate limiting, Throttling" },
    { level_number: 9, topic: "High-level design case: URL Shortener (TinyURL) or Rate Limiter" },
    { level_number: 10, topic: "Distributed Systems: Event-driven architecture, CQRS, and Consensus" }
  ],
  "Git & Version Control": [
    { level_number: 1, topic: "VCS Concepts: Local vs Centralized vs Distributed Version Control systems" },
    { level_number: 2, topic: "Core commands: git init, clone, status, add, commit, diff, and log" },
    { level_number: 3, topic: "Branching strategies: Creating, switching, and deleting feature branches" },
    { level_number: 4, topic: "Merging techniques: Fast-forward vs 3-way merge and Conflict resolution" },
    { level_number: 5, topic: "Remote repository synchronization: git remote, push, fetch, and pull" },
    { level_number: 6, topic: "Git Rebasing: Interactive rebase, Squashing commits, and Clean history" },
    { level_number: 7, topic: "Undoing changes: git revert, reset (soft/mixed/hard), checkout, restore" },
    { level_number: 8, topic: "Git Stashing, Tagging releases, Cherry-picking, and Bisect debugging" },
    { level_number: 9, topic: "Collaborative Git: Pull Requests, Code Reviews, Branch Protection rules" },
    { level_number: 10, topic: "Git workflows (GitFlow, Trunk-Based Development) and CI/CD automation" }
  ],
  "Generative AI Basics": [
    { level_number: 1, topic: "Foundations: AI vs ML vs Deep Learning vs Generative AI taxonomy" },
    { level_number: 2, topic: "Transformer Architecture overview: Attention mechanism and Self-attention" },
    { level_number: 3, topic: "Large Language Models (LLMs): Pre-training, Tokenization, and Context windows" },
    { level_number: 4, topic: "Prompt Engineering: Zero-shot, Few-shot, Chain-of-Thought prompting" },
    { level_number: 5, topic: "Sampling parameters: Temperature, Top-P, Top-K, Frequency/Presence penalty" },
    { level_number: 6, topic: "Vector Embeddings and Semantic Search fundamentals" },
    { level_number: 7, topic: "Retrieval-Augmented Generation (RAG): Document chunking, Vector DBs, Hybrid search" },
    { level_number: 8, topic: "Model Fine-tuning vs RAG vs In-context learning trade-offs" },
    { level_number: 9, topic: "AI Safety, Hallucination mitigation, Guardrails, and Grounding techniques" },
    { level_number: 10, topic: "Agentic AI workflows: Tool/Function calling, Autonomous task reasoning" }
  ]
};

export function getSkillRoadmap(skillName: string): SkillTopic[] {
  if (SKILL_TOPICS_ROADMAP[skillName]) {
    return SKILL_TOPICS_ROADMAP[skillName];
  }
  // Fallback 10-level generator for custom skills
  return Array.from({ length: 10 }, (_, i) => ({
    level_number: i + 1,
    topic: i < 3 
      ? `Fundamental level ${i + 1} concepts for ${skillName}`
      : i < 7
      ? `Applied intermediate techniques and patterns in ${skillName}`
      : `Advanced industry-grade mastery in ${skillName}`
  }));
}
