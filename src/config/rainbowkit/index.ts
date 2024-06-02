import { getDefaultConfig } from '@rainbow-me/rainbowkit'

import { RAINBOW_KIT_APP_NAME } from '../commons'

import { rsktestnet } from './chains'

export const rainbowkitConfig = () => {
	const projectId: string = import.meta.env.VITE_WC_PROJECT_ID

	if (!projectId) {
		throw new Error('set VITE_WC_PROJECT_ID in .env')
	}

	return getDefaultConfig({
		appName: RAINBOW_KIT_APP_NAME,
		projectId,
		chains: [rsktestnet]
	})
}
