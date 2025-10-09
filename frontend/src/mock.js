// Mock data for portfolio website
export const portfolioData = {
  personal: {
    name: "Alex Morgan",
    title: "Full Stack Developer",
    tagline: "Building scalable web applications with modern technologies",
    location: "San Francisco, CA",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/alexmorgan",
    github: "https://github.com/alexmorgan",
    portfolio: "https://alexmorgan.dev"
  },
  
  about: {
    summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. I love solving complex problems and creating user-friendly solutions that make a real impact.",
    highlights: [
      "Led development of microservices architecture serving 1M+ users",
      "Reduced application load time by 60% through optimization",
      "Mentored 8+ junior developers in best practices",
      "Built and deployed 15+ production applications"
    ]
  },

  skills: [
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "React Query"]
    },
    {
      category: "Backend", 
      technologies: ["Node.js", "Python", "Express.js", "FastAPI", "GraphQL", "REST APIs"]
    },
    {
      category: "Database",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"]
    },
    {
      category: "DevOps & Cloud",
      technologies: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel", "Netlify"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "EcoTracker",
      description: "A comprehensive carbon footprint tracking application that helps users monitor and reduce their environmental impact through daily activity logging.",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Chart.js"],
      features: [
        "Real-time carbon footprint calculation",
        "Interactive data visualizations", 
        "Goal setting and progress tracking",
        "Community challenges and leaderboards"
      ],
      githubUrl: "https://github.com/alexmorgan/ecotracker",
      liveUrl: "https://ecotracker.vercel.app",
      status: "Live"
    },
    {
      id: 2,
      title: "TaskFlow Pro",
      description: "A modern project management platform designed for agile teams with real-time collaboration features and advanced reporting.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "WebSocket"],
      features: [
        "Real-time collaborative editing",
        "Advanced project analytics",
        "Custom workflow automation",
        "Integrated time tracking"
      ],
      githubUrl: "https://github.com/alexmorgan/taskflow-pro",
      liveUrl: "https://taskflow-pro.com",
      status: "Live"
    },
    {
      id: 3,
      title: "AI Content Generator",
      description: "An intelligent content creation tool that leverages AI to help marketers and writers generate high-quality content at scale.",
      technologies: ["Python", "FastAPI", "OpenAI API", "React", "PostgreSQL"],
      features: [
        "AI-powered content generation",
        "Multiple content formats support",
        "SEO optimization suggestions",
        "Content performance analytics"
      ],
      githubUrl: "https://github.com/alexmorgan/ai-content-gen",
      liveUrl: "https://aicontentgen.app",
      status: "Live"
    }
  ],

  experience: [
    {
      id: 1,
      company: "TechFlow Solutions",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      location: "San Francisco, CA",
      description: "Leading development of enterprise-scale web applications serving Fortune 500 clients.",
      achievements: [
        "Architected microservices platform reducing deployment time by 70%",
        "Led team of 5 developers in agile development practices",
        "Implemented automated testing reducing bugs by 45%"
      ]
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Developer",
      duration: "2020 - 2022", 
      location: "Remote",
      description: "Built core platform features for a fast-growing SaaS startup in the fintech space.",
      achievements: [
        "Developed user dashboard handling 100K+ daily active users",
        "Integrated payment systems processing $2M+ monthly transactions",
        "Optimized database queries improving performance by 80%"
      ]
    },
    {
      id: 3,
      company: "WebDev Agency",
      position: "Frontend Developer",
      duration: "2019 - 2020",
      location: "Austin, TX", 
      description: "Specialized in creating responsive, accessible web applications for diverse client portfolio.",
      achievements: [
        "Delivered 20+ client projects on time and within budget",
        "Improved client website performance scores by average of 40%",
        "Mentored 3 junior developers in modern React practices"
      ]
    }
  ]
};

// Mock form submission handlers
export const mockHandlers = {
  submitContactForm: async (formData) => {
    console.log('Contact form submitted:', formData);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Thank you for your message! I\'ll get back to you soon.' };
  },
  
  downloadResume: () => {
    console.log('Resume download initiated');
    // Simulate resume download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'alex_morgan_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};