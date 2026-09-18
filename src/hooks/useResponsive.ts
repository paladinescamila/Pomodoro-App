import {useEffect, useState} from 'react';

/**
 * A custom React hook that determines if the current viewport is considered "mobile" based on its width.
 * @returns An object containing a boolean value `isMobile` that indicates whether the viewport width is less than 768 pixels.
 */
export const useResponsive = () => {
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {isMobile};
};
