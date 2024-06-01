import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { myContext } from './utils/context/context';

function App() {
	const [activeLayout, setActiveLayout] = useState('home');
	const [isClicked, setIsClicked] = useState(0);
	const [activePopUp, setActivePopUp] = useState(false);
	const value = { activeLayout, setActiveLayout, isClicked, setIsClicked, activePopUp, setActivePopUp };
	
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
  );
}

export default App;
