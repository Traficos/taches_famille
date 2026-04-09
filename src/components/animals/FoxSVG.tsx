import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect, Line, G } from 'react-native-svg';
import { AnimalStage } from '../../constants/animals';

interface Props { size: number }

function Egg({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Warm amber tinted egg */}
      <Ellipse cx="50" cy="55" rx="28" ry="35" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="2" />
      {/* Amber tint overlay */}
      <Ellipse cx="50" cy="55" rx="25" ry="32" fill="#FF8F00" opacity={0.1} />
      {/* Ear silhouette decorations */}
      <Path d="M30 28 L24 12 L36 26" fill="#FFAB40" opacity={0.6} />
      <Path d="M70 28 L76 12 L64 26" fill="#FFAB40" opacity={0.6} />
      {/* Inner ear tint */}
      <Path d="M30 28 L26 16 L35 26" fill="#FF8F00" opacity={0.4} />
      <Path d="M70 28 L74 16 L65 26" fill="#FF8F00" opacity={0.4} />
      {/* Subtle swirl pattern */}
      <Path d="M50 40 Q58 45 55 55 Q50 60 45 55 Q42 45 50 40Z" fill="#FFAB40" opacity={0.15} />
      {/* Small sparkle */}
      <Path d="M62 42 L63 39 L64 42 L67 43 L64 44 L63 47 L62 44 L59 43Z" fill="#FFAB40" opacity={0.6} />
    </Svg>
  );
}

function Baby({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Round body */}
      <Circle cx="50" cy="65" r="20" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="2" />
      {/* Round head */}
      <Circle cx="50" cy="38" r="20" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="2" />
      {/* Pointy ears */}
      <Path d="M33 22 L26 8 L40 20" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="1.5" />
      <Path d="M67 22 L74 8 L60 20" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="1.5" />
      {/* Orange tips on ears */}
      <Path d="M33 22 L28 10 L38 20" fill="#FF8F00" opacity={0.8} />
      <Path d="M67 22 L72 10 L62 20" fill="#FF8F00" opacity={0.8} />
      {/* White face diamond marking */}
      <Path d="M50 20 L57 30 L50 42 L43 30Z" fill="white" opacity={0.6} />
      {/* Eyes */}
      <Circle cx="42" cy="34" r="5.5" fill="white" />
      <Circle cx="58" cy="34" r="5.5" fill="white" />
      <Circle cx="42" cy="34" r="3.5" fill="#5D4037" />
      <Circle cx="58" cy="34" r="3.5" fill="#5D4037" />
      <Circle cx="43" cy="33" r="1.2" fill="white" />
      <Circle cx="59" cy="33" r="1.2" fill="white" />
      {/* Nose */}
      <Ellipse cx="50" cy="42" rx="4" ry="2.5" fill="#5D4037" />
      <Circle cx="49" cy="41.5" r="1" fill="white" opacity={0.5} />
      {/* Mouth */}
      <Path d="M46 45 Q50 49 54 45" fill="none" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bushy tail with white tip */}
      <Path d="M70 68 Q88 60 92 74 Q86 68 80 76 Q74 70 70 74Z" fill="#FF8F00" stroke="#FFAB40" strokeWidth="1.5" />
      <Path d="M85 70 Q93 62 93 72 Q90 67 85 74Z" fill="#FFAB40" opacity={0.8} />
      <Ellipse cx="91" cy="72" rx="5" ry="4" fill="white" />
    </Svg>
  );
}

