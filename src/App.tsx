import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { myContext } from './utils/context/context'

import 'react-toastify/dist/ReactToastify.css'

function App() {
	const [activeLayout, setActiveLayout] = useState('home')
	const [isClicked, setIsClicked] = useState(0)
	const [activePopUp, setActivePopUp] = useState(false)
	const [activePopUpVote, setActivePopUpVote] = useState(false);
	const [activeProgressVote, setActiveProgressVote] = useState(0)

	const value = {
		activeLayout,
		setActiveLayout,
		isClicked,
		setIsClicked,
		activePopUp,
		setActivePopUp,
		activePopUpVote,
		setActivePopUpVote,
		activeProgressVote,
		setActiveProgressVote,
	}

	return (
		<>
			<myContext.Provider value={value}>
				<HashRouter>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/dashboard' element={<Dashboard />} />
					</Routes>
				</HashRouter>
				<ToastContainer />
			</myContext.Provider>
		</>
	)
}

export default App
