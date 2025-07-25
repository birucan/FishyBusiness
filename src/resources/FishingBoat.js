import React from 'react';

// FishingBoat Resource Definition with embedded component
export const FishingBoat = {
  id: 'fishing_boat',
  name: 'Fishing Boat',
  cost: 150,
  description: 'A simple boat for fishing operations',
  category: 'fishing',

  // Sprite logic embedded in resource
  get_sprite: (is_default = true) => {
    // Future: conditional sprite logic based on state, upgrades, etc.
    // For now, always return default sprite
    return {
      id: 'sprite_fishing_boat',
      name: 'Fishing Boat',
      src: '/boat.png',
      width: 32,
      height: 32
    };
  },

  // React component embedded in resource
  Component: ({ resource, onClick, selected = false }) => {
    const sprite = FishingBoat.get_sprite(true);

    const handleClick = (e) => {
      e.stopPropagation();
      if (onClick) {
        onClick(resource);
      }
    };

    return (
      <div
        className={`resource-sprite fishing-boat ${selected ? 'selected' : ''}`}
        style={{
          left: `${resource.position.x}px`,
          top: `${resource.position.y}px`,
          width: `${sprite.width}px`,
          height: `${sprite.height}px`,
        }}
        onClick={handleClick}
        title={`${sprite.name} (${resource.position.x}, ${resource.position.y})`}
      >
        <img
          src={sprite.src}
          alt={sprite.name}
          className="sprite"
          draggable={false}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
        
        {/* Selection indicator */}
        {selected && <div className="selection-indicator" />}
      </div>
    );
  }
};

export default FishingBoat; 