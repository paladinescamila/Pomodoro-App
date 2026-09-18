import {createPortal} from 'react-dom';
import {MODES, FONTS, COLORS, MODES_NAMES} from '../constants/settings';
import {FONTS_STYLES_SETTINGS} from '../constants/styles';
import {COLORS_STYLES} from '../constants/styles';
import CheckIcon from '../assets/icon-check.svg';

export default function Settings({
	isOpen,
	setIsOpen,
	settings,
	setSettings,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	settings: Settings;
	setSettings: (settings: Settings) => void;
}) {
	const onChangeTime = (mode: Mode, duration: string) =>
		setSettings({...settings, durations: {...settings.durations, [mode]: parseInt(duration, 10)}});

	const onChangeFont = (font: Font) => setSettings({...settings, font});
	const onChangeColor = (color: Color) => setSettings({...settings, color});

	const applyChanges = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsOpen(false);
	};

	return createPortal(
		<dialog
			open={isOpen}
			aria-labelledby='settings-heading'
			className='bg-white w-135 px-9 py-8 absolute top-1/2 left-1/2 -translate-1/2 rounded-3xl'>
			<header className='flex flex-row items-center justify-between'>
				<h2 id='settings-heading' className='text-preset-1-settings text-blue-900'>
					Settings
				</h2>
				<button
					type='button'
					aria-label='Close settings'
					className='cursor-pointer'
					onClick={() => setIsOpen(false)}>
					✕
				</button>
			</header>

			<hr className='w-full h-px bg-blue-900 opacity-10 my-8' />

			<form method='dialog' onSubmit={applyChanges}>
				<fieldset className='flex flex-col'>
					<legend className='text-preset-3-settings text-blue-900 uppercase mb-4'>
						Time (Minutes)
					</legend>

					<div className='flex flex-row gap-6'>
						{MODES.map((mode) => (
							<div key={mode} className='flex flex-col gap-2 flex-1'>
								<label
									htmlFor={`${mode}-time`}
									className='text-preset-4-settings text-blue-800 opacity-40'>
									{MODES_NAMES[mode]}
								</label>
								<input
									type='number'
									id={`${mode}-time`}
									name={`${mode}Time`}
									defaultValue={25}
									value={settings.durations[mode]}
									onChange={(e) => onChangeTime(mode, e.target.value)}
									min={1}
									max={60}
									className='text-preset-3-settings text-blue-900 p-4 custom-rounded bg-blue-50'
								/>
							</div>
						))}
					</div>
				</fieldset>

				<hr className='w-full h-px bg-blue-900 opacity-10 my-6' />

				<fieldset className='flex flex-row items-center justify-between'>
					<legend className='text-preset-3-settings text-blue-900 uppercase'>Font</legend>

					<div className='flex flex-row gap-4 items-center justify-center'>
						{FONTS.map((font) => (
							<div key={font}>
								<input
									type='radio'
									id={`font-${font}`}
									name='fontTheme'
									value={font}
									className='sr-only'
									onChange={() => onChangeFont(font)}
									defaultChecked={settings.font === font}
								/>
								<label
									htmlFor={`font-${font}`}
									className={`${FONTS_STYLES_SETTINGS[font]} w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${settings.font === font ? 'bg-blue-900 text-white' : 'bg-blue-50 text-blue-850'}`}>
									<span aria-hidden='true'>Aa</span>
								</label>
							</div>
						))}
					</div>
				</fieldset>

				<hr className='w-full h-px bg-blue-900 opacity-10 my-6' />

				<fieldset className='flex flex-row items-center justify-between'>
					<legend className='text-preset-3-settings text-blue-900 uppercase'>Color</legend>

					<div className='flex flex-row gap-4 items-center justify-center'>
						{COLORS.map((color) => (
							<div key={color}>
								<input
									type='radio'
									id={`color-${color}`}
									name='colorTheme'
									value={color}
									className='sr-only'
									onChange={() => onChangeColor(color)}
									defaultChecked={settings.color === color}
								/>
								<label
									htmlFor={`color-${color}`}
									className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${COLORS_STYLES[color].background}`}>
									<span className='sr-only'>{color} theme</span>
									{settings.color === color && <img src={CheckIcon} />}
								</label>
							</div>
						))}
					</div>
				</fieldset>

				<footer className='absolute left-1/2 -translate-x-1/2'>
					<button
						type='submit'
						className='w-35 p-4 bg-red-400 rounded-full text-preset-2-settings-font-1 text-white cursor-pointer'>
						Apply
					</button>
				</footer>
			</form>
		</dialog>,
		document.body,
	);
}
