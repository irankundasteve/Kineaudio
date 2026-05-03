import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { 
  Sequence, 
  useCurrentFrame, 
  useVideoConfig, 
  Audio, 
  interpolate, 
  spring, 
  AbsoluteFill,
  Series
} from 'remotion';
import React from 'react';
import '../index.css';
import { 
  MapPin, 
  Flag, 
  Globe, 
  Settings, 
  Zap, 
  Users, 
  Scale, 
  Building2,
  Stethoscope,
  CreditCard,
  History,
  Languages,
  Trees,
  Compass,
  Trophy,
  Ruler,
  TrendingUp,
  BarChart3,
  Network,
  Plane,
  Heart,
  Target,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

// Load fonts
const { fontFamily: montserratBlack } = loadMontserrat("normal", { weights: ["900"] });
const { fontFamily: montserratBold } = loadMontserrat("normal", { weights: ["700"] });
const { fontFamily: montserratSemiBold } = loadMontserrat("normal", { weights: ["600"] });
const { fontFamily: montserratMedium } = loadMontserrat("normal", { weights: ["500"] });
const { fontFamily: montserratRegular } = loadMontserrat("normal", { weights: ["400"] });
const { fontFamily: montserratLight } = loadMontserrat("normal", { weights: ["300"] });
const { fontFamily: montserratItalic } = loadMontserrat("italic", { weights: ["400"] });

// Helper components for animations
const SlideInText: React.FC<{ 
  text: string; 
  fontFamily: string; 
  size?: number; 
  className?: string;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ text, fontFamily, size = 48, className = "", delay = 0, duration = 12, style = {} }) => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const translateY = interpolate(
    frame,
    [delay, delay + duration],
    [20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div 
      className={className}
      style={{ 
        fontFamily, 
        fontSize: size, 
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: 'center',
        ...style
      }}
    >
      {text}
    </div>
  );
};

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', overflow: 'hidden' }}>
      <Series>
        {/* [00:00.000] Canada vs USA — Same Continent, Different Worlds */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
              <div style={{ width: '50%', height: '100%', backgroundColor: '#FF0000', opacity: 0.8 }} />
              <div style={{ width: '50%', height: '100%', backgroundColor: '#002868', opacity: 0.8 }} />
            </div>
            
            <div style={{ position: 'relative', zIndex: 10 }}>
              <SlideInText 
                text="CANADA vs USA" 
                fontFamily={montserratBold}
                size={92}
                className="drop-shadow-2xl"
                style={{ color: 'white' }}
              />
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', marginTop: '16px', fontSize: '24px', fontFamily: montserratMedium }}>
                Same Continent, Different Worlds
              </div>
            </div>

            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-intro-transition-1146.wav" 
              volume={1.0}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:01.000] Two nations. */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
              <div style={{ width: '50%', height: '100%', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }} />
            </div>
            <SlideInText 
              text="Two nations." 
              fontFamily={montserratSemiBold}
              style={{ color: 'white', position: 'absolute', bottom: '80px' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-fast-small-sweep-transition-166.wav" 
              volume={0.7}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:01.500] One border. */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '4px', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.4)', position: 'absolute', left: '50%' }} />
            <SlideInText 
              text="One border." 
              fontFamily={montserratSemiBold}
              style={{ color: 'white' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-arrow-whoosh-1491.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:02.000] Zero confusion… once you look closer. */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#18181b' }}>
             <Network style={{ color: 'rgba(255, 255, 255, 0.05)', position: 'absolute', width: '100%', height: '100%', padding: '160px' }} />
            <SlideInText 
              text="look closer →" 
              fontFamily={montserratItalic}
              size={48}
              style={{ color: '#f59e0b', position: 'absolute', bottom: '80px', right: '80px' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cinematic-transition-swoosh-heartbeat-trailer-488.wav" 
              volume={0.6}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:03.000] different systems */}
        <Series.Sequence durationInFrames={75}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe style={{ color: 'rgba(255, 255, 255, 0.2)', width: '400px', height: '400px' }} />
            <SlideInText 
              text="different systems" 
              fontFamily={montserratBold}
              style={{ color: 'white', position: 'absolute', bottom: '80px' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-technological-futuristic-hum-2133.wav" 
              volume={0.3}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:05.500] IDENTITY */}
        <Series.Sequence durationInFrames={24}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SlideInText 
              text="IDENTITY" 
              fontFamily={montserratBlack}
              size={84}
              style={{ color: 'white' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-melodical-flute-music-notification-2310.wav" 
              volume={0.8}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:06.300] multiculturalism • policy • deliberate */}
        <Series.Sequence durationInFrames={54}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: '#ef4444' }}>
              <Users size={64} />
              <span style={{ color: 'white', fontSize: '36px', fontFamily: montserratMedium }}>multiculturalism</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: '#ef4444' }}>
              <ShieldCheck size={64} />
              <span style={{ color: 'white', fontSize: '36px', fontFamily: montserratMedium }}>policy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: '#ef4444' }}>
              <Target size={64} />
              <span style={{ color: 'white', fontSize: '36px', fontFamily: montserratMedium }}>deliberate</span>
            </div>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-keyboard-typing-1386.wav" 
              volume={0.4}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:08.100] freedom first */}
        <Series.Sequence durationInFrames={51}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(30, 58, 138, 0.2)' }}>
            <SlideInText 
              text="freedom first" 
              fontFamily={montserratBold}
              style={{ color: 'white', textTransform: 'uppercase', fontStyle: 'italic' }}
              size={72}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cinematic-laser-gun-thunder-1287.wav" 
              volume={0.6}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:09.800] GOVERNANCE */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#18181b' }}>
            <SlideInText 
              text="GOVERNANCE" 
              fontFamily={montserratBlack}
              size={84}
              style={{ color: 'white' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-trumpet-fanfare-2293.wav" 
              volume={0.7}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:10.800] constitutional monarchy • parliamentary */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <History style={{ color: '#ef4444', marginBottom: '40px' }} size={80} />
            <div style={{ color: 'white', fontSize: '30px', fontFamily: montserratMedium }}>
              constitutional monarchy • parliamentary
            </div>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-tick-tock-clock-timer-1045.wav" 
              volume={0.3}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:12.800] republic • no monarchy */}
        <Series.Sequence durationInFrames={42}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', textAlign: 'right' }}>
             <div style={{ color: 'white', fontSize: '48px', fontWeight: 900, marginBottom: '24px', display: 'flex', gap: '16px', fontFamily: montserratBold }}>
                <span style={{ color: '#dc2626', textDecoration: 'line-through' }}>MONARCHY</span> NO
             </div>
             <div style={{ color: 'white', fontSize: '36px', fontFamily: montserratBold }}>
                REPUBLIC
             </div>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-fast-whoosh-transition-1490.wav" 
              volume={0.6}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:14.200] executive • legislative • judicial */}
        <Series.Sequence durationInFrames={45}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: '#60a5fa' }}>
              <Building2 size={64} />
              <span style={{ color: 'white', fontSize: '18px', fontFamily: montserratSemiBold }}>Executive</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: '#f87171' }}>
              <Users size={64} />
              <span style={{ color: 'white', fontSize: '18px', fontFamily: montserratSemiBold }}>Legislative</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: '#fbbf24' }}>
              <Scale size={64} />
              <span style={{ color: 'white', fontSize: '18px', fontFamily: montserratSemiBold }}>Judicial</span>
            </div>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-clock-countdown-bleeps-916.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:15.700] HEALTHCARE */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '4px', backgroundColor: '#dc2626', height: '100%', position: 'absolute' }} />
            <SlideInText 
              text="HEALTHCARE" 
              fontFamily={montserratBlack}
              size={84}
              style={{ color: 'white', backgroundColor: 'black', paddingLeft: '40px', paddingRight: '40px' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cinematic-whoosh-fast-transition-1492.wav" 
              volume={0.7}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:16.200] publicly funded • no door payment */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(30, 58, 138, 0.1)' }}>
            <Stethoscope style={{ color: '#3b82f6', marginBottom: '40px' }} size={80} />
            <div style={{ color: 'white', fontSize: '30px', fontFamily: montserratMedium }}>
              publicly funded • no door payment
            </div>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-small-crowd-laugh-and-applause-422.wav" 
              volume={0.2}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:17.200] $0 at door */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SlideInText 
              text="$0 AT DOOR" 
              fontFamily={montserratBold}
              size={84}
              style={{ color: '#22c55e' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cartoon-toy-whistle-616.wav" 
              volume={0.3}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:18.200] private • insurance-driven */}
        <Series.Sequence durationInFrames={36}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', textAlign: 'right', backgroundColor: 'rgba(127, 29, 29, 0.1)' }}>
            <CreditCard style={{ color: '#ef4444', marginBottom: '40px' }} size={80} />
            <div style={{ color: 'white', fontSize: '30px', fontFamily: montserratMedium }}>
              private • insurance-driven
            </div>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-vintage-telephone-ringtone-1356.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:19.400] access • speed • cost */}
        <Series.Sequence durationInFrames={45}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
            <span style={{ color: 'white', fontSize: '30px', fontFamily: montserratSemiBold }}>ACCESS</span>
            <span style={{ color: 'white', fontSize: '30px', fontFamily: montserratSemiBold }}>SPEED</span>
            <span style={{ color: 'white', fontSize: '30px', fontFamily: montserratSemiBold }}>COST</span>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-game-show-suspense-waiting-667.wav" 
              volume={0.3}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:20.900] CULTURE */}
        <Series.Sequence durationInFrames={12}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
            <SlideInText 
              text="CULTURE" 
              fontFamily={montserratBlack}
              size={84}
              style={{ color: 'white' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-air-woosh-1489.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:21.300] restraint • politeness • consensus */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Trees style={{ color: '#10b981' }} size={120} />
             <div style={{ color: 'white', fontSize: '30px', fontFamily: montserratLight }}>
              restraint • politeness • consensus
            </div>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-little-birds-singing-in-the-trees-17.wav" 
              volume={0.2}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:23.300] confidence • directness • competition */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'right', gap: '40px' }}>
            <div style={{ color: 'white', fontSize: '30px', textTransform: 'uppercase', fontWeight: 900, fontFamily: montserratBold }}>
              confidence • directness • competition
            </div>
            <Trophy style={{ color: '#f59e0b' }} size={120} />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-martial-arts-fast-punch-2047.wav" 
              volume={0.6}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:25.300] MEASUREMENT */}
        <Series.Sequence durationInFrames={18}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px', backgroundColor: '#18181b' }}>
             <Ruler style={{ color: 'rgba(255, 255, 255, 0.1)', position: 'absolute', transform: 'scale(3)' }} />
             <SlideInText 
              text="MEASUREMENT" 
              fontFamily={montserratBlack}
              size={64}
              style={{ color: 'white' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-transition-windy-swoosh-1474.wav" 
              volume={0.4}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:25.900] km • °C • kg */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', alignItems: 'center', gap: '40px' }}>
            <div style={{ color: 'white', fontSize: '48px', fontFamily: montserratMedium }}>
              km • °C • kg
            </div>
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-fast-rocket-whoosh-1714.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:26.400] mi • °F • lbs */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'right' }}>
            <div style={{ color: 'white', fontSize: '48px', fontFamily: montserratBold }}>
              mi • °F • lbs
            </div>
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-air-zoom-vacuum-2608.wav" 
              volume={0.4}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:26.900] GIANTS */}
        <Series.Sequence durationInFrames={24}>
           <AbsoluteFill style={{ backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <SlideInText 
              text="GIANTS" 
              fontFamily={montserratBlack}
              size={120}
              style={{ color: 'white' }}
            />
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cool-impact-movie-trailer-2909.wav" 
              volume={0.7}
            />
           </AbsoluteFill>
        </Series.Sequence>

        {/* [00:27.700] larger • faster • aggressive */}
        <Series.Sequence durationInFrames={18}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', textAlign: 'right', backgroundColor: 'rgba(30, 58, 138, 0.1)' }}>
             <div style={{ color: 'white', fontSize: '36px', marginBottom: '8px', fontFamily: montserratBold }}>LARGER</div>
             <div style={{ color: 'white', fontSize: '36px', marginBottom: '8px', fontFamily: montserratBold }}>FASTER</div>
             <div style={{ color: 'white', fontSize: '36px', fontFamily: montserratBold }}>AGGRESSIVE</div>
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-fast-rocket-whoosh-1714.wav" 
              volume={0.6}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:28.300] steady • resources • trade */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(120, 53, 15, 0.1)' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', color: '#f59e0b' }}>
              <Compass size={40} />
              <Plane size={40} />
              <Network size={40} />
            </div>
             <div style={{ color: 'white', fontSize: '30px', fontFamily: montserratMedium }}>
               steady • resources • trade
             </div>
              <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-crickets-and-insects-in-the-wild-ambience-39.wav" 
              volume={0.1}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:30.300] GLOBAL IMAGE */}
        <Series.Sequence durationInFrames={36}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#18181b' }}>
             <SlideInText 
              text="GLOBAL IMAGE" 
              fontFamily={montserratBlack}
              size={84}
              style={{ color: 'white' }}
            />
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-epic-orchestra-transition-2290.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:31.500] diplomatic • calm • cooperative */}
        <Series.Sequence durationInFrames={45}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(30, 58, 138, 0.1)' }}>
             <Languages style={{ color: '#3b82f6', marginBottom: '40px' }} size={64} />
             <div style={{ color: 'white', fontSize: '30px', fontFamily: montserratLight }}>
                diplomatic • calm • cooperative
             </div>
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-stadium-crowd-light-applause-362.wav" 
              volume={0.2}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:33.000] powerful • influential • unavoidable */}
        <Series.Sequence durationInFrames={21}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', textAlign: 'right', backgroundColor: 'rgba(127, 29, 29, 0.1)' }}>
             <Zap style={{ color: '#ef4444', marginBottom: '40px' }} size={64} />
             <div style={{ color: 'white', fontSize: '30px', textTransform: 'uppercase', fontWeight: 900, fontStyle: 'italic', fontFamily: montserratBlack }}>
                powerful • influential • unavoidable
             </div>
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-movie-trailer-epic-impact-2908.wav" 
              volume={0.8}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:33.700] REAL DIFFERENCE? */}
        <Series.Sequence durationInFrames={12}>
           <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <SlideInText 
                text="REAL DIFFERENCE?" 
                fontFamily={montserratBold}
                size={72}
                style={{ color: 'white' }}
              />
              <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-female-astonished-gasp-964.wav" 
              volume={0.4}
            />
           </AbsoluteFill>
        </Series.Sequence>

        {/* [00:34.100] optimizes for BALANCE */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(6, 78, 59, 0.2)' }}>
             <Scale style={{ color: '#10b981', marginBottom: '40px' }} size={80} />
             <div style={{ color: 'white', fontSize: '36px', fontFamily: montserratBold }}>
                optimizes for BALANCE
             </div>
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-mystwrious-bass-pulse-2298.wav" 
              volume={0.4}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:35.100] optimizes for DOMINANCE */}
        <Series.Sequence durationInFrames={24}>
           <AbsoluteFill style={{ padding: '80px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', textAlign: 'right', backgroundColor: 'rgba(124, 45, 18, 0.2)' }}>
             <Target style={{ color: '#f97316', marginBottom: '40px' }} size={80} />
             <div style={{ color: 'white', fontSize: '36px', fontFamily: montserratBlack }}>
                optimizes for DOMINANCE
             </div>
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-aggressive-beast-roar-13.wav" 
              volume={0.6}
            />
           </AbsoluteFill>
        </Series.Sequence>

        {/* [00:35.900] Same continent. */}
        <Series.Sequence durationInFrames={36}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe style={{ color: 'rgba(255, 255, 255, 0.1)', position: 'absolute', width: '100%', height: '100%', padding: '160px' }} />
            <SlideInText 
              text="Same continent." 
              fontFamily={montserratMedium}
              style={{ color: 'white' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-flock-of-wild-geese-20.wav" 
              volume={0.3}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:37.100] Different philosophies. */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
             <div style={{ display: 'flex', gap: '40px' }}>
               <Scale style={{ color: '#ef4444' }} size={60} />
               <Zap style={{ color: '#3b82f6' }} size={60} />
             </div>
             <SlideInText 
              text="Different philosophies." 
              fontFamily={montserratBold}
              style={{ color: 'white', position: 'absolute', bottom: '80px' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-vacuum-swoosh-transition-1465.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:37.600] changes everything. */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'rgba(255, 255, 255, 0.2)', marginBottom: '40px', fontSize: '24px', fontWeight: 900, fontFamily: montserratBlack }}>
               CA <ArrowRight /> US
             </div>
             <SlideInText 
              text="changes everything." 
              fontFamily={montserratBlack}
              size={64}
              style={{ color: 'white' }}
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cinematic-transition-swoosh-heartbeat-trailer-488.wav" 
              volume={0.7}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:39.600] End */}
        <Series.Sequence durationInFrames={60}>
           <AbsoluteFill className="bg-black" />
           <Audio 
            src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-light-rain-loop-2393.wav" 
            volume={0.1}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
