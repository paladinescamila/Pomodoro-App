import {useState} from 'react';
import Logo from './assets/logo.svg';
import SettingsIcon from './assets/icon-settings.svg';
import {INITIAL_SETTINGS, MODES, MODES_NAMES} from './constants/settings';
import {formatSeconds} from './utils/formatSeconds';
import Settings from './components/Settings';
import {useCountDown} from './hooks/useCountDown';
import {getSecondsOfMode} from './utils/getSecondsOfMode';
import {COLORS_STYLES, FONTS_STYLES} from './constants/styles';
import './index.css';

function App() {
	const [mode, setMode] = useState<Mode>('pomodoro');

	// Handle mode
	const handleModeChange = (newMode: Mode) => {
		setMode(newMode);
		reset(getSecondsOfMode(newMode));
	};

	// Handle timer countdown
	const {secondsLeft, isRunning, toggleTimer, reset} = useCountDown(getSecondsOfMode(mode));

	// Handle settings
	const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);
	const [settingsIsOpened, setSettingsIsOpened] = useState<boolean>(false);

	return (
		<>
			<main className='bg-blue-850 p-12 flex flex-col items-center w-full h-full'>
				<header>
					<h1 className='sr-only'>pomodoro</h1>
					<img src={Logo} alt='Pomodoro logo' />
				</header>

				<section aria-label='Timer Mode Selection'>
					<nav className='mt-14 mb-9'>
						<ul className='flex flex-row bg-blue-900 rounded-full px-2.5 py-[7.5px] w-max'>
							{MODES.map((modeItem) => (
								<li key={modeItem}>
									<button
										type='button'
										aria-pressed='true'
										className={`${FONTS_STYLES[settings.font]['text-preset-3'].main} w-30 h-12 rounded-full cursor-pointer ${mode === modeItem ? `text-blue-850 ${COLORS_STYLES[settings.color].background}` : 'text-blue-100 opacity-40 hover:opacity-100'}`}
										onClick={() => handleModeChange(modeItem)}>
										{MODES_NAMES[modeItem]}
									</button>
								</li>
							))}
						</ul>
					</nav>
				</section>

				<section
					aria-label='Timer Controls'
					className='mb-16 flex flex-col items-center justify-center bg-blue-900 w-91.5 h-91.5 rounded-full'>
					<div role='region' aria-live='polite' aria-atomic='true'>
						<time
							dateTime='17m 59s'
							className={`${FONTS_STYLES[settings.font]['text-preset-1'].main} text-blue-100`}>
							{formatSeconds(secondsLeft)}
						</time>
					</div>
					<button
						type='button'
						aria-label='Pause timer'
						onClick={toggleTimer}
						className={`${FONTS_STYLES[settings.font]['text-preset-2'].main} text-blue-100 ${COLORS_STYLES[settings.color].text} uppercase cursor-pointer`}>
						{isRunning ? 'pause' : 'start'}
					</button>
				</section>

				<footer>
					<button
						type='button'
						aria-label='Settings'
						className='cursor-pointer opacity-50 hover:opacity-100'
						onClick={() => setSettingsIsOpened(true)}>
						<img src={SettingsIcon} alt='Settings' />
					</button>
				</footer>
			</main>
			<Settings
				isOpen={settingsIsOpened}
				setIsOpen={setSettingsIsOpened}
				settings={settings}
				setSettings={setSettings}
			/>
		</>
	);
}

export default App;
