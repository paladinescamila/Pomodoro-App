import {create} from 'zustand';
import {INITIAL_SETTINGS} from '../constants/settings';

interface AppState {
	mode: Mode;
	setMode: (mode: Mode) => void;

	settings: Settings;
	setSettings: (settings: Settings) => void;

	settingsIsOpened: boolean;
	openSettings: () => void;
	closeSettings: () => void;
}

export const useAppStore = create<AppState>((set) => ({
	mode: 'pomodoro',
	setMode: (mode) => set({mode}),

	settings: INITIAL_SETTINGS,
	setSettings: (settings) => set({settings}),

	settingsIsOpened: false,
	openSettings: () => set({settingsIsOpened: true}),
	closeSettings: () => set({settingsIsOpened: false}),
}));
