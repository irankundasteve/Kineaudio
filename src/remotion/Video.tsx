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
}> = ({ text, fontFamily, size = 48, className = "", delay = 0, duration = 12 }) => {
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
        textAlign: 'center'
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
          <AbsoluteFill className="flex items-center justify-center">
            <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full bg-[#FF0000] opacity-80" />
              <div className="w-1/2 h-full bg-[#002868] opacity-80" />
            </div>
            
            <div className="relative z-10">
              <SlideInText 
                text="CANADA vs USA" 
                fontFamily={montserratBold}
                size={92}
                className="text-white drop-shadow-2xl"
              />
              <div className="text-white/80 text-center mt-4 text-2xl" style={{ fontFamily: montserratMedium }}>
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
          <AbsoluteFill className="flex items-center justify-center">
            <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full border-r border-white/20" />
            </div>
            <SlideInText 
              text="Two nations." 
              fontFamily={montserratSemiBold}
              className="text-white absolute bottom-20"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-fast-small-sweep-transition-166.wav" 
              volume={0.7}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:01.500] One border. */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill className="flex items-center justify-center">
            <div className="w-1 h-full bg-white/40 absolute left-1/2" />
            <SlideInText 
              text="One border." 
              fontFamily={montserratSemiBold}
              className="text-white"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-arrow-whoosh-1491.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:02.000] Zero confusion… once you look closer. */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill className="flex items-center justify-center bg-zinc-900">
             <Network className="text-white/5 absolute w-full h-full p-40" />
            <SlideInText 
              text="look closer →" 
              fontFamily={montserratItalic}
              size={48}
              className="text-amber-500 absolute bottom-20 right-20"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cinematic-transition-swoosh-heartbeat-trailer-488.wav" 
              volume={0.6}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:03.000] different systems */}
        <Series.Sequence durationInFrames={75}>
          <AbsoluteFill className="flex items-center justify-center">
            <Globe className="text-white/20 w-[400px] h-[400px]" />
            <SlideInText 
              text="different systems" 
              fontFamily={montserratBold}
              className="text-white absolute bottom-20"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-technological-futuristic-hum-2133.wav" 
              volume={0.3}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:05.500] IDENTITY */}
        <Series.Sequence durationInFrames={24}>
          <AbsoluteFill className="flex items-center justify-center">
            <SlideInText 
              text="IDENTITY" 
              fontFamily={montserratBlack}
              size={84}
              className="text-white"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-melodical-flute-music-notification-2310.wav" 
              volume={0.8}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:06.300] multiculturalism • policy • deliberate */}
        <Series.Sequence durationInFrames={54}>
          <AbsoluteFill className="p-20 flex flex-col justify-center gap-10">
            <div className="flex items-center gap-6 text-red-500">
              <Users size={64} />
              <span className="text-white text-4xl" style={{ fontFamily: montserratMedium }}>multiculturalism</span>
            </div>
            <div className="flex items-center gap-6 text-red-500">
              <ShieldCheck size={64} />
              <span className="text-white text-4xl" style={{ fontFamily: montserratMedium }}>policy</span>
            </div>
            <div className="flex items-center gap-6 text-red-500">
              <Target size={64} />
              <span className="text-white text-4xl" style={{ fontFamily: montserratMedium }}>deliberate</span>
            </div>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-keyboard-typing-1386.wav" 
              volume={0.4}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:08.100] freedom first */}
        <Series.Sequence durationInFrames={51}>
          <AbsoluteFill className="flex items-center justify-center bg-blue-900/20">
            <SlideInText 
              text="freedom first" 
              fontFamily={montserratBold}
              className="text-white uppercase italic"
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
          <AbsoluteFill className="flex items-center justify-center bg-zinc-900">
            <SlideInText 
              text="GOVERNANCE" 
              fontFamily={montserratBlack}
              size={84}
              className="text-white"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-trumpet-fanfare-2293.wav" 
              volume={0.7}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:10.800] constitutional monarchy • parliamentary */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill className="p-20 flex flex-col justify-center">
            <History className="text-red-500 mb-10" size={80} />
            <div className="text-white text-3xl" style={{ fontFamily: montserratMedium }}>
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
          <AbsoluteFill className="p-20 flex flex-col justify-center items-end text-right">
             <div className="text-white text-5xl font-black mb-6 flex gap-4" style={{ fontFamily: montserratBold }}>
                <span className="text-red-600 line-through">MONARCHY</span> NO
             </div>
             <div className="text-white text-4xl" style={{ fontFamily: montserratBold }}>
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
          <AbsoluteFill className="flex items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-4 text-blue-400">
              <Building2 size={64} />
              <span className="text-white text-lg" style={{ fontFamily: montserratSemiBold }}>Executive</span>
            </div>
            <div className="flex flex-col items-center gap-4 text-red-400">
              <Users size={64} />
              <span className="text-white text-lg" style={{ fontFamily: montserratSemiBold }}>Legislative</span>
            </div>
            <div className="flex flex-col items-center gap-4 text-amber-400">
              <Scale size={64} />
              <span className="text-white text-lg" style={{ fontFamily: montserratSemiBold }}>Judicial</span>
            </div>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-clock-countdown-bleeps-916.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:15.700] HEALTHCARE */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill className="flex items-center justify-center">
            <div className="w-1 bg-red-600 h-full absolute" />
            <SlideInText 
              text="HEALTHCARE" 
              fontFamily={montserratBlack}
              size={84}
              className="text-white bg-black px-10"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cinematic-whoosh-fast-transition-1492.wav" 
              volume={0.7}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:16.200] publicly funded • no door payment */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill className="p-20 flex flex-col justify-center bg-blue-900/10">
            <Stethoscope className="text-blue-500 mb-10" size={80} />
            <div className="text-white text-3xl" style={{ fontFamily: montserratMedium }}>
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
          <AbsoluteFill className="flex items-center justify-center">
            <SlideInText 
              text="$0 AT DOOR" 
              fontFamily={montserratBold}
              size={84}
              className="text-green-500"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cartoon-toy-whistle-616.wav" 
              volume={0.3}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:18.200] private • insurance-driven */}
        <Series.Sequence durationInFrames={36}>
          <AbsoluteFill className="p-20 flex flex-col items-end justify-center text-right bg-red-900/10">
            <CreditCard className="text-red-500 mb-10" size={80} />
            <div className="text-white text-3xl" style={{ fontFamily: montserratMedium }}>
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
          <AbsoluteFill className="flex items-center justify-center gap-10">
            <span className="text-white text-3xl" style={{ fontFamily: montserratSemiBold }}>ACCESS</span>
            <span className="text-white text-3xl" style={{ fontFamily: montserratSemiBold }}>SPEED</span>
            <span className="text-white text-3xl" style={{ fontFamily: montserratSemiBold }}>COST</span>
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-game-show-suspense-waiting-667.wav" 
              volume={0.3}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:20.900] CULTURE */}
        <Series.Sequence durationInFrames={12}>
          <AbsoluteFill className="flex items-center justify-center bg-slate-900">
            <SlideInText 
              text="CULTURE" 
              fontFamily={montserratBlack}
              size={84}
              className="text-white"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-air-woosh-1489.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:21.300] restraint • politeness • consensus */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill className="p-20 flex items-center gap-10">
            <Trees className="text-emerald-500" size={120} />
             <div className="text-white text-3xl" style={{ fontFamily: montserratLight }}>
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
          <AbsoluteFill className="p-20 flex items-center justify-end text-right gap-10">
            <div className="text-white text-3xl uppercase font-black" style={{ fontFamily: montserratBold }}>
              confidence • directness • competition
            </div>
            <Trophy className="text-amber-500" size={120} />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-martial-arts-fast-punch-2047.wav" 
              volume={0.6}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:25.300] MEASUREMENT */}
        <Series.Sequence durationInFrames={18}>
          <AbsoluteFill className="flex items-center justify-center p-20 bg-zinc-900">
             <Ruler className="text-white/10 absolute scale-[3]" />
             <SlideInText 
              text="MEASUREMENT" 
              fontFamily={montserratBlack}
              size={64}
              className="text-white"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-transition-windy-swoosh-1474.wav" 
              volume={0.4}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:25.900] km • °C • kg */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill className="p-20 flex items-center gap-10">
            <div className="text-white text-5xl" style={{ fontFamily: montserratMedium }}>
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
          <AbsoluteFill className="p-20 flex items-center justify-end text-right">
            <div className="text-white text-5xl" style={{ fontFamily: montserratBold }}>
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
           <AbsoluteFill className="bg-slate-900 flex items-center justify-center">
             <SlideInText 
              text="GIANTS" 
              fontFamily={montserratBlack}
              size={120}
              className="text-white"
            />
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-cool-impact-movie-trailer-2909.wav" 
              volume={0.7}
            />
           </AbsoluteFill>
        </Series.Sequence>

        {/* [00:27.700] larger • faster • aggressive */}
        <Series.Sequence durationInFrames={18}>
          <AbsoluteFill className="p-20 flex flex-col items-end justify-center text-right bg-blue-900/10">
             <div className="text-white text-4xl mb-2" style={{ fontFamily: montserratBold }}>LARGER</div>
             <div className="text-white text-4xl mb-2" style={{ fontFamily: montserratBold }}>FASTER</div>
             <div className="text-white text-4xl" style={{ fontFamily: montserratBold }}>AGGRESSIVE</div>
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-fast-rocket-whoosh-1714.wav" 
              volume={0.6}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:28.300] steady • resources • trade */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill className="p-20 flex flex-col justify-center bg-amber-900/10">
            <div className="flex gap-4 mb-4 text-amber-500">
              <Compass size={40} />
              <Plane size={40} />
              <Network size={40} />
            </div>
             <div className="text-white text-3xl" style={{ fontFamily: montserratMedium }}>
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
          <AbsoluteFill className="flex items-center justify-center bg-zinc-900">
             <SlideInText 
              text="GLOBAL IMAGE" 
              fontFamily={montserratBlack}
              size={84}
              className="text-white"
            />
             <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-epic-orchestra-transition-2290.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:31.500] diplomatic • calm • cooperative */}
        <Series.Sequence durationInFrames={45}>
          <AbsoluteFill className="p-20 flex flex-col justify-center bg-blue-900/10">
             <Languages className="text-blue-500 mb-10" size={64} />
             <div className="text-white text-3xl" style={{ fontFamily: montserratLight }}>
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
          <AbsoluteFill className="p-20 flex flex-col items-end justify-center text-right bg-red-900/10">
             <Zap className="text-red-500 mb-10" size={64} />
             <div className="text-white text-3xl uppercase font-black italic" style={{ fontFamily: montserratBlack }}>
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
           <AbsoluteFill className="flex items-center justify-center">
             <SlideInText 
                text="REAL DIFFERENCE?" 
                fontFamily={montserratBold}
                size={72}
                className="text-white"
              />
              <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-female-astonished-gasp-964.wav" 
              volume={0.4}
            />
           </AbsoluteFill>
        </Series.Sequence>

        {/* [00:34.100] optimizes for BALANCE */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill className="p-20 flex flex-col justify-center bg-emerald-950/20">
             <Scale className="text-emerald-500 mb-10" size={80} />
             <div className="text-white text-4xl" style={{ fontFamily: montserratBold }}>
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
           <AbsoluteFill className="p-20 flex flex-col items-end justify-center text-right bg-orange-950/20">
             <Target className="text-orange-500 mb-10" size={80} />
             <div className="text-white text-4xl" style={{ fontFamily: montserratBlack }}>
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
          <AbsoluteFill className="flex items-center justify-center">
            <Globe className="text-white/10 absolute w-full h-full p-40" />
            <SlideInText 
              text="Same continent." 
              fontFamily={montserratMedium}
              className="text-white"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-flock-of-wild-geese-20.wav" 
              volume={0.3}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:37.100] Different philosophies. */}
        <Series.Sequence durationInFrames={15}>
          <AbsoluteFill className="flex items-center justify-center bg-black">
             <div className="flex gap-10">
               <Scale className="text-red-500" size={60} />
               <Zap className="text-blue-500" size={60} />
             </div>
             <SlideInText 
              text="Different philosophies." 
              fontFamily={montserratBold}
              className="text-white absolute bottom-20"
            />
            <Audio 
              src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/mixkit-vacuum-swoosh-transition-1465.wav" 
              volume={0.5}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* [00:37.600] changes everything. */}
        <Series.Sequence durationInFrames={60}>
          <AbsoluteFill className="flex items-center justify-center bg-black">
             <div className="flex items-center gap-4 text-white/20 mb-10 text-2xl font-bold" style={{ fontFamily: montserratBlack }}>
               CA <ArrowRight /> US
             </div>
             <SlideInText 
              text="changes everything." 
              fontFamily={montserratBlack}
              size={64}
              className="text-white"
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
