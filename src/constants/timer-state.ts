export const TEXT_BY_TIMER_STATE: Record<TimerState, string> = {
	initial: 'Start timer',
	running: 'Pause timer',
	stopped: 'Resume timer',
	completed: 'Restart timer',
};

export const BUTTON_BY_TIMER_STATE: Record<TimerState, string> = {
	initial: 'start',
	running: 'pause',
	stopped: 'resume',
	completed: 'restart',
};
