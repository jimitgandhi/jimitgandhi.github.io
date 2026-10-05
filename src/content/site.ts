/**
 * Single source of truth for all site content.
 * Update this file to refresh the site's data. No layout changes required.
 */

export type SocialKey = "linkedin" | "github";

export type Social = {
  key: SocialKey;
  label: string;
  href: string;
  handle: string;
  /** Professional links are shown in the hero and contact sections. */
  primary?: boolean;
};

export type Experience = {
  company: string;
  role: string;
  period?: string;
  location?: string;
  href?: string;
  /** Path to a logo image. Falls back to a brand icon or the company initial. */
  logo?: string;
  summary: string;
  highlights: string[];
  tags: string[];
  /** Earlier roles are collapsed by default. */
  earlier?: boolean;
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  detail: string;
  href?: string;
  /** Path to a logo image. Falls back to a graduation cap icon. */
  logo?: string;
  /** A non-degree program, e.g. a summer school. Listed as an award rather than alma mater in structured data. */
  program?: boolean;
  /** Earlier education is collapsed by default. */
  earlier?: boolean;
};

export type ProjectCategory = "ML / AI" | "Research" | "Web" | "Mobile" | "Computer Vision" | "NLP";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Cover image (16:9). Without one, the card shows `icon` on a patterned backdrop. */
  image?: string;
  /** Describes the cover image for screen readers and image search. */
  imageAlt?: string;
  icon?: string;
  categories: ProjectCategory[];
  tags: string[];
  featured?: boolean;
  links: { label: "GitHub" | "Paper" | "Demo"; href: string }[];
};

export type Publication = {
  title: string;
  venue?: string;
  year?: string;
  href?: string;
  note: string;
};

export const site = {
  name: "Jimit Gandhi",
  firstName: "Jimit",
  url: "https://jimitgandhi.github.io",
  role: "Senior Software Engineer at LinkedIn",
  tagline: "Building ML-powered ads targeting systems at LinkedIn",
  rotatingRoles: ["Senior Software Engineer.", "ML systems builder.", "Tech lead."],
  description:
    "I'm a Senior Software Engineer at LinkedIn with 4+ years building ML-powered ads targeting systems. I currently lead semantic ads targeting, leveraging LLMs, embedding retrieval and ML models over billions of records.",
  location: "Sunnyvale, CA",
  address: { locality: "Sunnyvale", region: "CA", country: "US" },
  employer: { name: "LinkedIn", url: "https://www.linkedin.com" },
  seo: {
    title: "Jimit Gandhi | Senior Software Engineer at LinkedIn",
    description:
      "Jimit Gandhi is a Senior Software Engineer at LinkedIn in Sunnyvale, CA, leading semantic ads targeting with LLMs, embedding retrieval and ML at scale.",
    keywords: [
      "Jimit Gandhi",
      "Senior Software Engineer",
      "LinkedIn",
      "Machine Learning Engineer",
      "Semantic Ads Targeting",
      "Ads Targeting",
      "LLMs",
      "Agentic Ads",
      "AI Agents",
      "Embedding Retrieval",
      "Distributed Systems",
      "Sunnyvale",
      "UMass Amherst",
    ],
  },
  resumeUrl: "https://drive.google.com/file/d/1CUcqHgC6gUuclluzZ1TAbCK3HHcCRuce/view?usp=sharing",
  avatar: "/images/avatar.webp",
  portrait: "/images/portrait-sedona.webp",
  portraitAlt: "Jimit Gandhi sitting on Devil's Bridge, a red rock arch in Sedona, Arizona",
  portraitCaption: "Devil's Bridge, Sedona",
  status: {
    available: true,
    text: "Hire me",
  },
} as const;

export const socials: Social[] = [
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/jimitgandhi/", handle: "in/jimitgandhi", primary: true },
  { key: "github", label: "GitHub", href: "https://github.com/jimitgandhi", handle: "@jimitgandhi", primary: true },
];

export const about = {
  paragraphs: [
    "I'm a Senior Software Engineer at LinkedIn in Sunnyvale, where I am the tech lead for semantic ads targeting, connecting advertisers with the right professionals, powered by LLMs, embedding retrieval and large-scale ML models.",
    "My work spans domains from distributed data processing and low-latency online services to highly scalable ML inference and ranking models, all with tight privacy guardrails. Before LinkedIn I earned an M.S. in Computer Science from UMass Amherst.",
  ],
  facts: [
    { label: "Based in", value: "Sunnyvale, CA" },
    { label: "Role", value: "Senior SWE at LinkedIn" },
    { label: "Focus", value: "Distributed Systems · LLMs · Agentic Ads" },
    { label: "Education", value: "University of Massachusetts, Amherst" },
  ],
  now: [
    "Building LinkedIn's first semantic ads targeting architecture from the ground up.",
    "Leveraging LLM-powered inference for precise audience curation.",
    "Building side projects that make everyday life a little simpler for me and the people around me.",
  ],
};

