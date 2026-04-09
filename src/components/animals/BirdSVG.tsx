import React from 'react';
import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';
import { AnimalStage } from '../../constants/animals';

interface Props { size: number }

function Egg({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="90" rx="20" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Egg body */}
      <Ellipse cx="50" cy="52" rx="22" ry="28" fill="#E0F7FA" stroke="#80DEEA" strokeWidth="2" />
      {/* Sheen */}
      <Ellipse cx="43" cy="40" rx="6" ry="9" fill="rgba(255,255,255,0.5)" />
      {/* Turquoise tint */}
      <Ellipse cx="50" cy="60" rx="12" ry="8" fill="rgba(77,208,225,0.2)" />
      {/* Feather decoration */}
      <Path d="M 44 46 Q 50 36 56 46 Q 52 43 50 40 Q 48 43 44 46 Z"
        fill="#80DEEA" opacity="0.5" />
      <Path d="M 50 36 L 50 48" stroke="#4DD0E1" strokeWidth="1" strokeLinecap="round" />
      {/* Small feather dots */}
      <Circle cx="44" cy="57" r="2.5" fill="#80DEEA" opacity="0.4" />
      <Circle cx="56" cy="57" r="2.5" fill="#80DEEA" opacity="0.4" />
      <Circle cx="50" cy="62" r="2.5" fill="#80DEEA" opacity="0.35" />
    </Svg>
  );
}

function Baby({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="91" rx="20" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Body */}
      <Ellipse cx="50" cy="66" rx="17" ry="15" fill="#E0F7FA" stroke="#80DEEA" strokeWidth="1.5" />
      {/* Tiny wing shapes */}
      <Path d="M 34 63 Q 26 56 30 68 Q 34 64 34 63 Z" fill="#B2EBF2" stroke="#80DEEA" strokeWidth="1" />
      <Path d="M 66 63 Q 74 56 70 68 Q 66 64 66 63 Z" fill="#B2EBF2" stroke="#80DEEA" strokeWidth="1" />
      {/* Orange feet */}
      <Path d="M 43 80 L 40 86 M 43 80 L 43 87 M 43 80 L 46 86"
        stroke="#FF8F00" strokeWidth="2" strokeLinecap="round" />
      <Path d="M 57 80 L 54 86 M 57 80 L 57 87 M 57 80 L 60 86"
        stroke="#FF8F00" strokeWidth="2" strokeLinecap="round" />
      {/* Head */}
      <Circle cx="50" cy="47" r="20" fill="#E0F7FA" stroke="#80DEEA" strokeWidth="1.5" />
      {/* Tuft on head */}
      <Path d="M 46 27 Q 50 20 54 27 Q 50 24 46 27 Z" fill="#80DEEA" />
      <Path d="M 50 20 L 50 29" stroke="#4DD0E1" strokeWidth="1.2" strokeLinecap="round" />
      {/* Blush */}
      <Ellipse cx="36" cy="52" rx="5.5" ry="3.5" fill="rgba(77,208,225,0.3)" />
      <Ellipse cx="64" cy="52" rx="5.5" ry="3.5" fill="rgba(77,208,225,0.3)" />
      {/* Eyes */}
      <Circle cx="43" cy="45" r="5" fill="white" />
      <Circle cx="57" cy="45" r="5" fill="white" />
      <Circle cx="43" cy="45" r="3" fill="#333" />
      <Circle cx="57" cy="45" r="3" fill="#333" />
      <Circle cx="44" cy="44" r="1" fill="white" />
      <Circle cx="58" cy="44" r="1" fill="white" />
      {/* Orange beak */}
      <Path d="M 47 52 L 50 57 L 53 52 Z" fill="#FF8F00" />
    </Svg>
  );
}

function Junior({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="93" rx="26" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Spread wings */}
      <Path d="M 30 62 Q 15 50 18 70 Q 25 65 30 62 Z"
        fill="#B2EBF2" stroke="#80DEEA" strokeWidth="1.5" />
      <Path d="M 70 62 Q 85 50 82 70 Q 75 65 70 62 Z"
        fill="#B2EBF2" stroke="#80DEEA" strokeWidth="1.5" />
      {/* Wing feather detail */}
      <Path d="M 22 57 Q 28 60 30 64" stroke="#4DD0E1" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
      <Path d="M 78 57 Q 72 60 70 64" stroke="#4DD0E1" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
      {/* Body */}
      <Ellipse cx="50" cy="68" rx="20" ry="18" fill="#E0F7FA" stroke="#80DEEA" strokeWidth="1.8" />
      {/* Colorful tail feathers */}
      <Path d="M 42 83 Q 38 92 36 88" stroke="#FF7043" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <Path d="M 50 85 Q 50 95 50 91" stroke="#AB47BC" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <Path d="M 58 83 Q 62 92 64 88" stroke="#29B6F6" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      {/* Feet */}
      <Path d="M 42 84 L 39 90 M 42 84 L 42 91 M 42 84 L 45 90"
        stroke="#FF8F00" strokeWidth="2" strokeLinecap="round" />
      <Path d="M 58 84 L 55 90 M 58 84 L 58 91 M 58 84 L 61 90"
        stroke="#FF8F00" strokeWidth="2" strokeLinecap="round" />
      {/* Head */}
      <Circle cx="50" cy="46" r="21" fill="#E0F7FA" stroke="#80DEEA" strokeWidth="1.8" />
      {/* Crest - 3 flame-like paths */}
      <Path d="M 41 25 Q 43 15 45 22" stroke="#FF7043" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <Path d="M 47 23 Q 50 11 53 23" stroke="#FFCA28" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <Path d="M 55 25 Q 57 15 59 22" stroke="#FF7043" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      {/* Blush */}
      <Ellipse cx="35" cy="51" rx="6.5" ry="4" fill="rgba(77,208,225,0.3)" />
      <Ellipse cx="65" cy="51" rx="6.5" ry="4" fill="rgba(77,208,225,0.3)" />
      {/* Eyes */}
      <Circle cx="42" cy="43" r="6" fill="white" />
      <Circle cx="58" cy="43" r="6" fill="white" />
      <Circle cx="43" cy="43" r="3.5" fill="#01579B" />
      <Circle cx="59" cy="43" r="3.5" fill="#01579B" />
      <Circle cx="44" cy="42" r="1.2" fill="white" />
      <Circle cx="60" cy="42" r="1.2" fill="white" />
      {/* Beak */}
      <Path d="M 46 51 L 50 56 L 54 51 Z" fill="#FF8F00" />
    </Svg>
  );
}

