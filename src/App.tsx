import {useState} from 'react';
import Logo from './assets/logo.svg';
import SettingsIcon from './assets/icon-settings.svg';
import Modes from './components/Modes';
import Timer from './components/Timer';
import Settings from './components/Settings';
import './index.css';

function App() {
	const [settingsIsOpened, setSettingsIsOpened] = useState<boolean>(false);

	return (
		<>
			<main className='bg-blue-850 px-6 py-8 md:py-12 flex flex-col items-center justify-center w-full h-dvh'>
				<header>
					<h1 className='sr-only'>pomodoro</h1>
					<img src={Logo} alt='Pomodoro logo' />
				</header>

				<Modes />
				<Timer />

				<footer>
					<button
						type='button'
						aria-label='Settings'
						className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity'
						onClick={() => setSettingsIsOpened(true)}>
						<img src={SettingsIcon} alt='Settings' />
					</button>
				</footer>
			</main>
			{settingsIsOpened && <Settings close={() => setSettingsIsOpened(false)} />}
		</>
	);
}

export default App;
