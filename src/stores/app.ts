import {create} from 'zustand';

interface AppState {
	mode: Mode;
	setMode: (mode: Mode) => void;

	settingsIsOpened: boolean;
	openSettings: () => void;
	closeSettings: () => void;
}

export const useAppStore = create<AppState>((set) => ({
	mode: 'pomodoro',
	setMode: (mode: Mode) => set({mode}),

	settingsIsOpened: false,
	openSettings: () => set({settingsIsOpened: true}),
	closeSettings: () => set({settingsIsOpened: false}),
}));
