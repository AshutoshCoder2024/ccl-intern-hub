export interface Internship {
  id: string;
  title: string;
  department: string;
  duration: string;
  eligibility: string[];
  deadline: string;
  description: string;
  requiredDocuments: string[];
  contactEmail: string;
  location: string;
  stipend?: string;
}

export const internships: Internship[] = [
  {
    id: "INT001",
    title: "Mining Operations Intern",
    department: "Mining Operations",
    duration: "6 months",
    eligibility: ["B.Tech/BE in Mining Engineering", "Final year or recent graduates", "Minimum 70% aggregate"],
    deadline: "2025-12-15",
    description: "Work alongside experienced mining engineers to understand underground and opencast mining operations. Gain hands-on experience in mine planning, safety protocols, and production optimization.",
    requiredDocuments: ["Resume/CV", "Academic transcripts", "ID proof", "NOC from institution"],
    contactEmail: "mining.hr@cclranchi.in",
    location: "Ranchi, Jharkhand",
    stipend: "₹15,000/month"
  },
  {
    id: "INT002",
    title: "Environmental Engineering Intern",
    department: "Environment & Sustainability",
    duration: "4 months",
    eligibility: ["B.Tech/BE in Environmental/Civil Engineering", "Knowledge of environmental regulations", "Minimum 65% aggregate"],
    deadline: "2025-12-20",
    description: "Assist in environmental impact assessments, monitoring air and water quality, and implementing sustainable mining practices. Learn about reclamation and rehabilitation projects.",
    requiredDocuments: ["Resume/CV", "Academic transcripts", "ID proof", "Cover letter"],
    contactEmail: "environment@cclranchi.in",
    location: "Ranchi, Jharkhand",
    stipend: "₹12,000/month"
  },
  {
    id: "INT003",
    title: "Mechanical Engineering Intern",
    department: "Mechanical Maintenance",
    duration: "6 months",
    eligibility: ["B.Tech/BE in Mechanical Engineering", "Understanding of mining equipment", "Minimum 70% aggregate"],
    deadline: "2025-12-10",
    description: "Support maintenance teams in servicing heavy mining equipment including excavators, dumpers, and draglines. Learn preventive maintenance, troubleshooting, and equipment optimization.",
    requiredDocuments: ["Resume/CV", "Academic transcripts", "ID proof", "NOC from institution"],
    contactEmail: "mechanical@cclranchi.in",
    location: "Ranchi, Jharkhand",
    stipend: "₹14,000/month"
  },
  {
    id: "INT004",
    title: "Electrical Systems Intern",
    department: "Electrical Engineering",
    duration: "5 months",
    eligibility: ["B.Tech/BE in Electrical/Electronics Engineering", "Knowledge of power systems", "Minimum 65% aggregate"],
    deadline: "2025-12-18",
    description: "Work on electrical distribution systems, automation projects, and energy management. Gain exposure to power supply systems for mining operations and safety protocols.",
    requiredDocuments: ["Resume/CV", "Academic transcripts", "ID proof", "Project portfolio"],
    contactEmail: "electrical@cclranchi.in",
    location: "Ranchi, Jharkhand",
    stipend: "₹13,000/month"
  },
  {
    id: "INT005",
    title: "Safety & Health Intern",
    department: "Safety Management",
    duration: "4 months",
    eligibility: ["B.Tech in Mining/Safety Engineering", "Interest in occupational safety", "Minimum 60% aggregate"],
    deadline: "2025-12-25",
    description: "Learn mine safety protocols, accident investigation, risk assessment, and emergency response procedures. Participate in safety audits and training programs for mining personnel.",
    requiredDocuments: ["Resume/CV", "Academic transcripts", "ID proof", "Medical fitness certificate"],
    contactEmail: "safety@cclranchi.in",
    location: "Ranchi, Jharkhand",
    stipend: "₹11,000/month"
  },
  {
    id: "INT006",
    title: "Geology & Exploration Intern",
    department: "Geology",
    duration: "5 months",
    eligibility: ["B.Sc/M.Sc in Geology or Applied Geology", "Field work experience preferred", "Minimum 65% aggregate"],
    deadline: "2025-12-12",
    description: "Assist in geological mapping, core sampling, and mineral exploration activities. Learn about coal reserves estimation, geological modeling, and resource assessment techniques.",
    requiredDocuments: ["Resume/CV", "Academic transcripts", "ID proof", "Field work report"],
    contactEmail: "geology@cclranchi.in",
    location: "Ranchi, Jharkhand",
    stipend: "₹13,500/month"
  },
  {
    id: "INT007",
    title: "HR & Administration Intern",
    department: "Human Resources",
    duration: "3 months",
    eligibility: ["MBA in HR or related field", "Good communication skills", "Minimum 60% aggregate"],
    deadline: "2025-12-22",
    description: "Support recruitment processes, employee engagement initiatives, training coordination, and HR documentation. Learn about workforce management in a large-scale industrial organization.",
    requiredDocuments: ["Resume/CV", "Academic transcripts", "ID proof", "Cover letter"],
    contactEmail: "hr@cclranchi.in",
    location: "Ranchi, Jharkhand",
    stipend: "₹10,000/month"
  },
  {
    id: "INT008",
    title: "IT & Digital Systems Intern",
    department: "Information Technology",
    duration: "4 months",
    eligibility: ["B.Tech/BE in Computer Science/IT", "Programming knowledge required", "Minimum 70% aggregate"],
    deadline: "2025-12-20",
    description: "Work on digital transformation projects, software development, database management, and IT infrastructure. Gain experience in enterprise systems and mining industry applications.",
    requiredDocuments: ["Resume/CV", "Academic transcripts", "ID proof", "GitHub profile/portfolio"],
    contactEmail: "it@cclranchi.in",
    location: "Ranchi, Jharkhand",
    stipend: "₹15,000/month"
  }
];

