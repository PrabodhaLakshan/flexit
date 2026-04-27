# FlexIT - Smart Campus Operations

FlexIT is a comprehensive smart campus operations web application. It is designed to manage campus resources, facilitate resource bookings, handle maintenance tickets, deliver notifications, and provide role-based access for both students and administrators. 

The application is built with a modern tech stack featuring a **Spring Boot** backend and a **React + Vite** frontend.

## 🚀 Features
- **Dashboard & Analytics:** Real-time metrics and statistics for users and administrators.
- **Resource Management & Booking:** Seamless interface to browse, view details, and book campus resources.
- **Maintenance Tickets:** System to submit, track, and resolve facility issues.
- **Uni-Mart:** An integrated campus marketplace for buying and selling items with built-in messaging features.
- **Admin Resource Tools:** Bulk export and insert capabilities for efficient resource management.
- **Authentication:** Secure login with Google OAuth support and role-based access control.

## 🛠️ Technology Stack

### Backend
- **Java 17** & **Spring Boot 3.4**
- **Spring Data MongoDB** (Database)
- **Spring Security** (Authentication & Crypto)

### Frontend
- **React 19**
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)

---

## 📦 Frontend Dependencies

The frontend relies on the following key dependencies to function properly:

- **[`react` & `react-dom`](https://react.dev/):** Core library for building the user interface.
- **[`react-router-dom`](https://reactrouter.com/):** Handles client-side routing and navigation between pages.
- **[`axios`](https://axios-http.com/):** Promise-based HTTP client to handle API requests to the Spring Boot backend.
- **[`tailwindcss`](https://tailwindcss.com/) & [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/framework-guides/vite):** Utility-first CSS framework for rapid and modern UI styling.
- **[`lucide-react`](https://lucide.dev/):** Provides a comprehensive set of beautiful, consistent icons used across dashboards and navigation.
- **[`@react-oauth/google`](https://github.com/MomenSherif/react-oauth):** Handles secure authentication and login using Google accounts.
- **[`jspdf`](https://github.com/parallax/jsPDF):** Library to generate PDFs on the client-side (used for booking receipts, tickets, or reports).
- **[`qrcode.react`](https://github.com/zpao/qrcode.react):** Generates QR codes dynamically for resource tracking and bookings.

---

## ⚙️ How to Run Locally

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Java 17 JDK](https://adoptium.net/)
- [Maven](https://maven.apache.org/) (or use the provided Maven wrapper `mvnw`)

### 1. Running the Backend
The backend utilizes Spring Boot and connects to a MongoDB database.
1. Navigate to the backend directory:
   ```bash
   cd "flexit-backend/flexit"
   ```
2. Verify configuration in `src/main/resources/application.properties` (The database string and properties are pre-configured, default port is `8081`).
3. Run the backend application using the Maven Wrapper:
   ```bash
   # On Windows
   mvnw.cmd spring-boot:run
   
   # On macOS/Linux
   ./mvnw spring-boot:run
   ```
   *The backend server will start and listen on port `8081`.*

### 2. Running the Frontend
The frontend uses Vite for a lightning-fast development experience.
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd flexit-frontend
   ```
2. Install the required Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The Vite development server will start, typically accessible at `http://localhost:5173`.*

---

## 🎨 UI/UX Design
The platform uses modern design principles including responsive layouts, tailored glassmorphic components, premium animations, and standardized typography to ensure a fluid, high-converting enterprise-ready experience for educational institutions.