export const experience: Experience[] = [
  {
    company: "LinkedIn",
    role: "Senior Software Engineer, Ads Targeting",
    period: "Sep 2024 - Present",
    location: "Sunnyvale, CA",
    href: "https://www.linkedin.com",
    summary: "Tech lead for semantic ads targeting, architecting how advertisers reach the right professionals with LLMs, embedding retrieval and ranking models.",
    highlights: [],
    tags: ["LLMs", "AI Agents", "Embeddings", "PyTorch", "Java", "gRPC", "Spark"],
  },
  {
    company: "LinkedIn",
    role: "Software Engineer, Ads Targeting",
    period: "Jul 2022 - Sep 2024",
    location: "Sunnyvale, CA",
    href: "https://www.linkedin.com",
    summary: "Built distributed, privacy-safe data systems for audience modelling and measurement on LinkedIn's ads platform.",
    highlights: [],
    tags: ["Spark", "Scala", "Differential Privacy", "GDPR / DMA", "Java"],
  },
  {
    company: "LinkedIn",
    role: "Software Engineering Intern, Ads Targeting",
    period: "May 2021 - Aug 2021",
    href: "https://www.linkedin.com",
    summary: "Built a new export functionality for Company Engagement Reports for advertisers.",
    highlights: [],
    tags: [],
  },
  {
    company: "Pikkal & Co.",
    role: "Software Developer Intern",
    location: "Singapore",
    href: "https://www.pikkal.com",
    logo: "/images/pikkal.webp",
    summary: "Built NLP analysis of podcast transcripts for a B2B podcast company, surfaced through a Flask web app.",
    highlights: [],
    tags: ["Python", "NLP", "Flask"],
    earlier: true,
  },
  {
    company: "Speridian Technologies",
    role: "Software Developer Intern",
    location: "Mumbai, India",
    href: "https://speridian.com",
    logo: "/images/speridian.webp",
    summary: "Built a React Native healthcare app alongside a globally distributed team of 15+ engineers.",
    highlights: [],
    tags: ["React Native", "Redux", "Mobile"],
    earlier: true,
  },
  {
    company: "Studysid",
    role: "Web Developer Intern",
    location: "Mumbai, India",
    href: "https://studysid.com",
    logo: "/images/studysid.webp",
    summary: "Improved the PHP backend and shipped new front-end modules for an ed-tech startup.",
    highlights: [],
    tags: ["PHP", "Front-end"],
    earlier: true,
  },
];

export const education: Education[] = [
  {
    school: "University of Massachusetts Amherst",
    degree: "M.S. in Computer Science",
    period: "Graduated May 2022",
    detail: "GPA 3.9/4. Focused on machine learning, advanced NLP, algorithms for data science and software engineering.",
  },
  {
    school: "Dwarkadas J. Sanghvi College of Engineering, University of Mumbai",
    degree: "B.E. in Computer Engineering",
    period: "Graduated 2020",
    detail: "GPA 9.47/10. Core committee member of the ACM student chapter.",
  },
  {
    school: "IIIT Hyderabad",
    degree: "Computer Vision Summer School",
    period: "Jul 2019",
    href: "https://cvit.iiit.ac.in/cvsummerschool2019/awards.html",
    logo: "/images/iiit.webp",
    program: true,
    detail: "Ranked among the top 20 participants, earning a certificate of performance and a cash prize.",
  },
];

export const focusAreas = [
  {
    title: "Semantic search & retrieval",
    body: "Embedding retrieval, GPU kNN and entity resolution over billions of records.",
  },
  {
    title: "LLMs & AI agents",
    body: "LLM classification, agent grounding, RAG and rigorous LLM evaluation.",
  },
  {
    title: "Distributed, privacy-safe data systems at scale",
    body: "Spark pipelines over billions of records with GDPR, DMA and differential privacy built in.",
  },
  {
    title: "Low-latency, highly available services",
    body: "Java gRPC services serving ML inference and ranking in production under tight latency budgets.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java", "Python", "Scala", "SQL"] },
  {
    group: "ML & AI",
    items: ["PyTorch", "LLMs", "AI agents", "RAG", "Embeddings & vector search", "Learning to rank", "LLM evaluation", "A/B testing"],
  },
  { group: "Data", items: ["Spark", "Airflow", "Kafka", "Hadoop / Hive", "Trino", "Pinot"] },
  { group: "Backend & infra", items: ["gRPC", "Microservices", "Caching"] },
  { group: "Privacy", items: ["GDPR", "DMA", "Differential privacy"] },
];

