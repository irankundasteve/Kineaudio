import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { Sequence, useCurrentFrame, useVideoConfig, Audio, interpolate, spring } from 'remotion';
import React from 'react';
import { 
  Shield, 
  DoorClosed, 
  Banknote, 
  Clock, 
  Eye, 
  Fingerprint, 
  Gavel, 
  Globe, 
  Scale, 
  Crown, 
  Star, 
  Rocket, 
  Navigation, 
  Building2,
  Users
} from 'lucide-react';

// Load fonts
const { fontFamily: montserratBlack } = loadMontserrat("normal", { weights: ["900"] });
const { fontFamily: interBold } = loadInter("normal", { weights: ["700"] });
const { fontFamily: interSemiBold } = loadInter("normal", { weights: ["600"] });
const { fontFamily: interMedium } = loadInter("normal", { weights: ["500"] });
const { fontFamily: interRegular } = loadInter("normal", { weights: ["400"] });
const { fontFamily: interLight } = loadInter("normal", { weights: ["300"] });
const { fontFamily: spaceGroteskBold } = loadSpaceGrotesk("normal", { weights: ["700"] });
const { fontFamily: oswaldBold } = loadOswald("normal", { weights: ["700"] });
const { fontFamily: oswaldExtraBold } = loadOswald("normal", { weights: ["700"] });

const FPS = 30;

