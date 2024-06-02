import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import React from 'react'

import './index.css'
import App from './App.tsx'
import '@rainbow-me/rainbowkit/styles.css'
import { rainbowkitConfig } from './config/rainbowkit/index.ts'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<WagmiProvider config={rainbowkitConfig()}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					locale='en-US'
					theme={lightTheme({
						accentColorForeground: '#ffffff',
						accentColor: '#037171',
						borderRadius: 'large'
					})}
				>
					<App />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</React.StrictMode>
)
