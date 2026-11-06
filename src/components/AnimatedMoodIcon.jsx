import React from 'react';

export default function AnimatedMoodIcon({ moodId }) {
  return (
    <div className="mood-anim-wrapper w-full h-full flex items-center justify-center relative pointer-events-none select-none">
      <style>{`
        /* ==================== 1. BUỒN BÃ (SAD - KHÓC NỨC NỞ) ==================== */
        @keyframes sadFaceSob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(2.5px) rotate(-2deg); }
          50% { transform: translateY(1px) rotate(1.5deg); }
          75% { transform: translateY(3px) rotate(-1.5deg); }
        }
        @keyframes sadMouthCry {
          0%, 100% { transform: scaleY(1) translateY(0px); }
          50% { transform: scaleY(1.35) translateY(-1px); }
        }
        @keyframes sadTearFallL1 {
          0% { transform: translate(30px, 49px) scale(0.35); opacity: 0; }
          15% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(28px, 79px) scale(0.62); opacity: 0; }
        }
        @keyframes sadTearFallR1 {
          0% { transform: translate(62px, 49px) scale(0.35); opacity: 0; }
          15% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(64px, 79px) scale(0.62); opacity: 0; }
        }
        @keyframes sadTearStreamPulse {
          0%, 100% { opacity: 0.55; stroke-width: 2.8; }
          50% { opacity: 0.9; stroke-width: 3.8; }
        }
        .mood-item:hover .mood-sad-face {
          animation: sadFaceSob 0.9s ease-in-out infinite;
          transform-origin: 50px 50px;
        }
        .mood-item:hover .mood-sad-mouth {
          animation: sadMouthCry 0.45s ease-in-out infinite;
          transform-origin: 50px 59px;
        }
        .mood-item:hover .mood-sad-stream {
          animation: sadTearStreamPulse 0.6s ease-in-out infinite;
        }
        .mood-item:hover .mood-sad-tear-l1 {
          animation: sadTearFallL1 0.75s linear infinite;
        }
        .mood-item:hover .mood-sad-tear-r1 {
          animation: sadTearFallR1 0.75s linear infinite 0.12s;
        }
        .mood-item:hover .mood-sad-tear-l2 {
          animation: sadTearFallL1 0.75s linear infinite 0.38s;
        }
        .mood-item:hover .mood-sad-tear-r2 {
          animation: sadTearFallR1 0.75s linear infinite 0.5s;
        }

        /* ==================== 2. VUI VẺ (JOY - CƯỜI TÍT & BẮN TIM) ==================== */
        @keyframes joyFaceBounce {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          30% { transform: translateY(-4px) scale(1.06, 0.96) rotate(-4deg); }
          60% { transform: translateY(-2px) scale(0.97, 1.05) rotate(4deg); }
        }
        @keyframes joyMouthLaugh {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.22, 1.32); }
        }
        @keyframes joyHeartFloat1 {
          0% { transform: translate(12px, 16px) rotate(-18deg) scale(0.45); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(6px, -12px) rotate(-28deg) scale(0.75); opacity: 0; }
        }
        @keyframes joyHeartFloat2 {
          0% { transform: translate(68px, 18px) rotate(15deg) scale(0.4); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(76px, -10px) rotate(28deg) scale(0.7); opacity: 0; }
        }
        .mood-item:hover .mood-joy-face {
          animation: joyFaceBounce 0.65s ease-in-out infinite;
          transform-origin: 50px 54px;
        }
        .mood-item:hover .mood-joy-mouth {
          animation: joyMouthLaugh 0.32s ease-in-out infinite;
          transform-origin: 50px 60px;
        }
        .mood-item:hover .mood-joy-heart1 {
          animation: joyHeartFloat1 0.9s ease-out infinite;
        }
        .mood-item:hover .mood-joy-heart2 {
          animation: joyHeartFloat2 0.9s ease-out infinite 0.4s;
        }

        /* ==================== 3. BÌNH YÊN (PEACE - MẦM CÂY ĐUNG ĐƯA) ==================== */
        @keyframes peaceFaceSway {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          33% { transform: rotate(-6deg) translateY(-1.5px); }
          66% { transform: rotate(6deg) translateY(-1.5px); }
        }
        @keyframes peaceSproutWave {
          0%, 100% { transform: translate(50px, 16px) rotate(0deg) scale(0.85); }
          33% { transform: translate(50px, 14px) rotate(-14deg) scale(1.02); }
          66% { transform: translate(50px, 14px) rotate(14deg) scale(1.02); }
        }
        @keyframes peaceSparkleTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.25); }
        }
        .mood-item:hover .mood-peace-face {
          animation: peaceFaceSway 1.4s ease-in-out infinite;
          transform-origin: 50px 54px;
        }
        .mood-item:hover .mood-peace-sprout {
          animation: peaceSproutWave 0.9s ease-in-out infinite;
        }
        .mood-item:hover .mood-peace-sparkle {
          animation: peaceSparkleTwinkle 0.8s ease-in-out infinite;
          transform-origin: 50px 50px;
        }

        /* ==================== 4. BÌNH THƯỜNG (NORMAL - CHỚP MẮT & LIẾC NHÌN) ==================== */
        @keyframes normalFaceTilt {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes normalEyesLookBlink {
          0%, 100% { transform: translateX(0px) scaleY(1); }
          20% { transform: translateX(-3px) scaleY(1); }
          40% { transform: translateX(-3px) scaleY(0.12); }
          48% { transform: translateX(0px) scaleY(1); }
          75% { transform: translateX(3px) scaleY(1); }
          88% { transform: translateX(3px) scaleY(0.12); }
        }
        .mood-item:hover .mood-normal-face {
          animation: normalFaceTilt 1.2s ease-in-out infinite;
          transform-origin: 50px 50px;
        }
        .mood-item:hover .mood-normal-eyes {
          animation: normalEyesLookBlink 1.5s ease-in-out infinite;
          transform-origin: 50px 46px;
        }

        /* ==================== 5. LO LẮNG (WORRY - RUN LẬP CẬP & ĐỔ MỒ HÔI) ==================== */
        @keyframes worryFaceShiver {
          0%, 100% { transform: translate(0px, 0px); }
          20% { transform: translate(-2px, 0.5px); }
          40% { transform: translate(2px, -0.5px); }
          60% { transform: translate(-2px, -0.5px); }
          80% { transform: translate(2px, 0.5px); }
        }
        @keyframes worrySweatFall {
          0% { transform: translate(71px, 18px) rotate(15deg) scale(0.45); opacity: 0; }
          20% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(73px, 46px) rotate(15deg) scale(0.7); opacity: 0; }
        }
        .mood-item:hover .mood-worry-face {
          animation: worryFaceShiver 0.25s linear infinite;
          transform-origin: 50px 52px;
        }
        .mood-item:hover .mood-worry-sweat {
          animation: worrySweatFall 0.85s ease-in infinite;
        }

        /* ==================== 6. MỆT MỎI (TIRED - NGÁP NGỦ & BAY CHỮ ZZZ) ==================== */
        @keyframes tiredFaceNod {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(3.5px) rotate(-5deg); }
        }
        @keyframes tiredMouthYawnAnim {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          30%, 70% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes tiredMouthStaticHide {
          0%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        @keyframes tiredZzzFloat1 {
          0% { transform: translate(64px, 18px) scale(0.6); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(76px, -6px) scale(1.15); opacity: 0; }
        }
        @keyframes tiredZzzFloat2 {
          0% { transform: translate(62px, 22px) scale(0.5); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(72px, 0px) scale(1); opacity: 0; }
        }
        .mood-item:hover .mood-tired-face {
          animation: tiredFaceNod 1.3s ease-in-out infinite;
          transform-origin: 50px 52px;
        }
        .mood-item:hover .mood-tired-mouth-yawn {
          animation: tiredMouthYawnAnim 1.3s ease-in-out infinite;
          transform-origin: 50px 60px;
        }
        .mood-item:hover .mood-tired-mouth-static {
          animation: tiredMouthStaticHide 1.3s ease-in-out infinite;
        }
        .mood-item:hover .mood-tired-z1 {
          animation: tiredZzzFloat1 1.1s ease-out infinite;
        }
        .mood-item:hover .mood-tired-z2 {
          animation: tiredZzzFloat2 1.1s ease-out infinite 0.5s;
        }

        /* ==================== 7. KHÓ CHỊU (ANGRY - ĐỎ MẶT RUNG LẮC & BỐC KHÓI) ==================== */
        @keyframes angryFaceShake {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          20% { transform: translate(-3px, -1px) rotate(-3deg); }
          40% { transform: translate(3px, 1px) rotate(3deg); }
          60% { transform: translate(-3px, 1px) rotate(-2deg); }
          80% { transform: translate(3px, -1px) rotate(2deg); }
        }
        @keyframes angryVeinPulse {
          0%, 100% { transform: translate(68px, 14px) scale(0.7); }
          50% { transform: translate(65px, 11px) scale(1.15); }
        }
        @keyframes angrySteamPuff {
          0% { opacity: 0; transform: translateY(4px) scale(0.6); }
          40% { opacity: 0.95; }
          100% { opacity: 0; transform: translateY(-10px) scale(1.25); }
        }
        .mood-item:hover .mood-angry-face {
          animation: angryFaceShake 0.22s linear infinite;
          transform-origin: 50px 52px;
        }
        .mood-item:hover .mood-angry-body {
          fill: #FDA4AF;
        }
        .mood-item:hover .mood-angry-vein {
          animation: angryVeinPulse 0.35s ease-in-out infinite;
        }
        .mood-item:hover .mood-angry-steam {
          animation: angrySteamPuff 0.65s ease-out infinite;
          transform-origin: 50px 20px;
        }

        /* ==================== 8. KHÁC (OTHER - NGHIÊNG ĐẦU NGẠC NHIÊN & DẤU ?) ==================== */
        @keyframes otherFaceCurious {
          0%, 100% { transform: rotate(0deg); }
          35% { transform: rotate(10deg); }
          70% { transform: rotate(-8deg); }
        }
        @keyframes otherMouthSurprise {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.45); }
        }
        @keyframes otherQmarkBounce {
          0%, 100% { transform: translate(68px, 12px) rotate(12deg) scale(0.85); }
          50% { transform: translate(70px, 2px) rotate(24deg) scale(1.2); }
        }
        .mood-item:hover .mood-other-face {
          animation: otherFaceCurious 1s ease-in-out infinite;
          transform-origin: 50px 52px;
        }
        .mood-item:hover .mood-other-mouth {
          animation: otherMouthSurprise 0.55s ease-in-out infinite;
          transform-origin: 50px 59px;
        }
        .mood-item:hover .mood-other-qmark {
          animation: otherQmarkBounce 0.55s ease-in-out infinite;
        }
      `}</style>

      {moodId === 'sad' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full scale-110 overflow-visible">
          <defs>
            <radialGradient id="sadGradAnim" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#F0F9FF"/>
              <stop offset="70%" stopColor="#BAE6FD"/>
              <stop offset="100%" stopColor="#7DD3FC"/>
            </radialGradient>
            <radialGradient id="tearGradAnim" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#E0F2FE"/>
              <stop offset="60%" stopColor="#38BDF8"/>
              <stop offset="100%" stopColor="#0284C7"/>
            </radialGradient>
          </defs>
          <g className="mood-sad-face">
            <circle cx="50" cy="50" r="39" fill="url(#sadGradAnim)" stroke="#0284C7" strokeWidth="2.5"/>
            <ellipse cx="27" cy="56" rx="7" ry="4" fill="#60A5FA" opacity="0.45"/>
            <ellipse cx="73" cy="56" rx="7" ry="4" fill="#60A5FA" opacity="0.45"/>
            <path d="M 33 39 Q 40 35 46 39" fill="none" stroke="#543A3A" strokeWidth="2.6" strokeLinecap="round"/>
            <path d="M 67 39 Q 60 35 54 39" fill="none" stroke="#543A3A" strokeWidth="2.6" strokeLinecap="round"/>
            <circle cx="39" cy="48" r="4.8" fill="#543A3A"/>
            <circle cx="41" cy="46" r="2" fill="#FFFFFF"/>
            <circle cx="38" cy="50" r="1.1" fill="#FFFFFF"/>
            <circle cx="61" cy="48" r="4.8" fill="#543A3A"/>
            <circle cx="63" cy="46" r="2" fill="#FFFFFF"/>
            <circle cx="60" cy="50" r="1.1" fill="#FFFFFF"/>
            {/* Hai dòng nước mắt chảy dài khi hover */}
            <path className="mood-sad-stream" d="M 36 52 L 35 78 M 64 52 L 65 78" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" opacity="0"/>
            {/* Miệng mếu khóc */}
            <path className="mood-sad-mouth" d="M 44 61 Q 50 55 56 61" fill="none" stroke="#543A3A" strokeWidth="2.8" strokeLinecap="round"/>
            {/* Các giọt nước mắt tuôn rơi liên tục */}
            <g className="mood-sad-tear-l1" transform="translate(30, 52) scale(0.55)">
              <path d="M 10 0 C 10 0, 0 14, 0 22 C 0 30, 6 34, 10 34 C 14 34, 20 30, 20 22 C 20 14, 10 0, 10 0 Z" fill="url(#tearGradAnim)"/>
              <ellipse cx="6" cy="20" rx="3" ry="5" fill="#FFFFFF" opacity="0.75" transform="rotate(-20, 6, 20)"/>
            </g>
            <g className="mood-sad-tear-r1" transform="translate(62, 52) scale(0.55)">
              <path d="M 10 0 C 10 0, 0 14, 0 22 C 0 30, 6 34, 10 34 C 14 34, 20 30, 20 22 C 20 14, 10 0, 10 0 Z" fill="url(#tearGradAnim)"/>
              <ellipse cx="6" cy="20" rx="3" ry="5" fill="#FFFFFF" opacity="0.75" transform="rotate(-20, 6, 20)"/>
            </g>
            <g className="mood-sad-tear-l2" transform="translate(30, 52) scale(0.5)" opacity="0">
              <path d="M 10 0 C 10 0, 0 14, 0 22 C 0 30, 6 34, 10 34 C 14 34, 20 30, 20 22 C 20 14, 10 0, 10 0 Z" fill="url(#tearGradAnim)"/>
            </g>
            <g className="mood-sad-tear-r2" transform="translate(62, 52) scale(0.5)" opacity="0">
              <path d="M 10 0 C 10 0, 0 14, 0 22 C 0 30, 6 34, 10 34 C 14 34, 20 30, 20 22 C 20 14, 10 0, 10 0 Z" fill="url(#tearGradAnim)"/>
            </g>
          </g>
        </svg>
      )}

      {moodId === 'joy' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full scale-110 overflow-visible">
          <defs>
            <radialGradient id="joyGradAnim" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFF5EA"/>
              <stop offset="70%" stopColor="#FFE0D6"/>
              <stop offset="100%" stopColor="#FFD1C7"/>
            </radialGradient>
            <radialGradient id="joyHeartGradAnim" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF8DA1"/>
              <stop offset="100%" stopColor="#F43F5E"/>
            </radialGradient>
          </defs>
          <g className="mood-joy-face">
            <circle cx="50" cy="54" r="38" fill="url(#joyGradAnim)" stroke="#FFAAA6" strokeWidth="2.5"/>
            <ellipse cx="26" cy="58" rx="8.5" ry="4.8" fill="#FF8DA1" opacity="0.65"/>
            <ellipse cx="74" cy="58" rx="8.5" ry="4.8" fill="#FF8DA1" opacity="0.65"/>
            <path d="M 33 49 Q 41 40 48 49" fill="none" stroke="#543A3A" strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M 52 49 Q 59 40 67 49" fill="none" stroke="#543A3A" strokeWidth="3.5" strokeLinecap="round"/>
            <g className="mood-joy-mouth">
              <path d="M 43 57 Q 50 67 57 57" fill="#E11D48" stroke="#543A3A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 46 59 Q 50 64 54 59" fill="#FFA4B6" opacity="0.85"/>
            </g>
            <g className="mood-joy-heart1" transform="translate(14, 8) rotate(-18) scale(0.65)">
              <path d="M 20 10 C 20 0, 0 0, 0 16 C 0 28, 20 40, 20 40 C 20 40, 40 28, 40 16 C 40 0, 20 0, 20 10 Z" fill="url(#joyHeartGradAnim)"/>
              <ellipse cx="12" cy="11" rx="4" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30, 12, 11)"/>
            </g>
            <g className="mood-joy-heart2" transform="translate(68, 12) rotate(18) scale(0.55)" opacity="0">
              <path d="M 20 10 C 20 0, 0 0, 0 16 C 0 28, 20 40, 20 40 C 20 40, 40 28, 40 16 C 40 0, 20 0, 20 10 Z" fill="url(#joyHeartGradAnim)"/>
            </g>
            <circle cx="21" cy="40" r="1.5" fill="#F43F5E" opacity="0.6"/>
            <circle cx="78" cy="38" r="1.8" fill="#F43F5E" opacity="0.6"/>
          </g>
        </svg>
      )}

      {moodId === 'peace' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full scale-110 overflow-visible">
          <defs>
            <radialGradient id="peaceGradAnim" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFDEC"/>
              <stop offset="70%" stopColor="#FEF08A"/>
              <stop offset="100%" stopColor="#FDE047"/>
            </radialGradient>
          </defs>
          <g className="mood-peace-face">
            <g className="mood-peace-sprout" transform="translate(50, 16) scale(0.85)">
              <path d="M 0 6 Q -1 -2 0 -8" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M 0 -8 C -6 -12, -14 -8, -12 -2 C -10 2, -2 -2, 0 -8 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.2"/>
              <path d="M 0 -8 C 6 -14, 14 -10, 12 -4 C 10 2, 2 -2, 0 -8 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.2"/>
            </g>
            <circle cx="50" cy="54" r="38" fill="url(#peaceGradAnim)" stroke="#EAB308" strokeWidth="2.5"/>
            <ellipse cx="26" cy="57" rx="7.5" ry="4" fill="#F97316" opacity="0.45"/>
            <ellipse cx="74" cy="57" rx="7.5" ry="4" fill="#F97316" opacity="0.45"/>
            <path d="M 32 47 Q 40 54 48 48" fill="none" stroke="#543A3A" strokeWidth="3.2" strokeLinecap="round"/>
            <path d="M 52 48 Q 60 54 68 47" fill="none" stroke="#543A3A" strokeWidth="3.2" strokeLinecap="round"/>
            <path d="M 44 58 Q 50 63 56 58" fill="none" stroke="#543A3A" strokeWidth="2.8" strokeLinecap="round"/>
            <g className="mood-peace-sparkle" opacity="0">
              <circle cx="15" cy="30" r="3.2" fill="#FBBF24"/>
              <circle cx="85" cy="28" r="2.8" fill="#4ADE80"/>
              <circle cx="82" cy="76" r="2.5" fill="#F472B6"/>
            </g>
          </g>
        </svg>
      )}

      {moodId === 'normal' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full scale-110 overflow-visible">
          <defs>
            <radialGradient id="normGradAnim" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFDF5"/>
              <stop offset="70%" stopColor="#FEF3C7"/>
              <stop offset="100%" stopColor="#FDE68A"/>
            </radialGradient>
          </defs>
          <g className="mood-normal-face">
            <circle cx="50" cy="50" r="40" fill="url(#normGradAnim)" stroke="#F59E0B" strokeWidth="2.5"/>
            <circle cx="28" cy="55" r="6" fill="#F472B6" opacity="0.5"/>
            <circle cx="72" cy="55" r="6" fill="#F472B6" opacity="0.5"/>
            <g className="mood-normal-eyes">
              <circle cx="39" cy="46" r="4.2" fill="#543A3A"/>
              <circle cx="40.5" cy="44.5" r="1.5" fill="#FFFFFF"/>
              <circle cx="61" cy="46" r="4.2" fill="#543A3A"/>
              <circle cx="62.5" cy="44.5" r="1.5" fill="#FFFFFF"/>
            </g>
            <path d="M 44 56 L 56 56" fill="none" stroke="#543A3A" strokeWidth="3" strokeLinecap="round"/>
          </g>
        </svg>
      )}

      {moodId === 'worry' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full scale-110 overflow-visible">
          <defs>
            <radialGradient id="worryGradAnim" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFDF0"/>
              <stop offset="70%" stopColor="#FEF08A"/>
              <stop offset="100%" stopColor="#FACC15"/>
            </radialGradient>
            <radialGradient id="dropGradAnim" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#BAE6FD"/>
              <stop offset="60%" stopColor="#38BDF8"/>
              <stop offset="100%" stopColor="#0284C7"/>
            </radialGradient>
          </defs>
          <g className="mood-worry-face">
            <circle cx="50" cy="52" r="39" fill="url(#worryGradAnim)" stroke="#CA8A04" strokeWidth="2.5"/>
            <ellipse cx="27" cy="57" rx="7" ry="4" fill="#FB923C" opacity="0.45"/>
            <ellipse cx="73" cy="57" rx="7" ry="4" fill="#FB923C" opacity="0.45"/>
            <path d="M 33 37 Q 40 42 45 39" fill="none" stroke="#543A3A" strokeWidth="2.6" strokeLinecap="round"/>
            <path d="M 67 37 Q 60 42 55 39" fill="none" stroke="#543A3A" strokeWidth="2.6" strokeLinecap="round"/>
            <circle cx="39" cy="48" r="4.2" fill="#543A3A"/>
            <circle cx="40.5" cy="46.5" r="1.5" fill="#FFFFFF"/>
            <circle cx="61" cy="48" r="4.2" fill="#543A3A"/>
            <circle cx="62.5" cy="46.5" r="1.5" fill="#FFFFFF"/>
            <path d="M 44 60 Q 47 57 50 60 Q 53 63 56 60" fill="none" stroke="#543A3A" strokeWidth="2.8" strokeLinecap="round"/>
            <g className="mood-worry-sweat" transform="translate(71, 23) rotate(15) scale(0.65)">
              <path d="M 12 0 C 12 0, 0 16, 0 24 C 0 32, 6 36, 12 36 C 18 36, 24 32, 24 24 C 24 16, 12 0, 12 0 Z" fill="url(#dropGradAnim)"/>
              <ellipse cx="8" cy="22" rx="3" ry="5" fill="#FFFFFF" opacity="0.7" transform="rotate(-20, 8, 22)"/>
            </g>
          </g>
        </svg>
      )}

      {moodId === 'tired' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full scale-110 overflow-visible">
          <defs>
            <radialGradient id="tiredGradAnim" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FAF5FF"/>
              <stop offset="70%" stopColor="#E9D5FF"/>
              <stop offset="100%" stopColor="#D8B4FE"/>
            </radialGradient>
          </defs>
          <g className="mood-tired-face">
            <circle cx="50" cy="52" r="39" fill="url(#tiredGradAnim)" stroke="#9333EA" strokeWidth="2.5"/>
            <ellipse cx="27" cy="58" rx="7" ry="4" fill="#C084FC" opacity="0.45"/>
            <ellipse cx="73" cy="58" rx="7" ry="4" fill="#C084FC" opacity="0.45"/>
            <path d="M 33 48 L 47 48 M 53 48 L 67 48" fill="none" stroke="#543A3A" strokeWidth="3.2" strokeLinecap="round"/>
            <path d="M 36 50 Q 40 53 44 50 M 56 50 Q 60 53 64 50" fill="none" stroke="#543A3A" strokeWidth="2" strokeLinecap="round"/>
            <path className="mood-tired-mouth-static" d="M 45 59 Q 50 61 55 58" fill="none" stroke="#543A3A" strokeWidth="2.8" strokeLinecap="round"/>
            <ellipse className="mood-tired-mouth-yawn" cx="50" cy="60" rx="4.8" ry="6.2" fill="#543A3A" opacity="0"/>
            <g className="mood-tired-z1" transform="translate(68, 12)">
              <path d="M 12 6 L 22 6 L 14 16 L 23 16" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <g className="mood-tired-z2" transform="translate(68, 12)">
              <path d="M 4 18 L 10 18 L 5 24 L 11 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </g>
        </svg>
      )}

      {moodId === 'angry' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full scale-110 overflow-visible">
          <defs>
            <radialGradient id="angryGradAnim" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFF1F2"/>
              <stop offset="70%" stopColor="#FECDD3"/>
              <stop offset="100%" stopColor="#FDA4AF"/>
            </radialGradient>
          </defs>
          <g className="mood-angry-face">
            <circle className="mood-angry-body" cx="50" cy="52" r="39" fill="url(#angryGradAnim)" stroke="#E11D48" strokeWidth="2.5"/>
            <ellipse cx="27" cy="58" rx="8" ry="4.5" fill="#F43F5E" opacity="0.6"/>
            <ellipse cx="73" cy="58" rx="8" ry="4.5" fill="#F43F5E" opacity="0.6"/>
            <path d="M 33 42 L 47 46 M 67 42 L 53 46" fill="none" stroke="#543A3A" strokeWidth="3.5" strokeLinecap="round"/>
            <circle cx="39" cy="50" r="4.2" fill="#543A3A"/>
            <circle cx="40.5" cy="48.5" r="1.5" fill="#FFFFFF"/>
            <circle cx="61" cy="50" r="4.2" fill="#543A3A"/>
            <circle cx="62.5" cy="48.5" r="1.5" fill="#FFFFFF"/>
            <path d="M 43 62 Q 50 56 57 62" fill="none" stroke="#543A3A" strokeWidth="3.2" strokeLinecap="round"/>
            <g className="mood-angry-vein" transform="translate(68, 14) scale(0.75)" stroke="#E11D48" strokeWidth="2.6" fill="none" strokeLinecap="round">
              <path d="M 6 2 L 6 18 M 16 2 L 16 18 M 2 6 L 18 6 M 2 14 L 18 14"/>
            </g>
            <g className="mood-angry-steam" opacity="0">
              <circle cx="13" cy="24" r="5" fill="#FCA5A5"/>
              <circle cx="8" cy="18" r="3.8" fill="#FECACA"/>
              <circle cx="87" cy="24" r="5" fill="#FCA5A5"/>
              <circle cx="92" cy="18" r="3.8" fill="#FECACA"/>
            </g>
          </g>
        </svg>
      )}

      {moodId === 'other' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full scale-110 overflow-visible">
          <defs>
            <radialGradient id="otherGradAnim" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF"/>
              <stop offset="70%" stopColor="#F1F5F9"/>
              <stop offset="100%" stopColor="#E2E8F0"/>
            </radialGradient>
          </defs>
          <g className="mood-other-face">
            <circle cx="50" cy="52" r="39" fill="url(#otherGradAnim)" stroke="#94A3B8" strokeWidth="2.5"/>
            <ellipse cx="27" cy="58" rx="7" ry="4" fill="#F472B6" opacity="0.45"/>
            <ellipse cx="73" cy="58" rx="7" ry="4" fill="#F472B6" opacity="0.45"/>
            <circle cx="39" cy="48" r="4.2" fill="#543A3A"/>
            <circle cx="40.5" cy="46.5" r="1.5" fill="#FFFFFF"/>
            <circle cx="61" cy="48" r="4.2" fill="#543A3A"/>
            <circle cx="62.5" cy="46.5" r="1.5" fill="#FFFFFF"/>
            <circle className="mood-other-mouth" cx="50" cy="59" r="3.6" fill="#F43F5E" stroke="#543A3A" strokeWidth="2.2"/>
            <g className="mood-other-qmark" transform="translate(68, 12) rotate(12) scale(0.85)">
              <text x="0" y="20" fontFamily="'Comic Sans MS', 'Fredoka', 'Quicksand', sans-serif" fontSize="22" fontWeight="900" fill="#EC4899">?</text>
              <circle cx="16" cy="4" r="1.5" fill="#F472B6"/>
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}
