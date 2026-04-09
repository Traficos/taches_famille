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
      <Ellipse cx="50" cy="52" rx="22" ry="28" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="2" />
      {/* Sheen */}
      <Ellipse cx="43" cy="40" rx="6" ry="9" fill="rgba(255,255,255,0.45)" />
      {/* Paw print decoration */}
      <Circle cx="50" cy="58" r="5" fill="#90CAF9" opacity="0.5" />
      <Circle cx="43" cy="51" r="3" fill="#90CAF9" opacity="0.4" />
      <Circle cx="57" cy="51" r="3" fill="#90CAF9" opacity="0.4" />
      <Circle cx="46" cy="46" r="2.5" fill="#90CAF9" opacity="0.35" />
      <Circle cx="54" cy="46" r="2.5" fill="#90CAF9" opacity="0.35" />
    </Svg>
  );
}

function Baby({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="90" rx="22" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Floppy ears - behind body */}
      <Ellipse cx="32" cy="50" rx="10" ry="15" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="1.5"
        transform="rotate(-15 32 50)" />
      <Ellipse cx="68" cy="50" rx="10" ry="15" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="1.5"
        transform="rotate(15 68 50)" />
      {/* Inner ear */}
      <Ellipse cx="32" cy="50" rx="5" ry="9" fill="#E3F2FD" opacity="0.6"
        transform="rotate(-15 32 50)" />
      <Ellipse cx="68" cy="50" rx="5" ry="9" fill="#E3F2FD" opacity="0.6"
        transform="rotate(15 68 50)" />
      {/* Body */}
      <Ellipse cx="50" cy="68" rx="20" ry="16" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.5" />
      {/* Head */}
      <Circle cx="50" cy="48" r="22" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.5" />
      {/* Blush */}
      <Ellipse cx="36" cy="54" rx="6" ry="4" fill="rgba(100,181,246,0.3)" />
      <Ellipse cx="64" cy="54" rx="6" ry="4" fill="rgba(100,181,246,0.3)" />
      {/* Eyes */}
      <Circle cx="43" cy="46" r="5" fill="white" />
      <Circle cx="57" cy="46" r="5" fill="white" />
      <Circle cx="44" cy="46" r="3" fill="#333" />
      <Circle cx="58" cy="46" r="3" fill="#333" />
      <Circle cx="45" cy="45" r="1" fill="white" />
      <Circle cx="59" cy="45" r="1" fill="white" />
      {/* Nose */}
      <Ellipse cx="50" cy="55" rx="3" ry="2" fill="#5C6BC0" />
      {/* Tiny tongue */}
      <Ellipse cx="50" cy="60" rx="3" ry="2.5" fill="#F48FB1" />
    </Svg>
  );
}

function Junior({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="92" rx="24" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Tail wagging */}
      <Path d="M 68 75 Q 82 60 78 50 Q 75 42 82 38" stroke="#90CAF9" strokeWidth="4"
        strokeLinecap="round" fill="none" />
      {/* Floppy ears */}
      <Ellipse cx="30" cy="44" rx="11" ry="17" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="1.5"
        transform="rotate(-10 30 44)" />
      <Ellipse cx="70" cy="44" rx="11" ry="17" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="1.5"
        transform="rotate(10 70 44)" />
      <Ellipse cx="30" cy="44" rx="6" ry="10" fill="#E3F2FD" opacity="0.6"
        transform="rotate(-10 30 44)" />
      <Ellipse cx="70" cy="44" rx="6" ry="10" fill="#E3F2FD" opacity="0.6"
        transform="rotate(10 70 44)" />
      {/* Body */}
      <Ellipse cx="50" cy="72" rx="22" ry="18" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.5" />
      {/* Head */}
      <Circle cx="50" cy="46" r="24" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.5" />
      {/* Blush */}
      <Ellipse cx="34" cy="52" rx="7" ry="4.5" fill="rgba(100,181,246,0.3)" />
      <Ellipse cx="66" cy="52" rx="7" ry="4.5" fill="rgba(100,181,246,0.3)" />
      {/* Eyes */}
      <Circle cx="42" cy="43" r="6" fill="white" />
      <Circle cx="58" cy="43" r="6" fill="white" />
      <Circle cx="43" cy="43" r="3.5" fill="#333" />
      <Circle cx="59" cy="43" r="3.5" fill="#333" />
      <Circle cx="44" cy="42" r="1.2" fill="white" />
      <Circle cx="60" cy="42" r="1.2" fill="white" />
      {/* Nose */}
      <Ellipse cx="50" cy="52" rx="3.5" ry="2.5" fill="#5C6BC0" />
      {/* Tongue */}
      <Path d="M 46 58 Q 50 65 54 58" stroke="#F48FB1" strokeWidth="2.5"
        strokeLinecap="round" fill="#F48FB1" opacity="0.8" />
      {/* Paws */}
      <Ellipse cx="36" cy="82" rx="7" ry="5" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="1" />
      <Ellipse cx="64" cy="82" rx="7" ry="5" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="1" />
    </Svg>
  );
}

