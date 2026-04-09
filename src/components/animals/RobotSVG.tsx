import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect, Line, G, Text } from 'react-native-svg';
import { AnimalStage } from '../../constants/animals';

interface Props { size: number }

function Egg({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Box/crate with rounded corners */}
      <Rect x="20" y="20" width="60" height="65" rx="6" ry="6" fill="#E0F2F1" stroke="#B2DFDB" strokeWidth="2.5" />
      {/* Cross lines */}
      <Line x1="50" y1="20" x2="50" y2="85" stroke="#B2DFDB" strokeWidth="1.5" />
      <Line x1="20" y1="52" x2="80" y2="52" stroke="#B2DFDB" strokeWidth="1.5" />
      {/* Corner bolts */}
      <Circle cx="26" cy="26" r="3.5" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1" />
      <Circle cx="74" cy="26" r="3.5" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1" />
      <Circle cx="26" cy="79" r="3.5" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1" />
      <Circle cx="74" cy="79" r="3.5" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1" />
      {/* Question mark in center */}
      <Text x="50" y="57" fontSize="22" textAnchor="middle" fill="#00ACC1" fontWeight="bold">?</Text>
    </Svg>
  );
}

function Baby({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Rect body */}
      <Rect x="30" y="58" width="40" height="30" rx="3" ry="3" fill="#E0F2F1" stroke="#B2DFDB" strokeWidth="2" />
      {/* Rect head */}
      <Rect x="26" y="26" width="48" height="36" rx="4" ry="4" fill="#E0F2F1" stroke="#B2DFDB" strokeWidth="2" />
      {/* Antenna */}
      <Line x1="50" y1="26" x2="50" y2="15" stroke="#80CBC4" strokeWidth="2.5" strokeLinecap="round" />
      {/* LED ball on antenna */}
      <Circle cx="50" cy="12" r="4" fill="#00ACC1" />
      <Circle cx="51" cy="11" r="1.5" fill="white" opacity={0.7} />
      {/* Circular LED eyes */}
      <Circle cx="39" cy="40" r="7" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      <Circle cx="61" cy="40" r="7" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      <Circle cx="39" cy="40" r="5" fill="#00ACC1" />
      <Circle cx="61" cy="40" r="5" fill="#00ACC1" />
      <Circle cx="40" cy="38.5" r="2" fill="white" opacity={0.8} />
      <Circle cx="62" cy="38.5" r="2" fill="white" opacity={0.8} />
      {/* Pixel smile - small Rects */}
      <Rect x="38" y="53" width="4" height="3" rx="1" fill="#00ACC1" />
      <Rect x="44" y="56" width="4" height="3" rx="1" fill="#00ACC1" />
      <Rect x="50" y="57" width="4" height="3" rx="1" fill="#00ACC1" />
      <Rect x="56" y="56" width="4" height="3" rx="1" fill="#00ACC1" />
      <Rect x="60" y="53" width="4" height="3" rx="1" fill="#00ACC1" />
      {/* Chest light circle */}
      <Circle cx="50" cy="72" r="6" fill="#80CBC4" stroke="#00ACC1" strokeWidth="1.5" />
      <Circle cx="50" cy="72" r="3.5" fill="#00ACC1" />
      <Circle cx="51" cy="71" r="1.2" fill="white" opacity={0.7} />
      {/* Rect arms */}
      <Rect x="14" y="60" width="16" height="8" rx="2" ry="2" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      <Rect x="70" y="60" width="16" height="8" rx="2" ry="2" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      {/* Rect feet */}
      <Rect x="33" y="86" width="14" height="8" rx="2" ry="2" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      <Rect x="53" y="86" width="14" height="8" rx="2" ry="2" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
    </Svg>
  );
}

