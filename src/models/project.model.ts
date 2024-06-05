export interface Project {
	website: string
	github: string
	twitter: string
	amountDistributed: number
	banner: string
	description: string
	logo: string
	name: string
	recipientId: string
	slogan: string
	tags: string[]
}

export interface ProjectDto {
	amountDistributed: number
	banner: File
	description: string
	logo: File
	name: string
	recipientId: string
	slogan: string
	tags: string[]
	media: string[]
}