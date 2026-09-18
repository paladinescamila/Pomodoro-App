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
	pomodoro: 'Pomodoro',
	'short-break': 'short break',
	'long-break': 'long break',
};

export const FONTS: Font[] = ['sans', 'serif', 'mono'];

export const COLORS: Color[] = ['red', 'cyan', 'purple'];

export const COLORS_STYLES: Record<Color, string> = {
	red: 'bg-red-400',
	cyan: 'bg-cyan-300',
	purple: 'bg-purple-400',
};
