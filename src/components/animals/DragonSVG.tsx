import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect, Line, G, Text } from 'react-native-svg';
import { AnimalStage } from '../../constants/animals';

interface Props { size: number }

function Egg({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Scaly red egg */}
      <Ellipse cx="50" cy="55" rx="28" ry="35" fill="#FFEBEE" stroke="#EF9A9A" strokeWidth="2" />
      {/* Scale pattern */}
      <Path d="M30 45 Q35 40 40 45" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M40 45 Q45 40 50 45" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M50 45 Q55 40 60 45" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M35 55 Q40 50 45 55" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M45 55 Q50 50 55 55" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M55 55 Q60 50 65 55" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M30 65 Q35 60 40 65" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M40 65 Q45 60 50 65" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M50 65 Q55 60 60 65" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      {/* Crack with fire glow */}
      <Path d="M50 30 L47 40 L52 45 L48 55" fill="none" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
      {/* Fire glow from crack */}
      <Ellipse cx="50" cy="40" rx="6" ry="8" fill="#FF6F00" opacity={0.3} />
      <Ellipse cx="50" cy="40" rx="3" ry="5" fill="#FFD54F" opacity={0.5} />
      {/* Red scale spots */}
      <Circle cx="38" cy="50" r="2.5" fill="#E53935" opacity={0.4} />
      <Circle cx="52" cy="50" r="2.5" fill="#E53935" opacity={0.4} />
      <Circle cx="45" cy="62" r="2.5" fill="#E53935" opacity={0.4} />
      <Circle cx="58" cy="60" r="2.5" fill="#E53935" opacity={0.4} />
    </Svg>
  );
}

function Baby({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Round cute baby dragon body */}
      <Ellipse cx="50" cy="60" rx="22" ry="20" fill="#FFEBEE" stroke="#EF9A9A" strokeWidth="2" />
      {/* Round head */}
      <Circle cx="50" cy="38" r="18" fill="#FFEBEE" stroke="#EF9A9A" strokeWidth="2" />
      {/* Tiny horns */}
      <Path d="M41 22 L38 14 L44 20" fill="#E53935" stroke="#C62828" strokeWidth="1" />
      <Path d="M59 22 L62 14 L56 20" fill="#E53935" stroke="#C62828" strokeWidth="1" />
      {/* Small leaf wings */}
      <Path d="M28 55 Q18 45 22 35 Q30 48 28 55Z" fill="#EF9A9A" stroke="#E53935" strokeWidth="1" opacity={0.8} />
      <Path d="M72 55 Q82 45 78 35 Q70 48 72 55Z" fill="#EF9A9A" stroke="#E53935" strokeWidth="1" opacity={0.8} />
      {/* Eyes */}
      <Circle cx="43" cy="36" r="5" fill="white" />
      <Circle cx="57" cy="36" r="5" fill="white" />
      <Circle cx="43" cy="36" r="3" fill="#1B5E20" />
      <Circle cx="57" cy="36" r="3" fill="#1B5E20" />
      <Circle cx="44" cy="35" r="1" fill="white" />
      <Circle cx="58" cy="35" r="1" fill="white" />
      {/* Snout */}
      <Ellipse cx="50" cy="43" rx="6" ry="4" fill="#FFCDD2" stroke="#EF9A9A" strokeWidth="1" />
      {/* Nostrils */}
      <Circle cx="47" cy="43" r="1.2" fill="#E53935" opacity={0.6} />
      <Circle cx="53" cy="43" r="1.2" fill="#E53935" opacity={0.6} />
      {/* Belly */}
      <Ellipse cx="50" cy="63" rx="12" ry="10" fill="#FFCDD2" opacity={0.5} />
      {/* Tail with small flame */}
      <Path d="M72 65 Q85 60 82 72 Q78 68 72 72Z" fill="#EF9A9A" stroke="#E53935" strokeWidth="1" />
      <Path d="M82 65 Q90 58 88 65 Q85 62 82 68Z" fill="#FF6F00" opacity={0.8} />
      <Path d="M84 63 Q90 57 89 63 Q87 60 84 66Z" fill="#FFD54F" opacity={0.9} />
    </Svg>
  );
}

