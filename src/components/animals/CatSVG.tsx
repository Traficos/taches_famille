import React from 'react';
import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';
import { AnimalStage } from '../../constants/animals';

// Kawaii Sumikko Gurashi style cat — 4 growth stages
// Palette
const BODY   = '#FFE0E6';
const STROKE = '#F8BBD0';
const BLUSH  = 'rgba(244,143,177,0.4)';
const EAR_IN = '#F8BBD0';
const EYE    = '#333333';
const SHADOW = 'rgba(200,150,170,0.18)';

// ─── EGG ────────────────────────────────────────────────────────────────────
function CatEgg({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* soft shadow */}
      <Ellipse cx={50} cy={91} rx={22} ry={5} fill={SHADOW} />

      {/* egg body */}
      <Ellipse cx={50} cy={54} rx={30} ry={37} fill={BODY} stroke={STROKE} strokeWidth={1.8} />

      {/* pink gradient tint at bottom of egg */}
      <Ellipse cx={50} cy={80} rx={22} ry={12} fill="rgba(248,187,208,0.25)" />

      {/* crack lines */}
      <Path
        d="M46 28 L49 34 L44 38 L48 44"
        stroke={STROKE}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* tiny heart on egg */}
      <Path
        d="M50 57 C50 57 47 54 47 52.5 C47 51.1 48 50 49.5 50 C49.9 50 50 50.3 50 50.3 C50 50.3 50.1 50 50.5 50 C52 50 53 51.1 53 52.5 C53 54 50 57 50 57 Z"
        fill="#F06292"
      />

      {/* sparkle top-right */}
      <Path
        d="M70 22 L71 25 L74 26 L71 27 L70 30 L69 27 L66 26 L69 25 Z"
        fill="#FCE4EC"
        stroke="#F8BBD0"
        strokeWidth={0.6}
      />

      {/* sparkle small left */}
      <Path
        d="M28 40 L28.8 42 L31 42.8 L28.8 43.6 L28 46 L27.2 43.6 L25 42.8 L27.2 42 Z"
        fill="#FCE4EC"
        stroke="#F8BBD0"
        strokeWidth={0.5}
      />
    </Svg>
  );
}

// ─── BABY ───────────────────────────────────────────────────────────────────
function CatBaby({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* shadow */}
      <Ellipse cx={50} cy={88} rx={20} ry={4.5} fill={SHADOW} />

      {/* left ear outer */}
      <Path d="M31 46 L28 30 L42 40 Z" fill={BODY} stroke={STROKE} strokeWidth={1.5} strokeLinejoin="round" />
      {/* left ear inner */}
      <Path d="M32 44 L30 33 L40 41 Z" fill={EAR_IN} />

      {/* right ear outer */}
      <Path d="M69 46 L72 30 L58 40 Z" fill={BODY} stroke={STROKE} strokeWidth={1.5} strokeLinejoin="round" />
      {/* right ear inner */}
      <Path d="M68 44 L70 33 L60 41 Z" fill={EAR_IN} />

      {/* chubby round body */}
      <Circle cx={50} cy={62} r={28} fill={BODY} stroke={STROKE} strokeWidth={1.8} />

      {/* belly lighter spot */}
      <Ellipse cx={50} cy={66} rx={14} ry={16} fill="rgba(255,255,255,0.45)" />

      {/* left blush */}
      <Circle cx={38} cy={60} r={7} fill={BLUSH} />
      {/* right blush */}
      <Circle cx={62} cy={60} r={7} fill={BLUSH} />

      {/* left eye */}
      <Circle cx={42} cy={54} r={5.5} fill={EYE} />
      <Circle cx={43.8} cy={52.2} r={1.8} fill="white" />
      <Circle cx={41} cy={55.5} r={1} fill="white" opacity={0.5} />

      {/* right eye */}
      <Circle cx={58} cy={54} r={5.5} fill={EYE} />
      <Circle cx={59.8} cy={52.2} r={1.8} fill="white" />
      <Circle cx={57} cy={55.5} r={1} fill="white" opacity={0.5} />

      {/* tiny cat nose */}
      <Path d="M49 59 L51 59 L50 61 Z" fill="#F48FB1" />

      {/* tiny cat mouth — upside-down Y */}
      <Path
        d="M50 61 L50 63 M50 63 L47.5 65 M50 63 L52.5 65"
        stroke="#F48FB1"
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />

      {/* tiny left paw */}
      <Ellipse cx={30} cy={84} rx={7} ry={5} fill={BODY} stroke={STROKE} strokeWidth={1.4} />
      <Circle cx={27} cy={83} r={1.5} fill={STROKE} />
      <Circle cx={30} cy={82} r={1.5} fill={STROKE} />
      <Circle cx={33} cy={83} r={1.5} fill={STROKE} />

      {/* tiny right paw */}
      <Ellipse cx={70} cy={84} rx={7} ry={5} fill={BODY} stroke={STROKE} strokeWidth={1.4} />
      <Circle cx={67} cy={83} r={1.5} fill={STROKE} />
      <Circle cx={70} cy={82} r={1.5} fill={STROKE} />
      <Circle cx={73} cy={83} r={1.5} fill={STROKE} />
    </Svg>
  );
}