function Junior({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Rect body sleeker */}
      <Rect x="28" y="57" width="44" height="28" rx="4" ry="4" fill="#E0F2F1" stroke="#B2DFDB" strokeWidth="2" />
      {/* Chest panel */}
      <Rect x="35" y="63" width="30" height="16" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1" />
      {/* 3 LED dots on chest */}
      <Circle cx="42" cy="71" r="3" fill="#00ACC1" />
      <Circle cx="50" cy="71" r="3" fill="#00ACC1" />
      <Circle cx="58" cy="71" r="3" fill="#00ACC1" />
      <Circle cx="42.8" cy="70.2" r="1.2" fill="white" opacity={0.7} />
      <Circle cx="50.8" cy="70.2" r="1.2" fill="white" opacity={0.7} />
      <Circle cx="58.8" cy="70.2" r="1.2" fill="white" opacity={0.7} />
      {/* Sleeker Rect head */}
      <Rect x="24" y="22" width="52" height="38" rx="5" ry="5" fill="#E0F2F1" stroke="#B2DFDB" strokeWidth="2" />
      {/* Double antennae */}
      <Line x1="42" y1="22" x2="38" y2="10" stroke="#80CBC4" strokeWidth="2" strokeLinecap="round" />
      <Circle cx="37" cy="8" r="3.5" fill="#00ACC1" />
      <Line x1="58" y1="22" x2="62" y2="10" stroke="#80CBC4" strokeWidth="2" strokeLinecap="round" />
      <Circle cx="63" cy="8" r="3.5" fill="#00ACC1" />
      {/* Visor - rounded Rect */}
      <Rect x="30" y="28" width="40" height="20" rx="6" ry="6" fill="#80CBC4" stroke="#00ACC1" strokeWidth="1.5" opacity={0.8} />
      {/* LED eyes in visor */}
      <Circle cx="40" cy="38" r="7" fill="#004D40" />
      <Circle cx="60" cy="38" r="7" fill="#004D40" />
      <Circle cx="40" cy="38" r="5" fill="#00ACC1" />
      <Circle cx="60" cy="38" r="5" fill="#00ACC1" />
      <Circle cx="41.5" cy="36.5" r="2" fill="white" opacity={0.8} />
      <Circle cx="61.5" cy="36.5" r="2" fill="white" opacity={0.8} />
      {/* Speaker grille below visor */}
      <Rect x="36" y="50" width="28" height="6" rx="2" ry="2" fill="#B2DFDB" />
      <Line x1="40" y1="52" x2="40" y2="54" stroke="#80CBC4" strokeWidth="1" />
      <Line x1="44" y1="52" x2="44" y2="54" stroke="#80CBC4" strokeWidth="1" />
      <Line x1="48" y1="52" x2="48" y2="54" stroke="#80CBC4" strokeWidth="1" />
      <Line x1="52" y1="52" x2="52" y2="54" stroke="#80CBC4" strokeWidth="1" />
      <Line x1="56" y1="52" x2="56" y2="54" stroke="#80CBC4" strokeWidth="1" />
      <Line x1="60" y1="52" x2="60" y2="54" stroke="#80CBC4" strokeWidth="1" />
      {/* Jointed arms - Rect + circle joint */}
      <Rect x="10" y="60" width="18" height="10" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      <Circle cx="28" cy="65" r="4" fill="#80CBC4" stroke="#00ACC1" strokeWidth="1" />
      <Rect x="72" y="60" width="18" height="10" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      <Circle cx="72" cy="65" r="4" fill="#80CBC4" stroke="#00ACC1" strokeWidth="1" />
      {/* Bigger feet */}
      <Rect x="31" y="83" width="16" height="9" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      <Rect x="53" y="83" width="16" height="9" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
    </Svg>
  );
}

