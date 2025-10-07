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
    git clone <repository-url>
    cd <repository-directory>
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

## Future Development

This project is in its early stages. Future updates will include:

*   Full integration with the Nano Banana API.
*   A comprehensive suite of over 100 image editing features.
*   A minimal dashboard with search, quick access, and favorites.
*   Presets & recipes for one-click edits and community sharing.
*   And much more!