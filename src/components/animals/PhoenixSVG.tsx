import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect, Line, G } from 'react-native-svg';
import { AnimalStage } from '../../constants/animals';

interface Props { size: number }

function Egg({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Ember/coal shape - concentric ellipses */}
      <Ellipse cx="50" cy="58" rx="30" ry="28" fill="#FF8F00" opacity={0.3} />
      <Ellipse cx="50" cy="58" rx="24" ry="22" fill="#FFA000" opacity={0.45} />
      <Ellipse cx="50" cy="58" rx="18" ry="16" fill="#FFB300" opacity={0.6} />
      <Ellipse cx="50" cy="58" rx="12" ry="10" fill="#FFD54F" opacity={0.75} />
      <Ellipse cx="50" cy="58" rx="6" ry="5" fill="#FFF9C4" opacity={0.8} />
      {/* Flame wisps on top */}
      <Path d="M50 32 Q46 22 50 14 Q53 22 50 32Z" fill="#FF6F00" opacity={0.8} />
      <Path d="M50 32 Q47 20 51 12 Q52 21 50 32Z" fill="#FFD54F" opacity={0.9} />
      <Path d="M44 36 Q38 26 42 18 Q45 26 44 36Z" fill="#FF8F00" opacity={0.7} />
      <Path d="M56 36 Q62 26 58 18 Q55 26 56 36Z" fill="#FF8F00" opacity={0.7} />
      <Path d="M44 36 Q39 24 43 16 Q45 25 44 36Z" fill="#FFD54F" opacity={0.8} />
      <Path d="M56 36 Q61 24 57 16 Q55 25 56 36Z" fill="#FFD54F" opacity={0.8} />
      {/* Glow effect */}
      <Circle cx="50" cy="55" r="8" fill="#FFECB3" opacity={0.6} />
    </Svg>
  );
}

function Baby({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Flame-shaped body outline using Path */}
      <Path d="M50 90 Q30 85 25 65 Q20 45 35 35 Q42 28 50 20 Q58 28 65 35 Q80 45 75 65 Q70 85 50 90Z" fill="#FFF3E0" stroke="#FF8F00" strokeWidth="2" />
      {/* Inner glow */}
      <Path d="M50 82 Q36 78 33 63 Q30 48 40 40 Q45 34 50 28 Q55 34 60 40 Q70 48 67 63 Q64 78 50 82Z" fill="#FFE0B2" opacity={0.6} />
      {/* Flame tips on head */}
      <Path d="M50 22 Q46 12 50 5 Q53 12 50 22Z" fill="#FF6F00" opacity={0.9} />
      <Path d="M50 22 Q47 10 51 3 Q52 11 50 22Z" fill="#FFD54F" />
      <Path d="M43 28 Q37 18 41 10 Q44 18 43 28Z" fill="#FF8F00" opacity={0.8} />
      <Path d="M57 28 Q63 18 59 10 Q56 18 57 28Z" fill="#FF8F00" opacity={0.8} />
      {/* Golden eye highlights */}
      <Circle cx="43" cy="48" r="6" fill="white" />
      <Circle cx="57" cy="48" r="6" fill="white" />
      <Circle cx="43" cy="48" r="4" fill="#FF8F00" />
      <Circle cx="57" cy="48" r="4" fill="#FF8F00" />
      <Circle cx="43" cy="48" r="2" fill="#E65100" />
      <Circle cx="57" cy="48" r="2" fill="#E65100" />
      <Circle cx="44" cy="46.5" r="1.2" fill="white" />
      <Circle cx="58" cy="46.5" r="1.2" fill="white" />
      {/* Orange beak */}
      <Path d="M47 54 L50 58 L53 54" fill="#FF6F00" />
      {/* Small flame wings */}
      <Path d="M25 55 Q15 45 20 32 Q25 44 30 40 Q26 50 25 55Z" fill="#FF8F00" opacity={0.7} />
      <Path d="M25 55 Q13 43 19 29 Q24 42 28 38 Q25 49 25 55Z" fill="#FFD54F" opacity={0.8} />
      <Path d="M75 55 Q85 45 80 32 Q75 44 70 40 Q74 50 75 55Z" fill="#FF8F00" opacity={0.7} />
      <Path d="M75 55 Q87 43 81 29 Q76 42 72 38 Q75 49 75 55Z" fill="#FFD54F" opacity={0.8} />
    </Svg>
  );
}

