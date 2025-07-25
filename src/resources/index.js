// Resource Registry - Central access to all resources
import { FishingBoat } from './FishingBoat';
import { FishingBoatWithCrew } from './FishingBoatWithCrew';

// Export ResourceRenderer for use in components
export { default as ResourceRenderer } from './ResourceRenderer';

// Registry of all available resources
export const RESOURCES = {
  FISHING_BOAT: FishingBoat,
  FISHING_BOAT_WITH_CREW: FishingBoatWithCrew
};

// Helper to get resource by ID
export const getResourceById = (resourceId) => {
  return Object.values(RESOURCES).find(resource => resource.id === resourceId);
};

// Helper to get all resources
export const getAllResources = () => {
  return Object.values(RESOURCES);
};

// Helper to get resources by category
export const getResourcesByCategory = (category) => {
  return Object.values(RESOURCES).filter(resource => resource.category === category);
}; 