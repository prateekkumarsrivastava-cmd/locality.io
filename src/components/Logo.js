import React from "react";

    const Logo = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="500" height="500" fill="rgb(14, 30, 205)" />

      {/* Path trail */}
      <path
        d="M 230,120 C 150,150 120,220 160,280"
        stroke="#0B2A4A"
        strokeWidth="5"
        strokeDasharray="8 8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="160" cy="280" r="5" fill="#0B2A4A" />

      {/* Location pin */}
      <path
        d="M 160,295 C 148,295 140,305 140,315 C 140,330 160,350 160,350 C 160,350 180,330 180,315 C 180,305 172,295 160,295 Z"
        fill="#ffffff"
        stroke="#0B2A4A"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="160" cy="315" r="5" fill="#0B2A4A" />

      {/* Spark icon */}
      <g transform="translate(240, 90) rotate(45)">
        <path
          d="M 10,0 L 15,-10 L 20,0 L 35,5 L 35,10 L 20,10 L 15,25 L 18,30 L 12,28 L 6,30 L 9,25 L 4,10 L -11,10 L -11,5 Z"
          fill="#0B2A4A"
        />
      </g>

      {/* L shape */}
      <path
        d="M 185,210 L 185,320 C 185,331 194,340 205,340 L 255,340 L 255,305 L 220,305 L 220,210 Z"
        fill="#0B2A4A"
      />

      {/* Platform */}
      <polygon
        points="250,340 345,340 330,315 265,315"
        fill="#829AB1"
        stroke="#0B2A4A"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Welcome text */}
      <text
        x="297"
        y="333"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="11"
        fontWeight="900"
        fill="#0B2A4A"
        textAnchor="middle"
        letterSpacing="1"
      >
        WELCOME
      </text>

      {/* Door + house */}
      <rect x="310" y="245" width="12" height="20" fill="#0B2A4A" />
      <path
        d="M 295,240 L 250,275 L 260,275 L 260,315 L 330,315 L 330,275 L 340,275 Z"
        fill="#ffffff"
        stroke="#0B2A4A"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Door */}
      <rect
        x="287"
        y="285"
        width="18"
        height="30"
        fill="#FFC107"
        stroke="#0B2A4A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="300" cy="302" r="1.5" fill="#0B2A4A" />

      {/* Window */}
      <rect
        x="265"
        y="280"
        width="14"
        height="14"
        fill="#FFC107"
        stroke="#0B2A4A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line x1="272" y1="280" x2="272" y2="294" stroke="#0B2A4A" strokeWidth="2" />
      <line x1="265" y1="287" x2="279" y2="287" stroke="#0B2A4A" strokeWidth="2" />
    </svg>
  );
};

export default Logo;