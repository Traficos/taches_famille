import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect, Line, G, Text } from 'react-native-svg';
import { AnimalStage } from '../../constants/animals';

interface Props { size: number }

function Egg({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Sleeping pup shape - wide ellipse */}
      <Ellipse cx="50" cy="62" rx="35" ry="22" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
      {/* Tiny ears on top */}
      <Path d="M32 44 L27 32 L38 42" fill="#78909C" stroke="#546E7A" strokeWidth="1" />
      <Path d="M68 44 L73 32 L62 42" fill="#78909C" stroke="#546E7A" strokeWidth="1" />
      {/* Closed eyes - curved lines */}
      <Path d="M36 58 Q40 54 44 58" fill="none" stroke="#546E7A" strokeWidth="2" strokeLinecap="round" />
      <Path d="M56 58 Q60 54 64 58" fill="none" stroke="#546E7A" strokeWidth="2" strokeLinecap="round" />
      {/* Nose */}
      <Ellipse cx="50" cy="64" rx="4" ry="2.5" fill="#546E7A" />
      {/* Zzz text */}
      <Text x="68" y="45" fontSize="10" fill="#90A4AE" fontWeight="bold" opacity={0.8}>z</Text>
      <Text x="74" y="38" fontSize="8" fill="#90A4AE" fontWeight="bold" opacity={0.6}>z</Text>
      <Text x="79" y="32" fontSize="6" fill="#90A4AE" fontWeight="bold" opacity={0.4}>z</Text>
      {/* Belly */}
      <Ellipse cx="50" cy="68" rx="20" ry="10" fill="#CFD8DC" opacity={0.5} />
    </Svg>
  );
}

function Baby({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Round fluffy body */}
      <Circle cx="50" cy="65" r="20" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
      {/* Round head */}
      <Circle cx="50" cy="38" r="20" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
      {/* Pointy ears */}
      <Path d="M33 22 L26 8 L40 20" fill="#78909C" stroke="#546E7A" strokeWidth="1.5" />
      <Path d="M67 22 L74 8 L60 20" fill="#78909C" stroke="#546E7A" strokeWidth="1.5" />
      {/* Inner ear color */}
      <Path d="M33 22 L29 13 L38 21" fill="#CFD8DC" />
      <Path d="M67 22 L71 13 L62 21" fill="#CFD8DC" />
      {/* Eyes */}
      <Circle cx="42" cy="36" r="5.5" fill="white" />
      <Circle cx="58" cy="36" r="5.5" fill="white" />
      <Circle cx="42" cy="36" r="3.5" fill="#37474F" />
      <Circle cx="58" cy="36" r="3.5" fill="#37474F" />
      <Circle cx="43" cy="35" r="1.2" fill="white" />
      <Circle cx="59" cy="35" r="1.2" fill="white" />
      {/* Nose */}
      <Ellipse cx="50" cy="44" rx="5" ry="3.5" fill="#546E7A" />
      <Circle cx="49" cy="43" r="1" fill="white" opacity={0.5} />
      {/* Mouth */}
      <Path d="M46 47 Q50 51 54 47" fill="none" stroke="#546E7A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Fluffy chest zigzag */}
      <Path d="M35 60 L38 55 L41 60 L44 55 L47 60 L50 55 L53 60 L56 55 L59 60 L62 55 L65 60" fill="none" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Belly */}
      <Ellipse cx="50" cy="68" rx="12" ry="10" fill="#CFD8DC" opacity={0.5} />
    </Svg>
  );
}

function Junior({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Body */}
      <Ellipse cx="50" cy="67" rx="22" ry="18" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
      {/* Head */}
      <Ellipse cx="50" cy="37" rx="22" ry="20" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
      {/* Alert tall ears */}
      <Path d="M32 20 L25 4 L40 18" fill="#78909C" stroke="#546E7A" strokeWidth="1.5" />
      <Path d="M68 20 L75 4 L60 18" fill="#78909C" stroke="#546E7A" strokeWidth="1.5" />
      <Path d="M32 20 L28 9 L38 18" fill="#CFD8DC" />
      <Path d="M68 20 L72 9 L62 18" fill="#CFD8DC" />
      {/* Face diamond marking */}
      <Path d="M50 22 L55 30 L50 38 L45 30Z" fill="#B0BEC5" opacity={0.5} />
      {/* Wolf eyes with colored iris */}
      <Circle cx="42" cy="35" r="6" fill="white" />
      <Circle cx="58" cy="35" r="6" fill="white" />
      <Circle cx="42" cy="35" r="4" fill="#546E7A" />
      <Circle cx="58" cy="35" r="4" fill="#546E7A" />
      <Circle cx="42" cy="35" r="2" fill="#263238" />
      <Circle cx="58" cy="35" r="2" fill="#263238" />
      <Circle cx="43" cy="33.5" r="1.2" fill="white" />
      <Circle cx="59" cy="33.5" r="1.2" fill="white" />
      {/* Snout */}
      <Ellipse cx="50" cy="44" rx="7" ry="5" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="1" />
      <Ellipse cx="50" cy="44" rx="5" ry="3" fill="#B0BEC5" />
      {/* Nose */}
      <Ellipse cx="50" cy="41" rx="4" ry="2.5" fill="#546E7A" />
      <Circle cx="49" cy="40.5" r="1" fill="white" opacity={0.5} />
      {/* Mane texture wavy lines on sides */}
      <Path d="M28 45 Q24 42 28 39 Q24 36 28 33" fill="none" stroke="#78909C" strokeWidth="2" strokeLinecap="round" />
      <Path d="M26 48 Q22 44 26 40 Q22 36 26 32" fill="none" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M72 45 Q76 42 72 39 Q76 36 72 33" fill="none" stroke="#78909C" strokeWidth="2" strokeLinecap="round" />
      <Path d="M74 48 Q78 44 74 40 Q78 36 74 32" fill="none" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" />
      {/* Chest fur zigzag */}
      <Path d="M36 62 L39 57 L42 62 L45 57 L48 62 L51 57 L54 62 L57 57 L60 62 L63 57 L66 62" fill="none" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bushy tail */}
      <Path d="M72 72 Q88 65 90 78 Q84 72 80 80 Q76 74 72 78Z" fill="#78909C" stroke="#546E7A" strokeWidth="1.5" />
      <Ellipse cx="87" cy="77" rx="5" ry="4" fill="#CFD8DC" />
    </Svg>
  );
}

