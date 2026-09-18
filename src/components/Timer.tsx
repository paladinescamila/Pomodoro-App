import {useEffect, useMemo} from 'react';
import {formatSeconds} from '../utils/formatSeconds';
import {useCountDown} from '../hooks/useCountDown';
import {useAppStore} from '../stores/app';
import {useResponsive} from '../hooks/useResponsive';
import {COLORS_STYLES, FONTS_STYLES} from '../constants/styles';
import {BUTTON_BY_TIMER_STATE, TEXT_BY_TIMER_STATE} from '../constants/timer-state';

export default function Timer() {
	const {mode, settings} = useAppStore();

	const totalSeconds = useMemo(() => settings.durations[mode] * 60, [mode, settings]);

	const {secondsLeft, timerState, toggleTimer, reset} = useCountDown(totalSeconds);

	const {isMobile} = useResponsive();

	useEffect(() => {
		reset(totalSeconds);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	const {size, strokeWidth, radius, circumference, strokeDashoffset} = useMemo(() => {
		const size = isMobile ? 250 : 339;
		const strokeWidth = isMobile ? 7 : 10;
		const radius = (size - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;

		const progress = 1 - (totalSeconds > 0 ? secondsLeft / totalSeconds : 0);
		const strokeDashoffset = circumference - progress * circumference;

		return {size, strokeWidth, radius, circumference, strokeDashoffset};
	}, [totalSeconds, secondsLeft, isMobile]);

	return (
		<section
			aria-label='Timer Controls'
			className='w-75 h-75 md:w-102.5 md:h-102.5 mb-16 flex items-center justify-center rounded-full gradient custom-shadow'>
			<div className='relative flex flex-col gap-2 items-center justify-center bg-blue-900 w-67 h-67 md:w-91.5 md:h-91.5 rounded-full'>
				<svg width={size} height={size} className='absolute -rotate-90 pointer-events-none'>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						className='stroke-blue-900'
						strokeWidth={strokeWidth}
						fill='transparent'
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						strokeWidth={strokeWidth}
						fill='transparent'
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap='round'
						className={`${COLORS_STYLES[settings.color].stroke} transition-all duration-1000 ease-linear`}
					/>
				</svg>

				<div role='region' aria-live='polite' aria-atomic='true' className='mt-7'>
					<time
						dateTime='17m 59s'
						className={`${FONTS_STYLES[settings.font]['text-preset-1']} text-blue-100`}>
						{formatSeconds(secondsLeft)}
					</time>
				</div>

				<button
					type='button'
					aria-label={TEXT_BY_TIMER_STATE[timerState]}
					onClick={toggleTimer}
					className={`${FONTS_STYLES[settings.font]['text-preset-2']} ${COLORS_STYLES[settings.color].text} transition-colors text-blue-100 uppercase cursor-pointer`}>
					{BUTTON_BY_TIMER_STATE[timerState]}
				</button>
			</div>
		</section>
	);
}