function Junior({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Body ellipse */}
      <Ellipse cx="50" cy="65" rx="22" ry="20" fill="#FFF3E0" stroke="#FF8F00" strokeWidth="2" />
      {/* Head */}
      <Circle cx="50" cy="38" r="20" fill="#FFF3E0" stroke="#FF8F00" strokeWidth="2" />
      {/* Fire crest */}
      <Path d="M50 20 Q44 10 48 3 Q51 11 50 20Z" fill="#FF6F00" opacity={0.9} />
      <Path d="M50 20 Q46 8 50 1 Q52 9 50 20Z" fill="#FFD54F" />
      <Path d="M42 24 Q34 14 38 7 Q41 15 42 24Z" fill="#FF8F00" opacity={0.8} />
      <Path d="M58 24 Q66 14 62 7 Q59 15 58 24Z" fill="#FF8F00" opacity={0.8} />
      <Path d="M42 24 Q35 12 39 5 Q42 14 42 24Z" fill="#FFD54F" opacity={0.7} />
      <Path d="M58 24 Q65 12 61 5 Q58 14 58 24Z" fill="#FFD54F" opacity={0.7} />
      {/* Golden eyes */}
      <Circle cx="42" cy="36" r="6" fill="white" />
      <Circle cx="58" cy="36" r="6" fill="white" />
      <Circle cx="42" cy="36" r="4.5" fill="#FFB300" />
      <Circle cx="58" cy="36" r="4.5" fill="#FFB300" />
      <Circle cx="42" cy="36" r="2" fill="#E65100" />
      <Circle cx="58" cy="36" r="2" fill="#E65100" />
      <Circle cx="43" cy="34.5" r="1.2" fill="white" />
      <Circle cx="59" cy="34.5" r="1.2" fill="white" />
      {/* Beak */}
      <Path d="M46 43 L50 48 L54 43" fill="#FF8F00" />
      {/* Flame-feather wings */}
      <Path d="M28 62 Q12 50 15 34 Q20 46 26 42 Q22 54 28 60Z" fill="#FF8F00" opacity={0.8} />
      <Path d="M28 62 Q10 46 14 28 Q20 44 24 38 Q22 52 28 60Z" fill="#FFB300" opacity={0.7} />
      <Path d="M28 62 Q8 42 16 24 Q22 40 26 34 Q24 50 28 60Z" fill="#FFD54F" opacity={0.5} />
      <Path d="M72 62 Q88 50 85 34 Q80 46 74 42 Q78 54 72 60Z" fill="#FF8F00" opacity={0.8} />
      <Path d="M72 62 Q90 46 86 28 Q80 44 76 38 Q78 52 72 60Z" fill="#FFB300" opacity={0.7} />
      <Path d="M72 62 Q92 42 84 24 Q78 40 74 34 Q76 50 72 60Z" fill="#FFD54F" opacity={0.5} />
      {/* Belly glow */}
      <Ellipse cx="50" cy="67" rx="13" ry="10" fill="#FFE0B2" opacity={0.6} />
      {/* Flame tail feathers 3 strokes */}
      <Path d="M50 84 Q46 92 42 98" fill="none" stroke="#FF6F00" strokeWidth="3" strokeLinecap="round" />
      <Path d="M50 84 Q50 94 50 100" fill="none" stroke="#FFB300" strokeWidth="3" strokeLinecap="round" />
      <Path d="M50 84 Q54 92 58 98" fill="none" stroke="#FF6F00" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}

