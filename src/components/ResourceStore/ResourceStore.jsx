import React from 'react';
import { canAffordResource } from '../../data/resourceStore';

const ResourceStore = ({ 
  resources, 
  selectedResourceId, 
  onResourceSelect, 
  playerMoney,
  onPurchase 
}) => {
  const handleResourceClick = (resource) => {
    onResourceSelect(resource.id);
  };

  const handlePurchaseClick = (e, resource) => {
    e.stopPropagation();
    if (canAffordResource(resource, playerMoney) && onPurchase) {
      onPurchase(resource);
    }
  };

  return (
    <div className="resource-store">
      <h3>Resource Store</h3>
      <div className="store-items">
        {resources.map((resource) => {
          const canAfford = canAffordResource(resource, playerMoney);
          const isSelected = selectedResourceId === resource.id;
          const sprite = resource.get_sprite(true);  // Use resource's sprite function
          
          return (
            <div
              key={resource.id}
              className={`store-item ${isSelected ? 'selected' : ''} ${!canAfford ? 'unaffordable' : ''}`}
              onClick={() => handleResourceClick(resource)}
              title={resource.description}
            >
              <div className="item-image">
                <img 
                  src={sprite.src} 
                  alt={resource.name} 
                />
              </div>
              <div className="item-details">
                <span className="item-name">{resource.name}</span>
                <span className="item-cost">${resource.cost}</span>
              </div>
              <button
                className={`purchase-btn ${!canAfford ? 'disabled' : ''}`}
                onClick={(e) => handlePurchaseClick(e, resource)}
                disabled={!canAfford}
                title={canAfford ? `Purchase ${resource.name}` : 'Not enough money'}
              >
                {canAfford ? 'Buy' : '💸'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceStore; 