function Junior({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Body */}
      <Ellipse cx="50" cy="66" rx="22" ry="19" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="2" />
      {/* Head */}
      <Ellipse cx="50" cy="37" rx="22" ry="20" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="2" />
      {/* Ears */}
      <Path d="M31 20 L24 5 L40 18" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="1.5" />
      <Path d="M69 20 L76 5 L60 18" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="1.5" />
      <Path d="M31 20 L26 8 L39 18" fill="#FF8F00" opacity={0.8} />
      <Path d="M69 20 L74 8 L61 18" fill="#FF8F00" opacity={0.8} />
      {/* White face marking */}
      <Path d="M50 20 L58 30 L50 44 L42 30Z" fill="white" opacity={0.7} />
      {/* Cunning narrowed eyes with amber iris */}
      <Ellipse cx="42" cy="34" rx="7" ry="5" fill="white" />
      <Ellipse cx="58" cy="34" rx="7" ry="5" fill="white" />
      <Ellipse cx="42" cy="34" rx="5" ry="3.5" fill="#FF8F00" />
      <Ellipse cx="58" cy="34" rx="5" ry="3.5" fill="#FF8F00" />
      <Circle cx="42" cy="34" r="2" fill="#4E342E" />
      <Circle cx="58" cy="34" r="2" fill="#4E342E" />
      <Circle cx="43" cy="32.8" r="1" fill="white" />
      <Circle cx="59" cy="32.8" r="1" fill="white" />
      {/* Nose */}
      <Ellipse cx="50" cy="43" rx="5" ry="3" fill="#5D4037" />
      <Circle cx="49" cy="42.5" r="1.2" fill="white" opacity={0.5} />
      {/* Whiskers */}
      <Line x1="28" y1="42" x2="44" y2="44" stroke="#90A4AE" strokeWidth="1" strokeLinecap="round" />
      <Line x1="27" y1="46" x2="43" y2="46" stroke="#90A4AE" strokeWidth="1" strokeLinecap="round" />
      <Line x1="56" y1="44" x2="72" y2="42" stroke="#90A4AE" strokeWidth="1" strokeLinecap="round" />
      <Line x1="57" y1="46" x2="73" y2="46" stroke="#90A4AE" strokeWidth="1" strokeLinecap="round" />
      {/* Dark paws */}
      <Ellipse cx="37" cy="82" rx="7" ry="5" fill="#5D4037" opacity={0.4} />
      <Ellipse cx="63" cy="82" rx="7" ry="5" fill="#5D4037" opacity={0.4} />
      {/* Bigger bushy tail with white tip */}
      <Path d="M72 70 Q92 60 96 76 Q88 69 84 78 Q78 72 72 76Z" fill="#FF8F00" stroke="#FFAB40" strokeWidth="2" />
      <Path d="M84 68 Q94 59 96 70 Q92 65 86 73Z" fill="#FFAB40" opacity={0.7} />
      <Ellipse cx="93" cy="74" rx="6" ry="5" fill="white" />
      {/* Belly */}
      <Ellipse cx="50" cy="68" rx="13" ry="10" fill="white" opacity={0.5} />
    </Svg>
  );
}

