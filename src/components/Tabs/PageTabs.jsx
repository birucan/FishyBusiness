import { useState } from 'react';

const PageTabs = ({ pages, currentPageId, onPageSwitch, onPageAdd, onPageRemove, onPageRename }) => {
  const [editingPageId, setEditingPageId] = useState(null);
  const [editName, setEditName] = useState('');

  const handlePageClick = (pageId) => {
    if (editingPageId) return; // Don't switch while editing
    onPageSwitch(pageId);
  };

  const handleAddPage = () => {
    onPageAdd();
  };

  const handleRemovePage = (e, pageId) => {
    e.stopPropagation();
    if (pages.length > 1 && window.confirm('Are you sure you want to delete this page?')) {
      onPageRemove(pageId);
    }
  };

  const startEditing = (e, page) => {
    e.stopPropagation();
    setEditingPageId(page.id);
    setEditName(page.name);
  };

  const cancelEditing = () => {
    setEditingPageId(null);
    setEditName('');
  };

  const saveEdit = () => {
    if (editName.trim() && editName !== pages.find(p => p.id === editingPageId)?.name) {
      onPageRename(editingPageId, editName.trim());
    }
    cancelEditing();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className="page-tabs">
      <div className="tabs-list">
        {pages.map((page) => (
          <div
            key={page.id}
            className={`page-tab ${currentPageId === page.id ? 'active' : ''} ${editingPageId === page.id ? 'editing' : ''}`}
            onClick={() => handlePageClick(page.id)}
          >
            {editingPageId === page.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={handleKeyPress}
                className="page-name-input"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <span className="page-name" title={page.name}>
                  {page.name}
                </span>
                <div className="page-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => startEditing(e, page)}
                    title="Rename page"
                  >
                    ✏️
                  </button>
                  {pages.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={(e) => handleRemovePage(e, page.id)}
                      title="Delete page"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </>
            )}
            
            {/* Resource count indicator */}
            <span className="resource-count">
              {page.resources.length} 📦
            </span>
          </div>
        ))}
        
        <button className="add-page-btn" onClick={handleAddPage} title="Add new page">
          + New Page
        </button>
      </div>
    </div>
  );
};

export default PageTabs; 