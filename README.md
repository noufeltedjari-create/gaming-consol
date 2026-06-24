# Console Store Web Application (متجر أجهزة وألعاب الفيديو)

A premium, fully responsive Single Page E-Commerce Application (SPA) designed with a cyber-gaming dark aesthetic. The application is built using vanilla HTML5, CSS3, and JavaScript, requiring no compiler or environment setups.

## 🚀 How to Run
Simply open the `index.html` file in any modern web browser:
- Double-click [index.html](file:///c:/Users/USER/New%20folder/index.html) in your file explorer.
- Or run a lightweight local server if desired (e.g. `npx serve` or Live Server extension).

## 💎 Features

### 1. Visitor Interface (واجهة الزائر)
- **Responsive Layout**: Designed to adapt perfectly to mobile phones, tablets, and desktop displays.
- **Home View**: Glowing hero banner, category quick links, and a unified product showcase.
- **Console Brand Views**: Navigation pages dedicated for PlayStation, Xbox, and Nintendo.
- **Filter Tabs**: Toggle views between consoles (الأجهزة) and games (الألعاب) dynamically.
- **Bilingual Interface**: Seamless translation switching between Arabic (with RTL formatting) and English at the click of a button in the navigation bar.
- **Shopping Cart Drawer**: Interactive sliding panel to review, modify quantities, delete items, and track total cost.
- **Order Placement / Checkout**: Formal checkout process requesting the buyer's:
  - First Name (الاسم)
  - Last Name (اللقب)
  - Phone Number (الهاتف)
  - State (الولاية) - A full list of Algeria's 58 wilayas is provided in a dropdown menu.

### 2. Seller Portal (بوابة البائع)
- **Secure Access**: Lock screen requiring a passcode. The default passcode is: **`1234`**.
- **Incoming Orders Board (الطلبات الواردة)**: Monitor incoming customer checkouts containing their name, telephone, state, ordered console/games, and final price.
- **Catalog Management (كتالوج المنتجات)**:
  - **Add Products**: Form supporting product title (Arabic and English), category console, type (console/game), description, price, and image file upload (converts to base64 for local persistence). If no image is uploaded, a custom neon SVG vector is automatically generated.
  - **Delete Products**: Remove any product from the active store layout.

### 3. Local Persistence
All inventory changes, incoming orders, and cart selections are persisted locally in the browser's `localStorage` so that edits remain intact upon refreshing.

## 📂 Project Structure
- [index.html](file:///c:/Users/USER/New%20folder/index.html) - Structural layout & modals.
- [style.css](file:///c:/Users/USER/New%20folder/style.css) - Responsive grid, gaming colors, variables, and glassmorphic designs.
- [app.js](file:///c:/Users/USER/New%20folder/app.js) - Application state, routing, cart logic, validation, translation dictionaries, and mock product list.
