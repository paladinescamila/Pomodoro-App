/**
 * Formats a given number of seconds into a string in the format "MM:SS".
 * @param seconds - The number of seconds to format.
 * @param format - The format to use for the output string.
 * @returns A string representing the formatted time in the specified format.
 */
export const formatSeconds = (seconds: number, format: 'MM:SS' | 'MMm SSs'): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(remainingSeconds).padStart(2, '0');

	return format === 'MM:SS'
		? `${formattedMinutes}:${formattedSeconds}`
		: `${formattedMinutes}m ${formattedSeconds}s`;
};
