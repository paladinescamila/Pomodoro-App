/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useRef, useCallback} from 'react';

/**
 * Custom hook to manage a countdown timer.
 * @param initialSeconds The initial number of seconds for the countdown.
 * @returns An object containing the current seconds left, a function to set seconds left, a boolean indicating if the timer is running, and functions to start, stop, and toggle the timer.
 */
export const useCountDown = (initialSeconds: number) => {
	const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
	const [timerState, setTimerState] = useState<TimerState>('initial');
	const timerRef = useRef<number | null>(null);

	const clearTimer = useCallback(() => {
		if (timerRef.current !== null) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const decrement = useCallback(
		() =>
			setSecondsLeft((seconds) => {
				if (seconds <= 1) {
					setTimerState('completed');
					clearTimer();
					return 0;
				}

				return seconds - 1;
			}),
		[],
	);

	const start = useCallback(() => {
		setTimerState('running');
		clearTimer();
		timerRef.current = setInterval(decrement, 1000);
	}, [decrement]);

	const stop = useCallback(() => {
		setTimerState('stopped');
		clearTimer();
	}, []);

	const restart = useCallback(() => {
		setTimerState('initial');
		clearTimer();
		setSecondsLeft(initialSeconds);
	}, [initialSeconds]);

	const toggleTimer = useCallback(
		() =>
			timerState === 'initial' || timerState === 'stopped'
				? start()
				: timerState === 'running'
					? stop()
					: restart(),
		[timerState],
	);

	const reset = useCallback(
		(secondsLeft: number) => {
			setSecondsLeft(secondsLeft);
			restart();
		},
		[restart],
	);

	useEffect(() => {
		const resetTimer = setTimeout(() => reset(initialSeconds), 0);

		return () => {
			clearTimeout(resetTimer);
			clearTimer();
		};
	}, [initialSeconds]);

	return {secondsLeft, timerState, start, stop, toggleTimer, reset};
};
