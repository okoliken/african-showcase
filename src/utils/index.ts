export type AlternativeSlugs = {
  en: string
  es?: string
  ja?: string
  fr?: string
  it?: string
  ko?: string
  de?: string
  pt?: string
}

export type Urls = {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
  small_s3: string
}

export type Links = {
  self: string
  html: string
  download: string
  download_location: string
}

export type UserLinks = {
  self: string
  html: string
  photos: string
  likes: string
  portfolio: string
  following: string
  followers: string
}

export type ProfileImage = {
  small: string
  medium: string
  large: string
}

export type UserSocial = {
  instagram_username: string
  portfolio_url: string
  twitter_username: string
  paypal_email: string | null
}

export type User = {
  id: string
  updated_at: string
  username: string
  name: string
  first_name: string
  last_name: string
  twitter_username: string
  portfolio_url: string
  bio: string
  location: string
  links: UserLinks
  profile_image: ProfileImage
  instagram_username: string
  total_collections: number
  total_likes: number
  total_photos: number
  total_promoted_photos: number
  total_illustrations: number
  total_promoted_illustrations: number
  accepted_tos: boolean
  for_hire: boolean
  social: UserSocial
}

export type TopicSubmissions = {
  status: string
  approved_on: string
}

export type Photo = {
  id: string
  slug: string
  alternative_slugs: AlternativeSlugs
  created_at: string
  updated_at: string
  promoted_at: string | null
  width: number
  height: number
  color: string
  blur_hash: string
  description: string
  alt_description: string
  breadcrumbs: string[]
  urls: Urls
  links: Links
  likes: number
  liked_by_user: boolean
  current_user_collections: string[]
  sponsorship: string | null
  topic_submissions: {
    [key: string]: TopicSubmissions
  }
  asset_type: string
  user: User
}
