# StickerSmash 🎉

StickerSmash is a small cross-platform mobile app built with [Expo](https://expo.dev) and React Native. This study project uses file-based routing via [expo-router](https://docs.expo.dev/router/introduction/) and demonstrates a simple TypeScript, React Native and Expo setup.

## Features

- Universal app for Android, iOS, and Web
- File-based routing with expo-router
- Custom splash screen and app icon
- Ready-to-use assets and fonts

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

   You can then open the app in:
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go)

3. **Edit your app**

   Start developing by editing files inside the [`app`](app/) directory. The main entry point is [`app/index.tsx`](app/index.tsx). Navigation is handled by [`app/_layout.tsx`](app/_layout.tsx).

## Project Structure

- [`app/`](app/) - App source code (screens, layouts)
- [`assets/`](assets/) - Images and fonts
- [`app.json`](app.json) - Expo configuration
- [`package.json`](package.json) - Project scripts and dependencies

## Resetting the Project

To reset to a blank project:

```bash
npm run reset-project
```

This moves the starter code to `app-example` and creates a blank `app` directory.

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [expo-router documentation](https://docs.expo.dev/router/introduction/)
- [React Native documentation](https://reactnative.dev/)

## Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Expo Discord](https://chat.expo.dev)
