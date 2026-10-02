import {act, cleanup, fireEvent, render, screen} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import Timer from './Timer';
import {useAppStore} from '../stores/app';
import {useSettingsStore} from '../stores/settings';
import {INITIAL_SETTINGS} from '../constants/settings';

const countdown = vi.hoisted(() => ({
	secondsLeft: 1500,
	timerState: 'initial' as TimerState,
	toggleTimer: vi.fn(),
}));

vi.mock('../hooks/useCountDown', () => ({
	useCountDown: () => countdown,
}));

vi.mock('../hooks/useResponsive', () => ({
	useResponsive: () => ({isMobile: false}),
}));

describe('Timer', () => {
	beforeEach(() => {
		useAppStore.setState({mode: 'pomodoro'});
		useSettingsStore.setState({settings: INITIAL_SETTINGS});
		countdown.secondsLeft = 1500;
		countdown.timerState = 'initial';
		countdown.toggleTimer.mockClear();
	});

	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	it('renders the formatted countdown and controls the timer', () => {
		render(<Timer />);

		expect(screen.getByText('25:00')).toBeTruthy();
		const button = screen.getByRole('button', {name: 'Start timer'});
		fireEvent.click(button);

		expect(countdown.toggleTimer).toHaveBeenCalledOnce();
	});

	it('announces meaningful timer state changes', () => {
		const {rerender} = render(<Timer />);
		const getAnnouncement = () => document.querySelector('[aria-live="polite"]');

		expect(getAnnouncement()?.textContent).toBe('');

		countdown.timerState = 'running';
		act(() => rerender(<Timer />));
		expect(getAnnouncement()?.textContent).toBe('Timer started');

		countdown.timerState = 'completed';
		act(() => rerender(<Timer />));
		expect(getAnnouncement()?.textContent).toBe('Timer completed');
	});
});
