import { Composition } from 'remotion';
import { MainVideo } from './Video';
import { FPS, WIDTH, HEIGHT, DURATION_IN_FRAMES } from './constants';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="ComparisonVideo"
				component={MainVideo}
				durationInFrames={DURATION_IN_FRAMES}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
			/>
		</>
	);
};
