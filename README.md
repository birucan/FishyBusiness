# S

## 🎯 Core Concepts

### Sprites vs Resources
- **Sprites**: Visual assets (images) that define how things look
- **Resources**: Instances of sprites placed in the world with specific positions and properties
- **Relationship**: One sprite can be used to create many resources (1:N relationship)

### Architecture Overview
```
Sprite Library → Resources → Pages → Canvas
     ↓              ↓         ↓        ↓
Visual Assets → Instances → Collections → Rendered View
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd sprite-canvas

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Controls/        # Viewport control buttons
│   ├── Tabs/           # Page management interface
│   ├── Units/          # Resource rendering components
│   └── Viewport/       # Main canvas area
├── hooks/              # Custom React hooks
│   ├── usePages.js     # Page and resource management
│   └── useViewport.js  # Canvas navigation and interaction
├── data/               # Static data and sprite libraries
│   └── spritesLibrary.js
├── types/              # Type definitions and factory functions
│   └── index.js
└── pages/              # Main application pages
    └── CanvasPage.jsx  # Primary application interface
```

## 🎮 Usage

### Basic Operations
1. **Page Management**: Create, switch, rename, and delete pages using the tab interface
2. **Sprite Selection**: Choose sprites from the library in the left sidebar
3. **Resource Placement**: Double-click on the canvas to place resources
4. **Resource Selection**: Single-click resources to view properties
5. **Resource Deletion**: Use Delete key or inspector button to remove resources
6. **Canvas Navigation**: Mouse wheel to zoom, click-and-drag to pan

### Keyboard Shortcuts
- `Delete` or `Backspace`: Remove selected resource
- `Mouse Wheel`: Zoom in/out
- `Click + Drag`: Pan canvas
- `Double-click`: Add resource at cursor position

## 🔧 Core Components

### Hooks

#### `usePages`
Manages the page system and resource lifecycle:
- Page creation, deletion, and switching
- Resource addition, removal, and updates
- State persistence across page transitions

#### `useViewport` 
Handles canvas interaction and navigation:
- Zoom controls (1x to 16x)
- Pan/drag functionality
- Coordinate transformation between world and screen space

### Components

#### `FishermanResource`
Renders individual resource instances:
- Displays sprite at world coordinates
- Handles selection states
- Shows health bars and visual feedback

#### `Viewport`
Main canvas area:
- Renders all resources for current page
- Manages interaction events
- Applies zoom and pan transformations

#### `PageTabs`
Page management interface:
- Tab-based page switching
- Inline page renaming
- Resource count indicators

## 🏗️ Extending the Application

### Adding New Sprites
```javascript
// In src/data/spritesLibrary.js
export const SPRITES_LIBRARY = {
  BOAT: createSprite('Boat', '/boat.png'),
  TREE: createSprite('Tree', '/tree.png', 64, 128), // Custom dimensions
  BUILDING: createSprite('Building', '/building.png'),
};
```

### Creating Custom Resource Types
```javascript
// Custom resource with specialized properties
const customResource = createResource(
  'custom_id',
  'sprite_tree',
  100, 200,
  {
    type: 'vegetation',
    health: 85,
    growth_stage: 'mature',
    seasonal_variant: 'summer'
  }
);
```

### Adding New Resource Properties
Resources support flexible property systems:
```javascript
const resourceProperties = {
  health: 100,           // Visual health bar
  speed: 1,              // Movement capability
  type: 'default',       // Resource classification
  // Custom properties...
  inventory: [],
  interactions: {},
  animations: {}
};
```

## 📊 Data Flow

```
User Interaction → Event Handler → Hook Action → State Update → UI Re-render
      ↓              ↓              ↓            ↓            ↓
   Double-click → handleAddResource → addResource → setPages → Canvas Update
```

## 🔄 Legacy Compatibility

The refactoring maintains backward compatibility:
- `FishResource` component aliased to `FishermanResource`
- `createFishResource` function aliased to `createResource`
- CSS classes maintain legacy versions
- Hook methods include both new and old naming

## 🎨 Styling

The application uses a dark theme with:
- **Primary Color**: `#61dafb` (cyan blue)
- **Background**: `#282c34` (dark gray)
- **Surfaces**: `#1e1e1e` and `#2a2a2a` (darker grays)
- **Pixelated Rendering**: Sprites maintain crisp pixel art appearance

## 🚀 Performance Features

- **Efficient Re-renders**: React keys and proper dependency management
- **Hardware Acceleration**: CSS transforms for viewport operations
- **Event Optimization**: Proper event listener cleanup
- **Memory Management**: Immutable state updates prevent memory leaks

## 🔮 Future Enhancements

Potential features for expansion:
- **Animation System**: Sprite animation sequences
- **Layer Management**: Z-index and layer organization
- **Collision Detection**: Resource interaction system
- **Import/Export**: Save and load canvas configurations
- **Multiplayer**: Real-time collaborative editing
- **Plugin System**: Extensible functionality architecture

## 📝 License

This project is available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📚 API Reference

### Core Functions

#### `createSprite(name, src, width?, height?)`
Creates a sprite definition for the library.

#### `createResource(id, spriteId, x, y, properties?)`
Creates a resource instance from a sprite.

#### `createPage(id, name, backgroundColor?)`
Creates a new canvas page.

### Hook APIs

#### `usePages()`
Returns page management state and actions.

#### `useViewport()`
Returns viewport state and interaction handlers.
