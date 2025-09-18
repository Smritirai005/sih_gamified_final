import { useState, useEffect } from 'react';

const PixelatedScenery = () => {
  const [trees, setTrees] = useState([]);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    // Generate random trees
    const treePositions = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 30,
      type: Math.floor(Math.random() * 3), // 0: pine, 1: oak, 2: birch
      animationDelay: Math.random() * 5
    }));

    // Generate random avatars
    const avatarPositions = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 20,
      type: Math.floor(Math.random() * 4), // 0: explorer, 1: scientist, 2: farmer, 3: builder
      animationDelay: Math.random() * 3
    }));

    setTrees(treePositions);
    setAvatars(avatarPositions);
  }, []);

  const renderTree = (tree) => {
    const treeColors = {
      0: { trunk: '#8B4513', leaves: '#228B22' }, // Pine
      1: { trunk: '#A0522D', leaves: '#32CD32' }, // Oak
      2: { trunk: '#D2B48C', leaves: '#90EE90' }  // Birch
    };

    const colors = treeColors[tree.type];

    return (
      <div
        key={tree.id}
        className="pixel-tree"
        style={{
          left: `${tree.x}%`,
          top: `${tree.y}%`,
          width: `${tree.size}px`,
          height: `${tree.size}px`,
          animationDelay: `${tree.animationDelay}s`
        }}
      >
        {/* Tree trunk */}
        <div 
          className="tree-trunk"
          style={{
            width: `${tree.size * 0.2}px`,
            height: `${tree.size * 0.6}px`,
            backgroundColor: colors.trunk,
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
        {/* Tree leaves */}
        <div 
          className="tree-leaves"
          style={{
            width: `${tree.size * 0.8}px`,
            height: `${tree.size * 0.6}px`,
            backgroundColor: colors.leaves,
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
      </div>
    );
  };

  const renderAvatar = (avatar) => {
    const avatarColors = {
      0: { body: '#FF6B6B', hat: '#4ECDC4' }, // Explorer
      1: { body: '#45B7D1', hat: '#96CEB4' }, // Scientist
      2: { body: '#FFA07A', hat: '#98D8C8' }, // Farmer
      3: { body: '#DDA0DD', hat: '#F0E68C' }  // Builder
    };

    const colors = avatarColors[avatar.type];

    return (
      <div
        key={avatar.id}
        className="pixel-avatar"
        style={{
          left: `${avatar.x}%`,
          top: `${avatar.y}%`,
          width: `${avatar.size}px`,
          height: `${avatar.size}px`,
          animationDelay: `${avatar.animationDelay}s`
        }}
      >
        {/* Avatar body */}
        <div 
          className="avatar-body"
          style={{
            width: `${avatar.size * 0.6}px`,
            height: `${avatar.size * 0.7}px`,
            backgroundColor: colors.body,
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
        {/* Avatar head */}
        <div 
          className="avatar-head"
          style={{
            width: `${avatar.size * 0.4}px`,
            height: `${avatar.size * 0.4}px`,
            backgroundColor: '#FDBCB4',
            position: 'absolute',
            top: `${avatar.size * 0.1}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '50%'
          }}
        />
        {/* Avatar hat */}
        <div 
          className="avatar-hat"
          style={{
            width: `${avatar.size * 0.5}px`,
            height: `${avatar.size * 0.2}px`,
            backgroundColor: colors.hat,
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
      </div>
    );
  };

  return (
    <div className="pixelated-scenery">
      {/* Background mountains */}
      <div className="pixel-mountains">
        <div className="mountain-range mountain-1"></div>
        <div className="mountain-range mountain-2"></div>
        <div className="mountain-range mountain-3"></div>
      </div>
      
      {/* Trees */}
      {trees.map(renderTree)}
      
      {/* Avatars */}
      {avatars.map(renderAvatar)}
      
      {/* Floating particles */}
      <div className="pixel-particles">
        {Array.from({ length: 30 }, (_, i) => {
          const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFA07A', '#DDA0DD', '#F0E68C'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className="pixel-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                backgroundColor: color,
                boxShadow: `0 0 4px ${color}`
              }}
            />
          );
        })}
      </div>
      
      {/* Colorful flowers */}
      <div className="pixel-flowers">
        {Array.from({ length: 12 }, (_, i) => {
          const flowerColors = ['#FF69B4', '#FF1493', '#FF6347', '#FFD700', '#32CD32', '#00CED1'];
          const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
          return (
            <div
              key={i}
              className="pixel-flower"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: color,
                boxShadow: `0 0 6px ${color}`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PixelatedScenery;
