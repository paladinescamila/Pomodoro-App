/**
 * Formats a given number of seconds into a string in the format "MM:SS".
 * @param seconds - The number of seconds to format.
 * @returns A string representing the formatted time in "MM:SS" format.
 */
export const formatSeconds = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(remainingSeconds).padStart(2, '0');

	return `${formattedMinutes}:${formattedSeconds}`;
};
