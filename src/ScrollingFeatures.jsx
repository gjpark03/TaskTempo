import React from 'react';
import { Check } from 'lucide-react';

export default function ScrollingFeatures() {
  const features = [
    "Create custom workout intervals",
    "Perfect for HIIT training",
    "Study with Pomodoro technique",
    "Track meditation sessions",
    "Set rest and work periods",
    "Visual and audio alerts",
    "Mobile-friendly design",
    "No signup required"
  ];

  // Triple the features array to ensure smooth scrolling
  const scrollingFeatures = [...features, ...features, ...features];

  return (
    <div className="w-full overflow-hidden animate-fade-in-up animation-delay-200">
      <div className="flex animate-scroll" style={{ width: 'fit-content' }}>
        {scrollingFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-gray-400 whitespace-nowrap px-4"
          >
            <Check className="w-4 h-4 text-yellow-500 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}