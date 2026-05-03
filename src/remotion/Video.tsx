import { 
  loadFont as loadMontserrat 
} from "@remotion/google-fonts/Montserrat";

import { 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  interpolateColors,
  AbsoluteFill,
  Series,
  Easing,
  spring,
  Sequence,
  Audio
} from 'remotion';
import React from 'react';
import '../index.css';

// Audio Assets (Mixkit Direct Preview Links)
const SFX = {
    // Whoosh for transitions
    WHOOSH: "https://assets.mixkit.co/sfx/preview/mixkit-fast-whoosh-1185.mp3",
    // Pop for smaller elements appearing
    POP: "https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-click-1112.mp3",
    // Slam for heavy impacts
    SLAM: "https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3",
    // Digital click for fonts/colors
    CLICK: "https://assets.mixkit.co/sfx/preview/mixkit-main-menu-selection-click-231.mp3",
    // Success for outro
    SUCCESS: "https://assets.mixkit.co/sfx/preview/mixkit-staccato-pizzicato-orchestral-accent-543.mp3",
    // Background Music
    BG_MUSIC: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
};

// Load fonts
const { fontFamily: montBold } = loadMontserrat("normal", { weights: ["700"] });
const { fontFamily: montExtraBold } = loadMontserrat("normal", { weights: ["900"] });

// Colors
const FIVERR_YELLOW = "#FFDD00";
const BLACK = "#000000";
const WHITE = "#FFFFFF";
const FOREST_GREEN = "#228B22";
const BURNT_ORANGE = "#CC5500";
const SKY_BLUE = "#87CEEB";
const DARK_BLUE = "#00008B";
const TAN_GOLD = "#D4AF37";

// Branding Component
const FiverrLogo: React.FC<{ size?: number, color?: string, style?: React.CSSProperties }> = ({ size = 100, color = BLACK, style }) => {
    return (
        <div style={{ 
            fontFamily: montExtraBold, 
            fontSize: size, 
            color: color, 
            display: 'flex', 
            alignItems: 'baseline',
            ...style 
        }}>
            fiverr
            <div style={{ 
                width: size * 0.15, 
                height: size * 0.15, 
                backgroundColor: color, 
                borderRadius: '50%', 
                marginLeft: size * 0.05 
            }} />
        </div>
    );
};

// Animated Action Lines (Starburst)
const ActionLines: React.FC<{ progress: number }> = ({ progress }) => {
    const lines = 8;
    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 10,
                    height: interpolate(progress, [0, 0.2, 1], [0, 200, 250]),
                    backgroundColor: BLACK,
                    opacity: interpolate(progress, [0.8, 1], [1, 0]),
                    transform: `translate(-50%, -50%) rotate(${i * (360 / lines)}deg) translateY(-${150 + progress * 200}px)`
                }} />
            ))}
        </AbsoluteFill>
    );
};