// ─── JUNIOR ─────────────────────────────────────────────────────────────────
function CatJunior({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* shadow */}
      <Ellipse cx={50} cy={90} rx={21} ry={4.5} fill={SHADOW} />

      {/* tail — curly behind body */}
      <Path
        d="M72 80 C88 75 90 60 78 55 C72 52 68 57 73 62 C77 66 74 70 68 70"
        stroke={BODY}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M72 80 C88 75 90 60 78 55 C72 52 68 57 73 62 C77 66 74 70 68 70"
        stroke={STROKE}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
      />

      {/* left ear outer */}
      <Path d="M29 44 L25 25 L44 37 Z" fill={BODY} stroke={STROKE} strokeWidth={1.5} strokeLinejoin="round" />
      {/* left ear inner */}
      <Path d="M30.5 42 L28 28 L42 37 Z" fill={EAR_IN} />

      {/* right ear outer */}
      <Path d="M71 44 L75 25 L56 37 Z" fill={BODY} stroke={STROKE} strokeWidth={1.5} strokeLinejoin="round" />
      {/* right ear inner */}
      <Path d="M69.5 42 L72 28 L58 37 Z" fill={EAR_IN} />

      {/* slightly taller body ellipse */}
      <Ellipse cx={50} cy={63} rx={26} ry={30} fill={BODY} stroke={STROKE} strokeWidth={1.8} />

      {/* belly lighter spot */}
      <Ellipse cx={50} cy={68} rx={13} ry={17} fill="rgba(255,255,255,0.45)" />

      {/* left blush */}
      <Circle cx={36} cy={60} r={7} fill={BLUSH} />
      {/* right blush */}
      <Circle cx={64} cy={60} r={7} fill={BLUSH} />

      {/* left eye — slightly bigger, expressive */}
      <Ellipse cx={41} cy={52} rx={5.5} ry={6} fill={EYE} />
      <Circle cx={43} cy={50} r={2} fill="white" />
      <Circle cx={40} cy={53.5} r={1.1} fill="white" opacity={0.5} />

      {/* right eye */}
      <Ellipse cx={59} cy={52} rx={5.5} ry={6} fill={EYE} />
      <Circle cx={61} cy={50} r={2} fill="white" />
      <Circle cx={58} cy={53.5} r={1.1} fill="white" opacity={0.5} />

      {/* nose */}
      <Path d="M48.5 58.5 L51.5 58.5 L50 61 Z" fill="#F48FB1" />

      {/* mouth */}
      <Path
        d="M50 61 L50 63 M50 63 L47 65.5 M50 63 L53 65.5"
        stroke="#F48FB1"
        strokeWidth={1.3}
        strokeLinecap="round"
        fill="none"
      />

      {/* whiskers left */}
      <Path d="M20 57 L38 59" stroke={STROKE} strokeWidth={1.1} strokeLinecap="round" />
      <Path d="M20 61 L38 61" stroke={STROKE} strokeWidth={1.1} strokeLinecap="round" />
      <Path d="M22 65 L39 63" stroke={STROKE} strokeWidth={1} strokeLinecap="round" />

      {/* whiskers right */}
      <Path d="M80 57 L62 59" stroke={STROKE} strokeWidth={1.1} strokeLinecap="round" />
      <Path d="M80 61 L62 61" stroke={STROKE} strokeWidth={1.1} strokeLinecap="round" />
      <Path d="M78 65 L61 63" stroke={STROKE} strokeWidth={1} strokeLinecap="round" />

      {/* left paw */}
      <Ellipse cx={31} cy={86} rx={8} ry={5.5} fill={BODY} stroke={STROKE} strokeWidth={1.4} />
      <Circle cx={27.5} cy={85} r={1.8} fill={STROKE} />
      <Circle cx={31} cy={84} r={1.8} fill={STROKE} />
      <Circle cx={34.5} cy={85} r={1.8} fill={STROKE} />

      {/* right paw */}
      <Ellipse cx={69} cy={86} rx={8} ry={5.5} fill={BODY} stroke={STROKE} strokeWidth={1.4} />
      <Circle cx={65.5} cy={85} r={1.8} fill={STROKE} />
      <Circle cx={69} cy={84} r={1.8} fill={STROKE} />
      <Circle cx={72.5} cy={85} r={1.8} fill={STROKE} />
    </Svg>
  );
}

