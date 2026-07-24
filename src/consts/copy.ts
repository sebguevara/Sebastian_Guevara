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
    skills: string;
    about: string;
  };
  hero: {
    available: string;
    role: string;
    support: string;
    ctaContact: string;
    ctaProjects: string;
    downloadCv: string;
  };
  sections: {
    experience: { eyebrow: string; title: string };
    projects: { eyebrow: string; title: string };
    education: { eyebrow: string; title: string };
    skills: { eyebrow: string; title: string };
    about: { eyebrow: string; title: string };
    contact: { eyebrow: string; title: string };
  };
  about: {
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
  lightbox: {
    label: string;
    open: string;
    close: string;
  };
  education: {
    average: string;
  };
  contact: {
    body: string;
    cta: string;
    copyEmail: string;
    copied: string;
    linkedin: string;
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
    company: string;
  };
};

const copyByLocale: Record<Locale, Copy> = {
  en: {
    meta: {
      title: "Sebastian Guevara — Full Stack Developer",
      description:
        "Sebastian Guevara — Full Stack Developer with 5+ years building production web apps, APIs, and backend services. Next.js, React, Node.js, TypeScript, PostgreSQL, Redis, and applied AI. Based in Corrientes, Argentina.",
      notFoundTitle: "Page not found",
    },
    nav: {
      aria: "Main navigation",
      home: "Home",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      skills: "Skills",
      about: "About",
    },
    hero: {
      available: "Available for work",
      role: "Full Stack Developer",
      support: "5+ years building production systems",
      ctaContact: "Get in Touch",
      ctaProjects: "View projects",
      downloadCv: "Download CV",
    },
    sections: {
      experience: { eyebrow: "Experience", title: "Where I've worked" },
      projects: { eyebrow: "Projects", title: "Featured projects" },
      education: { eyebrow: "Education", title: "Where I've studied" },
      skills: { eyebrow: "Skills", title: "What I work with" },
      about: { eyebrow: "About", title: "A bit about me" },
      contact: { eyebrow: "Contact", title: "Let's build something together" },
    },
    about: {
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
    lightbox: {
      label: "Image viewer",
      open: "View image",
      close: "Close",
    },
    education: {
      average: "Average",
    },
    contact: {
      body: "I'm open to new projects, remote roles, and collaborations. Tell me what you need and I'll get back to you soon.",
      cta: "Send me an email",
      copyEmail: "Copy email",
      copied: "Copied!",
      linkedin: "Connect on LinkedIn",
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
      company: "The company",
    },
  },
  es: {
    meta: {
      title: "Sebastian Guevara — Full Stack Developer",
      description:
        "Sebastian Guevara — Desarrollador Full Stack con más de 5 años construyendo aplicaciones web, APIs y servicios backend en producción. Next.js, React, Node.js, TypeScript, PostgreSQL, Redis e IA aplicada. Corrientes, Argentina.",
      notFoundTitle: "Página no encontrada",
    },
    nav: {
      aria: "Navegación principal",
      home: "Inicio",
      experience: "Experiencia",
      projects: "Proyectos",
      education: "Educación",
      skills: "Skills",
      about: "Sobre mí",
    },
    hero: {
      available: "Disponible para trabajar",
      role: "Full Stack Developer",
      support: "5+ años construyendo sistemas en producción",
      ctaContact: "Contactame",
      ctaProjects: "Ver proyectos",
      downloadCv: "Descargar CV",
    },
    sections: {
      experience: { eyebrow: "Experiencia", title: "Dónde trabajé" },
      projects: { eyebrow: "Proyectos", title: "Proyectos destacados" },
      education: { eyebrow: "Educación", title: "Dónde estudié" },
      skills: { eyebrow: "Skills", title: "Con qué trabajo" },
      about: { eyebrow: "Sobre mí", title: "Un poco sobre mí" },
      contact: { eyebrow: "Contacto", title: "¿Construimos algo juntos?" },
    },
    about: {
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
    lightbox: {
      label: "Visor de imágenes",
      open: "Ver imagen",
      close: "Cerrar",
    },
    education: {
      average: "Promedio",
    },
    contact: {
      body: "Estoy abierto a nuevos proyectos, roles remotos y colaboraciones. Contame qué necesitás y te respondo a la brevedad.",
      cta: "Escribime un email",
      copyEmail: "Copiar email",
      copied: "¡Copiado!",
      linkedin: "Conectar en LinkedIn",
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
      company: "La empresa",
    },
  },
};

export function getCopy(lang: Locale): Copy {
  return copyByLocale[lang];
}

export type { Copy };