const TextLayer: React.FC<{
  text: string;
  font: string;
  fontSize: number;
  position: { x: number; y: number };
  frame: number;
  duration: number;
  enterAnim?: (f: number) => React.CSSProperties;
  exitAnim?: (f: number, dur: number) => React.CSSProperties;
  idleAnim?: (f: number) => React.CSSProperties;
}> = ({ text, font, fontSize, position, frame, duration, enterAnim, exitAnim, idleAnim }) => {
  const enter = enterAnim ? enterAnim(frame) : { opacity: interpolate(frame, [0, 5], [0, 1]) };
  const exit = exitAnim ? exitAnim(frame, duration) : { opacity: interpolate(frame, [duration - 5, duration], [1, 0]) };
  const idle = idleAnim ? idleAnim(frame) : {};

  return (
    <div style={{
      position: 'absolute',
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: 'translate(-50%, -50%)',
      fontFamily: font,
      fontSize: `${fontSize}px`,
      color: 'white',
      textAlign: 'center',
      textTransform: 'uppercase',
      lineHeight: '1.2',
      ...enter,
      ...exit,
      ...idle,
    }}>
      {text}
    </div>
  );
};

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = (f: number, config = { damping: 12 }) => spring({ frame: f, fps, config });

  return (
    <div style={{ flex: 1, backgroundColor: '#000', position: 'relative' }}>
      
      {/* 1. Intro (0:00 - 1.5s) */}
      <Sequence from={0} durationInFrames={45}>
        <div style={{ 
          flex: 1, width: '100%', height: '100%', 
          background: 'linear-gradient(135deg, #0A0E17, #1A2035)',
          transform: `scale(${1 + interpolate(frame, [0, 45], [0, 0.02])})` 
        }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/title_sting.wav" volume={0.5} />
          <TextLayer text="CANADA vs USA — SAME CONTINENT, DIFFERENT WORLDS" font={montserratBlack} fontSize={64} position={{ x: 50, y: 40 }} frame={frame} duration={45} 
            enterAnim={(f) => ({ opacity: interpolate(f, [0, 10], [0, 1]), transform: `translate(-50%, -50%) scale(${interpolate(f, [0, 15], [0.8, 1], { extrapolateRight: 'clamp' })})` })}
            exitAnim={(f, dur) => ({ opacity: interpolate(f, [dur-5, dur], [1, 0]) })}
            idleAnim={(f) => ({ transform: `translate(-50%, -50%) scale(${1 + Math.sin(f / 10) * 0.01})` })}
          />
          {/* 2ndVis: thin red/blue horizontal rule expanding from center */}
          <div style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            height: '4px',
            width: `${interpolate(frame, [0, 15], [0, 80], { extrapolateRight: 'clamp' })}%`,
            background: 'linear-gradient(to right, #B22234 50%, #003399 50%)',
            transform: 'translateX(-50%)',
            borderRadius: '2px'
          }} />
        </div>
      </Sequence>

      {/* 2. Two Nations (1.533 - 2.433) */}
      <Sequence from={46} durationInFrames={27}>
        <div style={{ flex: 1, background: '#0A0E17', width: '100%', height: '100%' }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/pop.wav" volume={0.7} />
          <TextLayer text="TWO NATIONS" font={interBold} fontSize={48} position={{ x: 20, y: 45 }} frame={frame - 46} duration={27} />
        </div>
      </Sequence>

      {/* 3. One Border (2.466 - 3.266) */}
      <Sequence from={74} durationInFrames={24}>
        <div style={{ flex: 1, background: '#0A0E17', width: '100%', height: '100%' }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/click.wav" volume={0.6} />
          <TextLayer text="ONE BORDER" font={interBold} fontSize={48} position={{ x: 80, y: 45 }} frame={frame - 74} duration={24} />
          <div style={{ position: 'absolute', left: '50%', height: '100%', width: '2px', borderLeft: '2px dashed #444' }} />
        </div>
      </Sequence>

      {/* 4. Zero Confusion (3.3 - 4.566) */}
      <Sequence from={99} durationInFrames={38}>
        <div style={{ 
          flex: 1, background: 'radial-gradient(circle, #1C2536, #0F1520)', width: '100%', height: '100%',
          transform: `scale(${1.05 - interpolate(frame - 99, [0, 38], [0, 0.05])})` 
        }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/whoosh.wav" volume={0.4} />
          <TextLayer text="ZERO CONFUSION… ONCE YOU LOOK CLOSER" font={interMedium} fontSize={32} position={{ x: 50, y: 50 }} frame={frame - 99} duration={38}
            idleAnim={(f) => ({ letterSpacing: `${f / 10}px` })} />
          
          {/* 2ndVis: concentric circles expanding from center */}
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                width: `${interpolate(frame - 99, [0, 38], [0, 800 + i * 200])}px`,
                height: `${interpolate(frame - 99, [0, 38], [0, 800 + i * 200])}px`,
                transform: 'translate(-50%, -50%)',
                opacity: interpolate(frame - 99, [0, 38], [0.5, 0])
            }} />
          ))}
        </div>
      </Sequence>

      {/* 5. Share Geography (4.6 - 5.6) */}
      <Sequence from={138} durationInFrames={30}>
        <div style={{ flex: 1, background: '#1A2035', width: '100%', height: '100%' }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/slide.wav" volume={0.5} />
          <TextLayer text="SHARE GEOGRAPHY—" font={interRegular} fontSize={28} position={{ x: 50, y: 75 }} frame={frame - 138} duration={30} />
        </div>
      </Sequence>

      {/* 6. Systems (5.633 - 7.133) */}
      <Sequence from={169} durationInFrames={45}>
        <div style={{ flex: 1, display: 'flex', width: '100%', height: '100%' }}>
          <div style={{ flex: 1, background: '#003399' }} /><div style={{ flex: 1, background: '#B22234' }} />
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/glitch.wav" volume={0.7} />
          <TextLayer text="VERY DIFFERENT SYSTEMS" font={spaceGroteskBold} fontSize={36} position={{ x: 50, y: 50 }} frame={frame - 169} duration={45} 
            enterAnim={(f) => ({ transform: `translate(-50%, -50%) scale(${s(f)})` })}
          />
        </div>
      </Sequence>

      {/* 7. Identity Intro (7.166 - 8.366) */}
      <Sequence from={215} durationInFrames={36}>
        <div style={{ flex: 1, background: '#0A0E17', width: '100%', height: '100%' }}>
            <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/click.wav" />
            <TextLayer text="START WITH IDENTITY" font={interBold} fontSize={28} position={{ x: 50, y: 25 }} frame={frame - 215} duration={36} />
            {/* 2ndVis: fingerprint scan line */}
            <div style={{
                position: 'absolute',
                top: `${interpolate(frame - 215, [0, 36], [0, 100])}%`,
                left: '0',
                width: '100%',
                height: '2px',
                background: 'rgba(0, 255, 255, 0.4)',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)'
            }} />
        </div>
      </Sequence>

      {/* 8. Canada Multiculturalism (8.4 - 10.466) */}
      <Sequence from={252} durationInFrames={62}>
        <div style={{ flex: 1, background: '#E6E9ED', width: '100%', height: '100%' }}>
            <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/typewriter.wav" />
            <TextLayer text="CANADA LEANS INTO MULTICULTURALISM" font={interSemiBold} fontSize={24} position={{ x: 30, y: 40 }} frame={frame - 252} duration={62} 
                enterAnim={(f) => ({ opacity: interpolate(f, [0, 20], [0, 1]), color: '#003399' })}
            />
        </div>
      </Sequence>

      {/* 9. USA Individualism (10.5 - 12.766) */}
      <Sequence from={315} durationInFrames={68}>
        <div style={{ flex: 1, background: '#2C3E50', width: '100%', height: '100%' }}>
            <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/bass_hit.wav" />
            <TextLayer text="USA: INDIVIDUALISM" font={oswaldBold} fontSize={26} position={{ x: 70, y: 45 }} frame={frame - 315} duration={68} 
                idleAnim={(f) => ({ fontStyle: f % 10 < 5 ? 'italic' : 'normal' })}
            />
        </div>
      </Sequence>

      {/* 10. Governance (12.8 - 13.9) */}
      <Sequence from={384} durationInFrames={33}>
        <div style={{ flex: 1, background: '#0A0E17', width: '100%', height: '100%' }}>
            <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/pop.wav" />
            <TextLayer text="NOW GOVERNANCE" font={interBold} fontSize={28} position={{ x: 50, y: 35 }} frame={frame - 384} duration={33} />
        </div>
      </Sequence>

      {/* 11-12. Canada Monarchy/Parliament (13.933 - 17.166) */}
      <Sequence from={418} durationInFrames={97}>
        <div style={{ flex: 1, background: '#003399', width: '100%', height: '100%' }}>
            <TextLayer text="CONSTITUTIONAL MONARCHY" font={interMedium} fontSize={24} position={{ x: 25, y: 50 }} frame={frame - 418} duration={97} />
            <TextLayer text="PARLIAMENTARY SYSTEM" font={interRegular} fontSize={22} position={{ x: 25, y: 65 }} frame={frame - 418} duration={97} />
        </div>
      </Sequence>

      {/* 13-14. USA Republic (17.2 - 19.7) */}
      <Sequence from={516} durationInFrames={75}>
        <div style={{ flex: 1, background: '#B22234', width: '100%', height: '100%' }}>
            <TextLayer text="CONSTITUTIONAL REPUBLIC" font={oswaldExtraBold} fontSize={26} position={{ x: 75, y: 40 }} frame={frame - 516} duration={75} />
            <TextLayer text="NO MONARCHY" font={interSemiBold} fontSize={24} position={{ x: 75, y: 55 }} frame={frame - 516} duration={75} />
        </div>
      </Sequence>

      {/* 15. Power Split (19.733 - 21.9) */}
      <Sequence from={592} durationInFrames={65}>
        <div style={{ flex: 1, background: '#1A2035', width: '100%', height: '100%', overflow: 'hidden' }}>
            <TextLayer text="POWER SPLIT BY DESIGN" font={spaceGroteskBold} fontSize={22} position={{ x: 50, y: 50 }} frame={frame - 592} duration={65} 
                enterAnim={(f) => ({ transform: `translate(-50%, -50%) scale(${s(f)})` })}
            />
            {/* 2ndVis: 3 interlocking triangles */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.2 }}>
                {[0, 120, 240].map((deg) => (
                    <div key={deg} style={{
                        position: 'absolute',
                        width: '0',
                        height: '0',
                        borderLeft: '150px solid transparent',
                        borderRight: '150px solid transparent',
                        borderBottom: '260px solid white',
                        transform: `rotate(${deg + frame}deg) translate(0, -100px)`,
                    }} />
                ))}
            </div>
        </div>
      </Sequence>

      {/* 16. Sharper Line (21.933 - 23.3) */}
      <Sequence from={658} durationInFrames={41}>
        <div style={{ flex: 1, background: '#0A0E17', width: '100%', height: '100%' }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/click.wav" volume={0.6} />
          <TextLayer text="SHARPER LINE" font={interBold} fontSize={26} position={{ x: 50, y: 40 }} frame={frame - 658} duration={41} 
            idleAnim={(f) => ({ borderBottom: `${interpolate(f, [0, 10], [0, 4])}px solid #B22234` })}
          />
          <div style={{ position: 'absolute', left: '50%', top: '20%', bottom: '20%', width: '4px', backgroundColor: '#B22234' }} />
        </div>
      </Sequence>

      {/* 17. Publicly Funded (23.333 - 25.1) */}
      <Sequence from={700} durationInFrames={53}>
        <div style={{ flex: 1, background: '#003399', width: '100%', height: '100%' }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/pop.wav" volume={0.5} />
          <TextLayer text="PUBLICLY FUNDED" font={interMedium} fontSize={22} position={{ x: 30, y: 50 }} frame={frame - 700} duration={53} />
          {/* 2ndVis: shield icon pulse */}
          <div style={{ position: 'absolute', left: '30%', top: '30%', opacity: 0.2 + 0.1 * Math.sin(frame / 5) }}>
            <Shield size={200} color="white" />
          </div>
        </div>
      </Sequence>

      {/* 18. No Pay (25.133 - 26.466) */}
      <Sequence from={754} durationInFrames={40}>
        <div style={{ flex: 1, background: '#001F55', width: '100%', height: '100%' }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/whoosh.wav" volume={0.4} />
          <TextLayer text="NO PAY AT THE DOOR" font={interRegular} fontSize={20} position={{ x: 30, y: 65 }} frame={frame - 754} duration={40} />
          <div style={{ position: 'absolute', left: '30%', top: '20%', opacity: 0.1 }}>
            <DoorClosed size={200} color="white" />
          </div>
        </div>
      </Sequence>

      {/* 19. Largely Private (26.5 - 28.1) */}
      <Sequence from={795} durationInFrames={48}>
        <div style={{ flex: 1, background: '#B22234', width: '100%', height: '100%' }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/bass_hit.wav" volume={0.7} />
          <TextLayer text="LARGELY PRIVATE" font={interSemiBold} fontSize={22} position={{ x: 70, y: 50 }} frame={frame - 795} duration={48} />
          <div style={{ position: 'absolute', right: '15%', top: '30%', opacity: 0.1 }}>
            <Banknote size={240} color="white" />
          </div>
        </div>
      </Sequence>

      {/* 20. Insurance Decides (28.133 - 30.066) */}
      <Sequence from={844} durationInFrames={58}>
        <div style={{ flex: 1, background: 'linear-gradient(to bottom, #B22234, #7A1A24)', width: '100%', height: '100%' }}>
          <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/click.wav" volume={0.5} />
          <TextLayer text="INSURANCE DECIDES ACCESS, SPEED, COST" font={interMedium} fontSize={20} position={{ x: 70, y: 65 }} frame={frame - 844} duration={58} />
          {/* 2ndVis: ticking clock hands */}
          <div style={{ position: 'absolute', right: '15%', top: '30%', opacity: 0.3 }}>
            <Clock size={160} color="white" style={{ transform: `rotate(${frame * 5}deg)` }} />
          </div>
        </div>
      </Sequence>

      {/* 21-23. Culture (30.1 - 35.9) */}
      <Sequence from={903} durationInFrames={37}>
          <div style={{ flex: 1, background: '#0A0E17', width: '100%', height: '100%' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/sting.wav" />
              <TextLayer text="CULTURE? SUBTLE—BUT REAL" font={interBold} fontSize={26} position={{ x: 50, y: 40 }} frame={frame - 903} duration={37} idleAnim={() => ({ fontStyle: 'italic' })} />
          </div>
      </Sequence>
      <Sequence from={940} durationInFrames={71}>
          <div style={{ flex: 1, background: '#E6E9ED', width: '100%', height: '100%' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/typewriter.wav" />
              <TextLayer text="RESTRAINT. POLITENESS. CONSENSUS" font={interLight} fontSize={22} position={{ x: 35, y: 50 }} frame={frame - 940} duration={71} />
          </div>
      </Sequence>
      <Sequence from={1011} durationInFrames={66}>
          <div style={{ flex: 1, background: '#1C2833', width: '100%', height: '100%' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/bass_hit.wav" />
              <TextLayer text="CONFIDENCE. DIRECTNESS. COMPETITION" font={oswaldBold} fontSize={24} position={{ x: 65, y: 50 }} frame={frame - 1011} duration={66} />
          </div>
      </Sequence>

      {/* 24-26. Measurement (36s - 40s) */}
      <Sequence from={1077} durationInFrames={40}>
          <div style={{ flex: 1, background: '#0A0E17', width: '100%', height: '100%' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/click.wav" />
              <TextLayer text="MEASUREMENT TELLS A STORY" font={interMedium} fontSize={24} position={{ x: 50, y: 35 }} frame={frame - 1077} duration={40} />
          </div>
      </Sequence>
      <Sequence from={1117} durationInFrames={100}>
          {frame < 1167 ? (
              <div style={{ flex: 1, background: '#003399', width: '100%', height: '100%' }}>
                  <TextLayer text="KILOMETERS, CELSIUS, KILOGRAMS" font={interSemiBold} fontSize={20} position={{ x: 30, y: 55 }} frame={frame - 1117} duration={50} />
              </div>
          ) : (
              <div style={{ flex: 1, background: '#B22234', width: '100%', height: '100%' }}>
                  <TextLayer text="MILES, FAHRENHEIT, POUNDS" font={interSemiBold} fontSize={20} position={{ x: 70, y: 55 }} frame={frame - 1167} duration={50} />
              </div>
          )}
      </Sequence>

      {/* 27-29. Economy (40.6s - 46s) */}
      <Sequence from={1218} durationInFrames={52}>
          <div style={{ flex: 1, background: '#1C2536', width: '100%', height: '100%' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/sting.wav" />
              <TextLayer text="BOTH ARE GIANTS" font={interBold} fontSize={26} position={{ x: 50, y: 45 }} frame={frame - 1218} duration={52} 
                idleAnim={(f) => ({ transform: `translate(-50%, -50%) scale(${1 + Math.sin(f / 5) * 0.05})` })}
              />
          </div>
      </Sequence>
      <Sequence from={1270} durationInFrames={65}>
          <div style={{ flex: 1, background: '#B22234', width: '100%', height: '100%' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/whoosh.wav" />
              <TextLayer text="USA: LARGER. FASTER. AGGRESSIVE" font={oswaldExtraBold} fontSize={22} position={{ x: 70, y: 50 }} frame={frame - 1270} duration={65} />
          </div>
      </Sequence>
      <Sequence from={1335} durationInFrames={69}>
          <div style={{ flex: 1, background: '#003399', width: '100%', height: '100%' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/typewriter.wav" />
              <TextLayer text="CANADA: STEADIER. RESOURCE-RICH." font={interMedium} fontSize={20} position={{ x: 30, y: 50 }} frame={frame - 1335} duration={69} />
          </div>
      </Sequence>

      {/* 30-32. Global Image (46.8s - 52s) */}
      <Sequence from={1404} durationInFrames={42}>
          <div style={{ flex: 1, background: '#0A0E17', width: '100%', height: '100%' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/pop.wav" />
              <TextLayer text="GLOBAL IMAGE" font={interBold} fontSize={24} position={{ x: 50, y: 40 }} frame={frame - 1404} duration={42} />
          </div>
      </Sequence>
      <Sequence from={1446} durationInFrames={124}>
          {frame < 1504 ? (
              <div style={{ flex: 1, background: '#003399', width: '100%', height: '100%' }}>
                  <TextLayer text="DIPLOMATIC. CALM. COOPERATIVE" font={interLight} fontSize={22} position={{ x: 35, y: 55 }} frame={frame - 1446} duration={58} />
              </div>
          ) : (
              <div style={{ flex: 1, background: '#B22234', width: '100%', height: '100%' }}>
                  <TextLayer text="POWERFUL. INFLUENTIAL. IGNORE?" font={oswaldBold} fontSize={24} position={{ x: 65, y: 55 }} frame={frame - 1504} duration={66} />
              </div>
          )}
      </Sequence>

      {/* 33-41. Conclusion (52.3s - END) */}
      <Sequence from={1570} durationInFrames={44}>
          <div style={{ flex: 1, background: '#111820', width: '100%', height: '100%' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/sting.wav" />
              <TextLayer text="THE REAL DIFFERENCE?" font={interBold} fontSize={26} position={{ x: 50, y: 45 }} frame={frame - 1570} duration={44} />
          </div>
      </Sequence>
      <Sequence from={1614} durationInFrames={54}>
          <div style={{ flex: 1, background: '#003399', width: '100%', height: '100%' }}>
              <TextLayer text="CANADA: BALANCE" font={interMedium} fontSize={22} position={{ x: 40, y: 50 }} frame={frame - 1614} duration={54} />
          </div>
      </Sequence>
      <Sequence from={1668} durationInFrames={54}>
          <div style={{ flex: 1, background: '#B22234', width: '100%', height: '100%' }}>
              <TextLayer text="USA: DOMINANCE" font={interMedium} fontSize={22} position={{ x: 60, y: 50 }} frame={frame - 1668} duration={54} />
          </div>
      </Sequence>
      <Sequence from={1722} durationInFrames={66}>
          <div style={{ flex: 1, background: '#0A0E17', width: '100%', height: '100%' }}>
              <TextLayer text="SAME CONTINENT. DIFFERENT PHILOSOPHIES." font={interSemiBold} fontSize={24} position={{ x: 50, y: 50 }} frame={frame - 1722} duration={66} />
          </div>
      </Sequence>
      <Sequence from={1788} durationInFrames={57}>
          <div style={{ flex: 1, background: '#000', width: '100%', height: '100%', overflow: 'hidden' }}>
              <Audio src="https://raw.githubusercontent.com/irankunda-Steve/Sound-effects/main/sfx/sting.wav" volume={0.8} />
              <TextLayer text="AND THAT… CHANGES EVERYTHING." font={montserratBlack} fontSize={36} position={{ x: 50, y: 50 }} frame={frame - 1788} duration={57} 
                enterAnim={(f) => ({ transform: `translate(-50%, -50%) scale(${s(f)})` })}
              />
              {/* 2ndVis: single white dot expanding to full screen */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${interpolate(frame - 1788, [30, 57], [0, 3000])}px`,
                height: `${interpolate(frame - 1788, [30, 57], [0, 3000])}px`,
                background: 'white',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
              }} />
          </div>
      </Sequence>

    </div>
  );
};
