import {INITIAL_SETTINGS} from '../constants/settings';

/**
 * Converts a given number of minutes into seconds.
 * @param minutes - The number of minutes to convert.
 * @returns The equivalent number of seconds.
 */
export const getSecondsOfMode = (mode: Mode): number => INITIAL_SETTINGS.durations[mode] * 60;