function Junior({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Body */}
      <Ellipse cx="50" cy="65" rx="22" ry="18" fill="#FFEBEE" stroke="#EF9A9A" strokeWidth="2" />
      {/* Head */}
      <Ellipse cx="50" cy="38" rx="20" ry="18" fill="#FFEBEE" stroke="#EF9A9A" strokeWidth="2" />
      {/* Horns - bigger */}
      <Path d="M38 22 L33 10 L41 20" fill="#E53935" stroke="#C62828" strokeWidth="1.5" />
      <Path d="M62 22 L67 10 L59 20" fill="#E53935" stroke="#C62828" strokeWidth="1.5" />
      {/* Multi-point wings */}
      <Path d="M28 60 Q12 50 15 35 Q20 45 25 42 Q22 52 28 55Z" fill="#EF9A9A" stroke="#E53935" strokeWidth="1.5" opacity={0.9} />
      <Path d="M28 60 Q10 42 18 28 Q24 40 22 35 Q25 48 28 58Z" fill="#FFCDD2" stroke="#E53935" strokeWidth="1" opacity={0.7} />
      <Path d="M72 60 Q88 50 85 35 Q80 45 75 42 Q78 52 72 55Z" fill="#EF9A9A" stroke="#E53935" strokeWidth="1.5" opacity={0.9} />
      <Path d="M72 60 Q90 42 82 28 Q76 40 78 35 Q75 48 72 58Z" fill="#FFCDD2" stroke="#E53935" strokeWidth="1" opacity={0.7} />
      {/* Scale details on body */}
      <Path d="M38 60 Q43 55 48 60" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M52 60 Q57 55 62 60" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M40 68 Q45 63 50 68" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M50 68 Q55 63 60 68" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      {/* Eyes with slit pupils */}
      <Circle cx="42" cy="36" r="6" fill="white" />
      <Circle cx="58" cy="36" r="6" fill="white" />
      <Circle cx="42" cy="36" r="4" fill="#2E7D32" />
      <Circle cx="58" cy="36" r="4" fill="#2E7D32" />
      {/* Slit pupils */}
      <Ellipse cx="42" cy="36" rx="1.2" ry="3.5" fill="#1A237E" />
      <Ellipse cx="58" cy="36" rx="1.2" ry="3.5" fill="#1A237E" />
      <Circle cx="43" cy="34" r="1" fill="white" />
      <Circle cx="59" cy="34" r="1" fill="white" />
      {/* Snout */}
      <Ellipse cx="50" cy="44" rx="7" ry="5" fill="#FFCDD2" stroke="#EF9A9A" strokeWidth="1" />
      <Circle cx="47" cy="44" r="1.5" fill="#E53935" opacity={0.6} />
      <Circle cx="53" cy="44" r="1.5" fill="#E53935" opacity={0.6} />
      {/* Belly scales */}
      <Ellipse cx="50" cy="67" rx="13" ry="9" fill="#FFCDD2" opacity={0.5} />
      {/* Bigger tail with flame */}
      <Path d="M72 70 Q88 62 85 76 Q80 70 72 75Z" fill="#EF9A9A" stroke="#E53935" strokeWidth="1.5" />
      <Path d="M85 68 Q95 58 93 68 Q89 63 85 72Z" fill="#FF6F00" opacity={0.9} />
      <Path d="M87 65 Q96 56 95 65 Q92 60 87 70Z" fill="#FFD54F" />
      <Path d="M89 62 Q96 55 96 62 Q94 58 89 66Z" fill="white" opacity={0.6} />
    </Svg>
  );
}

