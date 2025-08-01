# Noisify - React Native Computer Vision Development Guide

## 📱 App Overview

**Noisify** is a React Native application that transforms photos into stunning wallpapers with beautiful gradients and noise effects. This app serves as an excellent learning project for computer vision, real-time image processing, and advanced React Native development.

### Key Features
- **Real-time Camera Processing**: Live camera feed with real-time visual effects at 60 FPS
- **Computer Vision Effects**: Custom GLSL shaders for grainy blur, saturation, and noise effects
- **Interactive Controls**: Adjustable parameters for blur, noise strength, and saturation
- **Photo Processing**: Apply effects to both live camera and selected photos
- **Gesture Controls**: Zoom, double-tap to flip camera, swipe gestures
- **Export Functionality**: Save processed images to device gallery

## 🏗️ Architecture & Technologies

### Core Technologies
- **React Native 0.74.5** - Cross-platform mobile framework
- **Expo 51** - Development platform and toolchain
- **TypeScript** - Type-safe development
- **React Native Vision Camera** - Camera functionality and frame processing
- **Skia** - 2D graphics engine for real-time rendering
- **Zustand** - State management
- **React Native Reanimated** - Smooth animations and gestures

### Computer Vision Stack
- **Frame Processors**: Real-time frame manipulation using worklets
- **GLSL Shaders**: Custom fragment shaders for visual effects
- **Skia Frame Processors**: Bridge between camera frames and 2D graphics
- **Real-time Rendering**: 60 FPS processing with hardware acceleration

### Key Dependencies
```json
{
  "react-native-vision-camera": "^4.5.3",    // Camera functionality
  "@shopify/react-native-skia": "^1.4.2",    // 2D graphics engine
  "react-native-reanimated": "~3.16.0",      // Animations & gestures
  "react-native-worklets-core": "^1.3.3",    // Worklet support
  "zustand": "^5.0.0-rc.2",                  // State management
  "@gorhom/bottom-sheet": "^5.1.4",          // Bottom sheet UI
  "expo-image-picker": "~15.0.7",            // Photo selection
  "expo-media-library": "~16.0.5"            // Gallery access
}
```

## 🚀 Installation & Setup

### Prerequisites
1. **Node.js** (v18 or higher)
2. **npm**, **yarn**, or **bun** package manager
3. **Expo CLI** - Install globally: `npm install -g @expo/cli`
4. **EAS CLI** - Install globally: `npm install -g @expo/cli eas-cli`
5. **Development Environment**:
   - For iOS: Xcode (macOS only)
   - For Android: Android Studio with Android SDK

### Step-by-Step Installation

#### 1. Clone and Install Dependencies
```bash
# Clone the repository
git clone <your-fork-url>
cd noisify

# Install dependencies (choose one)
npm install
```

#### 2. iOS Setup (macOS only)
```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Or if using Expo development build
npx expo install --fix
```

#### 3. Android Setup
```bash
# Ensure Android SDK is installed via Android Studio
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### 4. Development Build Setup
This app requires a development build due to native dependencies (camera, worklets).

```bash
# Create development build profile
eas build --profile development --platform android
# or for iOS
eas build --profile development --platform ios

# Install the development build on your device or simulator
```

## 🛠️ Development Workflow

### Starting Development Server
```bash
# Start Expo development server
npx expo start --dev-client --clear

