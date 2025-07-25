import { RESOURCES, getResourceById, getAllResources } from '../resources';

// Simplified store - direct reference to resources
export const RESOURCE_STORE = RESOURCES;

// Helper functions - simplified to work with resource objects directly
export const getResourceForSaleById = getResourceById;
export const getAllResourcesForSale = getAllResources;

// Purchase logic
export const canAffordResource = (resource, playerMoney) => {
  return playerMoney >= resource.cost;
};

export const purchaseResource = (resource, playerMoney) => {
  if (!canAffordResource(resource, playerMoney)) {
    return null;
  }
  return playerMoney - resource.cost;
};

// Simplified resource creation - direct resource reference
export const createResourceFromStore = (resource, x, y) => {
  if (!resource) {
    throw new Error('Resource not found');
  }
  
  const { createResource } = require('../types');
  const resourceId = `resource_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Store reference to resource type for sprite resolution
  return {
    ...createResource(resourceId, resource.id, x, y),
    resourceType: resource.id  // Direct reference to resource
  };
}; 