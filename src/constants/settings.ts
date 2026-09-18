export const INITIAL_SETTINGS: Settings = {
	durations: {
		pomodoro: 25,
		'short-break': 5,
		'long-break': 15,
	},
	font: 'sans',
	color: 'red',
};

export const MODES: Mode[] = ['pomodoro', 'short-break', 'long-break'];

export const MODES_NAMES: Record<Mode, string> = {
	pomodoro: 'pomodoro',
	'short-break': 'short break',
	'long-break': 'long break',
};

export const FONTS: Font[] = ['sans', 'serif', 'mono'];

export const COLORS: Color[] = ['red', 'cyan', 'purple'];
