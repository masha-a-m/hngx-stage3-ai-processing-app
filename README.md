# Mariposa - Multi-Language Chat Application

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Contributing](#contributing)
7. [License](#license)

## Overview

Mariposa is a feature-rich chat application designed to provide a seamless multi-language experience. It leverages modern web technologies, including the Translator API, to translate user input into multiple languages in real-time. The app also includes summarization capabilities, making it ideal for handling large amounts of text efficiently.

The application is fully responsive, ensuring a great user experience on both mobile and desktop devices.

## Features

- **Real-Time Translation**: Translate text into multiple languages using the built-in Translator API.
- **Text Summarization**: Generate concise summaries of long texts with key points.
- **Responsive Design**: Fully adaptive layout for mobile, tablet, and desktop devices.
- **User-Friendly Interface**: Intuitive design with a clean and modern look.
- **Loading Spinner**: A visually appealing spinner during the initial loading phase.
- **Persistent User Data**: Stores user names locally for personalized experiences.

---

## Installation

To set up the project locally, follow these steps:

### Prerequisites
- npm or yarn
- A modern browser that supports experimental APIs (e.g., Chrome with Origin Trials enabled)

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/masha-a-m/hngx-stage3-ai-processing-app.git
   cd mariposa
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # OR
   yarn install
   ```

3. **Enable Origin Trial (For Translator API)**
   - Visit the [Chrome Origin Trials page](https://developer.chrome.com/docs/origintrials/) and register for the Translator API trial.
   - Add the provided origin trial token to your project:
     - For websites: Add the token as a `<meta>` tag in your HTML file.
     - For extensions: Add the token to your `manifest.json`.

4. **Run the Application**
   ```bash
   npm start
   # OR
   yarn start
   ```

5. **Access the App**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. **Initial Loading**
   - When you open the app, a dark purple screen with a spinning loader will appear for 3 seconds.
   - After the loading phase, the main UI will be displayed.

2. **Sidebar**
   - On larger screens, the sidebar is always visible and contains options like "NEW Chat" and past searches.
   - On smaller screens, the sidebar is hidden by default. Use the hamburger menu (`☰`) in the top-left corner to toggle its visibility.

3. **Translation**
   - Enter text in the main content area and click the "Translate" button.
   - Select the target language from the dropdown menu.
   - The translated text will appear below the input.

4. **Summarization**
   - Enter a long text (more than 150 characters) and click the "Summarize" button.
   - A concise summary of the text will be generated.

5. **User Name**
   - The app stores the user's name locally. If no name is found, it defaults to "Guest User."

## Technologies Used

- **Frontend Framework**: React.js
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Styling**: Inline styles and CSS for responsiveness
- **APIs**:
  - Translator API (via Chrome Origin Trials)
  - Language Detection API
  - Text Summarization API
- **Responsive Design**: Media queries and flexbox
- **Spinner Animation**: CSS keyframes


## Contributing

We welcome contributions to improve Mariposa! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push your changes to your fork:
   ```bash
   git push origin feature/new-feature
   ```
5. Submit a pull request detailing your changes.

---

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Contact

For any questions or feedback, feel free to reach out:

- Email: escritoramaree@gmail.com
- GitHub: [@masha-a-m](https://github.com/masha-a-m)