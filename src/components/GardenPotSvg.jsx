import React from 'react';

export default function GardenPotSvg({ potId, mini = false }) {
  const w = mini ? 54 : 160;
  const h = mini ? 26 : 76;

  switch (potId) {
    case 'terracotta':
      return (
        <svg width={w} height={h} viewBox="0 0 160 72" fill="none">
          <defs>
            <linearGradient id="terraGradSvg" x1="80" y1="18" x2="80" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>
          </defs>
          <rect x="10" y="2" width="140" height="16" rx="8" fill="#C2410C" stroke="#7C2D12" strokeWidth="2.5" />
          <rect x="16" y="5" width="128" height="5" rx="2.5" fill="#EA580C" opacity="0.6" />
          <path d="M22 18 L138 18 L124 64 C122 68 118 70 112 70 L48 70 C42 70 38 68 36 64 Z" fill="url(#terraGradSvg)" stroke="#7C2D12" strokeWidth="2.5" />
          <path d="M27 32 L133 32" stroke="#9A3412" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      );

    case 'ceramic':
      return (
        <svg width={w} height={h} viewBox="0 0 160 72" fill="none">
          <rect x="12" y="2" width="136" height="15" rx="7.5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2.5" />
          <path d="M22 17 L138 17 L126 62 C124 67 119 70 112 70 L48 70 C41 70 36 67 34 62 Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" />
          <circle cx="50" cy="42" r="5" fill="#FBCFE8" />
          <circle cx="80" cy="42" r="6" fill="#F472B6" />
          <circle cx="110" cy="42" r="5" fill="#FBCFE8" />
        </svg>
      );

    case 'cat_pot':
      return (
        <svg width={w} height={h} viewBox="0 0 160 76" fill="none">
          <path d="M24 18 L32 2 L46 16 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M136 18 L128 2 L114 16 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="14" y="14" width="132" height="12" rx="6" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
          <path d="M22 26 L138 26 L126 66 C124 71 119 74 112 74 L48 74 C41 74 36 71 34 66 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.5" />
          <path d="M52 46 Q58 52 64 46" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M96 46 Q102 52 108 46" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M75 52 Q80 57 85 52" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="46" cy="52" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />
          <ellipse cx="114" cy="52" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />
        </svg>
      );

    case 'pot_dreamy':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="dreamyRim" x1="10" y1="2" x2="150" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BFDBFE" />
              <stop offset="50%" stopColor="#DDD6FE" />
              <stop offset="100%" stopColor="#FBCFE8" />
            </linearGradient>
            <linearGradient id="dreamyBody" x1="20" y1="18" x2="140" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="50%" stopColor="#EDE9FE" />
              <stop offset="100%" stopColor="#FCE7F3" />
            </linearGradient>
          </defs>
          <rect x="10" y="2" width="140" height="16" rx="8" fill="url(#dreamyRim)" stroke="#818CF8" strokeWidth="2.5" />
          <rect x="18" y="5" width="124" height="4" rx="2" fill="#FFFFFF" opacity="0.65" />
          <path d="M22 18 L138 18 L125 64 C123 68 118 71 112 71 L48 71 C42 71 37 68 35 64 Z" fill="url(#dreamyBody)" stroke="#818CF8" strokeWidth="2.5" />
          {/* Trăng khuyết & Sao lấp lánh */}
          <path d="M82 32 C76 32 72 37 72 43 C72 49 76 54 82 54 C79 51 78 47 78 43 C78 39 79 35 82 32 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="1.2" />
          <circle cx="50" cy="36" r="2.5" fill="#FDE047" />
          <circle cx="110" cy="38" r="2.5" fill="#FDE047" />
          <circle cx="58" cy="54" r="2" fill="#F472B6" opacity="0.8" />
          <circle cx="102" cy="54" r="2" fill="#60A5FA" opacity="0.8" />
          <path d="M44 46 L46 42 L48 46 L52 48 L48 50 L46 54 L44 50 L40 48 Z" fill="#FEF08A" />
          <path d="M114 44 L115.5 41 L117 44 L120 45.5 L117 47 L115.5 50 L114 47 L111 45.5 Z" fill="#FEF08A" />
        </svg>
      );

    case 'pot_knit_heart':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="knitGrad" x1="80" y1="18" x2="80" y2="71" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
          <rect x="10" y="2" width="140" height="16" rx="8" fill="#FCE7F3" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M22 18 L138 18 L125 64 C123 68 118 71 112 71 L48 71 C42 71 37 68 35 64 Z" fill="url(#knitGrad)" stroke="#BE185D" strokeWidth="2.5" />
          {/* Đường gân len đan dọc */}
          <path d="M42 20 L46 69 M58 20 L60 70 M102 20 L100 70 M118 20 L114 69" stroke="#DB2777" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.65" />
          {/* Khung & Trái tim vàng chính giữa */}
          <circle cx="80" cy="44" r="14" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1.8" />
          <path d="M80 51 C80 51 70 44 70 39 C70 35.5 73 33.5 76 33.5 C78 33.5 79.5 34.8 80 36 C80.5 34.8 82 33.5 84 33.5 C87 33.5 90 35.5 90 39 C90 44 80 51 80 51 Z" fill="#FBBF24" stroke="#92400E" strokeWidth="1.8" />
        </svg>
      );

    case 'pot_mint_floral':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="mintGrad" x1="80" y1="18" x2="80" y2="71" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D1FAE5" />
              <stop offset="100%" stopColor="#6EE7B7" />
            </linearGradient>
          </defs>
          <rect x="10" y="2" width="140" height="16" rx="8" fill="#A7F3D0" stroke="#047857" strokeWidth="2.5" />
          <path d="M22 18 L138 18 L125 64 C123 68 118 71 112 71 L48 71 C42 71 37 68 35 64 Z" fill="url(#mintGrad)" stroke="#047857" strokeWidth="2.5" />
          {/* Dây lá uốn lượn */}
          <path d="M36 52 Q58 34 80 48 T124 42" stroke="#059669" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          {/* Hoa nhí hồng */}
          <g transform="translate(52, 40)">
            <circle cx="0" cy="-4" r="3.2" fill="#FBCFE8" />
            <circle cx="4" cy="0" r="3.2" fill="#FBCFE8" />
            <circle cx="0" cy="4" r="3.2" fill="#FBCFE8" />
            <circle cx="-4" cy="0" r="3.2" fill="#FBCFE8" />
            <circle cx="0" cy="0" r="2.2" fill="#FBBF24" />
          </g>
          <g transform="translate(82, 48)">
            <circle cx="0" cy="-4.5" r="3.5" fill="#F9A8D4" />
            <circle cx="4.5" cy="0" r="3.5" fill="#F9A8D4" />
            <circle cx="0" cy="4.5" r="3.5" fill="#F9A8D4" />
            <circle cx="-4.5" cy="0" r="3.5" fill="#F9A8D4" />
            <circle cx="0" cy="0" r="2.5" fill="#FBBF24" />
          </g>
          <g transform="translate(110, 39)">
            <circle cx="0" cy="-4" r="3.2" fill="#FBCFE8" />
            <circle cx="4" cy="0" r="3.2" fill="#FBCFE8" />
            <circle cx="0" cy="4" r="3.2" fill="#FBCFE8" />
            <circle cx="-4" cy="0" r="3.2" fill="#FBCFE8" />
            <circle cx="0" cy="0" r="2.2" fill="#FBBF24" />
          </g>
        </svg>
      );

    case 'pot_sun_clay':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="sunClayGrad" x1="80" y1="18" x2="80" y2="71" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>
          </defs>
          <rect x="10" y="2" width="140" height="16" rx="8" fill="#FB923C" stroke="#7C2D12" strokeWidth="2.5" />
          <path d="M22 18 L138 18 L125 64 C123 68 118 71 112 71 L48 71 C42 71 37 68 35 64 Z" fill="url(#sunClayGrad)" stroke="#7C2D12" strokeWidth="2.5" />
          {/* Mặt trời khắc giữa chậu */}
          <circle cx="80" cy="44" r="9" fill="#FDE047" stroke="#7C2D12" strokeWidth="2" />
          <path d="M80 29 L80 32 M80 56 L80 59 M65 44 L68 44 M92 44 L95 44 M69 33 L72 36 M88 52 L91 55 M91 33 L88 36 M72 52 L69 55" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="48" cy="44" r="4.5" stroke="#FED7AA" strokeWidth="1.8" />
          <circle cx="112" cy="44" r="4.5" stroke="#FED7AA" strokeWidth="1.8" />
        </svg>
      );

    case 'pot_wood_bark':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="woodGrad" x1="20" y1="18" x2="140" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D6B087" />
              <stop offset="50%" stopColor="#A67B5B" />
              <stop offset="100%" stopColor="#784B2A" />
            </linearGradient>
          </defs>
          <rect x="12" y="2" width="136" height="16" rx="7" fill="#B8865C" stroke="#5C3A21" strokeWidth="2.5" />
          <path d="M20 18 L140 18 L128 64 C126 68 121 71 115 71 L45 71 C39 71 34 68 32 64 Z" fill="url(#woodGrad)" stroke="#5C3A21" strokeWidth="2.5" />
          {/* Vân gỗ tự nhiên */}
          <path d="M46 18 Q52 44 44 70 M68 18 Q62 45 70 70 M94 18 Q100 44 92 70 M116 18 Q110 44 114 70" stroke="#5C3A21" strokeWidth="2" fill="none" opacity="0.65" />
          <ellipse cx="80" cy="46" rx="7" ry="11" stroke="#5C3A21" strokeWidth="1.8" opacity="0.7" />
          <ellipse cx="80" cy="46" rx="3" ry="5" fill="#5C3A21" opacity="0.6" />
        </svg>
      );

    case 'pot_star_cloud':
      return (
        <svg width={w} height={h} viewBox="0 0 160 76" fill="none">
          <defs>
            <linearGradient id="cloudGrad" x1="80" y1="8" x2="80" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>
          <rect x="18" y="2" width="124" height="14" rx="7" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.2" />
          {/* Dáng đám mây phồng đáng yêu */}
          <path d="M28 16 C12 18 8 36 20 46 C10 56 22 71 42 70 C54 75 72 75 80 70 C88 75 106 75 118 70 C138 71 150 56 140 46 C152 36 148 18 132 16 Z" fill="url(#cloudGrad)" stroke="#64748B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Ngôi sao vàng đính trên mây */}
          <circle cx="46" cy="42" r="3.5" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
          <circle cx="80" cy="48" r="4.5" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
          <circle cx="114" cy="42" r="3.5" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
          <circle cx="62" cy="58" r="2.2" fill="#93C5FD" />
          <circle cx="98" cy="58" r="2.2" fill="#F9A8D4" />
        </svg>
      );

    case 'pot_constellation':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="nightPotGrad" x1="80" y1="18" x2="80" y2="71" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#312E81" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <rect x="10" y="2" width="140" height="16" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2.5" />
          <path d="M22 18 L138 18 L125 64 C123 68 118 71 112 71 L48 71 C42 71 37 68 35 64 Z" fill="url(#nightPotGrad)" stroke="#6366F1" strokeWidth="2.5" />
          {/* Đường nối chòm sao */}
          <path d="M44 34 L62 28 L76 44 L96 36 L116 48" stroke="#E0E7FF" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.85" />
          <circle cx="44" cy="34" r="3" fill="#FEF08A" />
          <circle cx="62" cy="28" r="2.5" fill="#FFFFFF" />
          <circle cx="76" cy="44" r="3.2" fill="#FEF08A" />
          <circle cx="96" cy="36" r="2.5" fill="#FFFFFF" />
          <circle cx="116" cy="48" r="3" fill="#FEF08A" />
          <circle cx="54" cy="56" r="1.5" fill="#A5B4FC" />
          <circle cx="104" cy="58" r="1.8" fill="#A5B4FC" />
        </svg>
      );

    case 'pot_woven_basket':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="basketGrad" x1="80" y1="18" x2="80" y2="71" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          <rect x="12" y="2" width="136" height="16" rx="8" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
          <path d="M20 18 C14 38 18 56 34 66 C38 70 44 71 50 71 L110 71 C116 71 122 70 126 66 C142 56 146 38 140 18 Z" fill="url(#basketGrad)" stroke="#78350F" strokeWidth="2.5" />
          {/* Đường đan ngang giỏ mây */}
          <path d="M20 30 L140 30 M19 42 L141 42 M22 54 L138 54" stroke="#78350F" strokeWidth="2" strokeDasharray="8 4" opacity="0.75" />
          {/* Khuy da đính giữa miệng chậu */}
          <path d="M68 16 L92 16 L90 32 C90 36 85 39 80 39 C75 39 70 36 70 32 Z" fill="#9A3412" stroke="#451A03" strokeWidth="2" />
          <circle cx="75" cy="27" r="2" fill="#FDE047" />
          <circle cx="85" cy="27" r="2" fill="#FDE047" />
        </svg>
      );

    case 'pot_pearl_feather':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="pearlGrad" x1="20" y1="15" x2="140" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF1F2" />
              <stop offset="35%" stopColor="#FEFCE8" />
              <stop offset="70%" stopColor="#ECFEFF" />
              <stop offset="100%" stopColor="#F3E8FF" />
            </linearGradient>
          </defs>
          <rect x="10" y="2" width="140" height="15" rx="7.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <path d="M22 17 L138 17 L124 63 C121 68 116 71 108 71 L52 71 C44 71 39 68 36 63 Z" fill="url(#pearlGrad)" stroke="#94A3B8" strokeWidth="2.5" />
          {/* Chiếc lông vũ ngọc trai */}
          <path d="M66 58 C70 42 82 28 96 24 C94 38 86 52 66 58 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.8" />
          <path d="M64 60 L94 26" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'pot_geo_cube':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <rect x="10" y="2" width="140" height="15" rx="7.5" fill="#334155" stroke="#D97706" strokeWidth="2.5" />
          <path d="M22 17 L138 17 L125 64 C123 68 118 71 112 71 L48 71 C42 71 37 68 35 64 Z" fill="#1E293B" stroke="#D97706" strokeWidth="2.5" />
          {/* Họa tiết hình học chỉ vàng kim */}
          <polygon points="80,22 100,34 80,46 60,34" fill="#475569" stroke="#FBBF24" strokeWidth="1.8" />
          <polygon points="50,34 70,46 50,58 30,46" fill="#334155" stroke="#FBBF24" strokeWidth="1.8" />
          <polygon points="110,34 130,46 110,58 90,46" fill="#334155" stroke="#FBBF24" strokeWidth="1.8" />
          <polygon points="80,46 100,58 80,70 60,58" fill="#64748B" stroke="#FBBF24" strokeWidth="1.8" />
        </svg>
      );

    case 'pot_oak_forest':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="oakGrad" x1="80" y1="18" x2="80" y2="71" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#166534" />
              <stop offset="100%" stopColor="#14532D" />
            </linearGradient>
          </defs>
          <rect x="10" y="2" width="140" height="16" rx="8" fill="#15803D" stroke="#052E16" strokeWidth="2.5" />
          <path d="M22 18 L138 18 L125 64 C123 68 118 71 112 71 L48 71 C42 71 37 68 35 64 Z" fill="url(#oakGrad)" stroke="#052E16" strokeWidth="2.5" />
          {/* Chạm nổi lá sồi xanh ngọc */}
          <path d="M80 68 L80 26" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M80 26 C72 26 68 34 74 38 C66 40 66 48 74 50 C68 54 72 60 80 60 C88 60 92 54 86 50 C94 48 94 40 86 38 C92 34 88 26 80 26 Z" fill="#22C55E" stroke="#86EFAC" strokeWidth="1.5" opacity="0.85" />
          <circle cx="48" cy="42" r="5" fill="#4ADE80" opacity="0.6" />
          <circle cx="112" cy="42" r="5" fill="#4ADE80" opacity="0.6" />
        </svg>
      );

    case 'pot_amethyst_geode':
      return (
        <svg width={w} height={h} viewBox="0 0 160 74" fill="none">
          <defs>
            <linearGradient id="amethystGrad" x1="20" y1="18" x2="140" y2="71" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E9D5FF" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#581C87" />
            </linearGradient>
          </defs>
          <rect x="12" y="2" width="136" height="15" rx="7.5" fill="#D8B4FE" stroke="#4C1D95" strokeWidth="2.5" />
          <path d="M20 17 L140 17 L128 63 C125 68 119 71 112 71 L48 71 C41 71 35 68 32 63 Z" fill="url(#amethystGrad)" stroke="#4C1D95" strokeWidth="2.5" />
          {/* Tinh thể thạch anh tím lấp lánh */}
          <polygon points="56,68 64,34 74,68" fill="#7E22CE" stroke="#F3E8FF" strokeWidth="1.5" />
          <polygon points="70,68 80,26 90,68" fill="#9333EA" stroke="#FFFFFF" strokeWidth="1.8" />
          <polygon points="86,68 96,36 106,68" fill="#6B21A8" stroke="#F3E8FF" strokeWidth="1.5" />
          <circle cx="46" cy="36" r="2" fill="#FFFFFF" />
          <circle cx="114" cy="40" r="2.2" fill="#FFFFFF" />
        </svg>
      );

    default:
      return null;
  }
}
