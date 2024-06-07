import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAccount } from 'wagmi'

import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { myContext } from './utils/context/context'
import { CHAIN_ID, NETWORK_CHANGE_MESSAGE } from './constants'

import 'react-toastify/dist/ReactToastify.css'

function App() {
	const { address, isDisconnected } = useAccount()
	const [isListening, setIsListening] = useState<boolean>(true)

	const [activeLayout, setActiveLayout] = useState('home')
	const [asideActive, setAsideActive] = useState(false)
	const [isClicked, setIsClicked] = useState(0)
	const [activePopUp, setActivePopUp] = useState(false)
	const [activePopUpVote, setActivePopUpVote] = useState(false)
	const [activeProgressVote, setActiveProgressVote] = useState(0)

	const value = {
		activeLayout,
		setActiveLayout,
		asideActive,
		setAsideActive,
		isClicked,
		setIsClicked,
		activePopUp,
		setActivePopUp,
		activePopUpVote,
		setActivePopUpVote,
		activeProgressVote,
		setActiveProgressVote
	}

	const getStates = async () => {}

	const resetStates = () => {}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const ethereum = (window as any).ethereum

		if (!ethereum) {
			console.log('Ethereum object not found')
			return
		}

		const currentNetwork = async () => {
			const web3Provider: ethers.BrowserProvider = new ethers.BrowserProvider(
				ethereum
			)
			const web3ProviderNetwork: ethers.Network =
				await web3Provider.getNetwork()
			return Number(web3ProviderNetwork.chainId)
		}

		const handleAccountsChanged = async () => {
			const chainId: number = await currentNetwork()
			if (chainId === CHAIN_ID) {
				await getStates()
			} else {
				resetStates()
			}
		}

		const handleChainChanged = async () => {
			const chainId: number = await currentNetwork()
			if (chainId === CHAIN_ID) {
				setIsListening(false)
				await getStates()
			} else {
				setIsListening(true)
				resetStates()
				alert(NETWORK_CHANGE_MESSAGE)
			}
		}

		if (isListening) {
			ethereum.on('accountsChanged', handleAccountsChanged)
		}

		ethereum.on('chainChanged', handleChainChanged)

		// Initial check
		;(async () => {
			if (address && (await currentNetwork()) === CHAIN_ID) {
				setIsListening(false)
				await getStates()
			}

			if (isDisconnected) {
				resetStates()
			}
		})()

		return () => {
			if (ethereum.removeListener) {
				ethereum.removeListener('accountsChanged', handleAccountsChanged)
				ethereum.removeListener('chainChanged', handleChainChanged)
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address])

	return (
		<myContext.Provider value={value}>
			<HashRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/dashboard' element={<Dashboard />} />
				</Routes>
			</HashRouter>
			<ToastContainer />
		</myContext.Provider>
	)
}

export default App
