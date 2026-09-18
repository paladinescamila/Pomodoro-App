import {MODES, MODES_NAMES} from '../constants/settings';
import {COLORS_STYLES, FONTS_STYLES} from '../constants/styles';
import {useAppStore} from '../stores/app';

export default function Modes() {
	const {mode, setMode, settings} = useAppStore();

	return (
		<section aria-label='Timer Mode Selection' className='w-full'>
			<nav className='mt-10 md:mt-14 mb-12 md:mb-9 w-full flex flex-row items-center justify-center'>
				<ul className='flex flex-row bg-blue-900 rounded-full px-2.5 py-[7.5px] w-full md:w-max'>
					{MODES.map((modeItem) => (
						<li key={modeItem} className='w-full md:w-30 h-12'>
							<button
								type='button'
								aria-pressed='true'
								className={`${FONTS_STYLES[settings.font]['text-preset-3']} transition-all w-full h-full rounded-full cursor-pointer ${mode === modeItem ? `text-blue-850 ${COLORS_STYLES[settings.color].background}` : 'text-blue-100 opacity-40 hover:opacity-100'}`}
								onClick={() => setMode(modeItem)}>
								{MODES_NAMES[modeItem]}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</section>
	);
}