function Adult({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="93" rx="26" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Floppy ears */}
      <Ellipse cx="28" cy="40" rx="12" ry="20" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="2"
        transform="rotate(-8 28 40)" />
      <Ellipse cx="72" cy="40" rx="12" ry="20" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="2"
        transform="rotate(8 72 40)" />
      <Ellipse cx="28" cy="40" rx="7" ry="12" fill="#E3F2FD" opacity="0.7"
        transform="rotate(-8 28 40)" />
      <Ellipse cx="72" cy="40" rx="7" ry="12" fill="#E3F2FD" opacity="0.7"
        transform="rotate(8 72 40)" />
      {/* Body */}
      <Ellipse cx="50" cy="73" rx="24" ry="20" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="2" />
      {/* Collar */}
      <Path d="M 28 68 Q 50 76 72 68" stroke="#FFB74D" strokeWidth="5"
        strokeLinecap="round" fill="none" />
      {/* Gold medallion */}
      <Circle cx="50" cy="72" r="4" fill="#FFD54F" stroke="#FF8F00" strokeWidth="1" />
      <Circle cx="50" cy="72" r="2" fill="#FF8F00" />
      {/* Head */}
      <Circle cx="50" cy="44" r="26" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="2" />
      {/* Blush */}
      <Ellipse cx="32" cy="51" rx="8" ry="5" fill="rgba(100,181,246,0.3)" />
      <Ellipse cx="68" cy="51" rx="8" ry="5" fill="rgba(100,181,246,0.3)" />
      {/* Eyes - confident */}
      <Circle cx="40" cy="40" r="7" fill="white" />
      <Circle cx="60" cy="40" r="7" fill="white" />
      <Circle cx="41" cy="40" r="4" fill="#1A237E" />
      <Circle cx="61" cy="40" r="4" fill="#1A237E" />
      <Circle cx="42" cy="38" r="1.5" fill="white" />
      <Circle cx="62" cy="38" r="1.5" fill="white" />
      {/* Eyebrows - confident */}
      <Path d="M 34 33 Q 40 30 46 33" stroke="#5C6BC0" strokeWidth="2"
        strokeLinecap="round" fill="none" />
      <Path d="M 54 33 Q 60 30 66 33" stroke="#5C6BC0" strokeWidth="2"
        strokeLinecap="round" fill="none" />
      {/* Nose */}
      <Ellipse cx="50" cy="50" rx="4" ry="3" fill="#3949AB" />
      {/* Mouth */}
      <Path d="M 44 56 Q 50 61 56 56" stroke="#5C6BC0" strokeWidth="2"
        strokeLinecap="round" fill="none" />
      {/* Paws */}
      <Ellipse cx="34" cy="85" rx="8" ry="6" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="1.5" />
      <Ellipse cx="66" cy="85" rx="8" ry="6" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="1.5" />
    </Svg>
  );
}

interface DogSVGProps { stage: AnimalStage; size: number }
export function DogSVG({ stage, size }: DogSVGProps) {
  switch (stage) {
    case 'egg': return <Egg size={size} />;
    case 'baby': return <Baby size={size} />;
    case 'junior': return <Junior size={size} />;
    case 'adult': return <Adult size={size} />;
  }
}
