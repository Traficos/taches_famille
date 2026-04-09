import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect, G } from 'react-native-svg';
import { AnimalStage } from '../../constants/animals';

interface Props { size: number }

function Egg({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="90" rx="20" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Egg body */}
      <Ellipse cx="50" cy="52" rx="22" ry="28" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="2" />
      {/* Sheen */}
      <Ellipse cx="43" cy="40" rx="6" ry="9" fill="rgba(255,255,255,0.5)" />
      {/* Peach tint blush */}
      <Ellipse cx="50" cy="58" rx="12" ry="8" fill="rgba(255,171,145,0.2)" />
      {/* Ear decoration */}
      <Ellipse cx="43" cy="38" rx="4" ry="7" fill="#FFAB91" opacity="0.35" />
      <Ellipse cx="57" cy="38" rx="4" ry="7" fill="#FFAB91" opacity="0.35" />
      {/* Tiny heart */}
      <Path d="M 47 55 Q 50 51 53 55 Q 53 58 50 61 Q 47 58 47 55 Z"
        fill="#FFAB91" opacity="0.5" />
    </Svg>
  );
}

function Baby({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="91" rx="22" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Long vertical ears */}
      <Ellipse cx="38" cy="26" rx="8" ry="18" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5" />
      <Ellipse cx="62" cy="26" rx="8" ry="18" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5" />
      {/* Inner ears */}
      <Ellipse cx="38" cy="26" rx="4" ry="12" fill="#FFAB91" opacity="0.4" />
      <Ellipse cx="62" cy="26" rx="4" ry="12" fill="#FFAB91" opacity="0.4" />
      {/* Body */}
      <Ellipse cx="50" cy="71" rx="19" ry="16" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5" />
      {/* Head */}
      <Circle cx="50" cy="50" r="21" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5" />
      {/* Blush */}
      <Ellipse cx="35" cy="55" rx="6" ry="4" fill="rgba(255,171,145,0.4)" />
      <Ellipse cx="65" cy="55" rx="6" ry="4" fill="rgba(255,171,145,0.4)" />
      {/* Eyes */}
      <Circle cx="43" cy="48" r="5" fill="white" />
      <Circle cx="57" cy="48" r="5" fill="white" />
      <Circle cx="43" cy="48" r="3" fill="#333" />
      <Circle cx="57" cy="48" r="3" fill="#333" />
      <Circle cx="44" cy="47" r="1" fill="white" />
      <Circle cx="58" cy="47" r="1" fill="white" />
      {/* Pink nose */}
      <Ellipse cx="50" cy="55" rx="2.5" ry="2" fill="#FFAB91" />
      {/* Bunny teeth */}
      <Rect x="47" y="58" width="3" height="4" rx="1" fill="white" stroke="#FFCCBC" strokeWidth="0.5" />
      <Rect x="50" y="58" width="3" height="4" rx="1" fill="white" stroke="#FFCCBC" strokeWidth="0.5" />
      {/* Tiny paws */}
      <Ellipse cx="34" cy="80" rx="6" ry="4" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1" />
      <Ellipse cx="66" cy="80" rx="6" ry="4" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1" />
    </Svg>
  );
}

function Junior({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="92" rx="24" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* One ear upright, one flopped */}
      <Ellipse cx="36" cy="22" rx="9" ry="20" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5" />
      <Ellipse cx="36" cy="22" rx="5" ry="13" fill="#FFAB91" opacity="0.4" />
      {/* Flopped ear */}
      <Ellipse cx="64" cy="30" rx="9" ry="16" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5"
        transform="rotate(40 64 30)" />
      <Ellipse cx="64" cy="30" rx="5" ry="10" fill="#FFAB91" opacity="0.4"
        transform="rotate(40 64 30)" />
      {/* Body */}
      <Ellipse cx="50" cy="72" rx="21" ry="18" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5" />
      {/* Fluffy tail */}
      <Circle cx="68" cy="76" r="7" fill="white" stroke="#FFCCBC" strokeWidth="1" />
      <Circle cx="68" cy="76" r="5" fill="white" />
      {/* Head */}
      <Circle cx="50" cy="48" r="23" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5" />
      {/* Blush */}
      <Ellipse cx="33" cy="53" rx="7" ry="4.5" fill="rgba(255,171,145,0.4)" />
      <Ellipse cx="67" cy="53" rx="7" ry="4.5" fill="rgba(255,171,145,0.4)" />
      {/* Eyes - curious */}
      <Circle cx="42" cy="45" r="6" fill="white" />
      <Circle cx="58" cy="45" r="6" fill="white" />
      <Circle cx="43" cy="45" r="3.5" fill="#4A148C" />
      <Circle cx="59" cy="45" r="3.5" fill="#4A148C" />
      <Circle cx="44" cy="44" r="1.2" fill="white" />
      <Circle cx="60" cy="44" r="1.2" fill="white" />
      {/* Nose */}
      <Ellipse cx="50" cy="53" rx="3" ry="2.2" fill="#FFAB91" />
      {/* Whiskers */}
      <Path d="M 30 51 L 44 53" stroke="#FFCCBC" strokeWidth="1" strokeLinecap="round" />
      <Path d="M 30 54 L 44 55" stroke="#FFCCBC" strokeWidth="1" strokeLinecap="round" />
      <Path d="M 56 53 L 70 51" stroke="#FFCCBC" strokeWidth="1" strokeLinecap="round" />
      <Path d="M 56 55 L 70 54" stroke="#FFCCBC" strokeWidth="1" strokeLinecap="round" />
      {/* Mouth */}
      <Path d="M 46 57 Q 50 61 54 57" stroke="#FFAB91" strokeWidth="1.5"
        strokeLinecap="round" fill="none" />
      {/* Paws */}
      <Ellipse cx="35" cy="82" rx="7" ry="5" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1" />
      <Ellipse cx="65" cy="82" rx="7" ry="5" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1" />
    </Svg>
  );
}

