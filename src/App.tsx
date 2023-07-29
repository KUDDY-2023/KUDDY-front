import React from 'react';
import YouTube from './pages/youtube';

import {BrowserRouter} from 'react-router-dom';
function App() {
	return (
		<BrowserRouter>
			<YouTube />
			<p>프로젝트 세팅</p>
		</BrowserRouter>
	);
}

export default App;