function Adult({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Grand body */}
      <Ellipse cx="50" cy="68" rx="24" ry="20" fill="#FFEBEE" stroke="#EF9A9A" strokeWidth="2.5" />
      {/* Head */}
      <Ellipse cx="50" cy="36" rx="22" ry="20" fill="#FFEBEE" stroke="#EF9A9A" strokeWidth="2.5" />
      {/* Crown of 4 horns */}
      <Path d="M33 18 L28 5 L36 16" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5" />
      <Path d="M42 14 L40 3 L46 13" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5" />
      <Path d="M58 14 L60 3 L54 13" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5" />
      <Path d="M67 18 L72 5 L64 16" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5" />
      {/* Magnificent multi-point wings */}
      <Path d="M26 62 Q5 48 8 28 Q15 42 20 38 Q16 52 26 58Z" fill="#EF9A9A" stroke="#E53935" strokeWidth="2" />
      <Path d="M26 62 Q3 40 12 20 Q19 36 17 30 Q22 46 26 58Z" fill="#FFCDD2" stroke="#E53935" strokeWidth="1.5" opacity={0.8} />
      <Path d="M26 62 Q6 30 18 12 Q24 30 22 24 Q25 42 26 58Z" fill="#FFEBEE" stroke="#E53935" strokeWidth="1" opacity={0.6} />
      <Path d="M74 62 Q95 48 92 28 Q85 42 80 38 Q84 52 74 58Z" fill="#EF9A9A" stroke="#E53935" strokeWidth="2" />
      <Path d="M74 62 Q97 40 88 20 Q81 36 83 30 Q78 46 74 58Z" fill="#FFCDD2" stroke="#E53935" strokeWidth="1.5" opacity={0.8} />
      <Path d="M74 62 Q94 30 82 12 Q76 30 78 24 Q75 42 74 58Z" fill="#FFEBEE" stroke="#E53935" strokeWidth="1" opacity={0.6} />
      {/* Golden slit eyes */}
      <Circle cx="41" cy="33" r="7" fill="white" />
      <Circle cx="59" cy="33" r="7" fill="white" />
      <Circle cx="41" cy="33" r="5" fill="#FFD54F" />
      <Circle cx="59" cy="33" r="5" fill="#FFD54F" />
      <Ellipse cx="41" cy="33" rx="1.5" ry="4.5" fill="#1A237E" />
      <Ellipse cx="59" cy="33" rx="1.5" ry="4.5" fill="#1A237E" />
      <Circle cx="42.5" cy="31" r="1.2" fill="white" />
      <Circle cx="60.5" cy="31" r="1.2" fill="white" />
      {/* Fire breath from nostrils */}
      <Ellipse cx="50" cy="45" rx="8" ry="5.5" fill="#FFCDD2" stroke="#EF9A9A" strokeWidth="1.5" />
      <Circle cx="46" cy="45" r="2" fill="#E53935" opacity={0.7} />
      <Circle cx="54" cy="45" r="2" fill="#E53935" opacity={0.7} />
      {/* Flames from nostrils */}
      <Path d="M44 43 Q38 35 42 30 Q43 38 46 35 Q44 40 44 43Z" fill="#FF6F00" opacity={0.8} />
      <Path d="M44 43 Q40 32 44 28 Q44 36 47 33 Q45 39 44 43Z" fill="#FFD54F" opacity={0.9} />
      <Path d="M56 43 Q62 35 58 30 Q57 38 54 35 Q56 40 56 43Z" fill="#FF6F00" opacity={0.8} />
      <Path d="M56 43 Q60 32 56 28 Q56 36 53 33 Q55 39 56 43Z" fill="#FFD54F" opacity={0.9} />
      {/* Belly scales elaborate */}
      <Ellipse cx="50" cy="70" rx="15" ry="12" fill="#FFCDD2" opacity={0.6} />
      <Path d="M36 65 Q42 60 48 65" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M52 65 Q58 60 64 65" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M36 72 Q42 67 48 72" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      <Path d="M52 72 Q58 67 64 72" fill="none" stroke="#EF9A9A" strokeWidth="1.5" />
      {/* Elaborate tail flame */}
      <Path d="M74 74 Q90 65 87 80 Q82 74 74 78Z" fill="#EF9A9A" stroke="#E53935" strokeWidth="2" />
      <Path d="M87 72 Q98 60 96 72 Q92 66 87 76Z" fill="#FF6F00" />
      <Path d="M89 69 Q99 58 98 69 Q95 63 89 73Z" fill="#FFD54F" />
      <Path d="M91 66 Q99 56 99 66 Q97 61 91 70Z" fill="white" opacity={0.7} />
      {/* Gold sparkles */}
      <Path d="M20 25 L21 22 L22 25 L25 26 L22 27 L21 30 L20 27 L17 26Z" fill="#FFD54F" opacity={0.9} />
      <Path d="M78 20 L79 17 L80 20 L83 21 L80 22 L79 25 L78 22 L75 21Z" fill="#FFD54F" opacity={0.9} />
      <Path d="M15 70 L16 68 L17 70 L19 71 L17 72 L16 74 L15 72 L13 71Z" fill="#FFD54F" opacity={0.7} />
    </Svg>
  );
}

export function DragonSVG({ stage, size }: { stage: AnimalStage; size: number }) {
  switch (stage) {
    case 'egg': return <Egg size={size} />;
    case 'baby': return <Baby size={size} />;
    case 'junior': return <Junior size={size} />;
    case 'adult': return <Adult size={size} />;
  }
}