function Adult({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Body */}
      <Ellipse cx="50" cy="65" rx="22" ry="18" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="2.5" />
      {/* Head */}
      <Ellipse cx="50" cy="34" rx="23" ry="21" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="2.5" />
      {/* Ears */}
      <Path d="M30 16 L22 1 L40 14" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="2" />
      <Path d="M70 16 L78 1 L60 14" fill="#FFF8E1" stroke="#FFAB40" strokeWidth="2" />
      <Path d="M30 16 L24 4 L39 14" fill="#FF8F00" opacity={0.9} />
      <Path d="M70 16 L76 4 L61 14" fill="#FF8F00" opacity={0.9} />
      {/* White face + chest */}
      <Path d="M50 15 L60 27 L50 45 L40 27Z" fill="white" opacity={0.8} />
      <Ellipse cx="50" cy="65" rx="14" ry="11" fill="white" opacity={0.6} />
      {/* Wise amber eyes */}
      <Circle cx="40" cy="31" r="7.5" fill="white" />
      <Circle cx="60" cy="31" r="7.5" fill="white" />
      <Circle cx="40" cy="31" r="5.5" fill="#FF8F00" />
      <Circle cx="60" cy="31" r="5.5" fill="#FF8F00" />
      <Circle cx="40" cy="31" r="2.5" fill="#4E342E" />
      <Circle cx="60" cy="31" r="2.5" fill="#4E342E" />
      <Circle cx="41.5" cy="29.5" r="1.5" fill="white" />
      <Circle cx="61.5" cy="29.5" r="1.5" fill="white" />
      {/* Nose */}
      <Ellipse cx="50" cy="41" rx="5.5" ry="3.5" fill="#5D4037" />
      <Circle cx="49" cy="40.5" r="1.3" fill="white" opacity={0.5} />
      {/* Whiskers */}
      <Line x1="24" y1="40" x2="43" y2="42" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="23" y1="44" x2="42" y2="44" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="24" y1="48" x2="42" y2="46" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="57" y1="42" x2="76" y2="40" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="58" y1="44" x2="77" y2="44" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="58" y1="46" x2="76" y2="48" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      {/* Dark paws */}
      <Ellipse cx="36" cy="80" rx="8" ry="5.5" fill="#5D4037" opacity={0.4} />
      <Ellipse cx="64" cy="80" rx="8" ry="5.5" fill="#5D4037" opacity={0.4} />
      {/* 9-tails kitsune - multiple overlapping tails 5 visible */}
      {/* Tail 1 - leftmost */}
      <Path d="M28 72 Q16 60 18 45 Q25 60 30 65 Q26 68 28 75Z" fill="#FFAB40" opacity={0.6} />
      <Ellipse cx="18" cy="44" rx="4" ry="3" fill="white" opacity={0.7} />
      {/* Tail 2 */}
      <Path d="M35 75 Q22 62 25 46 Q32 62 37 68 Q33 71 35 78Z" fill="#FF8F00" opacity={0.7} />
      <Ellipse cx="25" cy="45" rx="4" ry="3" fill="white" opacity={0.7} />
      {/* Tail 3 - center */}
      <Path d="M50 80 Q44 68 46 52 Q50 66 54 68 Q50 73 50 82Z" fill="#FF8F00" opacity={0.9} />
      <Ellipse cx="50" cy="51" rx="4.5" ry="3.5" fill="white" opacity={0.8} />
      {/* Tail 4 */}
      <Path d="M65 75 Q78 62 75 46 Q68 62 63 68 Q67 71 65 78Z" fill="#FF8F00" opacity={0.7} />
      <Ellipse cx="75" cy="45" rx="4" ry="3" fill="white" opacity={0.7} />
      {/* Tail 5 - rightmost */}
      <Path d="M72 72 Q84 60 82 45 Q75 60 70 65 Q74 68 72 75Z" fill="#FFAB40" opacity={0.6} />
      <Ellipse cx="82" cy="44" rx="4" ry="3" fill="white" opacity={0.7} />
      {/* Magic green sparkles */}
      <Path d="M14 55 L15 52 L16 55 L19 56 L16 57 L15 60 L14 57 L11 56Z" fill="#A5D6A7" opacity={0.9} />
      <Path d="M84 50 L85 47 L86 50 L89 51 L86 52 L85 55 L84 52 L81 51Z" fill="#A5D6A7" opacity={0.9} />
      <Path d="M20 78 L21 76 L22 78 L24 79 L22 80 L21 82 L20 80 L18 79Z" fill="#A5D6A7" opacity={0.7} />
      <Path d="M78 75 L79 73 L80 75 L82 76 L80 77 L79 79 L78 77 L76 76Z" fill="#A5D6A7" opacity={0.7} />
      <Circle cx="50" cy="20" r="2" fill="#A5D6A7" opacity={0.8} />
    </Svg>
  );
}

export function FoxSVG({ stage, size }: { stage: AnimalStage; size: number }) {
  switch (stage) {
    case 'egg': return <Egg size={size} />;
    case 'baby': return <Baby size={size} />;
    case 'junior': return <Junior size={size} />;
    case 'adult': return <Adult size={size} />;
  }
}
