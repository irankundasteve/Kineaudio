import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  AbsoluteFill,
  Series,
  Easing
} from 'remotion';
import React, { useMemo } from 'react';
import '../index.css';

// Load fonts
const { fontFamily: montserratBold } = loadMontserrat("normal", { weights: ["700"] });
const { fontFamily: montserratExtraBold } = loadMontserrat("normal", { weights: ["800"] });
const { fontFamily: montserratSemiBold } = loadMontserrat("normal", { weights: ["600"] });
const { fontFamily: interRegular } = loadInter("normal", { weights: ["400"] });
const { fontFamily: interBold } = loadInter("normal", { weights: ["700"] });
const { fontFamily: interExtraBold } = loadInter("normal", { weights: ["800"] });
const { fontFamily: interSemiBold } = loadInter("normal", { weights: ["600"] });

// Components
const FilmGrain: React.FC<{ opacity: number }> = ({ opacity }) => (
  <AbsoluteFill style={{ pointerEvents: 'none', opacity }}>
    <svg width="100%" height="100%">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" fill="white" />
    </svg>
  </AbsoluteFill>
);

const FractalNoiseBG: React.FC<{ evolution: number; opacity: number; color?: string }> = ({ evolution, opacity, color = "white" }) => (
  <AbsoluteFill style={{ opacity, mixBlendMode: 'screen' }}>
    <svg width="100%" height="100%">
      <filter id="fractal">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="5" seed={Math.floor(evolution)} />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#fractal)" fill={color} />
    </svg>
  </AbsoluteFill>
);

const DustParticles: React.FC<{ count: number; color: string; speed?: number }> = ({ count, color, speed = 0.5 }) => {
  const frame = useCurrentFrame();
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: 2 + Math.random() * 6,
      opacity: 0.1 + Math.random() * 0.4,
      seed: Math.random(),
    }));
  }, [count]);

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const currentY = (p.y - frame * speed * (p.size / 4) + 1080) % 1080;
        return (
          <div 
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: currentY,
              width: p.size,
              height: p.size,
              backgroundColor: color,
              borderRadius: '50%',
              opacity: p.opacity,
              boxShadow: `0 0 10px ${color}66`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Scanlines: React.FC<{ opacity: number; speed?: number }> = ({ opacity, speed = 20 }) => {
  const frame = useCurrentFrame();
  const yOffset = (frame * speed) % 80;
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '100% 4px',
        transform: `translateY(${yOffset}px)`,
      }} />
    </AbsoluteFill>
  );
};

