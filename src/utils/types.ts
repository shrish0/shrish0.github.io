
import { InformationCards } from '@/utils/constants'

export type InformationCardType = (typeof InformationCards)[keyof typeof InformationCards]

export type SocialIcon = 'linkedin-logo' | 'github-logo' | string

export interface CustomField {
  id: string
  icon?: SocialIcon
  text?: string
  link?: string
}

export interface Basics {
  name: string
  headline: string
  email: string
  phone: string
  location: string
  website: {
    url: string
    label: string
  }
  customFields: CustomField[]
}

export interface ResumeData {
  picture: {
    hidden: boolean
    url: string
    size: number
    rotation: number
    aspectRatio: number
    borderRadius: number
    borderColor: string
    borderWidth: number
    shadowColor: string
    shadowWidth: number
  }
  basics: Basics
}

