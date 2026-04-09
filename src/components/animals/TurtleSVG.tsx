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
      <Ellipse cx="50" cy="52" rx="22" ry="28" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="2" />
      {/* Sheen */}
      <Ellipse cx="43" cy="40" rx="6" ry="9" fill="rgba(255,255,255,0.45)" />
      {/* Green tint blush */}
      <Ellipse cx="50" cy="60" rx="13" ry="8" fill="rgba(165,214,167,0.25)" />
      {/* Leaf decoration */}
      <Path d="M 44 50 Q 50 38 56 50 Q 50 46 44 50 Z" fill="#A5D6A7" opacity="0.5" />
      <Path d="M 50 38 L 50 52" stroke="#81C784" strokeWidth="1" strokeLinecap="round" />
      {/* Small dots */}
      <Circle cx="43" cy="58" r="2" fill="#A5D6A7" opacity="0.4" />
      <Circle cx="57" cy="58" r="2" fill="#A5D6A7" opacity="0.4" />
      <Circle cx="50" cy="63" r="2" fill="#A5D6A7" opacity="0.4" />
    </Svg>
  );
}

function Baby({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="91" rx="24" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Shell */}
      <Ellipse cx="50" cy="65" rx="26" ry="20" fill="#A5D6A7" stroke="#81C784" strokeWidth="2" />
      {/* Shell pattern lines */}
      <Path d="M 32 58 Q 50 52 68 58" stroke="#81C784" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
      <Path d="M 28 65 Q 50 59 72 65" stroke="#81C784" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
      <Path d="M 30 72 Q 50 66 70 72" stroke="#81C784" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
      <Path d="M 41 55 L 41 78" stroke="#81C784" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      <Path d="M 50 52 L 50 80" stroke="#81C784" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      <Path d="M 59 55 L 59 78" stroke="#81C784" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Head poking out from top */}
      <Circle cx="50" cy="47" r="14" fill="#C8E6C9" stroke="#81C784" strokeWidth="1.5" />
      {/* Blush */}
      <Ellipse cx="40" cy="51" rx="4.5" ry="3" fill="rgba(129,199,132,0.35)" />
      <Ellipse cx="60" cy="51" rx="4.5" ry="3" fill="rgba(129,199,132,0.35)" />
      {/* Eyes */}
      <Circle cx="45" cy="44" r="4" fill="white" />
      <Circle cx="55" cy="44" r="4" fill="white" />
      <Circle cx="45" cy="44" r="2.5" fill="#2E7D32" />
      <Circle cx="55" cy="44" r="2.5" fill="#2E7D32" />
      <Circle cx="46" cy="43" r="0.8" fill="white" />
      <Circle cx="56" cy="43" r="0.8" fill="white" />
      {/* Smile */}
      <Path d="M 44 51 Q 50 56 56 51" stroke="#66BB6A" strokeWidth="1.5"
        strokeLinecap="round" fill="none" />
      {/* Tiny legs poking out */}
      <Ellipse cx="30" cy="80" rx="7" ry="5" fill="#C8E6C9" stroke="#81C784" strokeWidth="1" />
      <Ellipse cx="70" cy="80" rx="7" ry="5" fill="#C8E6C9" stroke="#81C784" strokeWidth="1" />
    </Svg>
  );
}

