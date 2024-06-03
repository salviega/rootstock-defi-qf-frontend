import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { WagmiProvider } from 'wagmi'

import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { rainbowkitConfig } from './config/rainbowkit/index.ts'
import { store } from './store/index.ts'
import App from './App.tsx'

import './index.css'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
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
		</Provider>
	</React.StrictMode>
)
