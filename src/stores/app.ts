import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {INITIAL_SETTINGS} from '../constants/settings';

interface AppState {
	mode: Mode;
	setMode: (mode: Mode) => void;

	settings: Settings;
	setSettings: (settings: Settings) => void;
}

export const useAppStore = create<AppState>()(
	persist(
		(set) => ({
			mode: 'pomodoro',
			setMode: (mode: Mode) => set({mode}),

			settings: INITIAL_SETTINGS,
			setSettings: (settings: Settings) => set({settings}),
		}),
		{
			name: 'pomodoro-app-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
