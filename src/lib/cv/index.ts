import raw from "@cv";
import type { Locale } from "@/consts/locale";
import { t, tList, tOptional, type LocalizedString } from "@/lib/cv/localize";
import type {
  Basics,
  EducationItem,
  InterestItem,
  LanguageItem,
  ProjectItem,
  SkillGroup,
  WorkItem,
} from "@/lib/cv/types";

export type Cv = {
  basics: Basics;
  work: WorkItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  languages: LanguageItem[];
  interests: InterestItem[];
  projects: ProjectItem[];
};

function buildCv(lang: Locale): Cv {
  const basicsRaw = raw.basics;

  const summary = t(basicsRaw.summary as LocalizedString, lang);

  const basics: Basics = {
    name: basicsRaw.name,
    label: t(basicsRaw.label as LocalizedString, lang),
    tagline:
      tOptional(
        ("tagline" in basicsRaw ? basicsRaw.tagline : undefined) as
          | LocalizedString
          | undefined,
        lang,
      ) ?? summary.split(". ").slice(0, 2).join(". ") + ".",
    image: basicsRaw.image,
    email: basicsRaw.email,
    phone: basicsRaw.phone,
    url: basicsRaw.url,
    summary,
    about: (basicsRaw.about ?? []).map((paragraph) =>
      t(paragraph as LocalizedString, lang),
    ),
    location: {
      city: basicsRaw.location.city,
      region: basicsRaw.location.region,
      countryCode: basicsRaw.location.countryCode,
    },
    profiles: basicsRaw.profiles,
  };

  const work: WorkItem[] = (raw.work ?? []).map((job) => ({
    company: job.company,
    url: job.url,
    location: tOptional(job.location as LocalizedString | undefined, lang),
    position: t(job.position as LocalizedString, lang),
    startDate: job.startDate,
    endDate: job.endDate,
    summary: tOptional(job.summary as LocalizedString | undefined, lang),
    companyNote: tOptional(
      ("companyNote" in job ? job.companyNote : undefined) as
        | LocalizedString
        | undefined,
      lang,
    ),
    highlights: job.highlights
      ? tList(job.highlights as LocalizedString[], lang)
      : undefined,
    data: (
      "data" in job && Array.isArray(job.data) ? job.data : undefined
    )?.map(
      (item: { company: string; summary: LocalizedString }) => ({
        company: item.company,
        summary: t(item.summary, lang),
      }),
    ),
  }));

  const education: EducationItem[] = (raw.education ?? []).map((item) => ({
    institution: t(item.institution as LocalizedString, lang),
    url: item.url,
    area: t(item.area as LocalizedString, lang),
    studyType: t(item.studyType as LocalizedString, lang),
    startDate: item.startDate,
    endDate: item.endDate,
    score: item.score,
    note: tOptional(
      ("note" in item ? item.note : undefined) as LocalizedString | undefined,
      lang,
    ),
  }));

  const skills: SkillGroup[] = (raw.skills ?? []).map((skill) => ({
    name:
      typeof skill.name === "string"
        ? skill.name
        : t(skill.name as LocalizedString, lang),
    level: skill.level,
    keywords: skill.keywords,
  }));

  const languages: LanguageItem[] = (raw.languages ?? []).map((item) => ({
    language: t(item.language as LocalizedString, lang),
    fluency: t(item.fluency as LocalizedString, lang),
  }));

  const interests: InterestItem[] = (raw.interests ?? []).map((item) => ({
    name: t(item.name as LocalizedString, lang),
    keywords: item.keywords,
  }));

  const projects: ProjectItem[] = (raw.projects ?? []).map((project) => ({
    name: project.name,
    slug: project.slug,
    isActive: Boolean(project.isActive),
    featured: Boolean(project.featured),
    category: tOptional(
      ("category" in project ? project.category : undefined) as
        | LocalizedString
        | undefined,
      lang,
    ),
    startDate: "startDate" in project ? project.startDate : null,
    endDate: "endDate" in project ? project.endDate : null,
    image: project.image,
    images: ("images" in project ? project.images : undefined) ?? [],
    description: t(project.description as LocalizedString, lang),
    details: project.details
      ? tList(project.details as LocalizedString[], lang)
      : [],
    highlights: project.highlights,
    technologies: project.technologies,
    url: project.url,
    github: project.github,
  }));

  return { basics, work, education, skills, languages, interests, projects };
}

const cvCache = new Map<Locale, Cv>();

/** Full CV resolved to a single language (memoized per locale). */
export function getCv(lang: Locale): Cv {
  let cv = cvCache.get(lang);
  if (!cv) {
    cv = buildCv(lang);
    cvCache.set(lang, cv);
  }
  return cv;
}

export type {
  Basics,
  EducationItem,
  InterestItem,
  LanguageItem,
  Profile,
  ProjectItem,
  SkillGroup,
  WorkItem,
} from "@/lib/cv/types";