// Animated Text Component
const KineticText: React.FC<{
  text: string;
  fontFamily: string;
  size: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  x?: number;
  y?: number;
  enterType?: 'slide-up' | 'fade-blur' | 'slide-right' | 'scale-pop' | 'typewriter' | 'none';
  exitType?: 'slide-up' | 'scale-fade' | 'slide-right' | 'fade' | 'slide-down' | 'none';
  staggerType?: 'word' | 'clause' | 'none';
  staggerDelay?: number;
  emphasis?: string[];
  emphasisColor?: string;
}> = ({
  text,
  fontFamily,
  size,
  color = "white",
  textAlign = 'center',
  x = 960,
  y = 540,
  enterType = 'slide-up',
  exitType = 'fade',
  staggerType = 'none',
  staggerDelay = 70,
  emphasis = [],
  emphasisColor = "#00F3FF"
}) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const fps = config.fps;
  const seqDuration = config.durationInFrames;

  const t = frame;
  const enterDuration = 24; // ~800ms
  const exitDuration = 18; // ~600ms

  const renderContent = () => {
    if (staggerType === 'word') {
      const words = text.split(' ');
      return words.map((word, i) => {
        const wordDelay = (i * staggerDelay) / (1000 / fps);
        const wordProgress = Math.max(0, Math.min(1, (t - wordDelay) / enterDuration));
        
        let wordOpacity = interpolate(wordProgress, [0, 1], [0, 1]);
        let wordY = interpolate(wordProgress, [0, 1], [40, 0], { easing: Easing.bezier(0.35, 0, 0.35, 1) });
        let wordScale = interpolate(wordProgress, [0, 1], [0.92, 1]);
        
        if (t > seqDuration - exitDuration) {
          const exitT = t - (seqDuration - exitDuration);
          const revIndex = words.length - 1 - i;
          const exitWordDelay = (revIndex * staggerDelay) / (1000 / fps);
          const exitProgress = Math.max(0, Math.min(1, (exitT - exitWordDelay) / exitDuration));
          wordOpacity *= interpolate(exitProgress, [0, 1], [1, 0]);
          wordY -= interpolate(exitProgress, [0, 1], [0, 30]);
        }

        const isEmphasized = emphasis.some(e => word.toLowerCase().includes(e.toLowerCase()));

        return (
          <span key={i} style={{ 
            display: 'inline-block', 
            opacity: wordOpacity, 
            transform: `translateY(${wordY}px) scale(${wordScale})`,
            marginRight: '0.25em',
            color: isEmphasized ? emphasisColor : color,
            fontWeight: isEmphasized ? 'bold' : 'inherit'
          }}>
            {word}
          </span>
        );
      });
    }

    if (staggerType === 'clause') {
        const parts = text.split(/([,—]|biology|psychology|culture|health|genetics|capability|Confidence|behavior|emotional intelligence)/);
        return parts.map((part, i) => {
            if (!part) return null;
            const partDelay = (i * 140) / (1000 / fps);
            const progress = Math.max(0, Math.min(1, (t - partDelay) / enterDuration));
            let pOpacity = interpolate(progress, [0, 1], [0, 1]);
            let pScale = interpolate(progress, [0, 1], [0.9, 1]);

            if (t > seqDuration - exitDuration) {
                const exitT = t - (seqDuration - exitDuration);
                const exitProgress = Math.max(0, Math.min(1, exitT / exitDuration));
                pOpacity *= interpolate(exitProgress, [0, 1], [1, 0]);
                pScale *= interpolate(exitProgress, [0, 1], [1, 0.96]);
            }

            return (
                <span key={i} style={{ 
                    display: 'inline-block', 
                    opacity: pOpacity, 
                    transform: `scale(${pScale})`,
                }}>
                    {part}
                </span>
            );
        });
    }

    const progress = Math.max(0, Math.min(1, t / enterDuration));
    let opacity = interpolate(progress, [0, 1], [0, 1]);
    let transform = '';
    let filter = '';

    if (enterType === 'slide-up') {
      const ty = interpolate(progress, [0, 1], [40, 0], { easing: Easing.bezier(0.35, 0, 0.35, 1) });
      const ts = interpolate(progress, [0, 1], [0.92, 1]);
      transform = `translateY(${ty}px) scale(${ts})`;
    } else if (enterType === 'fade-blur') {
      filter = `blur(${interpolate(progress, [0, 1], [12, 0])}px)`;
      const ts = interpolate(progress, [0, 1], [0.96, 1]);
      transform = `scale(${ts})`;
    } else if (enterType === 'slide-right') {
       const tx = interpolate(progress, [0, 1], [45, 0]);
       transform = `translateX(${tx}px)`;
    } else if (enterType === 'scale-pop') {
       const ts = interpolate(progress, [0, 1], [0.86, 1]);
       transform = `scale(${ts})`;
    }

    if (t > seqDuration - exitDuration) {
       const et = t - (seqDuration - exitDuration);
       const ep = Math.max(0, Math.min(1, et / exitDuration));
       
       if (exitType === 'slide-up') {
          opacity *= interpolate(ep, [0, 1], [1, 0]);
          transform += ` translateY(-30px)`;
       } else if (exitType === 'scale-fade') {
          opacity *= interpolate(ep, [0, 1], [1, 0]);
          transform += ` scale(0.94)`;
       } else if (exitType === 'slide-down') {
          opacity *= interpolate(ep, [0, 1], [1, 0]);
          transform += ` translateY(35px)`;
       } else if (exitType === 'slide-right') {
          opacity *= interpolate(ep, [0, 1], [1, 0]);
          transform += ` translateX(35px)`;
       } else {
          opacity *= interpolate(ep, [0, 1], [1, 0]);
       }
    }

    const pulse = Math.sin((frame / 60) * Math.PI * 2);
    const idleScale = interpolate(pulse, [-1, 1], [1, 1.015]);
    transform += ` scale(${idleScale})`;

    return (
      <div style={{ 
        fontFamily, 
        fontSize: size, 
        color, 
        textAlign, 
        opacity, 
        transform, 
        filter,
        textShadow: enterType === 'slide-up' ? `0 0 ${interpolate(progress, [0, 1], [0, 10])}px ${color}66` : 'none',
      }}>
        {text}
      </div>
    );
  };

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: textAlign === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
      width: textAlign === 'center' ? '80%' : 'auto',
    }}>
      {renderContent()}
    </div>
  );
};

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0F' }}>
      <Series>
        {/* 0:00–0:04 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ background: `radial-gradient(circle, #1A1D2A, transparent)` }}>
             <div style={{ 
                position: 'absolute', 
                inset: 0, 
                opacity: 0.35, 
                backgroundColor: '#1A1D2A', 
                transform: `scale(${interpolate(frame % 120, [0, 120], [0.9, 1])})`
             }} />
             <DustParticles count={50} color="white" />
             <FilmGrain opacity={0.05} />
             <KineticText 
              text="Why Do Women Prefer Tall Men?"
              fontFamily={montserratExtraBold}
              size={92}
              enterType="slide-up"
              exitType="slide-up"
              staggerType="word"
              staggerDelay={70}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:04–0:07 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#151922' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  left: i * 200,
                  width: 2,
                  height: '100%',
                  backgroundColor: '#00F3FF',
                  transform: `translateY(${-(frame % 90) * 0.8}px)`
                }} />
              ))}
            </div>
            <KineticText 
              text="Why do many women prefer tall men?"
              fontFamily={interBold}
              size={78}
              enterType="fade-blur"
              exitType="scale-fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:07–0:11 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#151922' }}>
            <FractalNoiseBG evolution={frame / 10} opacity={0.18} color="#151922" />
            <KineticText 
              text="It’s not one reason."
              fontFamily={interBold}
              size={72}
              enterType="slide-right"
              exitType="slide-right"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:11–0:14 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) rotate(${frame * 0.1}deg)` }}>
                <div style={{ width: 400, height: 400, borderRadius: '50%', border: '2px solid rgba(0, 243, 255, 0.04)', position: 'absolute', left: -200, top: -200 }} />
                <div style={{ width: 300, height: 300, border: '2px solid rgba(255, 215, 0, 0.04)', position: 'absolute', left: -150, top: -150, transform: `rotate(45deg)` }} />
             </div>
             <KineticText 
              text="It’s a mix—biology, psychology, and culture."
              fontFamily={montserratBold}
              size={68}
              staggerType="clause"
              enterType="scale-pop"
              exitType="scale-fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:14–0:18 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0D0D12' }}>
             <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.18), transparent)',
                transform: `translateX(${interpolate(frame % 120, [0, 120], [-1920, 1920])}px)`
             }} />
             <KineticText 
              text="Start with perception."
              fontFamily={interExtraBold}
              size={84}
              enterType="slide-up"
              exitType="slide-up"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:18–0:21 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#08080C' }}>
            <Scanlines opacity={0.04} />
            <KineticText 
              text="Height is often associated with strength, protection, and presence."
              fontFamily={montserratBold}
              size={64}
              textAlign="left"
              x={200}
              staggerType="word"
              staggerDelay={60}
              enterType="slide-up"
              exitType="fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:21–0:25 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ background: 'linear-gradient(#151922, #0F172A)' }}>
             <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent, black)', opacity: interpolate(frame % 120, [0, 120], [0, 0.5]) }} />
             <KineticText 
              text="A taller figure stands out—literally."
              fontFamily={interBold}
              size={76}
              enterType="scale-pop"
              exitType="scale-fade"
              emphasis={["literally."]}
              emphasisColor="#FFD700"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:25–0:28 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
            <div style={{ 
               position: 'absolute', 
               left: '50%', 
               top: '50%', 
               width: 1000, 
               height: 1000, 
               border: '1px solid rgba(255,255,255,0.07)', 
               transform: `translate(-50%, -50%) scale(${interpolate(frame % 90, [0, 90], [0.6, 1.4])})`,
               opacity: interpolate(frame % 90, [60, 90], [1, 0])
            }} />
            <KineticText 
              text="In social settings, height signals visibility and dominance."
              fontFamily={interBold}
              size={68}
              textAlign="left"
              x={220}
              enterType="slide-down"
              exitType="slide-down"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:28–0:32 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0D0D12' }}>
            <div style={{ 
               position: 'absolute', 
               width: 300, 
               height: 300, 
               borderRadius: '50%', 
               background: 'cyan', 
               opacity: 0.12, 
               filter: 'blur(90px)',
               transform: `translateX(${interpolate(frame % 120, [0, 120], [-500, 2420])}px)`
            }} />
            <KineticText 
              text="Not always accurate… but often assumed."
              fontFamily={montserratSemiBold}
              size={62}
              enterType="scale-pop"
              exitType="slide-up"
              emphasis={["accurate…"]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:32–0:35 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) rotate(${frame * 0.2}deg)` }}>
                <div style={{ width: 500, height: 100, border: '2px solid rgba(255, 215, 0, 0.18)', borderRadius: '50%' }} />
             </div>
             <KineticText 
              text="Then biology plays a role."
              fontFamily={interExtraBold}
              size={80}
              enterType="slide-up"
              exitType="slide-up"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:35–0:39 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#08080C' }}>
            <FractalNoiseBG evolution={frame / 5} opacity={0.22} color="#08080C" />
            <KineticText 
              text="Across many species, physical traits get linked to survival."
              fontFamily={montserratBold}
              size={66}
              textAlign="left"
              x={200}
              staggerType="clause"
              enterType="slide-up"
              exitType="fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:39–0:42 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ background: 'linear-gradient(#0F172A, #151922)' }}>
             <div style={{ 
                position: 'absolute', 
                left: '50%', 
                top: '50%', 
                width: 800, 
                height: 800, 
                borderRadius: '50%', 
                background: 'radial-gradient(circle, gold, transparent)', 
                opacity: 0.09 * interpolate(Math.sin((frame % 90) * 0.1), [-1, 1], [0.8, 1]),
                transform: `translate(-50%, -50%) scale(${interpolate(Math.sin((frame % 90) * 0.1), [-1, 1], [0.78, 0.98])})`
             }} />
             <KineticText 
              text="In humans, height can be subconsciously tied to health, genetics, and capability."
              fontFamily={interBold}
              size={64}
              staggerType="word"
              staggerDelay={70}
              enterType="scale-pop"
              exitType="scale-fade"
              emphasis={["health,", "genetics,", "capability."]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:42–0:46 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0D0D12' }}>
            <div style={{ position: 'absolute', left: 240, top: 0, height: '100%', width: 1, backgroundColor: 'cyan', opacity: 0.28 }} />
            <KineticText 
              text="It’s not a rule—"
              fontFamily={interBold}
              size={72}
              textAlign="left"
              x={240}
              enterType="slide-right"
              exitType="slide-right"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:46–0:49 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0D0D12' }}>
            <DustParticles count={30} color="white" />
            <KineticText 
              text="but it’s a pattern that shows up."
              fontFamily={montserratBold}
              size={68}
              enterType="scale-pop"
              exitType="scale-fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:49–0:53 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <div style={{ 
                position: 'absolute', 
                left: '50%', 
                top: '50%', 
                width: 400, 
                height: 400, 
                border: '1px solid cyan', 
                opacity: 0.04, 
                transform: `translate(-50%, -50%) rotate(${frame * 0.1}deg)` 
             }} />
             <KineticText 
              text="Now psychology."
              fontFamily={interExtraBold}
              size={86}
              enterType="slide-up"
              exitType="slide-up"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:53–0:56 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#151922' }}>
             <div style={{ position: 'absolute', inset: 0, opacity: 0.09 }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    top: i * 200,
                    width: '100%',
                    height: 2,
                    background: 'linear-gradient(to right, transparent, white, transparent)',
                    transform: `translateX(${interpolate(frame % 90, [0, 90], [-1920, 1920])}px)`
                  }} />
                ))}
             </div>
             <KineticText 
              text="People are influenced by conditioning."
              fontFamily={montserratBold}
              size={66}
              textAlign="left"
              x={200}
              enterType="slide-up"
              exitType="fade"
              staggerType="word"
              staggerDelay={70}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 0:56–1:00 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <div style={{ position: 'absolute', inset: 100, border: '1px solid rgba(255,215,0,0.14)', transform: `scale(${interpolate(frame % 120, [0, 120], [0, 1])})` }} />
             <KineticText 
              text="Movies, media, and social norms repeat the same image:"
              fontFamily={interBold}
              size={68}
              enterType="scale-pop"
              exitType="scale-fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:00–1:04 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent, black)', opacity: 0.1 }} />
             <KineticText 
              text="the tall, confident man."
              fontFamily={interBold}
              size={82}
              enterType="slide-up"
              exitType="slide-up"
              emphasis={["confident", "man."]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:04–1:07 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0D0D12' }}>
             <FractalNoiseBG evolution={frame / 10} opacity={0.1} />
             <KineticText 
              text="Over time, that becomes familiar."
              fontFamily={montserratBold}
              size={64}
              enterType="fade-blur"
              exitType="scale-fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:07–1:11 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#151922' }}>
             <DustParticles count={20} color="gold" speed={0.8} />
             <KineticText 
              text="And familiar often feels attractive."
              fontFamily={interSemiBold}
              size={68}
              enterType="slide-down"
              exitType="slide-down"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:11–1:14 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <div style={{ 
                position: 'absolute', 
                left: '20%', 
                width: '30%', 
                height: '100%', 
                background: 'linear-gradient(cyan, transparent)', 
                opacity: 0.07 
             }} />
             <div style={{ 
                position: 'absolute', 
                right: '20%', 
                width: '30%', 
                height: '100%', 
                background: 'linear-gradient(gold, transparent)', 
                opacity: 0.07 
             }} />
             <KineticText 
              text="There’s also contrast."
              fontFamily={montserratExtraBold}
              size={80}
              enterType="scale-pop"
              exitType="scale-fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:14–1:18 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <div style={{ position: 'absolute', left: '50%', top: 0, height: '100%', width: 1, backgroundColor: 'white', opacity: 0.09 }} />
             <KineticText 
              text="Height difference can create a sense of balance in appearance—"
              fontFamily={interBold}
              size={66}
              textAlign="left"
              x={200}
              enterType="slide-up"
              exitType="fade"
              staggerType="clause"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:18–1:22 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0D0D12' }}>
             <div style={{ 
               position: 'absolute', 
               inset: 0, 
               background: 'linear-gradient(30deg, transparent, rgba(255,255,255,0.11), transparent)',
               transform: `translateX(${interpolate(frame % 120, [0, 120], [-500, 500])}px)`
             }} />
             <KineticText 
              text="something many people find visually appealing."
              fontFamily={interBold}
              size={68}
              enterType="fade-blur"
              exitType="scale-fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:22–1:25 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <div style={{ position: 'absolute', left: '20%', right: '20%', top: 520, height: 2, backgroundColor: 'gold', opacity: 0.38 }} />
             <KineticText 
              text="But here’s the reality most ignore—"
              fontFamily={montserratExtraBold}
              size={84}
              y={440}
              enterType="slide-up"
              exitType="slide-up"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:25–1:29 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <div style={{ 
                position: 'absolute', 
                left: '50%', 
                top: '50%', 
                width: 800, 
                height: 800, 
                borderRadius: '50%', 
                border: '2px solid cyan', 
                opacity: 0.14,
                transform: `translate(-50%, -50%) scale(${interpolate(frame % 120, [0, 120], [0.5, 1])})`
             }} />
             <KineticText 
              text="Preference is not requirement."
              fontFamily={interBold}
              size={78}
              enterType="scale-pop"
              exitType="scale-fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:29–1:32 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0D0D12' }}>
            <KineticText 
              text="Not every woman prefers tall men."
              fontFamily={montserratBold}
              size={68}
              textAlign="left"
              x={220}
              enterType="slide-up"
              exitType="fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:32–1:36 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#151922' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(-30deg, transparent, rgba(255,255,255,0.1))', transform: `translateX(${interpolate(frame % 120, [0, 120], [-1000, 1000])}px)` }} />
            <KineticText 
              text="Not every tall man is attractive."
              fontFamily={interSemiBold}
              size={66}
              textAlign="right"
              x={1700}
              enterType="slide-right"
              exitType="slide-right"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:36–1:39 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
             <KineticText 
              text="Confidence, behavior, emotional intelligence—"
              fontFamily={interBold}
              size={72}
              staggerType="clause"
              enterType="scale-pop"
              exitType="scale-fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:39–1:42 */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
            <KineticText 
              text="these factors consistently rank higher in long-term attraction."
              fontFamily={montserratBold}
              size={64}
              textAlign="left"
              x={200}
              enterType="slide-down"
              exitType="slide-down"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 1:42–1:46 */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: '#0A0A0F' }}>
             <FilmGrain opacity={0.04} />
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
