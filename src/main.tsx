import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GisfApp } from './GisfApp';
import './index.css';
// import { MyCounterApp } from './counter/components/MyCounterApp';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GisfApp />
		{/* <MyCounterApp /> */}
	</StrictMode>,
);
