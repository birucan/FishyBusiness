import { useState } from 'react';
import { useViewport } from '../../hooks/useViewport';
import ResourceRenderer from '../../resources/ResourceRenderer';

const Viewport = ({ page, onResourceSelect, onAddResource }) => {
  const { viewportState, viewportRef, handlers } = useViewport();
  const [selectedResourceId, setSelectedResourceId] = useState(null);

  const handleResourceClick = (resource) => {
    setSelectedResourceId(resource.id);
    if (onResourceSelect) {
      onResourceSelect(resource);
    }
  };

  const handleViewportClick = (e) => {
    // Deselect resource when clicking on empty area
    if (e.target === e.currentTarget || e.target.classList.contains('world') || e.target.classList.contains('grid-background')) {
      setSelectedResourceId(null);
      if (onResourceSelect) {
        onResourceSelect(null);
      }
    }
  };

  const handleViewportDoubleClick = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('world') || e.target.classList.contains('grid-background')) {
      // Calculate position relative to the world coordinates
      const rect = viewportRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - viewportState.pan.x) / viewportState.zoom;
      const y = (e.clientY - rect.top - viewportState.pan.y) / viewportState.zoom;
      
      if (onAddResource) {
        onAddResource(Math.round(x), Math.round(y));
      }
    }
  };

  if (!page) {
    return (
      <div className="viewport">
        <div className="no-page-message">
          <p>No page selected</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={viewportRef}
      className="viewport"
      onMouseDown={handlers.handleMouseDown}
      onMouseMove={handlers.handleMouseMove}
      onMouseUp={handlers.handleMouseUp}
      onMouseLeave={handlers.handleMouseUp}
      onWheel={handlers.handleWheel}
      onClick={handleViewportClick}
      onDoubleClick={handleViewportDoubleClick}
      style={{
        cursor: viewportState.isDragging ? 'grabbing' : 'grab',
        backgroundColor: page.backgroundColor
      }}
    >
      <div 
        className="world"
        style={{
          transform: `translate(${viewportState.pan.x}px, ${viewportState.pan.y}px) scale(${viewportState.zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {/* Grid background */}
        <div 
          className="grid-background" 
          style={{
            width: `${page.gridWidth * 32}px`,
            height: `${page.gridHeight * 32}px`,
            top: 0,
            left: 0
          }}
        />
        
        {/* Render resources using individual resource components */}
        {page.resources.map((resource) => (
          <ResourceRenderer
            key={resource.id}
            resource={resource}
            onClick={handleResourceClick}
            selected={selectedResourceId === resource.id}
          />
        ))}
      </div>
      
      {/* Viewport info overlay */}
      <div className="viewport-info">
        <span>Zoom: {viewportState.zoom}x</span>
        <span>Pan: ({Math.round(viewportState.pan.x)}, {Math.round(viewportState.pan.y)})</span>
        <span>Resources: {page.resources.length}</span>
      </div>
    </div>
  );
};

export default Viewport; 