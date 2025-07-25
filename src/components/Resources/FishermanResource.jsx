import { getSpriteById } from '../../data/spritesLibrary';
import { RESOURCE_STORE } from '../../data/resourceStore';

const FishermanResource = ({ resource, onClick, selected = false }) => {
  // Try to get sprite from the old sprite library first, then from resource store
  let sprite = getSpriteById(resource.spriteId);
  
  // If not found in sprite library, try to find it in resource store
  if (!sprite) {
    const storeResource = Object.values(RESOURCE_STORE).find(r => r.sprite.id === resource.spriteId);
    sprite = storeResource?.sprite;
  }
  
  if (!sprite) {
    console.warn(`Sprite not found for ID: ${resource.spriteId}`);
    return null;
  }

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(resource);
    }
  };

  return (
    <div
      className={`resource-sprite ${selected ? 'selected' : ''}`}
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
};

export default FishermanResource;
