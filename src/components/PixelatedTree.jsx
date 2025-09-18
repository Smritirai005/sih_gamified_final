const PixelatedTree = ({ size = 32 }) => {
  return (
    <div 
      className="pixelated-tree-icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        imageRendering: 'pixelated'
      }}
    >
      {/* Tree trunk */}
      <div 
        className="tree-trunk"
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '12px',
          backgroundColor: '#8B4513',
          border: '1px solid #654321',
          boxShadow: 'inset -1px -1px 0px #654321, inset 1px 1px 0px #A0522D'
        }}
      />
      
      {/* Tree leaves */}
      <div 
        className="tree-leaves"
        style={{
          position: 'absolute',
          top: '0px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          height: '20px',
          backgroundColor: '#228B22',
          border: '1px solid #006400',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          boxShadow: 'inset -1px -1px 0px #006400, inset 1px 1px 0px #32CD32'
        }}
      />
      
      {/* Tree highlight */}
      <div 
        className="tree-highlight"
        style={{
          position: 'absolute',
          top: '2px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '6px',
          backgroundColor: '#32CD32',
          border: '1px solid #228B22',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      />
    </div>
  );
};

export default PixelatedTree;