export const departments = [
  {
    name: "Mining Operations",
    description: "Core mining activities including extraction, production planning, and operational excellence",
    icon: "Pickaxe"
  },
  {
    name: "Environment & Sustainability",
    description: "Environmental monitoring, compliance, and sustainable mining practices",
    icon: "Leaf"
  },
  {
    name: "Mechanical Maintenance",
    description: "Equipment maintenance, reliability, and performance optimization",
    icon: "Wrench"
  },
  {
    name: "Electrical Engineering",
    description: "Power systems, automation, and electrical infrastructure management",
    icon: "Zap"
  },
  {
    name: "Safety Management",
    description: "Occupational health, safety protocols, and risk management",
    icon: "Shield"
  },
  {
    name: "Geology",
    description: "Geological exploration, resource assessment, and mineral analysis",
    icon: "Mountain"
  },
  {
    name: "Human Resources",
    description: "Talent management, training, and organizational development",
    icon: "Users"
  },
  {
    name: "Information Technology",
    description: "Digital transformation, enterprise systems, and technology infrastructure",
    icon: "Server"
  }
];

export const projects = [
  {
    title: "Digital Mine Management System",
    department: "Information Technology",
    description: "Implementation of integrated software system for real-time mine operations monitoring, production tracking, and analytics dashboard.",
    status: "Ongoing",
    duration: "18 months"
  },
  {
    title: "Green Mining Initiative",
    department: "Environment & Sustainability",
    description: "Comprehensive program focusing on reducing carbon footprint, water conservation, and land reclamation in mining areas.",
    status: "Ongoing",
    duration: "24 months"
  },
  {
    title: "Equipment Modernization Program",
    department: "Mechanical Maintenance",
    description: "Upgrading and retrofitting mining equipment with latest technology to improve efficiency and reduce maintenance costs.",
    status: "Ongoing",
    duration: "12 months"
  },
  {
    title: "Safety Excellence Program",
    department: "Safety Management",
    description: "Organization-wide initiative to achieve zero accidents through advanced training, safety audits, and culture transformation.",
    status: "Featured",
    duration: "Continuous"
  }
];
