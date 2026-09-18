type Settings = {
	durations: Durations;
	font: Font;
	color: Color;
};

type Durations = Record<Mode, number>;
type Font = 'sans' | 'serif' | 'mono';
type Color = 'red' | 'cyan' | 'purple';
