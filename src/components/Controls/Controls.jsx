import { ZOOM_LEVELS } from '../../types';

const Controls = ({ viewportState, controls, disabled = false }) => {
  const currentIndex = ZOOM_LEVELS.indexOf(viewportState.zoom);
  const canZoomIn = currentIndex < ZOOM_LEVELS.length - 1;
  const canZoomOut = currentIndex > 0;

  return (
    <div className="controls">
      <button 
        onClick={controls.zoomOut} 
        disabled={disabled || !canZoomOut}
        title={canZoomOut ? `Zoom out to ${ZOOM_LEVELS[currentIndex - 1]}x` : 'Minimum zoom reached'}
      >
        Zoom Out {canZoomOut ? `(${ZOOM_LEVELS[currentIndex - 1]}x)` : '(Min)'}
      </button>
      
      <span className="zoom-indicator">
        Zoom: {viewportState.zoom}x
      </span>
      
      <button 
        onClick={controls.zoomIn} 
        disabled={disabled || !canZoomIn}
        title={canZoomIn ? `Zoom in to ${ZOOM_LEVELS[currentIndex + 1]}x` : 'Maximum zoom reached'}
      >
        Zoom In {canZoomIn ? `(${ZOOM_LEVELS[currentIndex + 1]}x)` : '(Max)'}
      </button>
      
      <button 
        onClick={controls.resetView} 
        disabled={disabled}
        className="reset-btn"
        title="Reset to default view"
      >
        Reset View
      </button>
    </div>
  );
};

export default Controls; 