# For specific platforms
npm run android  # Android
npm run ios      # iOS
```

### Project Structure
```
noisify/
├── src/
│   ├── app/                    # Expo Router pages
│   │   ├── index.tsx          # Main screen
│   │   └── _layout.tsx        # Root layout
│   ├── components/            # Reusable components
│   │   ├── Camera.tsx         # Camera wrapper component
│   │   ├── ControlCenter.tsx  # Effect controls UI
│   │   └── ActionButtons.tsx  # Main action buttons
│   ├── hooks/                 # Custom hooks
│   │   ├── useGrainyBlurShader.ts    # Shader hook
│   │   ├── usePermissions.ts         # Permission handling
│   │   └── useZoomGesture.ts         # Gesture handling
│   ├── stores/                # Zustand state stores
│   │   ├── useCameraStore.ts         # Camera state
│   │   └── useControlCenterStore.ts  # Effect parameters
│   ├── assets/
│   │   └── shaders.ts         # GLSL shader definitions
│   └── utils/                 # Utility functions
├── app.json                   # Expo configuration
├── eas.json                   # EAS Build configuration
└── package.json
```

## 🎯 Key Components Deep Dive

### 1. Main Application (`src/app/index.tsx`)
The core component orchestrating the entire app experience:

```typescript
// Key features implemented:
- Camera initialization and permissions
- Real-time frame processing
- Gesture handling (zoom, double-tap, swipe)
- Image capture and saving
- UI state management
```

### 2. Camera Component (`src/components/Camera.tsx`)
Wrapper around Vision Camera with Reanimated integration:

```typescript
// Features:
- Animated zoom functionality
- Forward ref support
- Worklet-compatible props
```

### 3. Computer Vision Shader (`src/assets/shaders.ts`)
Custom GLSL fragment shader for visual effects:

```glsl
// Shader capabilities:
- Grainy noise generation using pseudo-random functions
- Blur effects with configurable intensity
- Saturation adjustment
- Real-time parameter updates
```

### 4. Frame Processor Hook (`src/hooks/useGrainyBlurShader.ts`)
Bridges React state with Skia rendering:

```typescript
// Functionality:
- Dynamic shader parameter updates
- Paint object creation with filters
- Performance optimization with useMemo
```

### 5. State Management (`src/stores/`)
Zustand stores for app state:

```typescript
// Stores:
- useCameraStore: Camera readiness state
- useControlCenterStore: Effect parameters (blur, noise, saturation)
- useImagePickerStore: Selected image state
```

## 🎨 Computer Vision Features

### Real-time Frame Processing
```typescript
const frameProcessor = useSkiaFrameProcessor(
  (frame) => {
    "worklet";
    frame.render(paint); // Apply shader effects to each frame
  },
  [paint],
);
```

### Custom GLSL Shader Effects
1. **Grainy Noise**: Pseudo-random noise generation
2. **Gaussian Blur**: Configurable blur with tile mode
3. **Saturation Control**: RGB saturation adjustment
4. **Real-time Updates**: Dynamic parameter changes at 60 FPS

### Effect Parameters
- **Blur Intensity**: 0-100 (default: 60)
- **Noise Strength**: 0-1 (default: 0.15)
- **Saturation**: 0-2 (default: 1.4)

## 📱 Development Tips

### 1. Testing on Device
- **Physical Device Recommended**: Camera and performance testing require real hardware
- **Development Build**: Use EAS development builds for native dependencies
- **Hot Reloading**: Limited due to worklets; restart app for shader changes

### 2. Performance Optimization
- **Frame Processor Optimization**: Keep worklets lightweight
- **Shader Compilation**: Pre-compile shaders to avoid runtime overhead
- **Memory Management**: Monitor memory usage with complex effects

### 3. Debugging
```bash
# Enable debug logging
npx react-native log-android  # Android logs
npx react-native log-ios      # iOS logs

# Flipper integration for debugging (if needed)
npx expo install react-native-flipper
```

### 4. Common Issues & Solutions

**Issue**: Camera not working in simulator
**Solution**: Use physical device; camera doesn't work in iOS simulator

**Issue**: Shader compilation errors
**Solution**: Check GLSL syntax; ensure uniform types match JavaScript values

**Issue**: Performance drops
**Solution**: Reduce frame processor complexity; optimize shader operations

## 🏗️ Build & Deployment

### Development Builds
```bash
# Create development build
eas build --profile development --platform android
eas build --profile development --platform ios

# Install on device
eas build:run --profile development --platform android
```

### Production Builds
```bash
# Create production builds
eas build --profile production --platform android
eas build --profile production --platform ios

# Submit to app stores
eas submit --platform android
eas submit --platform ios
```

### Environment Configuration
```json
// eas.json build profiles
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true,
      "channel": "production"
    }
  }
}
```

## 🎓 Learning Objectives

### Computer Vision Concepts
1. **Real-time Image Processing**: Frame-by-frame manipulation
2. **GLSL Shaders**: Fragment shader programming
3. **Performance Optimization**: Hardware-accelerated rendering
4. **Filter Chains**: Combining multiple effects

### React Native Advanced Concepts
1. **Worklets**: JavaScript execution on UI thread
2. **Native Modules**: Camera and graphics integration
3. **Gesture Handling**: Multi-touch and complex gestures
4. **State Management**: Global state with Zustand
5. **Animation**: Reanimated 3 integration

### Mobile Development Patterns
1. **Permission Handling**: Camera and storage permissions
2. **File System Access**: Saving and loading images
3. **Performance Monitoring**: Frame rate optimization
4. **Cross-platform Development**: iOS and Android compatibility

## 📚 Next Steps & Extensions

### Potential Enhancements
1. **Additional Filters**: Implement more shader effects
2. **Video Processing**: Extend to video capture and effects
3. **Machine Learning**: Add ML-based effects (face detection, object recognition)
4. **Cloud Processing**: Server-side image processing
5. **Social Features**: Sharing and community filters

### Learning Resources
- [React Native Vision Camera Docs](https://react-native-vision-camera.com/)
- [Skia Graphics Documentation](https://skia.org/docs/)
- [GLSL Shader Programming](https://learnopengl.com/Getting-started/Shaders)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Expo Documentation](https://docs.expo.dev/)

## 🤝 Contributing & Development Best Practices

### Code Style
- **TypeScript**: Strict typing enabled
- **ESLint**: Follow Expo linting rules
- **Prettier**: Code formatting
- **Conventional Commits**: Clear commit messages

### Testing Strategy
```bash
# Run tests
npm test

# Component testing with React Native Testing Library
# Integration testing for camera functionality
# Performance testing for frame processors
```

---

**Happy coding!** This project provides an excellent foundation for learning computer vision, advanced React Native development, and real-time image processing. Experiment with different shader effects, add new features, and explore the exciting intersection of mobile development and computer vision.