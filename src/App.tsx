import { Player } from '@remotion/player';
import { RemotionRoot } from './remotion/Root';
import { MainVideo } from './remotion/Video';
import { FPS, WIDTH, HEIGHT, DURATION_IN_FRAMES } from './remotion/constants';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        <Player
          component={MainVideo}
          durationInFrames={DURATION_IN_FRAMES}
          compositionWidth={WIDTH}
          compositionHeight={HEIGHT}
          fps={FPS}
          controls
          autoPlay
          loop
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <div className="mt-8 text-center text-gray-400 space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">Canada vs USA</h1>
        <p className="text-sm">Remotion Video Project — Previewing in Browser</p>
        <div className="flex gap-4 justify-center mt-4">
            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs border border-gray-700">1920x1080</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs border border-gray-700">60 Seconds</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs border border-gray-700">30 FPS</span>
        </div>
      </div>
    </div>
  );
}