function Adult({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Body */}
      <Ellipse cx="50" cy="68" rx="24" ry="20" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2.5" />
      {/* Head */}
      <Ellipse cx="50" cy="35" rx="24" ry="22" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2.5" />
      {/* Tall ears */}
      <Path d="M30 17 L22 2 L38 15" fill="#78909C" stroke="#546E7A" strokeWidth="2" />
      <Path d="M70 17 L78 2 L62 15" fill="#78909C" stroke="#546E7A" strokeWidth="2" />
      <Path d="M30 17 L25 7 L37 15" fill="#CFD8DC" />
      <Path d="M70 17 L75 7 L63 15" fill="#CFD8DC" />
      {/* Moon mark on forehead */}
      <Path d="M50 18 Q54 14 50 10 Q48 14 50 18Z" fill="#B0BEC5" opacity={0.8} />
      {/* Thick mane heavy wavy strokes */}
      <Path d="M26 42 Q20 38 24 34 Q20 30 24 26 Q20 22 24 18" fill="none" stroke="#546E7A" strokeWidth="3" strokeLinecap="round" />
      <Path d="M24 45 Q17 40 22 35 Q17 30 22 25 Q17 20 22 15" fill="none" stroke="#78909C" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M23 48 Q15 42 20 36 Q15 30 20 24" fill="none" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
      <Path d="M74 42 Q80 38 76 34 Q80 30 76 26 Q80 22 76 18" fill="none" stroke="#546E7A" strokeWidth="3" strokeLinecap="round" />
      <Path d="M76 45 Q83 40 78 35 Q83 30 78 25 Q83 20 78 15" fill="none" stroke="#78909C" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M77 48 Q85 42 80 36 Q85 30 80 24" fill="none" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" />
      {/* Piercing turquoise eyes */}
      <Circle cx="41" cy="33" r="7" fill="white" />
      <Circle cx="59" cy="33" r="7" fill="white" />
      <Circle cx="41" cy="33" r="5" fill="#80CBC4" />
      <Circle cx="59" cy="33" r="5" fill="#80CBC4" />
      <Circle cx="41" cy="33" r="2.5" fill="#004D40" />
      <Circle cx="59" cy="33" r="2.5" fill="#004D40" />
      <Circle cx="42.5" cy="31.5" r="1.3" fill="white" />
      <Circle cx="60.5" cy="31.5" r="1.3" fill="white" />
      {/* Snout */}
      <Ellipse cx="50" cy="43" rx="8" ry="6" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="1.5" />
      <Ellipse cx="50" cy="43" rx="6" ry="4" fill="#B0BEC5" />
      <Ellipse cx="50" cy="40" rx="4.5" ry="3" fill="#546E7A" />
      <Circle cx="49" cy="39.5" r="1.2" fill="white" opacity={0.6} />
      {/* Mouth */}
      <Path d="M46 46 Q50 50 54 46" fill="none" stroke="#546E7A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Chest fur zigzag elaborate */}
      <Path d="M32 62 L35 56 L38 62 L41 56 L44 62 L47 56 L50 62 L53 56 L56 62 L59 56 L62 62 L65 56 L68 62" fill="none" stroke="#78909C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Belly */}
      <Ellipse cx="50" cy="70" rx="14" ry="11" fill="#CFD8DC" opacity={0.5} />
      {/* Majestic tail */}
      <Path d="M74 74 Q92 65 95 80 Q88 73 85 82 Q80 75 76 80Z" fill="#78909C" stroke="#546E7A" strokeWidth="2" />
      <Path d="M86 78 Q93 70 95 80 Q91 75 88 82Z" fill="#90A4AE" opacity={0.8} />
      <Ellipse cx="92" cy="79" rx="5" ry="4" fill="#ECEFF1" />
    </Svg>
  );
}

export function WolfSVG({ stage, size }: { stage: AnimalStage; size: number }) {
  switch (stage) {
    case 'egg': return <Egg size={size} />;
    case 'baby': return <Baby size={size} />;
    case 'junior': return <Junior size={size} />;
    case 'adult': return <Adult size={size} />;
  }
}
