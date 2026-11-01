export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
  startDate: string;
  endDate: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export interface SideMission {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
}

export interface Education {
  school: string;
  location: string;
  degree: string;
  faculty: string;
  startDate: string;
  endDate: string;
  gpa: string;
  rank: string;
  coursework: string[];
}

export interface Site {
  name: string;
  overline: string;
  roles: string[];
  intro: {
    label: string;
    paragraphs: string[];
  };
  links: {
    linkedin: string;
    linkedinLabel: string;
    github: string;
    githubLabel: string;
    resume: string;
    resumeLabel: string;
    emailUser: string;
    emailDomain: string;
  };
  practice: { title: string; body: string }[];
  colophon: string;
}
