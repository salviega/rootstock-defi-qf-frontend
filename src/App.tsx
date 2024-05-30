import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

import Home from './pages/Home';

function App() {
  return (
    <>
			<HashRouter>
				<Routes>
						<Route path='/' element={<Home />} />
				</Routes>
			</HashRouter>
			<ToastContainer />
		</>
  );
}

export default App;
