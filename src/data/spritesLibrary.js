import { createSprite } from '../types';

// Global sprite library - easily accessible sprites for the entire app
// Each sprite represents a visual asset that can be used to create multiple resources
export const SPRITES_LIBRARY = {
  BOAT: createSprite('Boat', '/boat.png'),
  BOAT_WITH_MAN: createSprite('Boat with Man', '/boat_with_man.png'),
  // You can add more sprites here as the library grows
  // TREE: createSprite('Tree', '/tree.png'),
  // ROCK: createSprite('Rock', '/rock.png'),
  // BUILDING: createSprite('Building', '/building.png'),
};

// Helper function to get sprite by ID
export const getSpriteById = (spriteId) => {
  return Object.values(SPRITES_LIBRARY).find(sprite => sprite.id === spriteId);
};

// Helper function to get all sprites as array
export const getAllSprites = () => {
  return Object.values(SPRITES_LIBRARY);
};

// Helper function to add new sprite to library (for future expansion)
export const addSprite = (name, src, width, height) => {
  const sprite = createSprite(name, src, width, height);
  const key = name.toUpperCase().replace(/\s+/g, '_');
  SPRITES_LIBRARY[key] = sprite;
  return sprite;
};

// Helper function to create a resource from a sprite
export const createResourceFromSprite = (spriteId, x, y, properties = {}) => {
  const sprite = getSpriteById(spriteId);
  if (!sprite) {
    throw new Error(`Sprite with ID ${spriteId} not found`);
  }
  
  // Import createResource here to avoid circular dependencies
  const { createResource } = require('../types');
  const resourceId = `resource_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return createResource(resourceId, spriteId, x, y, {
    spriteWidth: sprite.width,
    spriteHeight: sprite.height,
    spriteName: sprite.name,
    ...properties
  });
}; 