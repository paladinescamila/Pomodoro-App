import {useState, useEffect, useRef, useCallback} from 'react';

/**
 * Custom hook to manage a countdown timer.
 * @param initialSeconds The initial number of seconds for the countdown.
 * @returns An object containing the current seconds left, a function to set seconds left, a boolean indicating if the timer is running, and functions to start, stop, and toggle the timer.
 */
export const useCountDown = (initialSeconds: number) => {
	const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		if (isRunning) {
			const decrement = () => setSecondsLeft((prevSeconds) => prevSeconds - 1);
			timerRef.current = setTimeout(decrement, 1000);
		} else if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [isRunning, secondsLeft]);

	const start = useCallback(() => setIsRunning(true), []);
	const stop = useCallback(() => setIsRunning(false), []);
	const toggleTimer = useCallback(() => setIsRunning((prev) => !prev), []);

	const reset = useCallback(
		(secondsLeft: number = initialSeconds) => {
			setSecondsLeft(secondsLeft);
			setIsRunning(false);

			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		},
		[initialSeconds],
	);

	return {secondsLeft, isRunning, start, stop, toggleTimer, reset};
};