function Junior({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="93" rx="28" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Shell */}
      <Ellipse cx="50" cy="66" rx="28" ry="22" fill="#A5D6A7" stroke="#81C784" strokeWidth="2" />
      {/* Hexagon-like shell pattern */}
      <Circle cx="50" cy="61" r="7" fill="none" stroke="#66BB6A" strokeWidth="1.2" opacity="0.7" />
      <Circle cx="37" cy="61" r="6" fill="none" stroke="#66BB6A" strokeWidth="1.2" opacity="0.5" />
      <Circle cx="63" cy="61" r="6" fill="none" stroke="#66BB6A" strokeWidth="1.2" opacity="0.5" />
      <Circle cx="44" cy="73" r="6" fill="none" stroke="#66BB6A" strokeWidth="1.2" opacity="0.5" />
      <Circle cx="56" cy="73" r="6" fill="none" stroke="#66BB6A" strokeWidth="1.2" opacity="0.5" />
      <Circle cx="50" cy="50" r="5" fill="none" stroke="#66BB6A" strokeWidth="1.2" opacity="0.4" />
      {/* Tail */}
      <Ellipse cx="74" cy="72" rx="6" ry="4" fill="#C8E6C9" stroke="#81C784" strokeWidth="1"
        transform="rotate(20 74 72)" />
      {/* Head */}
      <Circle cx="50" cy="44" r="17" fill="#C8E6C9" stroke="#81C784" strokeWidth="1.8" />
      {/* Neck connection */}
      <Ellipse cx="50" cy="55" rx="10" ry="6" fill="#C8E6C9" />
      {/* Blush */}
      <Ellipse cx="37" cy="49" rx="5.5" ry="3.5" fill="rgba(129,199,132,0.35)" />
      <Ellipse cx="63" cy="49" rx="5.5" ry="3.5" fill="rgba(129,199,132,0.35)" />
      {/* Eyes - curious */}
      <Circle cx="43" cy="41" r="5.5" fill="white" />
      <Circle cx="57" cy="41" r="5.5" fill="white" />
      <Circle cx="44" cy="41" r="3.2" fill="#1B5E20" />
      <Circle cx="58" cy="41" r="3.2" fill="#1B5E20" />
      <Circle cx="45" cy="40" r="1" fill="white" />
      <Circle cx="59" cy="40" r="1" fill="white" />
      {/* Eyebrow raise - curious */}
      <Path d="M 39 36 Q 44 33 49 36" stroke="#66BB6A" strokeWidth="1.5"
        strokeLinecap="round" fill="none" />
      <Path d="M 51 36 Q 56 33 61 36" stroke="#66BB6A" strokeWidth="1.2"
        strokeLinecap="round" fill="none" />
      {/* Nostril dots */}
      <Circle cx="47" cy="48" r="1.2" fill="#66BB6A" opacity="0.6" />
      <Circle cx="53" cy="48" r="1.2" fill="#66BB6A" opacity="0.6" />
      {/* Smile */}
      <Path d="M 42 52 Q 50 58 58 52" stroke="#66BB6A" strokeWidth="1.8"
        strokeLinecap="round" fill="none" />
      {/* Legs */}
      <Ellipse cx="28" cy="80" rx="8" ry="5.5" fill="#C8E6C9" stroke="#81C784" strokeWidth="1.2" />
      <Ellipse cx="72" cy="80" rx="8" ry="5.5" fill="#C8E6C9" stroke="#81C784" strokeWidth="1.2" />
    </Svg>
  );
}

