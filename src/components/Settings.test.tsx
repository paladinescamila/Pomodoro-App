import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import Settings from './Settings';
import {useAppStore} from '../stores/app';
import {useSettingsStore} from '../stores/settings';
import {INITIAL_SETTINGS} from '../constants/settings';

describe('Settings', () => {
	beforeEach(() => {
		HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
			this.open = true;
		});

		afterEach(() => {
			cleanup();
		});
		useAppStore.setState({settingsIsOpened: true});
		useSettingsStore.setState({settings: INITIAL_SETTINGS});
	});

	it('updates a duration and applies the settings', () => {
		render(<Settings />);

		fireEvent.click(screen.getByRole('button', {name: 'Increase pomodoro time'}));
		fireEvent.click(screen.getByLabelText('Select mono font'));
		fireEvent.click(screen.getByLabelText('Select purple color theme'));
		fireEvent.click(screen.getByRole('button', {name: 'Apply'}));

		expect(useSettingsStore.getState().settings).toEqual({
			durations: {...INITIAL_SETTINGS.durations, pomodoro: 26},
			font: 'mono',
			color: 'purple',
		});
		expect(useAppStore.getState().settingsIsOpened).toBe(false);
	});

	it('shows the selected radio options as checked', () => {
		render(<Settings />);

		expect(
			Array.from(document.querySelectorAll<HTMLInputElement>('input[aria-label="Select sans font"]')).some(
				(input) => input.checked,
			),
		).toBe(true);
		expect(
			Array.from(
				document.querySelectorAll<HTMLInputElement>('input[aria-label="Select red color theme"]'),
			).some((input) => input.checked),
		).toBe(true);
	});
});
