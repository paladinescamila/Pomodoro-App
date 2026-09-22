import {act, renderHook} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {useCountDown} from './useCountDown';

const playNotification = vi.hoisted(() => vi.fn());

vi.mock('../utils/playNotification', () => ({playNotification}));

describe('useCountDown', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		playNotification.mockClear();
	});

	it('counts down while running and stops when paused', () => {
		const {result} = renderHook(() => useCountDown(3));

		act(() => result.current.start());
		expect(result.current.timerState).toBe('running');

		act(() => vi.advanceTimersByTime(1000));
		expect(result.current.secondsLeft).toBe(2);

		act(() => result.current.stop());
		act(() => vi.advanceTimersByTime(2000));
		expect(result.current.timerState).toBe('stopped');
		expect(result.current.secondsLeft).toBe(2);
	});

	it('completes at zero and plays a notification once', () => {
		const {result} = renderHook(() => useCountDown(2));

		act(() => result.current.start());
		act(() => vi.advanceTimersByTime(2000));

		expect(result.current.secondsLeft).toBe(0);
		expect(result.current.timerState).toBe('completed');
		expect(playNotification).toHaveBeenCalledOnce();

		act(() => vi.advanceTimersByTime(2000));
		expect(playNotification).toHaveBeenCalledOnce();
	});

	it('restarts with the initial duration after completion', () => {
		const {result} = renderHook(() => useCountDown(1));

		act(() => result.current.start());
		act(() => vi.advanceTimersByTime(1000));
		act(() => result.current.toggleTimer());

		expect(result.current.timerState).toBe('initial');
		expect(result.current.secondsLeft).toBe(1);
	});

	it('resets to a supplied duration', () => {
		const {result} = renderHook(() => useCountDown(3));

		act(() => result.current.start());
		act(() => vi.advanceTimersByTime(1000));
		act(() => result.current.reset(3));

		expect(result.current.timerState).toBe('initial');
		expect(result.current.secondsLeft).toBe(3);
	});
});