function Adult({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Shadow */}
      <Ellipse cx="50" cy="93" rx="30" ry="5" fill="rgba(0,0,0,0.08)" />
      {/* Shell - elaborate */}
      <Ellipse cx="50" cy="67" rx="30" ry="24" fill="#A5D6A7" stroke="#81C784" strokeWidth="2.5" />
      {/* Shell highlight rim */}
      <Ellipse cx="50" cy="64" rx="28" ry="20" fill="none" stroke="#C8E6C9" strokeWidth="1" opacity="0.7" />
      {/* Hexagon pattern */}
      <Circle cx="50" cy="62" r="8" fill="#81C784" opacity="0.3" />
      <Circle cx="50" cy="62" r="8" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6" />
      <Circle cx="35" cy="60" r="7" fill="#81C784" opacity="0.2" />
      <Circle cx="35" cy="60" r="7" fill="none" stroke="#4CAF50" strokeWidth="1.2" opacity="0.5" />
      <Circle cx="65" cy="60" r="7" fill="#81C784" opacity="0.2" />
      <Circle cx="65" cy="60" r="7" fill="none" stroke="#4CAF50" strokeWidth="1.2" opacity="0.5" />
      <Circle cx="42" cy="74" r="7" fill="#81C784" opacity="0.2" />
      <Circle cx="42" cy="74" r="7" fill="none" stroke="#4CAF50" strokeWidth="1.2" opacity="0.5" />
      <Circle cx="58" cy="74" r="7" fill="#81C784" opacity="0.2" />
      <Circle cx="58" cy="74" r="7" fill="none" stroke="#4CAF50" strokeWidth="1.2" opacity="0.5" />
      {/* Decorative dots on shell */}
      <Circle cx="50" cy="52" r="2" fill="#4CAF50" opacity="0.5" />
      <Circle cx="29" cy="67" r="2" fill="#4CAF50" opacity="0.4" />
      <Circle cx="71" cy="67" r="2" fill="#4CAF50" opacity="0.4" />
      <Circle cx="37" cy="83" r="2" fill="#4CAF50" opacity="0.4" />
      <Circle cx="63" cy="83" r="2" fill="#4CAF50" opacity="0.4" />
      {/* Tail */}
      <Ellipse cx="76" cy="74" rx="7" ry="5" fill="#C8E6C9" stroke="#81C784" strokeWidth="1.5"
        transform="rotate(15 76 74)" />
      {/* Head */}
      <Circle cx="50" cy="42" r="19" fill="#C8E6C9" stroke="#81C784" strokeWidth="2" />
      {/* Neck */}
      <Ellipse cx="50" cy="55" rx="11" ry="7" fill="#C8E6C9" />
      {/* Sage leaf hat */}
      <Path d="M 38 28 Q 50 16 62 28 Q 50 24 38 28 Z" fill="#66BB6A" opacity="0.8" />
      <Path d="M 42 24 Q 50 14 58 24 Q 50 20 42 24 Z" fill="#A5D6A7" />
      <Path d="M 50 16 L 50 28" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round" />
      <Path d="M 44 22 Q 50 18 56 22" stroke="#388E3C" strokeWidth="0.8"
        strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Blush */}
      <Ellipse cx="35" cy="47" rx="6" ry="4" fill="rgba(129,199,132,0.4)" />
      <Ellipse cx="65" cy="47" rx="6" ry="4" fill="rgba(129,199,132,0.4)" />
      {/* Wise eyes */}
      <Circle cx="42" cy="39" r="6.5" fill="white" />
      <Circle cx="58" cy="39" r="6.5" fill="white" />
      <Circle cx="43" cy="39" r="4" fill="#1B5E20" />
      <Circle cx="59" cy="39" r="4" fill="#1B5E20" />
      <Circle cx="44" cy="37" r="1.5" fill="white" />
      <Circle cx="60" cy="37" r="1.5" fill="white" />
      {/* Wise brow */}
      <Path d="M 37 33 Q 43 30 49 33" stroke="#388E3C" strokeWidth="2"
        strokeLinecap="round" fill="none" />
      <Path d="M 51 33 Q 57 30 63 33" stroke="#388E3C" strokeWidth="2"
        strokeLinecap="round" fill="none" />
      {/* Nostril */}
      <Circle cx="47" cy="46" r="1.5" fill="#66BB6A" opacity="0.5" />
      <Circle cx="53" cy="46" r="1.5" fill="#66BB6A" opacity="0.5" />
      {/* Wise smile */}
      <Path d="M 41 51 Q 50 57 59 51" stroke="#4CAF50" strokeWidth="2"
        strokeLinecap="round" fill="none" />
      {/* Legs */}
      <Ellipse cx="27" cy="82" rx="9" ry="6" fill="#C8E6C9" stroke="#81C784" strokeWidth="1.5" />
      <Ellipse cx="73" cy="82" rx="9" ry="6" fill="#C8E6C9" stroke="#81C784" strokeWidth="1.5" />
    </Svg>
  );
}

interface TurtleSVGProps { stage: AnimalStage; size: number }
export function TurtleSVG({ stage, size }: TurtleSVGProps) {
  switch (stage) {
    case 'egg': return <Egg size={size} />;
    case 'baby': return <Baby size={size} />;
    case 'junior': return <Junior size={size} />;
    case 'adult': return <Adult size={size} />;
  }
}
