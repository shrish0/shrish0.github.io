export const SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  CONTACT: 'contact',
}

export const SKILL_ICONS: Record<string, string> = {
  javascript: 'logos:javascript',
  react: 'logos:react',
  vue: 'logos:vue',
  html: 'logos:html-5',
  css: 'logos:css-3',
  nodejs: 'logos:nodejs-icon',
  git: 'logos:git-icon',
  typescript: 'logos:typescript-icon',
  'c#': 'logos:c-sharp',
  net: 'logos:dotnet',
  java: 'logos:java',
  python: 'logos:python',
  sql: 'logos:postgresql',
  fastapi: 'logos:fastapi-icon',
  django: 'logos:django-icon',
  redis: 'logos:redis',
  mongodb: 'logos:mongodb-icon',
  'aspnet mvc': 'logos:dotnet',
}
export const SOCIAL_LINKS = {
  GITHUB: '',
  LINKEDIN: '',
  TWITTER: '',
  FACEBOOK: '',
}

export const InformationCards = {
  Education: 'Education',
  EXP: 'Experience',
  SKILLS: 'Skills',
  PROJECTS: 'Projects',
  AWARDS: 'Awards',
  HOBBIES: 'Hobbies',
  LANGUAGES: 'Languages',
  FRAMEWORKS: 'Frameworks',
}

export type InformationCardType = (typeof InformationCards)[keyof typeof InformationCards]
