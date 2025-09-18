import { useState, useEffect } from 'react';

const AnimatedNature = () => {
  const [clouds, setClouds] = useState([]);
  const [birds, setBirds] = useState([]);
  const [butterflies, setButterflies] = useState([]);
  const [waves, setWaves] = useState([]);

  useEffect(() => {
    // Generate animated clouds
    const cloudPositions = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 30 + 10,
      size: Math.random() * 40 + 30,
      speed: Math.random() * 0.5 + 0.2,
      animationDelay: Math.random() * 10
    }));

    // Generate flying birds
    const birdPositions = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 40 + 20,
      size: Math.random() * 8 + 6,
      speed: Math.random() * 0.8 + 0.4,
      animationDelay: Math.random() * 8
    }));

    // Generate butterflies
    const butterflyPositions = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60 + 30,
      size: Math.random() * 6 + 4,
      speed: Math.random() * 0.6 + 0.3,
      animationDelay: Math.random() * 6
    }));

    // Generate water waves
    const wavePositions = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 20 + 80,
      size: Math.random() * 60 + 40,
      speed: Math.random() * 0.4 + 0.2,
      animationDelay: Math.random() * 5
    }));

    setClouds(cloudPositions);
    setBirds(birdPositions);
    setButterflies(butterflyPositions);
    setWaves(wavePositions);
  }, []);

  const renderCloud = (cloud) => (
    <div
      key={cloud.id}
      className="animated-cloud"
      style={{
        left: `${cloud.x}%`,
        top: `${cloud.y}%`,
        width: `${cloud.size}px`,
        height: `${cloud.size * 0.6}px`,
        animationDelay: `${cloud.animationDelay}s`,
        animationDuration: `${20 / cloud.speed}s`
      }}
    >
      <div className="cloud-body"></div>
      <div className="cloud-body cloud-1"></div>
      <div className="cloud-body cloud-2"></div>
    </div>
  );

  const renderBird = (bird) => (
    <div
      key={bird.id}
      className="animated-bird"
      style={{
        left: `${bird.x}%`,
        top: `${bird.y}%`,
        width: `${bird.size}px`,
        height: `${bird.size}px`,
        animationDelay: `${bird.animationDelay}s`,
        animationDuration: `${15 / bird.speed}s`
      }}
    >
      <div className="bird-body"></div>
      <div className="bird-wing wing-left"></div>
      <div className="bird-wing wing-right"></div>
    </div>
  );

  const renderButterfly = (butterfly) => (
    <div
      key={butterfly.id}
      className="animated-butterfly"
      style={{
        left: `${butterfly.x}%`,
        top: `${butterfly.y}%`,
        width: `${butterfly.size}px`,
        height: `${butterfly.size}px`,
        animationDelay: `${butterfly.animationDelay}s`,
        animationDuration: `${12 / butterfly.speed}s`
      }}
    >
      <div className="butterfly-body"></div>
      <div className="butterfly-wing wing-top-left"></div>
      <div className="butterfly-wing wing-top-right"></div>
      <div className="butterfly-wing wing-bottom-left"></div>
      <div className="butterfly-wing wing-bottom-right"></div>
    </div>
  );

  const renderWave = (wave) => (
    <div
      key={wave.id}
      className="animated-wave"
      style={{
        left: `${wave.x}%`,
        top: `${wave.y}%`,
        width: `${wave.size}px`,
        height: `${wave.size * 0.3}px`,
        animationDelay: `${wave.animationDelay}s`,
        animationDuration: `${8 / wave.speed}s`
      }}
    >
      <div className="wave-body"></div>
    </div>
  );

  return (
    <div className="animated-nature">
      {/* Animated clouds */}
      {clouds.map(renderCloud)}
      
      {/* Flying birds */}
      {birds.map(renderBird)}
      
      {/* Fluttering butterflies */}
      {butterflies.map(renderButterfly)}
      
      {/* Water waves */}
      {waves.map(renderWave)}
      
      {/* Sun */}
      <div className="animated-sun">
        <div className="sun-body"></div>
        <div className="sun-ray ray-1"></div>
        <div className="sun-ray ray-2"></div>
        <div className="sun-ray ray-3"></div>
        <div className="sun-ray ray-4"></div>
      </div>
    </div>
  );
};

export default AnimatedNature;

