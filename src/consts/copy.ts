import type { Locale } from "@/consts/locale";

type Copy = {
  meta: {
    title: string;
    description: string;
    notFoundTitle: string;
  };
  nav: {
    aria: string;
    home: string;
    experience: string;
    projects: string;
    education: string;
    about: string;
  };
  hero: {
    available: string;
    ctaContact: string;
    ctaProjects: string;
    downloadCv: string;
  };
  sections: {
    experience: { eyebrow: string; title: string };
    projects: { eyebrow: string; title: string };
    education: { eyebrow: string; title: string };
    about: { eyebrow: string; title: string };
    contact: { eyebrow: string; title: string };
  };
  about: {
    skills: string;
    languages: string;
    interests: string;
  };
  projects: {
    live: string;
    code: string;
    preview: string;
    more: string;
    back: string;
    about: string;
    stack: string;
    links: string;
    tags: string;
  };
  carousel: {
    prev: string;
    next: string;
    goTo: string;
  };
  education: {
    average: string;
  };
  contact: {
    body: string;
    cta: string;
  };
  footer: {
    rights: string;
  };
  error: {
    label: string;
    notFound: string;
    notFoundContext: string;
    backHome: string;
  };
  toggles: {
    theme: string;
    language: string;
  };
  experience: {
    present: string;
  };
};

const copyByLocale: Record<Locale, Copy> = {
  en: {
    meta: {
      title: "Sebastian Guevara — Full Stack Developer",
      description:
        "Full Stack Developer with 5+ years building production systems. Team Lead at the city government of Corrientes and co-founder of two SaaS products. TypeScript, Node.js, PostgreSQL, Redis, and applied AI.",
      notFoundTitle: "Page not found",
    },
    nav: {
      aria: "Main navigation",
      home: "Home",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      about: "About",
    },
    hero: {
      available: "Available for work",
      ctaContact: "Get in touch",
      ctaProjects: "View projects",
      downloadCv: "Download CV",
    },
    sections: {
      experience: { eyebrow: "Experience", title: "Where I've worked" },
      projects: { eyebrow: "Projects", title: "Featured projects" },
      education: { eyebrow: "Education", title: "Where I've studied" },
      about: { eyebrow: "About", title: "A bit about me" },
      contact: { eyebrow: "Contact", title: "Let's build something together" },
    },
    about: {
      skills: "Skills",
      languages: "Languages",
      interests: "Interests",
    },
    projects: {
      live: "Live",
      code: "Code",
      preview: "Preview",
      more: "More projects",
      back: "Back to projects",
      about: "About the project",
      stack: "Tech stack",
      links: "Links",
      tags: "Tags",
    },
    carousel: {
      prev: "Previous image",
      next: "Next image",
      goTo: "Go to image",
    },
    education: {
      average: "Average",
    },
    contact: {
      body: "I'm open to new projects, remote roles, and collaborations. Tell me what you need and I'll get back to you soon.",
      cta: "Send me an email",
    },
    footer: {
      rights: "All rights reserved.",
    },
    error: {
      label: "Error",
      notFound: "Page not found",
      notFoundContext: "The page you are looking for does not exist.",
      backHome: "Back to home",
    },
    toggles: {
      theme: "Switch theme",
      language: "Ver en español",
    },
    experience: {
      present: "Present",
    },
  },
  es: {
    meta: {
      title: "Sebastian Guevara — Desarrollador Full Stack",
      description:
        "Desarrollador Full Stack con 5+ años construyendo sistemas en producción. Team Lead en la Municipalidad de Corrientes y cofundador de dos productos SaaS. TypeScript, Node.js, PostgreSQL, Redis e IA aplicada.",
      notFoundTitle: "Página no encontrada",
    },
    nav: {
      aria: "Navegación principal",
      home: "Inicio",
      experience: "Experiencia",
      projects: "Proyectos",
      education: "Educación",
      about: "Sobre mí",
    },
    hero: {
      available: "Disponible para trabajar",
      ctaContact: "Contactame",
      ctaProjects: "Ver proyectos",
      downloadCv: "Descargar CV",
    },
    sections: {
      experience: { eyebrow: "Experiencia", title: "Dónde trabajé" },
      projects: { eyebrow: "Proyectos", title: "Proyectos destacados" },
      education: { eyebrow: "Educación", title: "Dónde estudié" },
      about: { eyebrow: "Sobre mí", title: "Un poco sobre mí" },
      contact: { eyebrow: "Contacto", title: "¿Construimos algo juntos?" },
    },
    about: {
      skills: "Habilidades",
      languages: "Idiomas",
      interests: "Intereses",
    },
    projects: {
      live: "Online",
      code: "Código",
      preview: "Ver sitio",
      more: "Más proyectos",
      back: "Volver a proyectos",
      about: "Sobre el proyecto",
      stack: "Stack tecnológico",
      links: "Enlaces",
      tags: "Etiquetas",
    },
    carousel: {
      prev: "Imagen anterior",
      next: "Imagen siguiente",
      goTo: "Ir a la imagen",
    },
    education: {
      average: "Promedio",
    },
    contact: {
      body: "Estoy abierto a nuevos proyectos, roles remotos y colaboraciones. Contame qué necesitás y te respondo a la brevedad.",
      cta: "Escribime un email",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
    error: {
      label: "Error",
      notFound: "Página no encontrada",
      notFoundContext: "La página que buscás no existe.",
      backHome: "Volver al inicio",
    },
    toggles: {
      theme: "Cambiar tema",
      language: "View in English",
    },
    experience: {
      present: "Actualidad",
    },
  },
};

export function getCopy(lang: Locale): Copy {
  return copyByLocale[lang];
}

export type { Copy };
