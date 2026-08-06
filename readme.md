# HaxBall Stadium Editor (DSE)

A powerful, visual, web-based stadium editor for **HaxBall**. This tool allows you to design, edit, and export custom HaxBall stadium files (`.hbs`) using an interactive graphical interface. Built with React and Redux, it offers a rich set of creation, transformation, and property-editing tools to make stadium creation fast and intuitive.

---

## 🚀 Live Demo

You can try the live version of the editor here: **[HaxBall Stadium Editor](https://haxball-map-editor.github.io/)** *(or configure your own GitHub Pages link)*.

---

## ✨ Key Features

### 🎨 Visual & Interactive Canvas
* **Smooth Navigation:** Pan across the canvas (middle-click/drag) and zoom in/out (scroll wheel) to focus on details.
* **Direct Manipulation:** Drag, move, scale, and rotate objects directly on the screen.

### 🛠️ Comprehensive Creation Tools
* **Vertex Tool:** Place vertices to serve as endpoints or anchor points.
* **Segment Tool:** Create straight walls or curved boundaries with custom parameters.
* **Disc Tool:** Draw physics discs with customizable properties (radius, mass, speed, bounce, etc.).
* **Goal Tool:** Position goalposts and define goal zones for Red and Blue teams.
* **Plane Tool:** Add solid boundary planes to define the outer borders of the stadium.
* **Joint Tool:** Connect vertices and discs using physics-based joints.

### 🔄 Advanced Editing & Transformations
* **Undo & Redo System:** Includes smart action-grouping for optimized performance and memory usage.
* **Clipboard Operations:** Cut, Copy, Paste, and Duplicate single or multiple elements easily.
* **Symmetry & Transformations:**
  * **Mirror/Flip:** Reflect selected elements horizontally or vertically to easily create perfectly symmetrical stadiums.
  * **Rotate & Scale:** Resize and rotate groups of elements dynamically.
  * **Inverse:** Quick selection inversion.

### 📝 Hybrid Modes
* **Creator Mode:** The graphical editing workspace.
* **Properties Inspector:** Edit global stadium settings (dimensions, camera scale, player physics, ball physics, gravity) or fine-tune specific properties of selected objects (collision masks `cMask`, collision groups `cGroup`, bounce coefficients `bCoef`, colors, etc.).
* **Text Mode:** View and edit raw JSON stadium code directly. You can copy/paste raw code to import/export stadiums without losing progress.

### 🖼️ Overlay Reference Image
* **Trace Your Designs:** Load a background reference image to trace complex outlines.
* **Controls:** Adjust opacity, lock image in place, scale, or reposition the reference overlay to match your stadium dimensions perfectly.

### 📋 Preset Templates
* Start from scratch or load one of the built-in basic stadium templates to save time.

---

## 🛠️ Technology Stack

* **Frontend:** React (hooks)
* **State Management:** Redux Toolkit
* **Rendering:** HTML5 Canvas API
* **Styling:** Vanilla CSS / jQuery for animations

---

## 🚀 Getting Started

To run the editor locally on your machine, follow these steps:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/haxball-stadium-editor.git
   cd haxball-stadium-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📦 Deployment

This project is pre-configured for easy deployment to GitHub Pages.

To deploy your own version:
1. Update the `"homepage"` field in your `package.json` to match your GitHub Pages URL:
   ```json
   "homepage": "https://your-username.github.io/your-repository-name"
   ```
2. Run the deployment script:
   ```bash
   npm run deploy
   ```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
