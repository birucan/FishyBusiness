import React from 'react';
import { getResourceById } from './index';

const ResourceRenderer = ({ resource, onClick, selected = false }) => {
  // Get the resource definition which contains the Component
  const resourceDef = getResourceById(resource.resourceType || resource.spriteId);
  
  if (!resourceDef || !resourceDef.Component) {
    console.warn(`Resource definition or component not found for: ${resource.resourceType || resource.spriteId}`);
    return null;
  }

  // Render the resource's own component
  const ResourceComponent = resourceDef.Component;
  return (
    <ResourceComponent
      resource={resource}
      onClick={onClick}
      selected={selected}
    />
  );
};

export default ResourceRenderer; 