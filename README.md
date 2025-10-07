# Pixel Engine

Pixel Engine is a lightweight, professional-grade image editing application powered by the Nano Banana API. It's designed to be simple, fast, and highly capable, offering a wide range of image editing features in a clean, intuitive interface.

This is the initial version of the application, providing a solid foundation for future development.

## Current Features

*   **API Key Authentication**: The application is gated and requires a valid API key to access its features.
*   **Dark & Light Modes**: Seamlessly switch between dark and light themes for your preferred working environment.
*   **Experiment Playground**: Upload an image and apply a chain of editing operations. Currently, `brightness` and `contrast` adjustments are supported.
*   **Structured API Prompts**: The application is designed to send clear, structured prompts to the Nano Banana API for each editing feature.
*   **Before/After Viewer**: Compare your original and edited images side-by-side to see the effects of your changes.
*   **Image Export**: Download your edited images in `JPG` or `PNG` format.

## Getting Started

### Prerequisites

*   Node.js and npm installed on your machine.
*   A valid **Gemini 2.5 Flash image (Nano Banana) API key**.

### Installation & Running the Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/harshithluc073/Pixel-Engine.git
    cd Pixel-Engine
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

### Entering Your API Key

Upon launching the application for the first time, you will be prompted to enter your **Gemini 2.5 Flash image (Nano Banana) API key**. This is required to access the image editing functionalities. Once submitted, the key will be stored in your browser's local storage for future sessions.

## Production Deployment

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder with:
- Minified and optimized JavaScript bundles
- Code splitting for better performance
- Console logs removed automatically
- Compressed assets for faster loading

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

The application will be available at `http://localhost:4173`.

### Deployment Options

The built application in the `dist` folder can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to deploy the `dist` folder
- **AWS S3 + CloudFront**: Upload the `dist` folder to S3 and serve via CloudFront
- **Firebase Hosting**: Deploy using `firebase deploy`

### Environment Configuration

For production deployments, you can configure environment variables by creating a `.env.production` file:

```bash
VITE_APP_NAME=Pixel Engine
```

Refer to `.env.example` for available configuration options.

### Performance Optimizations

The production build includes:
- **Code Splitting**: Vendor libraries are separated for better caching
- **Minification**: All JavaScript and CSS are minified using Terser
- **Tree Shaking**: Unused code is automatically removed
- **Asset Optimization**: Images and other assets are optimized
- **No Console Logs**: Development logs are removed in production

## Future Development

This project is in its early stages. Future updates will include:

*   Full integration with the Nano Banana API.
*   A comprehensive suite of over 100 image editing features.
*   A minimal dashboard with search, quick access, and favorites.
*   Presets & recipes for one-click edits and community sharing.
*   And much more!
