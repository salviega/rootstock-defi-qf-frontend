import { IPFS_GATEWAY } from '@/utils/variables/constants'

function getAccessToken() {
	if (!import.meta.env.VITE_PINATA_API) {
		throw new Error('VITE_PINATA_API not found in .env file')
	}

	return import.meta.env.VITE_PINATA_API
}

export async function storeFile(file: File): Promise<string> {
	try {
		const formData = new FormData()
		formData.append('file', file)

		const response = await fetch(`${getAccessToken()}/ipfs/store-image`, {
			body: formData,
			method: 'POST'
		})

		const url = await response.text()

		return url
	} catch (error) {
		console.error('Error uploading file:', error)
		throw error
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function storeObject(object: any): Promise<string> {
	const response: Response = await fetch(
		`${getAccessToken()}/ipfs/store-any-object`,
		{
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(object),
			method: 'POST'
		}
	)

	if (!response.ok) {
		throw new Error(
			`Failed to upload JSON: ${response.status} - ${response.statusText}`
		)
	}

	const url: string = await response.text()

	return url
}