function Adult({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Armored body - trapezoid Path */}
      <Path d="M30 58 L70 58 L74 85 L26 85Z" fill="#E0F2F1" stroke="#B2DFDB" strokeWidth="2.5" />
      {/* Chest reactor concentric circles with glow */}
      <Circle cx="50" cy="71" r="12" fill="#80CBC4" opacity={0.4} />
      <Circle cx="50" cy="71" r="9" fill="#B2DFDB" stroke="#00ACC1" strokeWidth="1.5" />
      <Circle cx="50" cy="71" r="6" fill="#00ACC1" />
      <Circle cx="50" cy="71" r="3.5" fill="#E0F7FA" />
      <Circle cx="50" cy="71" r="1.5" fill="white" />
      {/* Energy lines from reactor */}
      <Line x1="38" y1="65" x2="33" y2="61" stroke="#00ACC1" strokeWidth="1.5" strokeLinecap="round" opacity={0.7} />
      <Line x1="62" y1="65" x2="67" y2="61" stroke="#00ACC1" strokeWidth="1.5" strokeLinecap="round" opacity={0.7} />
      <Line x1="38" y1="77" x2="33" y2="81" stroke="#00ACC1" strokeWidth="1.5" strokeLinecap="round" opacity={0.7} />
      <Line x1="62" y1="77" x2="67" y2="81" stroke="#00ACC1" strokeWidth="1.5" strokeLinecap="round" opacity={0.7} />
      {/* Shoulder pads - Path */}
      <Path d="M26 58 L14 54 L12 68 L28 66Z" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      <Path d="M74 58 L86 54 L88 68 L72 66Z" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      {/* Angular mecha head - pentagon Path */}
      <Path d="M50 12 L76 22 L74 52 L26 52 L24 22Z" fill="#E0F2F1" stroke="#B2DFDB" strokeWidth="2.5" />
      {/* Crest */}
      <Rect x="44" y="5" width="12" height="10" rx="2" ry="2" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      <Rect x="47" y="2" width="6" height="6" rx="1" ry="1" fill="#00ACC1" />
      {/* Visor */}
      <Rect x="28" y="24" width="44" height="18" rx="5" ry="5" fill="#004D40" stroke="#00ACC1" strokeWidth="2" />
      {/* Eyes in visor */}
      <Circle cx="39" cy="33" r="7" fill="#00ACC1" />
      <Circle cx="61" cy="33" r="7" fill="#00ACC1" />
      <Circle cx="39" cy="33" r="4.5" fill="#E0F7FA" />
      <Circle cx="61" cy="33" r="4.5" fill="#E0F7FA" />
      <Circle cx="39" cy="33" r="2.5" fill="#00BCD4" />
      <Circle cx="61" cy="33" r="2.5" fill="#00BCD4" />
      <Circle cx="40" cy="31.5" r="1.5" fill="white" opacity={0.9} />
      <Circle cx="62" cy="31.5" r="1.5" fill="white" opacity={0.9} />
      {/* Rect jaw */}
      <Rect x="32" y="44" width="36" height="10" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="1.5" />
      {/* Speaker grille on jaw */}
      <Line x1="36" y1="47" x2="36" y2="51" stroke="#80CBC4" strokeWidth="1.5" />
      <Line x1="40" y1="47" x2="40" y2="51" stroke="#80CBC4" strokeWidth="1.5" />
      <Line x1="44" y1="47" x2="44" y2="51" stroke="#80CBC4" strokeWidth="1.5" />
      <Line x1="48" y1="47" x2="48" y2="51" stroke="#80CBC4" strokeWidth="1.5" />
      <Line x1="52" y1="47" x2="52" y2="51" stroke="#80CBC4" strokeWidth="1.5" />
      <Line x1="56" y1="47" x2="56" y2="51" stroke="#80CBC4" strokeWidth="1.5" />
      <Line x1="60" y1="47" x2="60" y2="51" stroke="#80CBC4" strokeWidth="1.5" />
      <Line x1="64" y1="47" x2="64" y2="51" stroke="#80CBC4" strokeWidth="1.5" />
      {/* Articulated arms with hands */}
      <Rect x="6" y="56" width="18" height="12" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="2" />
      <Rect x="6" y="68" width="14" height="10" rx="2" ry="2" fill="#E0F2F1" stroke="#80CBC4" strokeWidth="1.5" />
      {/* hand fingers */}
      <Rect x="5" y="77" width="4" height="7" rx="1" ry="1" fill="#80CBC4" />
      <Rect x="10" y="77" width="4" height="8" rx="1" ry="1" fill="#80CBC4" />
      <Rect x="15" y="77" width="4" height="7" rx="1" ry="1" fill="#80CBC4" />
      <Rect x="76" y="56" width="18" height="12" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="2" />
      <Rect x="80" y="68" width="14" height="10" rx="2" ry="2" fill="#E0F2F1" stroke="#80CBC4" strokeWidth="1.5" />
      <Rect x="81" y="77" width="4" height="7" rx="1" ry="1" fill="#80CBC4" />
      <Rect x="86" y="77" width="4" height="8" rx="1" ry="1" fill="#80CBC4" />
      <Rect x="91" y="77" width="4" height="7" rx="1" ry="1" fill="#80CBC4" />
      {/* Feet */}
      <Rect x="28" y="83" width="18" height="10" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="2" />
      <Rect x="54" y="83" width="18" height="10" rx="3" ry="3" fill="#B2DFDB" stroke="#80CBC4" strokeWidth="2" />
    </Svg>
  );
}

export function RobotSVG({ stage, size }: { stage: AnimalStage; size: number }) {
  switch (stage) {
    case 'egg': return <Egg size={size} />;
    case 'baby': return <Baby size={size} />;
    case 'junior': return <Junior size={size} />;
    case 'adult': return <Adult size={size} />;
  }
}
