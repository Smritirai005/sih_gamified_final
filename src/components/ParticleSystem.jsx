import { useEffect, useState } from 'react';

export default function ParticleSystem({ count = 20 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 6,
      color: ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-yellow)', 'var(--primary-green)', 'var(--neon-purple)'][Math.floor(Math.random() * 5)]
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="particle-system">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            boxShadow: `0 0 10px ${particle.color}`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
}

