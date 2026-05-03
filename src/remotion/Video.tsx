import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  AbsoluteFill,
  Series,
  Easing,
  Sequence
} from 'remotion';
import React from 'react';
import { LucideIcon, Globe, Server, Cloud, AppWindow, ShieldCheck } from 'lucide-react';
import '../index.css';

// Load fonts
const { fontFamily: montserratBold } = loadMontserrat("normal", { weights: ["700"] });

// Colors from blueprint
const COLORS = {
  deepSpace: "#0a0e27",
  electricCyan: "#00f5ff",
  starkWhite: "#ffffff",
  accentAmber: "#ffaa00",
  corporateBlue: "#4285f4",
  amazonOrange: "#ff9900",
  metaBlue: "#0668E1",
};

// Animation helper components
const AnimatedText: React.FC<{
  text: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  enterType?: 'scale_pop' | 'typewriter' | 'fade_slide_up' | 'blur_in' | 'slide_up' | 'split_reveal' | 'char_stagger' | 'wipe_left' | 'fade_in' | 'scale_breathe';
  exitType?: 'fade_blur' | 'scale_fade' | 'slide_down' | 'wipe_reverse' | 'none' | 'blur_out';
  delay?: number;
  duration?: number;
  textAlign?: 'left' | 'center' | 'right';
  emphasis?: { word: string; color: string }[];
}> = ({ 
  text, 
  size = 64, 
  className = "", 
  style = {}, 
  color = COLORS.starkWhite,
  enterType = 'fade_in', 
  exitType = 'none',
  delay = 0, 
  duration = 30, // frames
  textAlign = 'center',
  emphasis = []
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = frame;
  const exitDuration = 15;
  const sequenceDuration = useVideoConfig().durationInFrames;
  
  // Entrance
  let opacity = 1;
  let transform = '';
  let filter = '';
  let clipPath = '';
  let displayText = text;

  // Entrance animations
  if (t < delay + 30) {
    const progress = Math.max(0, Math.min(1, (t - delay) / 20));
    
    if (enterType === 'scale_pop') {
      const s = interpolate(progress, [0, 1], [0.8, 1], { easing: Easing.bezier(0.3, 0.9, 0.6, 1.0) });
      transform = `scale(${s})`;
      opacity = progress;
      filter = `blur(${interpolate(progress, [0, 1], [10, 0])}px)`;
    } else if (enterType === 'typewriter') {
      const chars = Math.floor(interpolate(progress, [0, 1], [0, text.length]));
      displayText = text.substring(0, chars);
    } else if (enterType === 'fade_slide_up') {
      opacity = progress;
      const y = interpolate(progress, [0, 1], [20, 0], { easing: Easing.bezier(0.25, 0.46, 0.43, 0.95) });
      transform = `translateY(${y}px)`;
    } else if (enterType === 'blur_in') {
      opacity = progress;
      filter = `blur(${interpolate(progress, [0, 1], [25, 0])}px)`;
    } else if (enterType === 'slide_up') {
      opacity = progress;
      const y = interpolate(progress, [0, 1], [40, 0], { easing: Easing.bezier(0.3, 0.9, 0.6, 1.0) });
      transform = `translateY(${y}px)`;
    } else if (enterType === 'fade_in') {
      opacity = progress;
    } else if (enterType === 'wipe_left') {
       clipPath = `inset(0 ${interpolate(progress, [0, 1], [100, 0])}% 0 0)`;
    }
  }

  // Exit animations
  if (t > sequenceDuration - exitDuration) {
    const exitProgress = (t - (sequenceDuration - exitDuration)) / exitDuration;
    if (exitType === 'fade_blur') {
      opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      filter = `blur(${interpolate(exitProgress, [0, 1], [0, 15])}px)`;
    } else if (exitType === 'scale_fade') {
      opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      const s = interpolate(exitProgress, [0, 1], [1, 0.9]);
      transform = `scale(${s})`;
    } else if (exitType === 'slide_down') {
      opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      const y = interpolate(exitProgress, [0, 1], [0, 30]);
      transform = `translateY(${y}px)`;
    } else if (exitType === 'blur_out') {
      filter = `blur(${interpolate(exitProgress, [0, 1], [0, 20])}px)`;
      opacity = interpolate(exitProgress, [0, 1], [1, 0]);
    }
  }

  const renderText = () => {
    if (enterType === 'char_stagger') {
      return text.split('').map((char, i) => {
        const charDelay = i * 2;
        const charProgress = Math.max(0, Math.min(1, (t - delay - charDelay) / 10));
        return (
          <span key={`char-${i}`} style={{ 
            opacity: charProgress, 
            display: 'inline-block',
            transform: `scale(${interpolate(charProgress, [0, 1], [0.8, 1])})`,
            color: emphasis.find(e => e.word.toLowerCase() === char.toLowerCase())?.color || color
          }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      });
    }

    let result: React.ReactNode[] = [displayText];
    emphasis.forEach(({ word, color: emphColor }) => {
      const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${safeWord})`, 'gi');
      
      const newResult: React.ReactNode[] = [];
      result.forEach(item => {
        if (typeof item === 'string') {
          const parts = item.split(regex);
          parts.forEach(part => {
            if (part.toLowerCase() === word.toLowerCase()) {
              newResult.push(<span style={{ color: emphColor }}>{part}</span>);
            } else if (part !== "") {
              newResult.push(part);
            }
          });
        } else {
          newResult.push(item);
        }
      });
      result = newResult;
    });

    return result.map((item, idx) => {
      if (typeof item === 'string') {
        return <span key={idx}>{item}</span>;
      }
      if (React.isValidElement(item)) {
        return React.cloneElement(item as React.ReactElement, { key: idx });
      }
      return item;
    });
  };

  return (
    <div 
      className={className}
      style={{ 
        fontFamily: montserratBold, 
        fontSize: size, 
        opacity,
        transform,
        filter,
        clipPath,
        textAlign,
        color,
        lineHeight: 1.2,
        ...style
      }}
    >
      {renderText()}
    </div>
  );
};

const FractalNoiseBG: React.FC<{ evolution: number; opacity: number }> = ({ evolution, opacity }) => {
  return (
    <AbsoluteFill style={{ 
      opacity, 
      filter: 'contrast(150%) brightness(50%)',
      mixBlendMode: 'screen'
    }}>
      <svg width="100%" height="100%">
        <filter id="fractal">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="5" seed={Math.floor(evolution / 30)} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#fractal)" fill="white" />
      </svg>
    </AbsoluteFill>
  );
};

const Particles: React.FC<{ count: number; color: string; driftSpeed?: number }> = ({ count, color, driftSpeed = 0.5 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {[...Array(count)].map((_, i) => {
        const x = (i * 23.5) % 1920;
        const startY = (i * 47.1) % 1080;
        const y = (startY - frame * driftSpeed + 1080) % 1080;
        const size = 2 + (i % 7);
        return (
          <div 
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: '50%',
              opacity: 0.3 * (size / 8),
              boxShadow: `0 0 10px ${color}`
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const GridSystem: React.FC<{ opacity: number; pulseProgress: number }> = ({ opacity, pulseProgress }) => {
  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 100%), 
          linear-gradient(to right, ${COLORS.electricCyan}33 1px, transparent 1px), 
          linear-gradient(to bottom, ${COLORS.electricCyan}33 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 80px 80px, 80px 80px',
        transform: `scale(${1 + pulseProgress * 0.05})`,
      }} />
    </AbsoluteFill>
  );
};

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace }}>
      <Series>
        {/* [00:00–00:04] Who Owns the Internet? */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ background: `radial-gradient(circle, #1a1f3a, #0a0e27)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FractalNoiseBG evolution={frame} opacity={0.15} />
            <Particles count={40} color={COLORS.electricCyan} driftSpeed={0.8} />
            <AnimatedText 
              text="Who Owns the Internet?"
              size={96}
              enterType="scale_pop"
              exitType="fade_blur"
              style={{ textShadow: `0 0 20px ${COLORS.electricCyan}66` }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:04–00:07] Who owns the internet? */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ background: `radial-gradient(circle, #1a1f3a, #0a0e27)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Particles count={30} color={frame < 180 ? COLORS.accentAmber : COLORS.electricCyan} />
            <GridSystem opacity={0.2} pulseProgress={interpolate(frame % 60, [0, 30, 60], [0, 1, 0])} />
            <AnimatedText 
              text="Who owns the internet?"
              size={72}
              enterType="typewriter"
              exitType="scale_fade"
              style={{ transform: `translateX(${Math.sin(frame / 20) * 3}px)` }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:07–00:10] It sounds like there should be a name. */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: "#070a1a", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <AnimatedText 
              text="It sounds like there should\nbe a name."
              size={64}
              enterType="blur_in"
              exitType="fade_blur"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:10–00:12] A company. */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill style={{ backgroundColor: "#070a1a", display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '100px' }}>
            <AnimatedText 
              text="A company."
              size={68}
              enterType="slide_up"
              exitType="slide_down"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:12–00:14] A country. */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill style={{ backgroundColor: "#070a1a", display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '100px' }}>
            <AnimatedText 
              text="A country."
              size={68}
              enterType="slide_up"
              exitType="slide_down"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:14–00:18] But the truth is… no one owns it. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ background: `radial-gradient(circle, #1a1f3a, #0a0e27)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="But the truth is…\nno one owns it."
              size={64}
              enterType="fade_slide_up"
              exitType="fade_blur"
              emphasis={[{ word: "no one", color: COLORS.accentAmber }]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:18–00:22] The internet isn't a single thing. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <AnimatedText 
              text="The internet isn't\na single thing."
              size={64}
              enterType="char_stagger"
              exitType="scale_fade"
              style={{ transform: `translate(${Math.random() - 0.5}px, ${Math.random() - 0.5}px)` }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:22–00:26] It's a massive network— */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '200px' }}>
            <AnimatedText 
              text="It's a massive network—"
              size={64}
              enterType="wipe_left"
              exitType="none"
              style={{ color: COLORS.starkWhite }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:26–00:30] a web of millions of computers, servers, and cables */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="a web of millions of computers,\nservers, and cables"
              size={60}
              enterType="typewriter"
              exitType="fade_blur"
              emphasis={[
                { word: "computers", color: COLORS.accentAmber },
                { word: "servers", color: COLORS.accentAmber },
                { word: "cables", color: COLORS.accentAmber }
              ]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:30–00:34] spread across the entire planet. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '200px' }}>
             <div style={{ transform: `scale(${interpolate(frame % 120, [0, 120], [1, 1.1])})` }}>
               <Globe className="text-white opacity-10" size={800} style={{ position: 'absolute', left: '10%' }} />
             </div>
             <AnimatedText 
              text="spread across the entire planet."
              size={60}
              enterType="fade_in"
              exitType="scale_fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:34–00:37] No central owner. */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="No central owner."
              size={64}
              enterType="scale_pop"
              exitType="fade_blur"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:37–00:40] No master switch. */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ position: 'absolute', fontSize: 1000, color: COLORS.starkWhite, opacity: 0.05 }}>X</div>
             <AnimatedText 
              text="No master switch."
              size={64}
              enterType="fade_in"
              exitType="none"
              style={{ transform: `translateX(${interpolate(frame % 90, [0, 90], [30, -30])}px)` }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:40–00:44] Instead, it's held together by cooperation. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="Instead, it's held together\nby cooperation."
              size={60}
              enterType="fade_in"
              exitType="fade_blur"
              emphasis={[{ word: "cooperation", color: COLORS.accentAmber }]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:44–00:49] Organizations like ICANN help manage domain names— */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '200px' }}>
            <AnimatedText 
              text="Organizations like ICANN\nhelp manage domain names—"
              size={60}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:49–00:53] the addresses you type every day. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <AnimatedText 
              text="the addresses you type every day."
              size={60}
              enterType="typewriter"
              exitType="fade_blur"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:53–00:58] Groups like the IETF create the rules— */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '200px' }}>
             <AnimatedText 
              text="Groups like the IETF\ncreate the rules—"
              size={60}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:58–01:03] the protocols that allow devices to communicate. */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="the protocols that allow\ndevices to communicate."
              size={60}
              enterType="fade_in"
              exitType="fade_blur"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:03–01:06] And companies? */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="And companies?"
              size={68}
              enterType="scale_pop"
              exitType="scale_fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:06–01:09] They own pieces of it. */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="They own pieces of it."
              size={64}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:09–01:12] Google runs servers. */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', paddingLeft: '200px' }}>
            <div style={{ position: 'absolute', left: '60%', width: 200, height: 400, opacity: 0.1 }}>
               <Server size={400} color={COLORS.starkWhite} />
            </div>
            <AnimatedText 
              text="Google runs servers."
              size={60}
              textAlign="left"
              enterType="fade_in"
              exitType="none"
              emphasis={[{ word: "Google", color: COLORS.corporateBlue }]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:12–01:15] Amazon powers cloud infrastructure. */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: '10%', opacity: 0.1 }}>
               <Cloud size={600} color={COLORS.starkWhite} />
            </div>
            <AnimatedText 
              text="Amazon powers cloud\ninfrastructure."
              size={60}
              enterType="fade_in"
              exitType="none"
              emphasis={[{ word: "Amazon", color: COLORS.amazonOrange }]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:15–01:18] Meta builds platforms people use daily. */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', paddingRight: '200px', justifyContent: 'flex-end' }}>
            <div style={{ position: 'absolute', right: '60%', opacity: 0.1 }}>
               <AppWindow size={400} color={COLORS.starkWhite} />
            </div>
            <AnimatedText 
              text="Meta builds platforms\npeople use daily."
              size={60}
              textAlign="right"
              enterType="fade_in"
              exitType="none"
              emphasis={[{ word: "Meta", color: COLORS.metaBlue }]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:18–01:22] Telecom providers lay cables. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '200px' }}>
            <div style={{ 
              position: 'absolute', 
              bottom: 180, 
              left: '20%', 
              right: '20%', 
              height: 4, 
              backgroundColor: COLORS.starkWhite, 
              opacity: 0.2,
              transform: `scaleX(${interpolate(frame % 120, [0, 120], [0, 1])})`
            }} />
            <AnimatedText 
              text="Telecom providers lay cables."
              size={60}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:22–01:26] Governments regulate access within borders. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
               <ShieldCheck size={1080} color={COLORS.accentAmber} />
            </div>
            <AnimatedText 
              text="Governments regulate access\nwithin borders."
              size={60}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:26–01:31] But none of them… own the internet itself. */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="But none of them…\nown the internet itself."
              size={64}
              enterType="fade_in"
              exitType="fade_blur"
              emphasis={[{ word: "internet itself", color: COLORS.accentAmber }]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:31–01:35] It's more like a shared system— */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '200px' }}>
            <AnimatedText 
              text="It's more like a shared system—"
              size={64}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:35–01:40] decentralized, distributed, and constantly evolving. */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="decentralized, distributed,\nand constantly evolving."
              size={60}
              enterType="fade_in"
              exitType="fade_blur"
              emphasis={[
                { word: "decentralized", color: COLORS.accentAmber },
                { word: "distributed", color: COLORS.accentAmber },
                { word: "constantly evolving", color: COLORS.accentAmber }
              ]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:40–01:45] So if no one owns it… who controls it? */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ background: `linear-gradient(45deg, #1a0a27, #0a0e27)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="So if no one owns it…\nwho controls it?"
              size={64}
              enterType="fade_slide_up"
              exitType="none"
              style={{ transform: `rotate(${interpolate(frame % 150, [0, 150], [-1, 1])}deg)` }}
              emphasis={[{ word: "who controls it?", color: COLORS.accentAmber }]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:45–01:49] That's where things get complicated. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
               {[...Array(20)].map((_, i) => (
                 <div key={i} style={{
                   position: 'absolute',
                   left: Math.random() * 1920,
                   top: Math.random() * 1080,
                   width: 100 + Math.random() * 400,
                   height: 100 + Math.random() * 400,
                   border: `1px solid ${COLORS.starkWhite}`,
                   transform: `rotate(${Math.random() * 360}deg)`
                 }} />
               ))}
            </div>
            <AnimatedText 
              text="That's where things get\ncomplicated."
              size={60}
              enterType="fade_in"
              exitType="fade_blur"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:49–01:53] Control is fragmented. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="Control is fragmented."
              size={64}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:53–01:58] Influence depends on infrastructure, regulation, and technology. */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="Influence depends on infrastructure,\nregulation, and technology."
              size={58}
              enterType="fade_in"
              exitType="none"
              emphasis={[
                { word: "infrastructure", color: COLORS.accentAmber },
                { word: "regulation", color: COLORS.accentAmber },
                { word: "technology", color: COLORS.accentAmber }
              ]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:58–02:02] Some countries restrict access. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '200px' }}>
            <AnimatedText 
              text="Some countries restrict access."
              size={60}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [02:02–02:06] Some companies shape what you see. */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="Some companies shape\nwhat you see."
              size={60}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [02:06–02:11] But the core idea remains— */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '200px' }}>
            <AnimatedText 
              text="But the core idea remains—"
              size={64}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [02:11–02:17] The internet was designed to survive without a single point of control. */}
        <Series.Sequence durationInFrames={180}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="The internet was designed to survive\nwithout a single point of control."
              size={60}
              enterType="fade_in"
              exitType="fade_blur"
              emphasis={[
                { word: "survive", color: COLORS.accentAmber },
                { word: "without a single point", color: COLORS.accentAmber }
              ]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [02:17–02:20] No owner. */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="No owner."
              size={72}
              enterType="scale_pop"
              exitType="scale_fade"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [02:20–02:23] No single authority. */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="No single authority."
              size={72}
              enterType="slide_up"
              exitType="slide_down"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [02:23–02:27] Just a global network— */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '200px' }}>
             <AnimatedText 
              text="Just a global network—"
              size={64}
              enterType="fade_in"
              exitType="none"
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [02:27–02:31] built, maintained, and used */}
        <Series.Sequence durationInFrames={120}>
          <AbsoluteFill style={{ backgroundColor: COLORS.deepSpace, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedText 
              text="built, maintained, and used"
              size={60}
              enterType="fade_in"
              exitType="none"
              emphasis={[
                { word: "built", color: COLORS.accentAmber },
                { word: "maintained", color: COLORS.accentAmber },
                { word: "used", color: COLORS.accentAmber }
              ]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [02:31–02:36] by everyone. */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ background: `linear-gradient(to bottom, #0a0e27, #ffffff)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ position: 'absolute', inset: 0, opacity: interpolate(frame % 150, [120, 150], [0, 1]) }} />
             <AnimatedText 
              text="by everyone."
              size={80}
              enterType="scale_pop"
              exitType="none"
              style={{ textShadow: `0 0 15px ${COLORS.accentAmber}4D` }}
            />
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