function Adult({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Body */}
      <Ellipse cx="50" cy="67" rx="22" ry="18" fill="#FFF3E0" stroke="#FF8F00" strokeWidth="2.5" />
      {/* Head */}
      <Circle cx="50" cy="35" r="22" fill="#FFF3E0" stroke="#FF8F00" strokeWidth="2.5" />
      {/* Magnificent fire crown - many flame paths */}
      <Path d="M50 15 Q44 4 48 -3 Q52 5 50 15Z" fill="#FF6F00" />
      <Path d="M50 15 Q46 2 50 -5 Q53 3 50 15Z" fill="#FFD54F" />
      <Path d="M40 18 Q31 7 35 -1 Q39 8 40 18Z" fill="#FF6F00" opacity={0.9} />
      <Path d="M40 18 Q32 5 36 -3 Q40 7 40 18Z" fill="#FFD54F" opacity={0.8} />
      <Path d="M60 18 Q69 7 65 -1 Q61 8 60 18Z" fill="#FF6F00" opacity={0.9} />
      <Path d="M60 18 Q68 5 64 -3 Q60 7 60 18Z" fill="#FFD54F" opacity={0.8} />
      <Path d="M34 24 Q24 14 28 5 Q33 14 34 24Z" fill="#FF8F00" opacity={0.8} />
      <Path d="M66 24 Q76 14 72 5 Q67 14 66 24Z" fill="#FF8F00" opacity={0.8} />
      {/* Grand multi-point wings */}
      <Path d="M28 62 Q8 48 10 28 Q17 44 23 40 Q19 54 28 60Z" fill="#FF8F00" />
      <Path d="M28 62 Q5 44 8 22 Q16 40 21 34 Q19 52 28 60Z" fill="#FFB300" opacity={0.85} />
      <Path d="M28 62 Q3 38 10 16 Q18 36 23 28 Q22 48 28 60Z" fill="#FFD54F" opacity={0.7} />
      <Path d="M28 62 Q2 32 12 10 Q20 32 25 24 Q24 46 28 60Z" fill="#FFF9C4" opacity={0.5} />
      <Path d="M72 62 Q92 48 90 28 Q83 44 77 40 Q81 54 72 60Z" fill="#FF8F00" />
      <Path d="M72 62 Q95 44 92 22 Q84 40 79 34 Q81 52 72 60Z" fill="#FFB300" opacity={0.85} />
      <Path d="M72 62 Q97 38 90 16 Q82 36 77 28 Q78 48 72 60Z" fill="#FFD54F" opacity={0.7} />
      <Path d="M72 62 Q98 32 88 10 Q80 32 75 24 Q76 46 72 60Z" fill="#FFF9C4" opacity={0.5} />
      {/* Golden slit eyes */}
      <Circle cx="41" cy="32" r="7" fill="white" />
      <Circle cx="59" cy="32" r="7" fill="white" />
      <Circle cx="41" cy="32" r="5" fill="#FFD54F" />
      <Circle cx="59" cy="32" r="5" fill="#FFD54F" />
      <Ellipse cx="41" cy="32" rx="1.5" ry="4.5" fill="#E65100" />
      <Ellipse cx="59" cy="32" rx="1.5" ry="4.5" fill="#E65100" />
      <Circle cx="42.5" cy="30" r="1.3" fill="white" />
      <Circle cx="60.5" cy="30" r="1.3" fill="white" />
      {/* Golden beak */}
      <Path d="M45 40 L50 46 L55 40" fill="#FFD54F" stroke="#FF8F00" strokeWidth="1" />
      {/* Belly glow */}
      <Ellipse cx="50" cy="69" rx="14" ry="11" fill="#FFE0B2" opacity={0.7} />
      {/* 5 long flame tail feathers */}
      <Path d="M46 84 Q40 93 35 100" fill="none" stroke="#FF6F00" strokeWidth="3.5" strokeLinecap="round" />
      <Path d="M48 85 Q44 95 40 102" fill="none" stroke="#FFB300" strokeWidth="3" strokeLinecap="round" />
      <Path d="M50 85 Q50 96 50 103" fill="none" stroke="#FFD54F" strokeWidth="3.5" strokeLinecap="round" />
      <Path d="M52 85 Q56 95 60 102" fill="none" stroke="#FFB300" strokeWidth="3" strokeLinecap="round" />
      <Path d="M54 84 Q60 93 65 100" fill="none" stroke="#FF6F00" strokeWidth="3.5" strokeLinecap="round" />
      {/* Gold sparkle stars */}
      <Path d="M18 35 L19 32 L20 35 L23 36 L20 37 L19 40 L18 37 L15 36Z" fill="#FFD54F" opacity={0.9} />
      <Path d="M80 28 L81 25 L82 28 L85 29 L82 30 L81 33 L80 30 L77 29Z" fill="#FFD54F" opacity={0.9} />
      <Path d="M15 68 L16 66 L17 68 L19 69 L17 70 L16 72 L15 70 L13 69Z" fill="#FFD54F" opacity={0.7} />
    </Svg>
  );
}

export function PhoenixSVG({ stage, size }: { stage: AnimalStage; size: number }) {
  switch (stage) {
    case 'egg': return <Egg size={size} />;
    case 'baby': return <Baby size={size} />;
    case 'junior': return <Junior size={size} />;
    case 'adult': return <Adult size={size} />;
  }
}