function Adult({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="93" rx="26" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Tall elegant ears */}
      <Ellipse cx="36" cy="18" rx="10" ry="22" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="2" />
      <Ellipse cx="64" cy="18" rx="10" ry="22" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="2" />
      <Ellipse cx="36" cy="18" rx="5.5" ry="14" fill="#FFAB91" opacity="0.4" />
      <Ellipse cx="64" cy="18" rx="5.5" ry="14" fill="#FFAB91" opacity="0.4" />
      {/* Flower crown */}
      <Circle cx="36" cy="10" r="4" fill="#FF80AB" />
      <Circle cx="50" cy="7" r="4" fill="#FFD740" />
      <Circle cx="64" cy="10" r="4" fill="#69F0AE" />
      <Circle cx="36" cy="10" r="2" fill="#F8BBD0" />
      <Circle cx="50" cy="7" r="2" fill="#FFF9C4" />
      <Circle cx="64" cy="10" r="2" fill="#B9F6CA" />
      {/* Body */}
      <Ellipse cx="50" cy="73" rx="23" ry="20" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="2" />
      {/* Fluffy tail */}
      <Circle cx="70" cy="78" r="8" fill="white" stroke="#FFCCBC" strokeWidth="1" />
      <Circle cx="70" cy="78" r="6" fill="white" />
      {/* Head */}
      <Circle cx="50" cy="46" r="25" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="2" />
      {/* Blush */}
      <Ellipse cx="30" cy="52" rx="8" ry="5" fill="rgba(255,171,145,0.4)" />
      <Ellipse cx="70" cy="52" rx="8" ry="5" fill="rgba(255,171,145,0.4)" />
      {/* Eyes - majestic */}
      <Circle cx="40" cy="42" r="7" fill="white" />
      <Circle cx="60" cy="42" r="7" fill="white" />
      <Circle cx="41" cy="42" r="4" fill="#6A1B9A" />
      <Circle cx="61" cy="42" r="4" fill="#6A1B9A" />
      <Circle cx="42" cy="40" r="1.5" fill="white" />
      <Circle cx="62" cy="40" r="1.5" fill="white" />
      {/* Eyelashes */}
      <Path d="M 34 37 L 36 34" stroke="#CE93D8" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 38 35 L 39 31" stroke="#CE93D8" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 62 35 L 63 31" stroke="#CE93D8" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 66 37 L 68 34" stroke="#CE93D8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nose */}
      <Ellipse cx="50" cy="51" rx="3.5" ry="2.5" fill="#F48FB1" />
      {/* Whiskers */}
      <Path d="M 27 49 L 44 51" stroke="#FFCCBC" strokeWidth="1.2" strokeLinecap="round" />
      <Path d="M 27 53 L 44 53" stroke="#FFCCBC" strokeWidth="1.2" strokeLinecap="round" />
      <Path d="M 56 51 L 73 49" stroke="#FFCCBC" strokeWidth="1.2" strokeLinecap="round" />
      <Path d="M 56 53 L 73 53" stroke="#FFCCBC" strokeWidth="1.2" strokeLinecap="round" />
      {/* Mouth */}
      <Path d="M 44 56 Q 50 62 56 56" stroke="#F48FB1" strokeWidth="1.8"
        strokeLinecap="round" fill="none" />
      {/* Paws */}
      <Ellipse cx="34" cy="85" rx="8" ry="6" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5" />
      <Ellipse cx="66" cy="85" rx="8" ry="6" fill="#FFF5EE" stroke="#FFCCBC" strokeWidth="1.5" />
    </Svg>
  );
}

interface RabbitSVGProps { stage: AnimalStage; size: number }
export function RabbitSVG({ stage, size }: RabbitSVGProps) {
  switch (stage) {
    case 'egg': return <Egg size={size} />;
    case 'baby': return <Baby size={size} />;
    case 'junior': return <Junior size={size} />;
    case 'adult': return <Adult size={size} />;
  }
}
