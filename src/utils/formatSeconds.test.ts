import {describe, expect, it} from 'vitest';
import {formatSeconds} from './formatSeconds';

describe('formatSeconds', () => {
	it('formats seconds as a timer value', () => {
		expect(formatSeconds(0, 'mm:ss')).toBe('00:00');
		expect(formatSeconds(65, 'mm:ss')).toBe('01:05');
		expect(formatSeconds(3600, 'mm:ss')).toBe('60:00');
	});

	it('formats seconds as an ISO 8601 duration', () => {
		expect(formatSeconds(65)).toBe('PT01M05S');
	});
});
