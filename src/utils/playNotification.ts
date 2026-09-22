import NotificationSound from './../assets/notification.mp3';

/**
 * Plays a notification sound.
 */
export const playNotification = () => {
	const audio = new Audio(NotificationSound);

	audio.play().catch((error) => {
		console.error('Error playing notification sound:', error);
	});
};