function Adult({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="93" rx="30" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Magnificent wings */}
      <Path d="M 26 58 Q 8 42 10 66 Q 16 60 22 60 Q 26 62 26 58 Z"
        fill="#B2EBF2" stroke="#80DEEA" strokeWidth="2" />
      <Path d="M 74 58 Q 92 42 90 66 Q 84 60 78 60 Q 74 62 74 58 Z"
        fill="#B2EBF2" stroke="#80DEEA" strokeWidth="2" />
      {/* Wing feather layers */}
      <Path d="M 10 53 Q 18 55 24 60" stroke="#4DD0E1" strokeWidth="1.5"
        strokeLinecap="round" fill="none" opacity="0.8" />
      <Path d="M 11 60 Q 18 60 24 64" stroke="#4DD0E1" strokeWidth="1.2"
        strokeLinecap="round" fill="none" opacity="0.6" />
      <Path d="M 90 53 Q 82 55 76 60" stroke="#4DD0E1" strokeWidth="1.5"
        strokeLinecap="round" fill="none" opacity="0.8" />
      <Path d="M 89 60 Q 82 60 76 64" stroke="#4DD0E1" strokeWidth="1.2"
        strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Body */}
      <Ellipse cx="50" cy="68" rx="22" ry="20" fill="#E0F7FA" stroke="#80DEEA" strokeWidth="2" />
      {/* Colorful chest */}
      <Ellipse cx="50" cy="66" rx="14" ry="13" fill="#FFF9C4" opacity="0.6" />
      <Ellipse cx="50" cy="68" rx="10" ry="9" fill="#FFCC80" opacity="0.4" />
      {/* Long tropical tail feathers - 5 colorful strokes */}
      <Path d="M 39 85 Q 32 95 30 91" stroke="#FF5722" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      <Path d="M 44 87 Q 40 98 38 94" stroke="#AB47BC" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <Path d="M 50 88 Q 50 100 50 96" stroke="#29B6F6" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      <Path d="M 56 87 Q 60 98 62 94" stroke="#66BB6A" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <Path d="M 61 85 Q 68 95 70 91" stroke="#FFCA28" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      {/* Feet */}
      <Path d="M 40 84 L 36 91 M 40 84 L 40 92 M 40 84 L 44 91"
        stroke="#FF8F00" strokeWidth="2.2" strokeLinecap="round" />
      <Path d="M 60 84 L 56 91 M 60 84 L 60 92 M 60 84 L 64 91"
        stroke="#FF8F00" strokeWidth="2.2" strokeLinecap="round" />
      {/* Head */}
      <Circle cx="50" cy="44" r="23" fill="#E0F7FA" stroke="#80DEEA" strokeWidth="2" />
      {/* Elaborate crest */}
      <Path d="M 36 24 Q 38 11 41 20" stroke="#FF5722" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      <Path d="M 42 21 Q 44 8 47 19" stroke="#FFCA28" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <Path d="M 48 20 Q 50 6 52 20" stroke="#66BB6A" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      <Path d="M 53 21 Q 56 8 59 19" stroke="#FFCA28" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <Path d="M 59 24 Q 62 11 64 20" stroke="#AB47BC" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      {/* Blush */}
      <Ellipse cx="33" cy="50" rx="7.5" ry="5" fill="rgba(77,208,225,0.3)" />
      <Ellipse cx="67" cy="50" rx="7.5" ry="5" fill="rgba(77,208,225,0.3)" />
      {/* Eyes - bright tropical */}
      <Circle cx="41" cy="40" r="7" fill="white" />
      <Circle cx="59" cy="40" r="7" fill="white" />
      <Circle cx="42" cy="40" r="4.5" fill="#0277BD" />
      <Circle cx="60" cy="40" r="4.5" fill="#0277BD" />
      <Circle cx="43" cy="38" r="1.8" fill="white" />
      <Circle cx="61" cy="38" r="1.8" fill="white" />
      {/* Eyering */}
      <Circle cx="41" cy="40" r="7" fill="none" stroke="#FFCA28" strokeWidth="1" opacity="0.5" />
      <Circle cx="59" cy="40" r="7" fill="none" stroke="#FFCA28" strokeWidth="1" opacity="0.5" />
      {/* Beak - large and colorful */}
      <Path d="M 44 49 L 50 57 L 56 49 Z" fill="#FF8F00" />
      <Path d="M 44 49 L 50 53 L 56 49" fill="#FFB300" opacity="0.5" />
    </Svg>
  );
}

interface BirdSVGProps { stage: AnimalStage; size: number }
export function BirdSVG({ stage, size }: BirdSVGProps) {
  switch (stage) {
    case 'egg': return <Egg size={size} />;
    case 'baby': return <Baby size={size} />;
    case 'junior': return <Junior size={size} />;
    case 'adult': return <Adult size={size} />;
  }
}
