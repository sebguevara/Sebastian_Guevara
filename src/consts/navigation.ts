import { getCopy } from "@/consts/copy";
import { localizePath, type Locale } from "@/consts/locale";
import { getCv } from "@/lib/cv";

export type NavItem = {
  title: string;
  label: string;
  url: string;
  icon: string;
};

export type SocialItem = {
  title: string;
  label: string;
  url: string;
  icon: string;
};

const navBase = [
  { key: "home", label: "home", hash: "#home", icon: "Logo" },
  { key: "experience", label: "experience", hash: "#experience", icon: "Briefcase" },
  { key: "projects", label: "projects", hash: "#projects", icon: "FileCode" },
  { key: "education", label: "education", hash: "#education", icon: "School" },
  { key: "about", label: "about", hash: "#about", icon: "About" },
] as const;

/** Locale-aware nav: titles from copy, urls prefixed for the active locale. */
export function getNav(lang: Locale): NavItem[] {
  const copy = getCopy(lang);
  const base = localizePath("/", lang);
  return navBase.map((item) => ({
    title: copy.nav[item.key],
    label: item.label,
    url: `${base}${item.hash}`,
    icon: item.icon,
  }));
}

const socialIconByNetwork: Record<string, string> = {
  GitHub: "Github",
  LinkedIn: "Linkedin",
  Email: "Email",
};

/** Rail social links, derived from cv.json profiles + email. */
export function getSocial(lang: Locale): SocialItem[] {
  const { basics } = getCv(lang);
  return [
    ...basics.profiles
      .filter((profile) => socialIconByNetwork[profile.network])
      .map((profile) => ({
        title: profile.network,
        label: profile.network.toLowerCase(),
        url: profile.url,
        icon: socialIconByNetwork[profile.network],
      })),
    {
      title: "Email",
      label: "email",
      url: `mailto:${basics.email}`,
      icon: "Email",
    },
  ];
}
