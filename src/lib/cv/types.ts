export type Profile = {
  network: string;
  username: string;
  url: string;
};

export type Basics = {
  name: string;
  label: string;
  tagline: string;
  image: string;
  email: string;
  phone?: string;
  url?: string | null;
  summary: string;
  about: string[];
  location: {
    city: string;
    region: string;
    countryCode?: string;
  };
  profiles: Profile[];
};

export type WorkItem = {
  company: string;
  url?: string | null;
  location?: string;
  position: string;
  startDate: string;
  endDate: string | null;
  summary?: string;
  companyNote?: string;
  highlights?: string[];
  data?: Array<{ company: string; summary: string }>;
};

export type EducationItem = {
  institution: string;
  url: string | null;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string | null;
  score: string | null;
  note?: string;
};

export type SkillGroup = {
  name: string;
  level?: string;
  keywords: string[];
};

export type LanguageItem = {
  language: string;
  fluency: string;
};

export type InterestItem = {
  name: string;
  keywords: string[];
};

export type ProjectItem = {
  name: string;
  slug: string;
  isActive: boolean;
  featured?: boolean;
  category?: string;
  startDate?: string | null;
  endDate?: string | null;
  image: string;
  images: string[];
  description: string;
  details: string[];
  highlights?: string[];
  technologies: string[];
  url?: string | null;
  github?: string | null;
};
