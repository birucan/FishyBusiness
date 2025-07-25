import { useState } from 'react';
import { createPage, createResource } from '../types';
import { RESOURCE_STORE } from '../data/resourceStore';

export const usePages = () => {
  // Initialize with a default page
  const [pages, setPages] = useState([
    {
      ...createPage('page_1', 'Canvas View 1', "#FFFFF", 32, 24),
      resources: [
        { ...createResource('resource_1', RESOURCE_STORE.FISHING_BOAT_WITH_CREW.id, 100, 150), resourceType: RESOURCE_STORE.FISHING_BOAT_WITH_CREW.id },
        { ...createResource('resource_2', RESOURCE_STORE.FISHING_BOAT.id, 200, 100), resourceType: RESOURCE_STORE.FISHING_BOAT.id },
        { ...createResource('resource_3', RESOURCE_STORE.FISHING_BOAT_WITH_CREW.id, 50, 300), resourceType: RESOURCE_STORE.FISHING_BOAT_WITH_CREW.id },
      ]
    }
  ]);
  
  const [currentPageId, setCurrentPageId] = useState('page_1');

  // Get current page
  const getCurrentPage = () => {
    return pages.find(page => page.id === currentPageId);
  };

  // Add new page
  const addPage = (name) => {
    const newPageId = `page_${Date.now()}`;
    const newPage = createPage(newPageId, name || `Page ${pages.length + 1}`);
    
    setPages(prev => [...prev, newPage]);
    setCurrentPageId(newPageId);
    return newPage;
  };

  // Remove page
  const removePage = (pageId) => {
    if (pages.length <= 1) return; // Keep at least one page
    
    setPages(prev => prev.filter(page => page.id !== pageId));
    
    // If we're removing the current page, switch to another one
    if (currentPageId === pageId) {
      const remainingPages = pages.filter(page => page.id !== pageId);
      setCurrentPageId(remainingPages[0]?.id);
    }
  };

  // Switch to page
  const switchToPage = (pageId) => {
    const pageExists = pages.some(page => page.id === pageId);
    if (pageExists) {
      setCurrentPageId(pageId);
    }
  };

  // Add resource to current page
  const addResource = (spriteId, x, y) => {
    const resourceId = `resource_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newResource = createResource(resourceId, spriteId, x, y);
    
    setPages(prev => prev.map(page => 
      page.id === currentPageId 
        ? { ...page, resources: [...page.resources, newResource] }
        : page
    ));
    
    return newResource;
  };

  // Remove resource from current page
  const removeResource = (resourceId) => {
    setPages(prev => prev.map(page => 
      page.id === currentPageId 
        ? { ...page, resources: page.resources.filter(resource => resource.id !== resourceId) }
        : page
    ));
  };

  // Update resource position
  const updateResourcePosition = (resourceId, x, y) => {
    setPages(prev => prev.map(page => 
      page.id === currentPageId 
        ? {
            ...page, 
            resources: page.resources.map(resource => 
              resource.id === resourceId 
                ? { ...resource, position: { x, y } }
                : resource
            )
          }
        : page
    ));
  };

  // Update page name
  const updatePageName = (pageId, newName) => {
    setPages(prev => prev.map(page => 
      page.id === pageId 
        ? { ...page, name: newName }
        : page
    ));
  };

  // Legacy aliases for backward compatibility
  const addFishResource = addResource;
  const removeFishResource = removeResource;
  const updateFishPosition = updateResourcePosition;

  return {
    pages,
    currentPageId,
    currentPage: getCurrentPage(),
    actions: {
      addPage,
      removePage,
      switchToPage,
      addResource,
      removeResource,
      updateResourcePosition,
      updatePageName,
      // Legacy aliases
      addFishResource,
      removeFishResource,
      updateFishPosition
    }
  };
}; 