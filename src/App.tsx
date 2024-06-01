import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
			<HashRouter>
				<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/dashboard' element={<Dashboard />} />
				</Routes>
			</HashRouter>
			<ToastContainer />
		</>
  );
}

export default App;
