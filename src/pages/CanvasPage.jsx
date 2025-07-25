import { useState, useCallback } from 'react';
import { usePages } from '../hooks/usePages';
import { useViewport } from '../hooks/useViewport';
import { usePlayerProgress } from '../hooks/usePlayerProgress';
import { RESOURCE_STORE, getAllResourcesForSale, getResourceForSaleById, purchaseResource, createResourceFromStore } from '../data/resourceStore';
import Viewport from '../components/Viewport/Viewport';
import Controls from '../components/Controls/Controls';
import MoneyDisplay from '../components/MoneyDisplay/MoneyDisplay';
import ResourceStore from '../components/ResourceStore/ResourceStore';
import Notification from '../components/Notification/Notification';
import PageTabs from '../components/Tabs/PageTabs';

const CanvasPage = () => {
  const { pages, currentPageId, currentPage, actions } = usePages();
  const { viewportState, controls } = useViewport();
  const { money, changeMoney } = usePlayerProgress();
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedResourceId, setSelectedResourceId] = useState(RESOURCE_STORE.FISHING_BOAT.id);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
  };

  const handleStoreResourceSelect = (resourceId) => {
    setSelectedResourceId(resourceId);
  };

  const handlePurchaseResource = (resource) => {
    const newMoney = purchaseResource(resource, money);
    if (newMoney !== null) {
      changeMoney(-resource.cost);
      showNotification(`Purchased ${resource.name} for $${resource.cost}!`, 'success');
    } else {
      showNotification('Not enough money to purchase this resource!', 'error');
    }
  };

  const handleAddResource = (x, y) => {
    const resource = getResourceForSaleById(selectedResourceId);
    if (resource) {
      const newResourceInstance = createResourceFromStore(resource, x, y);
      const resourceData = actions.addResource(newResourceInstance.spriteId, x, y);
      // Update the resourceData with resourceType for proper sprite resolution
      resourceData.resourceType = newResourceInstance.resourceType;
      setSelectedResource(resourceData);
    }
  };

  const handleDeleteSelectedResource = useCallback(() => {
    if (selectedResource) {
      actions.removeResource(selectedResource.id);
      setSelectedResource(null);
    }
  }, [selectedResource, actions]);

  const handleKeyPress = useCallback((e) => {
    // Delete selected resource with Delete or Backspace
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedResource) {
      e.preventDefault();
      handleDeleteSelectedResource();
    }
  }, [selectedResource, handleDeleteSelectedResource]);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div 
      className="canvas-page" 
      tabIndex={0}
      onKeyDown={handleKeyPress}
      autoFocus
    >
      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}

      <header className="canvas-header">
        <h1>Fishy Business</h1>
        
        {/* Page Tabs */}
        <PageTabs
          pages={pages}
          currentPageId={currentPageId}
          onPageSwitch={actions.switchToPage}
          onPageAdd={actions.addPage}
          onPageRemove={actions.removePage}
          onPageRename={actions.updatePageName}
        />
        
        {/* Viewport Controls */}
        <div className="header-controls">
          <Controls
            viewportState={viewportState}
            controls={controls}
            disabled={!currentPage}
          />
          <MoneyDisplay money={money} />
        </div>
      </header>

      <main className="canvas-main">
        {/* Sidebar */}
        <aside className="sidebar">
          <ResourceStore
            resources={getAllResourcesForSale()}
            selectedResourceId={selectedResourceId}
            onResourceSelect={handleStoreResourceSelect}
            playerMoney={money}
            onPurchase={handlePurchaseResource}
          />

          {selectedResource && (
            <div className="resource-inspector">
              <h3>Selected Resource</h3>
              <div className="inspector-content">
                <p><strong>ID:</strong> {selectedResource.id}</p>
                <p><strong>Position:</strong> ({selectedResource.position.x}, {selectedResource.position.y})</p>
                <p><strong>Sprite:</strong> {selectedResource.spriteId}</p>
                <button 
                  className="delete-resource-btn"
                  onClick={handleDeleteSelectedResource}
                >
                  Delete Resource
                </button>
              </div>
            </div>
          )}

          <div className="instructions">
            <h3>Instructions</h3>
            <ul>
              <li>Select a resource from the store</li>
              <li>Click "Buy" to purchase it</li>
              <li>Double-click canvas to place resource</li>
              <li>Click to select placed resources</li>
              <li>Click & drag to pan view</li>
              <li>Mouse wheel to zoom</li>
              <li>Delete key to remove selected resource</li>
            </ul>
          </div>
        </aside>

        {/* Main Viewport */}
        <section className="viewport-container">
          <Viewport
            page={currentPage}
            onResourceSelect={handleResourceSelect}
            onAddResource={handleAddResource}
          />
          
          {currentPage && (
            <div className="page-info">
              <span>Page: {currentPage.name}</span>
              <span>Resource Count: {currentPage.resources.length}</span>
              {selectedResource && <span>Selected: {selectedResource.id}</span>}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CanvasPage; 