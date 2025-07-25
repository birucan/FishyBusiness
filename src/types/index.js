// Type definitions for the sprite canvas app

// Sprite definition structure - represents a visual asset
export const createSprite = (name, src, width = 32, height = 32) => ({
  id: `sprite_${name.toLowerCase().replace(/\s+/g, '_')}`,
  name,
  src,
  width,
  height
});

// Resource definition structure - simplified for map placement only
export const createResource = (id, spriteId, x, y) => ({
  id,
  spriteId, // References a sprite from the library or store
  position: { x, y }
});

// Legacy createFishResource for backward compatibility
export const createFishResource = createResource;

// Page/Canvas definition structure
export const createPage = (id, name, backgroundColor = '#1a1a1a', gridWidth = 32, gridHeight = 24) => ({
  id,
  name,
  backgroundColor,
  gridWidth,
  gridHeight,
  resources: [], // Changed from fishResources to resources
  cameraPosition: { x: 0, y: 0 },
  zoomLevel: 4,
  createdAt: Date.now()
});

// Viewport state structure
export const createViewportState = () => ({
  zoom: 4,
  pan: { x: 0, y: 0 },
  isDragging: false,
  dragStart: { x: 0, y: 0 },
  lastPan: { x: 0, y: 0 }
});

// Available zoom levels
export const ZOOM_LEVELS = [1, 2, 4, 8, 16]; 