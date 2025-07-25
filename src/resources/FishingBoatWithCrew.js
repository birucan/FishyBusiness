import React from 'react';

// FishingBoatWithCrew Resource Definition with embedded component
export const FishingBoatWithCrew = {
  id: 'fishing_boat_with_crew',
  name: 'Fishing Boat with Crew',
  cost: 250,
  description: 'An upgraded fishing boat with an experienced crew',
  category: 'fishing',

  // Sprite logic embedded in resource
  get_sprite: (is_default = true) => {
    // Future: conditional sprite logic (crew visible/hidden, different crew, etc.)
    // For now, always return default sprite with crew
    return {
      id: 'sprite_fishing_boat_with_crew',
      name: 'Fishing Boat with Crew',
      src: '/boat_with_man.png',
      width: 32,
      height: 32
    };
  },

  // React component embedded in resource
  Component: ({ resource, onClick, selected = false }) => {
    const sprite = FishingBoatWithCrew.get_sprite(true);

    const handleClick = (e) => {
      e.stopPropagation();
      if (onClick) {
        onClick(resource);
      }
    };

    return (
      <div
        className={`resource-sprite fishing-boat-with-crew ${selected ? 'selected' : ''}`}
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
        
        {/* Crew indicator - unique to this resource */}
        <div className="crew-indicator">👥</div>
        
        {/* Selection indicator */}
        {selected && <div className="selection-indicator" />}
      </div>
    );
  }
};

export default FishingBoatWithCrew; 