import { loadFont as loadBebasNeue } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadIBMPlexMono } from "@remotion/google-fonts/IBMPlexMono";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadRobotoCondensed } from "@remotion/google-fonts/RobotoCondensed";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadPlayfairDisplay } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadLato } from "@remotion/google-fonts/Lato";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

import { 
  Sequence, 
  useCurrentFrame, 
  useVideoConfig, 
  Audio, 
  interpolate, 
  spring, 
  AbsoluteFill,
  Series,
  Easing
} from 'remotion';
import React from 'react';
import { 
  Users, 
  Target, 
  Scale, 
  Building2,
  History,
  Languages,
  Zap,
  Star,
  ShieldAlert,
  Globe,
  Compass,
  Trophy,
  Ruler,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Clock,
  LayoutGrid,
  Lock,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import '../index.css';

// Load fonts
const { fontFamily: bebasNeue } = loadBebasNeue("normal", { weights: ["400"] });
const { fontFamily: interMedium } = loadInter("normal", { weights: ["500"] });
const { fontFamily: interBlack } = loadInter("normal", { weights: ["900"] });
const { fontFamily: interExtraBold } = loadInter("normal", { weights: ["800"] });
const { fontFamily: ibmPlexMonoRegular } = loadIBMPlexMono("normal", { weights: ["400"] });
const { fontFamily: spaceGroteskSemiBold } = loadSpaceGrotesk("normal", { weights: ["600"] });
const { fontFamily: spaceGroteskBold } = loadSpaceGrotesk("normal", { weights: ["700"] });
const { fontFamily: robotoCondensedBold } = loadRobotoCondensed("normal", { weights: ["700"] });
const { fontFamily: robotoCondensedMedium } = loadRobotoCondensed("normal", { weights: ["500"] });
const { fontFamily: oswaldBold } = loadOswald("normal", { weights: ["700"] });
const { fontFamily: playfairDisplayBold } = loadPlayfairDisplay("normal", { weights: ["700"] });
const { fontFamily: montserratSemiBold } = loadMontserrat("normal", { weights: ["600"] });
const { fontFamily: montserratBold } = loadMontserrat("normal", { weights: ["700"] });
const { fontFamily: antonRegular } = loadAnton("normal", { weights: ["400"] });
const { fontFamily: latoRegular } = loadLato("normal", { weights: ["400"] });
const { fontFamily: jetBrainsMonoRegular } = loadJetBrainsMono("normal", { weights: ["400"] });

// Animation helper components
const AnimatedText: React.FC<{
  text: string;
  fontFamily: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  enterType?: 'cubic-bezier' | 'ease-out' | 'typewriter' | 'smooth' | 'ease-in' | 'snap' | 'elastic-out' | 'quick' | 'contrast' | 'slow-reveal';
  exitType?: 'fade' | 'slide-up' | 'dissolve' | 'quick-fade' | 'slide-left' | 'quick-wipe' | 'blur' | 'slide-down' | 'merge-fade' | 'complete-fade';
  idleType?: 'glow-pulse' | 'steady' | 'flicker' | 'tracking-expand' | 'pulse-beat' | 'float' | 'vibrate' | 'gentle-glow' | 'shake' | 'slow-rotate' | 'pulse-intensifies' | 'breath' | 'opposing-pulse' | 'single-pulse';
  delay?: number;
  duration?: number;
  exitStart?: number;
  exitDuration?: number;
}> = ({ 
  text, 
  fontFamily, 
  size = 48, 
  className = "", 
  style = {}, 
  enterType = 'smooth', 
  exitType = 'fade',
  idleType = 'steady',
  delay = 0, 
  duration = 15,
  exitStart = Infinity,
  exitDuration = 10
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Enter Animation
  let enterOpacity = 1;
  let enterTransform = '';
  let enterLetterSpacing = 'normal';
  let enterStyle: React.CSSProperties = {};

  if (enterType === 'cubic-bezier') {
     enterOpacity = interpolate(frame, [delay, delay + 27], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
     const y = interpolate(frame, [delay, delay + 27], [50, 0], { easing: Easing.bezier(0.2, 0.8, 0.2, 1) });
     enterTransform = `translateY(${y}px)`;
  } else if (enterType === 'ease-out') {
    enterOpacity = interpolate(frame, [delay, delay + 12], [0, 1], { easing: Easing.out(Easing.ease) });
  } else if (enterType === 'typewriter') {
    const charsToShow = Math.floor(interpolate(frame, [delay, delay + 15], [0, text.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
    text = text.substring(0, charsToShow);
  } else if (enterType === 'smooth') {
    enterOpacity = interpolate(frame, [delay, delay + 15], [0, 1]);
    const y = interpolate(frame, [delay, delay + 15], [20, 0]);
    enterTransform = `translateY(${y}px)`;
  } else if (enterType === 'ease-in') {
    enterOpacity = interpolate(frame, [delay, delay + 18], [0, 1], { easing: Easing.in(Easing.ease) });
  } else if (enterType === 'snap') {
    const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 200 } });
    enterOpacity = s;
    enterTransform = `scale(${interpolate(s, [0, 1], [0.8, 1])})`;
  } else if (enterType === 'elastic-out') {
    const s = spring({ frame: frame - delay, fps, config: { damping: 6, stiffness: 100 } });
    enterOpacity = interpolate(s, [0, 0.5], [0, 1]);
    enterTransform = `scale(${s})`;
  } else if (enterType === 'quick') {
    enterOpacity = interpolate(frame, [delay, delay + 5], [0, 1]);
  } else if (enterType === 'contrast') {
    enterOpacity = interpolate(frame, [delay, delay + 18], [0, 1]);
    const blur = interpolate(frame, [delay, delay + 18], [10, 0]);
    enterStyle.filter = `blur(${blur}px)`;
  } else if (enterType === 'slow-reveal') {
    enterOpacity = interpolate(frame, [delay, delay + 24], [0, 1]);
    enterLetterSpacing = `${interpolate(frame, [delay, delay + 24], [20, 2])}px`;
  }

  // Idle Animation
  let idleStyle: React.CSSProperties = {};
  if (idleType === 'glow-pulse') {
    const glow = interpolate(Math.sin(frame / 10), [-1, 1], [0, 10]);
    idleStyle.textShadow = `0 0 ${glow}px rgba(255, 255, 255, 0.8)`;
  } else if (idleType === 'flicker') {
    const flick = Math.random() > 0.9 ? 0.3 : 1;
    idleStyle.opacity = flick;
  } else if (idleType === 'tracking-expand') {
    const tracking = interpolate(frame, [delay, delay + 100], [0, 10]);
    idleStyle.letterSpacing = `${tracking}px`;
  } else if (idleType === 'pulse-beat') {
    const s = interpolate(Math.sin(frame / 5), [-1, 1], [1, 1.05]);
    enterTransform += ` scale(${s})`;
  } else if (idleType === 'float') {
    const y = interpolate(Math.sin(frame / 15), [-1, 1], [-10, 10]);
    enterTransform += ` translateY(${y}px)`;
  } else if (idleType === 'vibrate') {
    const x = (Math.random() - 0.5) * 2;
    const y = (Math.random() - 0.5) * 2;
    enterTransform += ` translate(${x}px, ${y}px)`;
  } else if (idleType === 'shake') {
    const x = Math.sin(frame) * 2;
    enterTransform += ` translateX(${x}px)`;
  } else if (idleType === 'pulse-intensifies') {
    const s = interpolate(Math.sin(frame / (10 - interpolate(frame, [delay, delay + 200], [0, 5]))), [-1, 1], [1, 1.2]);
    enterTransform += ` scale(${s})`;
  } else if (idleType === 'breath') {
    const s = interpolate(Math.sin(frame / 20), [-1, 1], [1, 1.02]);
    enterTransform += ` scale(${s})`;
  }

  // Exit Animation
  let exitOpacity = 1;
  let exitTransform = '';
  let exitStyle: React.CSSProperties = {};
  if (frame >= exitStart) {
    const exitProgress = (frame - exitStart) / exitDuration;
    if (exitType === 'fade') {
      exitOpacity = interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0]);
    } else if (exitType === 'slide-up') {
      exitOpacity = interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0]);
      const y = interpolate(frame, [exitStart, exitStart + exitDuration], [0, -50]);
      exitTransform = `translateY(${y}px)`;
    } else if (exitType === 'dissolve') {
      exitOpacity = interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0]);
      exitStyle.filter = `blur(${interpolate(frame, [exitStart, exitStart + exitDuration], [0, 10])}px)`;
    } else if (exitType === 'quick-fade') {
      exitOpacity = interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0]);
    } else if (exitType === 'slide-left') {
      exitOpacity = interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0]);
      const x = interpolate(frame, [exitStart, exitStart + exitDuration], [0, -100]);
      exitTransform = `translateX(${x}px)`;
    } else if (exitType === 'quick-wipe') {
      exitOpacity = interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0]);
      exitStyle.clipPath = `inset(0 ${interpolate(frame, [exitStart, exitStart + exitDuration], [0, 100])}% 0 0)`;
    } else if (exitType === 'blur') {
      exitOpacity = interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0]);
      exitStyle.filter = `blur(${interpolate(frame, [exitStart, exitStart + exitDuration], [0, 20])}px)`;
    } else if (exitType === 'slide-down') {
      exitOpacity = interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0]);
      const y = interpolate(frame, [exitStart, exitStart + exitDuration], [0, 50]);
      exitTransform = `translateY(${y}px)`;
    }
  }

  return (
    <div 
      className={className}
      style={{ 
        fontFamily, 
        fontSize: size, 
        opacity: enterOpacity * exitOpacity,
        transform: enterTransform + ' ' + exitTransform,
        letterSpacing: enterLetterSpacing,
        ...style,
        ...enterStyle,
        ...idleStyle,
        ...exitStyle
      }}
    >
      {text.split('\n').map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
};

const BackgroundEffects: React.FC<{ type: string; progress: number }> = ({ type, progress }) => {
  const frame = useCurrentFrame();
  const { height: vHeight } = useVideoConfig();

  if (type === 'particles') {
    return (
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => {
          const moveX = interpolate(frame, [0, 300], [0, (i % 5 + 1) * 20]);
          const moveY = interpolate(frame, [0, i * 10 + 100], [0, -vHeight]);
          return (
            <div 
              key={i}
              style={{
                position: 'absolute',
                left: `${(i * 7) % 100}%`,
                bottom: -20,
                width: 4,
                height: 4,
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity: 0.2,
                transform: `translate(${moveX}px, ${moveY}px)`
              }}
            />
          );
        })}
      </AbsoluteFill>
    );
  }
  
  if (type === 'grain') {
     return (
       <div style={{
         position: 'absolute',
         inset: 0,
         opacity: 0.03,
         backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstripe.png")',
         mixBlendMode: 'overlay'
       }} />
     );
  }

  return null;
};

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', overflow: 'hidden' }}>
      <Series>
        {/* [00:00.000] Who Is Vladimir Putin? */}
        <Series.Sequence durationInFrames={96}>
          <AbsoluteFill style={{ 
            background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BackgroundEffects type="particles" progress={frame / 96} />
            <Star 
              style={{ 
                position: 'absolute', 
                color: 'rgba(255, 0, 0, 0.05)', 
                width: 800, 
                height: 800,
                opacity: interpolate(frame, [30, 96], [0, 1], { extrapolateLeft: 'clamp' })
              }} 
            />
            
            <div style={{
               transform: `scale(${interpolate(frame, [0, 96], [1.0, 1.05])})`
            }}>
              <AnimatedText 
                text={"WHO IS\nVLADIMIR PUTIN?"}
                fontFamily={bebasNeue}
                size={96}
                enterType="cubic-bezier"
                idleType="glow-pulse"
                exitType="fade"
                exitStart={78}
                exitDuration={18}
                style={{ color: 'white', textAlign: 'center' }}
              />
            </div>

            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-intro-transition-1146.wav" 
              volume={0.2} // -14dB approx 0.2
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:03.200] influential / controversial / 21st century */}
        <Series.Sequence durationInFrames={159}>
          <AbsoluteFill style={{ 
            backgroundColor: '#111827',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: '100px',
            flexDirection: 'column'
          }}>
            <BackgroundEffects type="grain" progress={0} />
            <div style={{ 
              width: '4px', 
              height: interpolate(frame, [0, 30], [0, 400], { extrapolateRight: 'clamp' }),
              backgroundColor: '#dc2626',
              position: 'absolute',
              left: '80px'
            }} />
            
            <div style={{
               transform: `scale(${interpolate(frame, [0, 159], [1.05, 1.1])})`
            }}>
              <AnimatedText 
                text={"influential\ncontroversial\n21st century"}
                fontFamily={interMedium}
                size={52}
                enterType="ease-out"
                exitType="slide-up"
                exitStart={149}
                exitDuration={10}
                style={{ color: 'white' }}
              />
            </div>
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:08.500] 1952 / Leningrad / Post-WWII / Soviet household */}
        <Series.Sequence durationInFrames={165}>
          <AbsoluteFill style={{ 
            backgroundColor: '#1E293B',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: '100px',
            flexDirection: 'column'
          }}>
            <div style={{
              position: 'absolute',
              inset: 40,
              border: '2px solid rgba(255, 255, 255, 0.1)',
              pointerEvents: 'none'
            }} />
            
            <AnimatedText 
              text={"1952\nLeningrad\nPost-WWII\nSoviet household"}
              fontFamily={ibmPlexMonoRegular}
              size={44}
              enterType="typewriter"
              idleType="flicker"
              exitType="dissolve"
              exitStart={153}
              exitDuration={12}
              style={{ color: 'white' }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:14.000] discipline / nationalism / intelligence */}
        <Series.Sequence durationInFrames={195}>
          <AbsoluteFill style={{ 
            backgroundColor: '#0F172A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
               position: 'absolute',
               inset: 0,
               backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
               backgroundSize: '30px 30px'
            }} />
            
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%) rotate(-10deg)',
              border: '4px solid #dc2626',
              color: '#dc2626',
              padding: '10px 20px',
              fontWeight: 'bold',
              fontFamily: bebasNeue,
              fontSize: '48px',
              opacity: interpolate(frame, [30, 45], [0, 0.6], { extrapolateLeft: 'clamp' })
            }}>
              CONFIDENTIAL
            </div>

            <div style={{
               transform: `translateX(${interpolate(frame, [0, 195], [0, 100])}px)`
            }}>
              <AnimatedText 
                text={"discipline\nnationalism\nintelligence"}
                fontFamily={spaceGroteskSemiBold}
                size={48}
                enterType="smooth"
                idleType="tracking-expand"
                exitType="quick-fade"
                exitStart={182}
                exitDuration={13}
                style={{ color: 'white', textAlign: 'center' }}
              />
            </div>

            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-mystwrious-bass-pulse-2298.wav" 
              volume={0.1} // -20dB sub
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:20.500] KGB OFFICER / Intelligence service */}
        <Series.Sequence durationInFrames={135}>
          <AbsoluteFill style={{ 
            backgroundColor: '#111827',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: '100px'
          }}>
             <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/grid.png")'
             }} />
             <div style={{ position: 'absolute', right: 100, bottom: 100, opacity: 0.05 }}>
               <ShieldAlert size={400} color="white" />
             </div>

             <AnimatedText 
              text={"KGB OFFICER\nIntelligence service"}
              fontFamily={robotoCondensedBold}
              size={56}
              enterType="ease-in"
              exitType="slide-left"
              exitStart={123}
              exitDuration={12}
              style={{ color: 'white' }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:25.000] calculated / strategic / controlled */}
        <Series.Sequence durationInFrames={180}>
          <AbsoluteFill style={{ 
            backgroundColor: '#0A0A0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
             <LayoutGrid style={{ position: 'absolute', color: 'rgba(255, 255, 255, 0.05)', width: '100%', height: '100%' }} />
             
             <div style={{ 
               position: 'absolute', 
               left: 200, 
               top: interpolate(frame, [0, 180], [height, 200]),
               opacity: 0.2
             }}>
               <Lock size={120} color="white" />
             </div>

             <div style={{
               transform: `scale(${interpolate(frame, [0, 180], [1.1, 1.0])})`
            }}>
              <AnimatedText 
                text={"calculated\nstrategic\ncontrolled"}
                fontFamily={oswaldBold}
                size={60}
                enterType="snap"
                idleType="pulse-beat"
                exitType="quick-wipe"
                exitStart={171}
                exitDuration={9}
                style={{ color: 'white', textAlign: 'center' }}
              />
            </div>

            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-fast-small-sweep-transition-166.wav" 
              volume={0.12} // -18dB
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:31.000] 1991 Collapse / Rise through ranks */}
        <Series.Sequence durationInFrames={165}>
          <AbsoluteFill style={{ 
             background: 'linear-gradient(to bottom, #1E293B, #334155)',
             display: 'flex',
             alignItems: 'flex-start',
             justifyContent: 'center',
             paddingLeft: '100px'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 100,
              left: 100,
              width: interpolate(frame, [0, 60], [0, 800], { extrapolateRight: 'clamp' }),
              height: '4px',
              backgroundColor: 'white',
              opacity: 0.3
            }} />
            
            <div style={{
               transform: `translateY(${interpolate(frame, [0, 165], [0, -50])}px)`
            }}>
              <AnimatedText 
                text={"1991 Collapse\nRise through ranks"}
                fontFamily={interMedium}
                size={46}
                enterType="smooth"
                exitType="fade"
                exitStart={155}
                exitDuration={10}
                style={{ color: 'white' }}
              />
            </div>
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:36.500] 1999 / Prime Minister / PRESIDENT */}
        <Series.Sequence durationInFrames={165}>
          <AbsoluteFill style={{ 
             backgroundColor: '#0F172A',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              width: 600,
              height: 600,
              borderRadius: '50%',
              border: '2px solid rgba(255, 215, 0, 0.1)',
              opacity: 0.5
            }} />
            
            <div style={{
               transform: `scale(${interpolate(frame, [0, 165], [1.0, 1.15])})`
            }}>
              <AnimatedText 
                text={"1999\nPrime Minister\nPRESIDENT"}
                fontFamily={playfairDisplayBold}
                size={72}
                enterType="elastic-out"
                idleType="float"
                exitType="dissolve"
                exitStart={150}
                exitDuration={15}
                style={{ color: 'white', textAlign: 'center' }}
              />
            </div>

            <div style={{
                position: 'absolute',
                bottom: 200,
                width: interpolate(frame, [30, 60], [0, 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                height: '4px',
                background: 'linear-gradient(to right, transparent, gold, transparent)'
            }} />

            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-trumpet-fanfare-2293.wav" 
              volume={0.15} // -16dB
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:42.000] 20+ YEARS / Continuous control / Dominant figure */}
        <Series.Sequence durationInFrames={330}>
          <AbsoluteFill style={{ 
             backgroundColor: '#111827',
             display: 'flex',
             alignItems: 'flex-start',
             justifyContent: 'center',
             paddingLeft: '100px'
          }}>
            <Clock style={{ position: 'absolute', right: 100, top: 100, opacity: 0.05 }} size={300} />
            <div style={{
              position: 'absolute',
              bottom: 80,
              left: 100,
              right: 100,
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px'
            }}>
              <div style={{
                 height: '100%',
                 backgroundColor: '#dc2626',
                 width: `${interpolate(frame, [0, 330], [0, 100])}%`,
                 borderRadius: '4px'
              }} />
            </div>

            <AnimatedText 
              text={"20+ YEARS\nContinuous control\nDominant figure"}
              fontFamily={montserratSemiBold}
              size={50}
              enterType="smooth"
              exitType="slide-up"
              exitStart={312}
              exitDuration={18}
              style={{ color: 'white' }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:53.000] CENTRALIZED / Authoritative */}
        <Series.Sequence durationInFrames={135}>
          <AbsoluteFill style={{ 
             backgroundColor: '#1E293B',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 70%)',
              opacity: interpolate(frame, [0, 20], [0, 1])
            }} />
            
            <div style={{
               transform: `scale(${interpolate(frame, [0, 135], [1.0, 1.1])})`
            }}>
              <AnimatedText 
                text={"CENTRALIZED\nAuthoritative"}
                fontFamily={antonRegular}
                size={64}
                enterType="snap"
                idleType="vibrate"
                exitType="quick-fade"
                exitStart={125}
                exitDuration={10}
                style={{ color: 'white', textAlign: 'center' }}
              />
            </div>
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:57.500] Stability / National pride / Post-1990s */}
        <Series.Sequence durationInFrames={165}>
          <AbsoluteFill style={{ 
             background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)',
             display: 'flex',
             alignItems: 'flex-start',
             justifyContent: 'center',
             paddingLeft: '100px'
          }}>
            <div style={{
               position: 'absolute',
               top: '20%',
               right: '20%',
               width: 300,
               height: 300,
               background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
               filter: 'blur(40px)'
            }} />
            
            <AnimatedText 
              text={"Stability\nNational pride\nPost-1990s"}
              fontFamily={latoRegular}
              size={48}
              enterType="ease-out"
              idleType="gentle-glow"
              exitType="dissolve"
              exitStart={153}
              exitDuration={12}
              style={{ color: 'white' }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:03.000] Critics / Restrictions / Media control / Democratic limits */}
        <Series.Sequence durationInFrames={210}>
          <AbsoluteFill style={{ 
             backgroundColor: '#0A0A0A',
             display: 'flex',
             alignItems: 'flex-end',
             justifyContent: 'center',
             paddingRight: '100px'
          }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, #333 40px, #333 42px)'
            }} />

            <AlertTriangle 
              style={{ 
                position: 'absolute', 
                left: '10%', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#dc2626',
                opacity: interpolate(Math.sin(frame / 5), [-1, 1], [0.1, 0.5])
              }} 
              size={200}
            />

            <div style={{
               transform: `scale(${interpolate(frame, [0, 210], [1.0, 0.9])})`
            }}>
              <AnimatedText 
                text={"Critics\nRestrictions\nMedia control\nDemocratic limits"}
                fontFamily={robotoCondensedMedium}
                size={44}
                enterType="snap"
                idleType="shake"
                exitType="slide-down"
                exitStart={196}
                exitDuration={14}
                style={{ color: 'white', textAlign: 'right' }}
              />
            </div>

            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cool-impact-movie-trailer-2909.wav" 
              volume={0.25} // -12dB
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:10.000] GLOBAL STAGE / Diplomacy / Military / Strategy */}
        <Series.Sequence durationInFrames={225}>
          <AbsoluteFill style={{ 
             backgroundColor: '#111827',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
          }}>
            <Globe 
              style={{ 
                position: 'absolute', 
                color: 'rgba(255, 255, 255, 0.1)', 
                width: 600, 
                height: 600,
                transform: `rotate(${interpolate(frame, [0, 225], [0, 45])}deg)`
              }} 
            />
            
            <AnimatedText 
              text={"GLOBAL STAGE\nDiplomacy\nMilitary\nStrategy"}
              fontFamily={spaceGroteskBold}
              size={52}
              enterType="smooth"
              exitType="fade"
              exitStart={210}
              exitDuration={15}
              style={{ color: 'white', textAlign: 'center' }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:17.500] International attention / Center stage */}
        <Series.Sequence durationInFrames={195}>
          <AbsoluteFill style={{ 
             background: 'linear-gradient(to right, #0F172A, #7F1D1D)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
          }}>
             <div style={{
               position: 'absolute',
               inset: 0,
               opacity: 0.1,
               backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
               backgroundSize: '50px 50px'
             }} />
             
             <div style={{
               transform: `scale(${interpolate(frame, [0, 195], [1.0, 1.5], { extrapolateRight: 'clamp' })})`
            }}>
              <AnimatedText 
                text={"International attention\nCenter stage"}
                fontFamily={interExtraBold}
                size={56}
                enterType="elastic-out"
                idleType="pulse-intensifies"
                exitType="blur"
                exitStart={177}
                exitDuration={18}
                style={{ color: 'white', textAlign: 'center' }}
              />
            </div>

            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-epic-orchestra-transition-2290.wav" 
              volume={0.17} // -15dB
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:24.000] WHO IS HE? */}
        <Series.Sequence durationInFrames={105}>
          <AbsoluteFill style={{ 
             backgroundColor: 'black',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
          }}>
            <AnimatedText 
              text={"WHO IS HE?"}
              fontFamily={bebasNeue}
              size={88}
              enterType="quick"
              idleType="breath"
              exitType="blur"
              exitStart={93}
              exitDuration={12}
              style={{ color: 'white' }}
            />
            <div style={{
                marginLeft: 10,
                width: 4,
                height: 80,
                backgroundColor: 'white',
                opacity: interpolate(frame % 20, [0, 10, 20], [1, 0, 1])
            }} />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:27.500] Intelligence officer → Head of state */}
        <Series.Sequence durationInFrames={105}>
          <AbsoluteFill style={{ 
             backgroundColor: '#111827',
             display: 'flex',
             alignItems: 'flex-start',
             justifyContent: 'center',
             paddingLeft: '100px'
          }}>
            <div style={{ position: 'absolute', right: 100, top: 100, opacity: 0.1 }}>
               {frame < 52 ? <Lock size={200} color="white" /> : <Building2 size={200} color="white" />}
            </div>

            <AnimatedText 
              text={"Intelligence officer → Head of state"}
              fontFamily={jetBrainsMonoRegular}
              size={46}
              enterType="typewriter"
              exitType="slide-left"
              exitStart={94}
              exitDuration={11}
              style={{ color: 'white' }}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:31.000] stabilizer… / authoritarian power */}
        <Series.Sequence durationInFrames={180}>
          <AbsoluteFill style={{ 
             background: 'linear-gradient(to right, #0A0A0A 50%, #1E293B 50%)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'space-around'
          }}>
             <AnimatedText 
              text={"stabilizer…"}
              fontFamily={montserratBold}
              size={64}
              enterType="contrast"
              idleType="opposing-pulse"
              exitType="merge-fade"
              exitStart={159}
              exitDuration={21}
              style={{ color: 'white' }}
            />
            <AnimatedText 
              text={"authoritarian\npower"}
              fontFamily={montserratBold}
              size={64}
              enterType="contrast"
              idleType="opposing-pulse"
              exitType="merge-fade"
              exitStart={159}
              exitDuration={21}
              style={{ color: '#dc2626', textAlign: 'right' }}
            />

            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-movie-trailer-epic-impact-2908.wav" 
              volume={0.3} // -10dB
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:37.000] UNDENIABLE IMPACT */}
        <Series.Sequence durationInFrames={150}>
          <AbsoluteFill style={{ 
             backgroundColor: '#0F172A',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
          }}>
            <Globe 
              style={{ 
                position: 'absolute', 
                color: 'rgba(255, 255, 255, 0.05)', 
                width: 1000, 
                height: 1000,
                opacity: 0.2
              }} 
            />
            
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle, white ${interpolate(frame, [0, 40], [0, 100])}px, transparent ${interpolate(frame, [0, 40], [10, 200])}px)`,
              opacity: interpolate(frame, [40, 150], [0.2, 0]),
              pointerEvents: 'none'
            }} />

            <div style={{
               transform: `scale(${interpolate(frame, [0, 150], [1.0, 0.9])})`
            }}>
              <AnimatedText 
                text={"UNDENIABLE IMPACT"}
                fontFamily={interBlack}
                size={72}
                enterType="slow-reveal"
                idleType="single-pulse"
                exitType="complete-fade"
                exitStart={114}
                exitDuration={36}
                style={{ color: 'white' }}
              />
            </div>
          </AbsoluteFill>
        </Series.Sequence>

        {/* [01:42.000] End */}
        <Series.Sequence durationInFrames={60}>
           <AbsoluteFill style={{ backgroundColor: 'black' }} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