// Bokeh Circles for Scene 3 & 4
const BokehCircles: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            {Array.from({ length: 6 }).map((_, i) => {
                const startFrame = i * 15;
                const progress = interpolate(frame - startFrame, [0, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const opacity = interpolate(progress, [0, 0.4, 0.8], [0, 0.4, 0]);
                const scale = interpolate(progress, [0, 1], [0.5, 2]);
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${(i * 18 + 15) % 100}%`,
                        top: `${(i * 25 + 20) % 100}%`,
                        width: 400,
                        height: 400,
                        border: '8px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '50%',
                        opacity,
                        transform: `translate(-50%, -50%) scale(${scale})`
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: FIVERR_YELLOW }}>
      {/* Background Music */}
      <Audio src={SFX.BG_MUSIC} volume={0.2} />

      <Series>
        {/* Sequence 1 (0:00–0:02): The Slide & Impact */}
        <Series.Sequence durationInFrames={2 * fps}>
          <Audio src={SFX.WHOOSH} volume={0.5} />
          <AbsoluteFill style={{ backgroundColor: FIVERR_YELLOW }}>
             {(() => {
                const spr = spring({ frame, fps, config: { stiffness: 150, damping: 12 } });
                const sprExcl = spring({ frame: frame - 30, fps, config: { stiffness: 200, damping: 10 } });
                
                const slideX = interpolate(spr, [0, 1], [1920, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
                const overshoot = interpolate(spr, [0, 0.8, 1], [0, 20, 0]);

                return (
                    <AbsoluteFill>
                        <div style={{ position: 'absolute', left: '50%', top: 300, transform: 'translateX(-50%)', fontFamily: montExtraBold, fontSize: 100, color: WHITE }}>
                            WANT TO
                        </div>
                        <div style={{ 
                            position: 'absolute', left: '50%', top: 450, 
                            transform: `translateX(-50%) translateX(${-slideX - overshoot}px)`, 
                            fontFamily: montExtraBold, fontSize: 130, color: WHITE, whiteSpace: 'nowrap' 
                        }}>
                            INCREASE YOUR
                        </div>
                        <div style={{ 
                            position: 'absolute', left: '50%', top: 600, 
                            transform: `translateX(-50%) translateX(${slideX + overshoot}px)`, 
                            fontFamily: montExtraBold, fontSize: 180, color: BLACK 
                        }}>
                            SALES
                        </div>
                        
                        {/* Exclamation ! */}
                        <Sequence from={30}>
                            <Audio src={SFX.SLAM} volume={0.6} />
                            {(() => {
                                const dropExcl = spring({ frame: frame - 30, fps, config: { stiffness: 100, damping: 8 } });
                                const dotPop = spring({ frame: frame - 45, fps });
                                return (
                                    <div style={{ position: 'absolute', right: 300, top: 450, transform: 'translateY(-50%)' }}>
                                        <div style={{ 
                                            position: 'absolute', top: interpolate(dropExcl, [0, 1], [-600, 0]), 
                                            width: 40, height: 250, backgroundColor: BLACK 
                                        }} />
                                        <div style={{ 
                                            position: 'absolute', top: 280, left: 0, width: 40, height: 40, borderRadius: '50%', 
                                            backgroundColor: BLACK, transform: `scale(${dotPop})`
                                        }} />
                                    </div>
                                );
                            })()}
                        </Sequence>
                    </AbsoluteFill>
                );
             })()}
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sequence 2 (0:03–0:05): The Wipe & Mask */}
        <Series.Sequence durationInFrames={3 * fps}>
          <Audio src={SFX.WHOOSH} volume={0.4} />
          <AbsoluteFill style={{ backgroundColor: FIVERR_YELLOW }}>
             {(() => {
                const wipeProgress = interpolate(frame, [0, 20], [0, 100]);
                const sprText = spring({ frame: frame - 10, fps });

                return (
                    <AbsoluteFill>
                        {/* Trailing "SALES" from previous scene */}
                        <div style={{ 
                            position: 'absolute', left: '-10%', top: 600, transform: 'translateY(-50%)',
                            fontFamily: montExtraBold, fontSize: 180, color: BLACK, opacity: interpolate(frame, [0, 10], [0.3, 0])
                        }}>
                            SALES
                        </div>

                        {/* Drawing horizontal line mask */}
                        <div style={{ 
                            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                            width: `${wipeProgress}%`, height: 200, backgroundColor: BLACK, zIndex: 5
                        }} />
                        
                        <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${wipeProgress}%)` }}>
                            {/* Previous content would be clipped, showing new content instead */}
                        </div>

                        <div style={{ 
                            position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) scale(${sprText})`,
                            textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <span style={{ fontFamily: montExtraBold, fontSize: 100, color: WHITE }}>NEED </span>
                            <div style={{ 
                                backgroundColor: BLACK, padding: '10px 30px', margin: '0 20px'
                            }}>
                                <span style={{ fontFamily: montExtraBold, fontSize: 100, color: WHITE }}>AN ANIMATED</span>
                            </div>
                            <span style={{ fontFamily: montExtraBold, fontSize: 100, color: WHITE }}>VIDEO</span>
                        </div>
                    </AbsoluteFill>
                );
             })()}
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sequence 3 (0:06–0:08): Background Depth */}
        <Series.Sequence durationInFrames={3 * fps}>
          <AbsoluteFill style={{ backgroundColor: FIVERR_YELLOW }}>
             <BokehCircles />
             <div style={{ 
                 position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                 textAlign: 'center', width: '90%'
             }}>
                 <div style={{ fontFamily: montExtraBold, fontSize: 100, color: BLACK }}>UNIQUE TYPOGRAPHY</div>
                 <div style={{ fontFamily: montExtraBold, fontSize: 80, color: WHITE }}>PACK FOR YOUR PROJECT</div>
             </div>
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sequence 4 (0:09–0:12): The Vertical Stack */}
        <Series.Sequence durationInFrames={4 * fps}>
          <AbsoluteFill style={{ backgroundColor: FIVERR_YELLOW }}>
             <BokehCircles />
             <div style={{ 
                 position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                 textAlign: 'center'
             }}>
                 {["KINETIC TYPO", "USED TO PROMOTE", "YOUR BUSINESS"].map((line, i) => {
                     const sprRow = spring({ frame: frame - i * 15, fps, config: { stiffness: 150, damping: 15 } });
                     return (
                         <div key={i} style={{ 
                             fontFamily: montExtraBold, fontSize: 120, color: i === 1 ? WHITE : BLACK,
                             transform: `translateY(${interpolate(sprRow, [0, 1], [100, 0])}px)`,
                             opacity: sprRow,
                             marginBottom: 20
                         }}>
                             {line}
                         </div>
                     );
                 })}
             </div>
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sequence 5 (0:13–0:17): Green Flash & Frame */}
        <Series.Sequence durationInFrames={5 * fps}>
          {(() => {
             const isFlash = frame < 5;
             return (
                <AbsoluteFill style={{ backgroundColor: isFlash ? FOREST_GREEN : FIVERR_YELLOW }}>
                    {!isFlash && (
                        <>
                            {/* Header Bar */}
                            <div style={{ 
                                position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)',
                                width: '80%', height: 100, backgroundColor: BLACK, display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{ fontFamily: montBold, fontSize: 50, color: WHITE }}>TITLES ANIMATION GRAPHIC PACK</div>
                            </div>

                            {/* Center Box with Gear */}
                            <div style={{ 
                                position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                                width: 1200, height: 400, border: `10px solid ${WHITE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                            }}>
                                <div style={{ fontFamily: montExtraBold, fontSize: 100, color: WHITE }}>STYLISH ANIMATED TITLES</div>
                                
                                {/* Sunburst / Gear Icon */}
                                <div style={{ 
                                    width: 100, height: 100, border: '4px dashed white', borderRadius: '50%', marginTop: 20,
                                    transform: `rotate(${frame * 4}deg)`
                                }} />
                            </div>
                        </>
                    )}
                </AbsoluteFill>
             );
          })()}
        </Series.Sequence>

        {/* Sequence 6 (0:18–0:21): Color & Glyph Play */}
        <Series.Sequence durationInFrames={4 * fps}>
          {(() => {
             const isOrangePhase = frame < 2 * fps;
             const bg = isOrangePhase ? BURNT_ORANGE : SKY_BLUE;
             
             return (
                <AbsoluteFill style={{ backgroundColor: bg }}>
                    {isOrangePhase ? (
                        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                             <div style={{ fontFamily: montExtraBold, fontSize: 130, color: WHITE }}>CUSTOM</div>
                             <div style={{ display: 'flex', alignItems: 'center', fontFamily: montExtraBold, fontSize: 130, color: WHITE }}>
                                 C
                                 <div style={{ position: 'relative', width: 120, height: 120, margin: '0 10px' }}>
                                     <div style={{ position: 'absolute', inset: 0, border: '15px solid white', borderRadius: '50%', transform: `translateX(-20px) rotate(${frame * 8}deg)` }} />
                                     <div style={{ position: 'absolute', inset: 0, border: '15px solid white', borderRadius: '50%', transform: `translateX(20px) rotate(${-frame * 8}deg)` }} />
                                 </div>
                                 LORS
                             </div>
                        </AbsoluteFill>
                    ) : (
                        <AbsoluteFill>
                            {/* V-mask transition */}
                            {frame === 2 * fps && (
                                <div style={{ 
                                    position: 'absolute', inset: 0, backgroundColor: WHITE, 
                                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)', zIndex: 10 
                                }} />
                            )}
                            <div style={{ 
                                position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                                fontFamily: montExtraBold, fontSize: 180, color: WHITE
                            }}>
                                CUSTOM FONTS
                            </div>
                        </AbsoluteFill>
                    )}
                </AbsoluteFill>
             );
          })()}
        </Series.Sequence>

        {/* Sequence 7 (0:22–0:24): The Sliding Door */}
        <Series.Sequence durationInFrames={3 * fps}>
          <AbsoluteFill style={{ backgroundColor: TAN_GOLD }}>
             {(() => {
                const doorProgress = interpolate(frame, [0, 15, 25, 40], [0, 1, 1, 0]);
                const height = doorProgress * 540;
                return (
                    <AbsoluteFill>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height, backgroundColor: BLACK, zIndex: 5 }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height, backgroundColor: BLACK, zIndex: 5 }} />
                        
                        <div style={{ 
                            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                            fontFamily: montExtraBold, fontSize: 300, color: BLACK,
                            opacity: frame > 25 ? 1 : 0
                        }}>
                             FULL HD
                        </div>
                    </AbsoluteFill>
                );
             })()}
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sequence 8 (0:25–0:28): The Glitch/Expansion CTA */}
        <Series.Sequence durationInFrames={4 * fps}>
          <Audio src={SFX.SLAM} volume={0.4} startFrom={40} />
          <Audio src={SFX.SUCCESS} volume={0.5} startFrom={50} />
          <AbsoluteFill style={{ backgroundColor: FIVERR_YELLOW }}>
             {(() => {
                const sprExpand = spring({ frame: frame - 40, fps, config: { stiffness: 200, damping: 12 } });
                const actionProgress = interpolate(frame - 50, [0, 20], [0, 1], { extrapolateLeft: 'clamp' });

                return (
                    <AbsoluteFill>
                        {frame >= 50 && frame < 70 && <ActionLines progress={actionProgress} />}
                        
                        <div style={{ 
                            position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)',
                            textAlign: 'center', width: '100%'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontFamily: montExtraBold, fontSize: 100, color: BLACK, marginRight: 20 }}>YOUR</span>
                                {frame > 40 && (
                                    <div style={{ 
                                        backgroundColor: BLACK, padding: '0 20px', 
                                        transform: `scale(${sprExpand})`, 
                                        marginRight: 20 
                                    }}>
                                        <span style={{ fontFamily: montExtraBold, fontSize: 100, color: WHITE }}>TURNED</span>
                                    </div>
                                )}
                                <span style={{ fontFamily: montExtraBold, fontSize: 100, color: BLACK }}>SCRIPTS</span>
                            </div>
                            {frame > 50 && (
                                <div style={{ 
                                    fontFamily: montExtraBold, fontSize: 140, color: BLACK, marginTop: 40,
                                    transform: `scale(${spring({ frame: frame - 50, fps })})`
                                }}>
                                    INTO AMAZING VIDEOS
                                </div>
                            )}
                        </div>
                    </AbsoluteFill>
                );
             })()}
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sequence 9 (0:29–0:31): The Mirror Effect */}
        <Series.Sequence durationInFrames={3 * fps}>
          <AbsoluteFill style={{ backgroundColor: FIVERR_YELLOW }}>
             <div style={{ 
                 position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                 textAlign: 'center'
             }}>
                 <div style={{ fontFamily: montBold, fontSize: 80, color: BLACK }}>EXCLUSIVELY</div>
                 <div style={{ position: 'relative' }}>
                    <div style={{ fontFamily: montExtraBold, fontSize: 140, color: BLACK }}>AVAILABLE</div>
                    {/* Mirror reflection */}
                    <div style={{ 
                        fontFamily: montExtraBold, fontSize: 140, color: WHITE, 
                        opacity: 0.25, transform: 'scaleY(-0.8) translateY(-20px)', 
                        maskImage: 'linear-gradient(to bottom, transparent, black)'
                    }}>
                        AVAILABLE
                    </div>
                 </div>
                 <div style={{ fontFamily: montBold, fontSize: 80, color: BLACK }}>ON</div>
             </div>
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sequence 10 (0:32–0:37): The Branding Outro */}
        <Series.Sequence durationInFrames={6 * fps}>
          <Audio src={SFX.POP} volume={0.5} />
          <AbsoluteFill style={{ backgroundColor: FIVERR_YELLOW }}>
             {(() => {
                 const sprCircle = spring({ frame, fps, config: { stiffness: 120, damping: 14 } });
                 const fadeOut = interpolate(frame, [150, 180], [1, 0], { extrapolateLeft: 'clamp' });
                 
                 return (
                    <AbsoluteFill style={{ opacity: fadeOut }}>
                        <div style={{ 
                            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                            width: interpolate(sprCircle, [0, 1], [0, 900]),
                            height: interpolate(sprCircle, [0, 1], [0, 900]),
                            backgroundColor: BLACK, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                             <FiverrLogo size={140} color={WHITE} style={{ opacity: sprCircle }} />
                        </div>
                    </AbsoluteFill>
                 );
             })()}
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
