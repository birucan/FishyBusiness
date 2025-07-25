import { useState, useRef, useCallback } from 'react';
import { createViewportState, ZOOM_LEVELS } from '../types';

export const useViewport = () => {
  const [viewportState, setViewportState] = useState(createViewportState());
  const viewportRef = useRef(null);

  // Handle mouse wheel for zooming
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    
    if (!viewportRef.current) return;
    
    const currentIndex = ZOOM_LEVELS.indexOf(viewportState.zoom);
    let newZoom = viewportState.zoom;
    
    if (e.deltaY < 0 && currentIndex < ZOOM_LEVELS.length - 1) {
      newZoom = ZOOM_LEVELS[currentIndex + 1];
    } else if (e.deltaY > 0 && currentIndex > 0) {
      newZoom = ZOOM_LEVELS[currentIndex - 1];
    }
    
    // If zoom level didn't change, return early
    if (newZoom === viewportState.zoom) return;
    
    // Get mouse position relative to viewport
    const rect = viewportRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert mouse position to world coordinates before zoom
    const worldX = (mouseX - viewportState.pan.x) / viewportState.zoom;
    const worldY = (mouseY - viewportState.pan.y) / viewportState.zoom;
    
    // Calculate new pan to keep the world point under the mouse cursor
    const newPanX = mouseX - worldX * newZoom;
    const newPanY = mouseY - worldY * newZoom;
    
    setViewportState(prev => ({
      ...prev,
      zoom: newZoom,
      pan: {
        x: newPanX,
        y: newPanY
      }
    }));
  }, [viewportState.zoom, viewportState.pan.x, viewportState.pan.y]);

  // Handle mouse down for starting drag
  const handleMouseDown = useCallback((e) => {
    setViewportState(prev => ({
      ...prev,
      isDragging: true,
      dragStart: { x: e.clientX, y: e.clientY },
      lastPan: prev.pan
    }));
  }, []);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e) => {
    if (!viewportState.isDragging) return;
    
    const deltaX = e.clientX - viewportState.dragStart.x;
    const deltaY = e.clientY - viewportState.dragStart.y;
    
    setViewportState(prev => ({
      ...prev,
      pan: {
        x: prev.lastPan.x + deltaX,
        y: prev.lastPan.y + deltaY
      }
    }));
  }, [viewportState.isDragging, viewportState.dragStart.x, viewportState.dragStart.y, viewportState.lastPan.x, viewportState.lastPan.y]);

  // Handle mouse up for ending drag
  const handleMouseUp = useCallback(() => {
    setViewportState(prev => ({ 
      ...prev, 
      isDragging: false,
      lastPan: prev.pan // Update lastPan to current pan position
    }));
  }, []);

  // Zoom controls
  const zoomIn = useCallback(() => {
    const currentIndex = ZOOM_LEVELS.indexOf(viewportState.zoom);
    if (currentIndex < ZOOM_LEVELS.length - 1) {
      const newZoom = ZOOM_LEVELS[currentIndex + 1];
      
      if (!viewportRef.current) {
        setViewportState(prev => ({ ...prev, zoom: newZoom }));
        return;
      }
      
      // Get viewport center
      const rect = viewportRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Convert center to world coordinates before zoom
      const worldX = (centerX - viewportState.pan.x) / viewportState.zoom;
      const worldY = (centerY - viewportState.pan.y) / viewportState.zoom;
      
      // Calculate new pan to keep the world center point at viewport center
      const newPanX = centerX - worldX * newZoom;
      const newPanY = centerY - worldY * newZoom;
      
      setViewportState(prev => ({
        ...prev,
        zoom: newZoom,
        pan: {
          x: newPanX,
          y: newPanY
        }
      }));
    }
  }, [viewportState.zoom, viewportState.pan.x, viewportState.pan.y]);

  const zoomOut = useCallback(() => {
    const currentIndex = ZOOM_LEVELS.indexOf(viewportState.zoom);
    if (currentIndex > 0) {
      const newZoom = ZOOM_LEVELS[currentIndex - 1];
      
      if (!viewportRef.current) {
        setViewportState(prev => ({ ...prev, zoom: newZoom }));
        return;
      }
      
      // Get viewport center
      const rect = viewportRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Convert center to world coordinates before zoom
      const worldX = (centerX - viewportState.pan.x) / viewportState.zoom;
      const worldY = (centerY - viewportState.pan.y) / viewportState.zoom;
      
      // Calculate new pan to keep the world center point at viewport center
      const newPanX = centerX - worldX * newZoom;
      const newPanY = centerY - worldY * newZoom;
      
      setViewportState(prev => ({
        ...prev,
        zoom: newZoom,
        pan: {
          x: newPanX,
          y: newPanY
        }
      }));
    }
  }, [viewportState.zoom, viewportState.pan.x, viewportState.pan.y]);

  const resetView = useCallback(() => {
    setViewportState(createViewportState());
  }, []);

  return {
    viewportState,
    viewportRef,
    handlers: {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleWheel
    },
    controls: {
      zoomIn,
      zoomOut,
      resetView
    }
  };
}; 