export const projects: Project[] = [
  {
    slug: "wc-predictor",
    title: "World Cup 2026 Predictor",
    summary:
      "A prediction game for friend groups: predict scores before kickoff, earn points and climb a real-time leaderboard. Live scores from the ESPN API, notifications and an admin panel. Runs on Android and as a web PWA, running entirely on Firebase's free tier.",
    image: "/images/project-world-cup-2026-predictor.webp",
    imageAlt: "World Cup 2026 Predictor app showing match predictions and scores in a stadium locker room",
    categories: ["Mobile", "Web"],
    tags: ["Flutter", "Firebase", "Firestore", "PWA", "ESPN API"],
    featured: true,
    links: [
      { label: "Demo", href: "https://worldcup2026-predictor-2d036.web.app" },
      { label: "GitHub", href: "https://github.com/jimitgandhi/worldcup2026-predictor" },
    ],
  },
  {
    slug: "license-plates",
    title: "YOLO-based Recognition of Indian License Plates",
    summary:
      "A transfer-learning model that detects Indian license plates, trained on a custom-built dataset. Published and presented at ICACTA 2020.",
    image: "/images/project-license-plate-recognition.webp",
    imageAlt: "License plate recognition app detecting an Indian car's number plate at a parking gate",
    categories: ["Computer Vision", "Research", "ML / AI"],
    tags: ["YOLO", "Transfer Learning", "Custom Dataset"],
    links: [{ label: "Paper", href: "https://link.springer.com/chapter/10.1007/978-981-15-3242-9_39" }],
  },
  {
    slug: "sms-normalization",
    title: "SMS Text Normalization",
    summary:
      "A pipeline that converts SMS language into standard English via acronym expansion, named-entity recognition, phonetic and string similarity, and BERT masked-word prediction.",
    image: "/images/project-sms-text-normalization.webp",
    imageAlt: "SMS slang messages being normalized into standard English by an NLP pipeline",
    categories: ["NLP", "Research", "ML / AI"],
    tags: ["BERT", "NER", "NLP Pipeline"],
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2006.14116" }],
  },
  {
    slug: "text-guided-gan",
    title: "Image Modification using Text with GANs",
    summary:
      "Language-based image editing using text-adaptive discriminators, bilinear residual layers and contextual word representations.",
    image: "/images/project-text-guided-image-editing.webp",
    imageAlt: "Fashion app editing an outfit image from a text description",
    categories: ["Computer Vision", "NLP", "ML / AI"],
    tags: ["GANs", "Deep Learning", "Multimodal"],
    links: [],
  },
  {
    slug: "sign-language",
    title: "Sign Language Recognition",
    summary:
      "Predicts hand signs with Logistic Regression, SVMs, ANNs and LSTMs, trained on data collected through non-intrusive methods.",
    image: "/images/project-sign-language-recognition.webp",
    imageAlt: "Person signing to a kiosk that recognizes hand gestures",
    categories: ["ML / AI", "Computer Vision"],
    tags: ["SVM", "ANN", "LSTM"],
    links: [{ label: "GitHub", href: "https://github.com/jimitgandhi/ml-mini-project" }],
  },
  {
    slug: "stock-manager",
    title: "Stock Manager",
    summary:
      "A stock-management web app with real-time RNN predictions, mock trading, forex transactions, a news module and a chatbot.",
    image: "/images/project-stock-manager.webp",
    imageAlt: "Stock market dashboard with candlestick chart and index movements",
    categories: ["Web", "ML / AI"],
    tags: ["RNN", "Web App", "Chatbot"],
    links: [{ label: "GitHub", href: "https://github.com/jimitgandhi/Stock-Manager" }],
  },
  {
    slug: "political-sentiment",
    title: "Political Sentiment Analysis",
    summary:
      "A web app that gauges public sentiment on trending news topics using data from Twitter, Quora and other social platforms.",
    image: "/images/project-political-sentiment-analysis.webp",
    imageAlt: "Political debate on stage, the subject of the sentiment analysis app",
    categories: ["Web", "NLP"],
    tags: ["Sentiment Analysis", "Social Data", "Web App"],
    links: [{ label: "GitHub", href: "https://github.com/jimitgandhi/Political-Event-Sentiment-Analysis" }],
  },
];

export const publications: Publication[] = [
  {
    title: "Normalizing Text using Language Modelling based on Phonetics and String Similarity",
    venue: "arXiv:2006.14116",
    year: "2020",
    href: "https://arxiv.org/abs/2006.14116",
    note: "A BERT-assisted pipeline that normalizes noisy SMS text using phonetic and string-similarity matching.",
  },
  {
    title: "YOLO Based Recognition of Indian License Plates",
    venue: "ICACTA 2020 · Springer",
    year: "2020",
    href: "https://link.springer.com/chapter/10.1007/978-981-15-3242-9_39",
    note: "Transfer-learning approach to detecting Indian license plates on a custom dataset.",
  },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
