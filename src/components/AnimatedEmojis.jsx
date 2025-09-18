import { useState, useEffect } from 'react';

const emojis = ['🌱', '🌿', '🌳', '🌻', '🦋', '🐝', '🌊', '☀️', '🌈', '⭐', '💚', '🌍', '♻️', '💧', '🌪️', '🔥'];

export default function AnimatedEmojis({ count = 15 }) {
  const [animatedEmojis, setAnimatedEmojis] = useState([]);

  useEffect(() => {
    const newEmojis = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 20,
      rotation: Math.random() * 360,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2
    }));
    setAnimatedEmojis(newEmojis);
  }, [count]);

  return (
    <div className="animated-emojis">
      {animatedEmojis.map(emoji => (
        <div
          key={emoji.id}
          className="floating-emoji"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            fontSize: `${emoji.size}px`,
            transform: `rotate(${emoji.rotation}deg)`,
            animationDelay: `${emoji.delay}s`,
            animationDuration: `${emoji.duration}s`
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
}