// ─── ADULT ──────────────────────────────────────────────────────────────────
function CatAdult({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* shadow */}
      <Ellipse cx={50} cy={91} rx={22} ry={4.5} fill={SHADOW} />

      {/* fancy curled tail */}
      <Path
        d="M70 82 C90 76 93 56 78 48 C70 43 62 50 68 58 C73 64 70 72 62 72"
        stroke={BODY}
        strokeWidth={7.5}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M70 82 C90 76 93 56 78 48 C70 43 62 50 68 58 C73 64 70 72 62 72"
        stroke={STROKE}
        strokeWidth={7.5}
        strokeLinecap="round"
        fill="none"
        opacity={0.45}
      />
      {/* tail tip highlight */}
      <Circle cx={62} cy={72} r={4} fill={EAR_IN} stroke={STROKE} strokeWidth={1} />

      {/* left ear outer — elegant pointed */}
      <Path d="M27 42 L23 20 L43 35 Z" fill={BODY} stroke={STROKE} strokeWidth={1.6} strokeLinejoin="round" />
      {/* left ear inner */}
      <Path d="M28.5 40 L25.5 23 L41 35 Z" fill={EAR_IN} />

      {/* right ear outer */}
      <Path d="M73 42 L77 20 L57 35 Z" fill={BODY} stroke={STROKE} strokeWidth={1.6} strokeLinejoin="round" />
      {/* right ear inner */}
      <Path d="M71.5 40 L74.5 23 L59 35 Z" fill={EAR_IN} />

      {/* elegant slimmer body */}
      <Ellipse cx={50} cy={62} rx={24} ry={32} fill={BODY} stroke={STROKE} strokeWidth={1.8} />

      {/* belly spot — elegant teardrop */}
      <Ellipse cx={50} cy={67} rx={12} ry={18} fill="rgba(255,255,255,0.45)" />

      {/* left blush — subtle */}
      <Circle cx={35} cy={59} r={6.5} fill={BLUSH} />
      {/* right blush */}
      <Circle cx={65} cy={59} r={6.5} fill={BLUSH} />

      {/* left eye — confident, slightly narrowed */}
      <Ellipse cx={40} cy={51} rx={5.5} ry={5} fill={EYE} />
      <Circle cx={42} cy={49.5} r={1.9} fill="white" />
      <Circle cx={39} cy={52.5} r={1} fill="white" opacity={0.5} />
      {/* left eyelash */}
      <Path d="M35.5 47 L37.5 49.5" stroke={EYE} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M37 45.5 L38.5 48.5" stroke={EYE} strokeWidth={1.1} strokeLinecap="round" />

      {/* right eye */}
      <Ellipse cx={60} cy={51} rx={5.5} ry={5} fill={EYE} />
      <Circle cx={62} cy={49.5} r={1.9} fill="white" />
      <Circle cx={59} cy={52.5} r={1} fill="white" opacity={0.5} />
      {/* right eyelash */}
      <Path d="M64.5 47 L62.5 49.5" stroke={EYE} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M63 45.5 L61.5 48.5" stroke={EYE} strokeWidth={1.1} strokeLinecap="round" />

      {/* nose */}
      <Path d="M48.5 57.5 L51.5 57.5 L50 60 Z" fill="#F48FB1" />

      {/* mouth — confident slight smile */}
      <Path
        d="M50 60 L50 62 M50 62 L47 64.5 M50 62 L53 64.5"
        stroke="#F48FB1"
        strokeWidth={1.3}
        strokeLinecap="round"
        fill="none"
      />

      {/* whiskers left — longer, elegant */}
      <Path d="M16 55 L37 58" stroke={STROKE} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M16 60 L37 60" stroke={STROKE} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M18 65 L38 62" stroke={STROKE} strokeWidth={1} strokeLinecap="round" />

      {/* whiskers right */}
      <Path d="M84 55 L63 58" stroke={STROKE} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M84 60 L63 60" stroke={STROKE} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M82 65 L62 62" stroke={STROKE} strokeWidth={1} strokeLinecap="round" />

      {/* left paw — elegant */}
      <Ellipse cx={31} cy={87} rx={8.5} ry={5.5} fill={BODY} stroke={STROKE} strokeWidth={1.4} />
      <Circle cx={27.5} cy={86} r={1.8} fill={STROKE} />
      <Circle cx={31} cy={85} r={1.8} fill={STROKE} />
      <Circle cx={34.5} cy={86} r={1.8} fill={STROKE} />

      {/* right paw */}
      <Ellipse cx={69} cy={87} rx={8.5} ry={5.5} fill={BODY} stroke={STROKE} strokeWidth={1.4} />
      <Circle cx={65.5} cy={86} r={1.8} fill={STROKE} />
      <Circle cx={69} cy={85} r={1.8} fill={STROKE} />
      <Circle cx={72.5} cy={86} r={1.8} fill={STROKE} />

      {/* gold star decorations — max level */}
      {/* star top-left */}
      <Path
        d="M18 20 L19.5 24.5 L24 24.5 L20.5 27.5 L22 32 L18 29 L14 32 L15.5 27.5 L12 24.5 L16.5 24.5 Z"
        fill="#FFD54F"
        stroke="#FFB300"
        strokeWidth={0.7}
      />
      {/* star top-right */}
      <Path
        d="M82 20 L83.5 24.5 L88 24.5 L84.5 27.5 L86 32 L82 29 L78 32 L79.5 27.5 L76 24.5 L80.5 24.5 Z"
        fill="#FFD54F"
        stroke="#FFB300"
        strokeWidth={0.7}
      />
      {/* small star accent */}
      <Path
        d="M50 8 L51 11 L54 11 L51.5 13 L52.5 16 L50 14.5 L47.5 16 L48.5 13 L46 11 L49 11 Z"
        fill="#FFD54F"
        stroke="#FFB300"
        strokeWidth={0.6}
      />
    </Svg>
  );
}

// ─── DISPATCHER ─────────────────────────────────────────────────────────────
export function CatSVG({ stage, size }: { stage: AnimalStage; size: number }) {
  switch (stage) {
    case 'egg':    return <CatEgg    size={size} />;
    case 'baby':   return <CatBaby   size={size} />;
    case 'junior': return <CatJunior size={size} />;
    case 'adult':  return <CatAdult  size={size} />;
  }
}
