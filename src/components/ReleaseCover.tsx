import React, { useState } from 'react';

interface ReleaseCoverProps {
  title: string;
  coverUrl?: string;
  accentColor?: string;
  className?: string;
}

export const ReleaseCover: React.FC<ReleaseCoverProps> = ({
  title,
  coverUrl,
  accentColor = '#FF5500',
  className = '',
}) => {
  const [failed, setFailed] = useState(false);

  if (!coverUrl || failed) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center p-4 text-center select-none ${className}`}
        style={{
          background: `linear-gradient(135deg, ${accentColor}33 0%, #15100D 55%, #0D0A08 100%)`,
        }}
      >
        <span className="font-display text-lg sm:text-xl text-[#F5EFEA] tracking-wide break-words">
          {title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={coverUrl}
      alt={`${title} cover artwork`}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] ${className}`}
    />
  );
};
