import {useState} from 'react';
import {createPortal} from 'react-dom';
import {useAppStore} from '../stores/app';
import {MODES, FONTS, COLORS, MODES_NAMES, MIN_DURATION, MAX_DURATION} from '../constants/settings';
import {FONTS_STYLES_SETTINGS} from '../constants/styles';
import {COLORS_STYLES} from '../constants/styles';
import CheckIcon from '../assets/icon-check.svg';
import ArrowUpIcon from '../assets/icon-arrow-up.svg';
import ArrowDownIcon from '../assets/icon-arrow-down.svg';

export default function Settings({close}: {close: () => void}) {
	const {settings, setSettings} = useAppStore();

	const [formData, setFormData] = useState<Settings>(settings);

	const onChangeTime = (mode: Mode, duration: string) =>
		setFormData({...formData, durations: {...formData.durations, [mode]: parseInt(duration, 10)}});

	const onChangeFont = (font: Font) => setFormData({...formData, font});
	const onChangeColor = (color: Color) => setFormData({...formData, color});

	const applyChanges = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSettings(formData);
		close();
	};

	const onClose = () => {
		setFormData(settings);
		close();
	};

	return createPortal(
		<dialog
			open={true}
			aria-labelledby='settings-heading'
			className='absolute inset-0 flex items-center justify-center w-full h-dvh bg-blue-850/50 backdrop-blur-sm p-4 z-20'>
			<div className='bg-white w-full md:w-135 px-9 pt-8 pb-14 rounded-3xl relative'>
				<header className='flex flex-row items-center justify-between'>
					<h2 id='settings-heading' className='text-preset-1-settings text-blue-900'>
						Settings
					</h2>
					<button
						type='button'
						aria-label='Close settings'
						className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity'
						onClick={onClose}>
						✕
					</button>
				</header>

				<hr className='w-full h-px bg-blue-900 opacity-10 my-8' />

				<form method='dialog' onSubmit={applyChanges}>
					<fieldset className='flex flex-col'>
						<legend className='text-preset-3-settings text-blue-900 uppercase mb-4 text-center md:text-start'>
							Time (Minutes)
						</legend>

						<div className='flex flex-col md:flex-row gap-2 md:gap-6'>
							{MODES.map((mode) => (
								<div
									key={mode}
									className='flex flex-row md:flex-col items-center md:items-start justify-between gap-2 flex-1'>
									<label
										htmlFor={`${mode}-time`}
										className='text-preset-4-settings text-blue-850 opacity-40'>
										{MODES_NAMES[mode]}
									</label>
									<div className='relative w-35 md:w-full'>
										<input
											type='number'
											id={`${mode}-time`}
											name={`${mode}Time`}
											value={formData.durations[mode]}
											onChange={(e) => onChangeTime(mode, e.target.value)}
											min={MIN_DURATION}
											max={MAX_DURATION}
											className='text-preset-3-settings text-blue-900 p-4 w-full custom-rounded bg-blue-50 outline outline-transparent focus:outline-blue-850/25 transition-colors'
										/>
										<div className='flex flex-col gap-2 absolute right-4 top-1/2 -translate-y-1/2'>
											<button
												type='button'
												aria-label='Increase time'
												className='opacity-25 hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed disabled:hover:opacity-25'
												disabled={formData.durations[mode] >= MAX_DURATION}
												onClick={() =>
													onChangeTime(mode, (formData.durations[mode] + 1).toString())
												}>
												<img src={ArrowUpIcon} alt='Increase time' className='w-3' />
											</button>
											<button
												type='button'
												aria-label='Decrease time'
												className='opacity-25 hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed disabled:hover:opacity-25'
												disabled={formData.durations[mode] <= MIN_DURATION}
												onClick={() =>
													onChangeTime(mode, (formData.durations[mode] - 1).toString())
												}>
												<img src={ArrowDownIcon} alt='Decrease time' className='w-3' />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</fieldset>

					<hr className='w-full h-px bg-blue-900 opacity-10 my-6' />

					<fieldset>
						<legend className='sr-only'>Font</legend>

						<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
							<span className='text-preset-3-settings text-blue-900 uppercase'>Font</span>
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
											defaultChecked={formData.font === font}
										/>
										<label
											htmlFor={`font-${font}`}
											className={`${FONTS_STYLES_SETTINGS[font]} w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:outline hover:outline-blue-50 hover:outline-offset-3 ${formData.font === font ? 'bg-blue-900 text-white' : 'bg-blue-50 text-blue-850/70'}`}>
											<span aria-hidden='true'>Aa</span>
										</label>
									</div>
								))}
							</div>
						</div>
					</fieldset>

					<hr className='w-full h-px bg-blue-900 opacity-10 my-6' />

					<fieldset>
						<legend className='sr-only'>Color</legend>

						<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
							<span className='text-preset-3-settings text-blue-900 uppercase'>Color</span>
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
											defaultChecked={formData.color === color}
										/>
										<label
											htmlFor={`color-${color}`}
											className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center hover:outline hover:outline-blue-50 hover:outline-offset-3  ${COLORS_STYLES[color].background}`}>
											<span className='sr-only'>{color} theme</span>
											{formData.color === color && <img src={CheckIcon} />}
										</label>
									</div>
								))}
							</div>
						</div>
					</fieldset>

					<footer className='absolute left-1/2 -translate-x-1/2 -bottom-6'>
						<button
							type='submit'
							className='w-35 p-4 bg-red-400 rounded-full text-preset-2-settings-font-1 text-white cursor-pointer'>
							Apply
						</button>
					</footer>
				</form>
			</div>
		</dialog>,
		document.body,
	);
}
