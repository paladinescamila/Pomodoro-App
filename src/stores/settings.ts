import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {INITIAL_SETTINGS} from '../constants/settings';

interface SettingsState {
	settings: Settings;
	setSettings: (settings: Settings) => void;
}

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			settings: INITIAL_SETTINGS,
			setSettings: (settings) => set({settings}),
		}),
		{
			name: 'pomodoro-app-settings-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
