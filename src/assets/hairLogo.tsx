import React from 'react';

const HairLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      width="120"
      height="40"
      viewBox="0 0 120 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2c3856" />
          <stop offset="100%" stopColor="#4a5b89" />
        </linearGradient>
      </defs>

      {/* Hair text */}
      <text x="10" y="30" fontFamily="Arial" fontSize="28" fontWeight="bold" fill="url(#logoGradient)">
        HAIR
      </text>

      {/* Scissors */}
      <g transform="translate(75, 20) scale(0.8) rotate(-15)">
        {/* Scissor handles */}
        <circle cx="5" cy="20" r="5" fill="#2c3856" />
        <circle cx="25" cy="20" r="5" fill="#2c3856" />

        {/* Scissor blades */}
        <path d="M8 17 L30 2 L32 5 L10 20 Z" fill="#2c3856" />
        <path d="M8 23 L30 38 L32 35 L10 20 Z" fill="#2c3856" />

        {/* Center pivot */}
        <circle cx="10" cy="20" r="2" fill="#ffffff" />
      </g>
    </svg>
  );
};

export default HairLogo;
