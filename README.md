# Flash AI 🚀

Flash AI is a full-stack application built with Next.js that empowers developers to transform user prompts into functional React applications. With a side-by-side chat interface and live code editor, you can easily create, edit, and preview your code in real-time. Additionally, Flash AI includes payment integration to upgrade your plan for more tokens, allowing extended functionality.

---

## ✨ Features

### 1. **Landing Page** 🌟
   - Clean and modern design.
   - Welcomes users with a brief introduction to Flash AI.

### 2. **AI Chat & Code Generation** 💬💻
   - **Chat Interface**: Seamlessly interact with Flash AI to generate code based on your prompts.
   - **Code Editor**: Fully functional code editor powered by `codesandbox sandpack react`.
   - **Right Panel**:
     - **Code View Tab**: Displays the generated code.
     - **Preview Tab**: Runs the code live for immediate feedback.
   - **Continuous Updates**: Modify the code further by updating prompts directly.

### 3. **Payment Integration** 💳
   - Upgrade your plan using **PayPal Integration**.
   - Purchase additional tokens to enhance your experience.

---

## 🛠️ Technologies Used

| Technology                | Purpose                                                                 |
|---------------------------|-------------------------------------------------------------------------|
| **Codesandbox Sandpack**  | Provides a live code editor and preview environment.                   |
| **Google Gemini API**     | Powers the chat and code generation functionality.                     |
| **PayPal Integration**    | Enables secure payment processing for token upgrades.                  |
| **Shadcn**                | Offers reusable and stylish components for UI/UX consistency.          |
| **React Google Oauth**    | Handles user authentication via Google accounts.                       |
| **Convex**                | Real-time database for storing user data, code files, and other assets.|
| **Jotai**                 | State management for managing app-wide data.                          |
| **Next.js**               | Framework for building and managing the full-stack application.        |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Google API Credentials** (for authentication)
- **PayPal Developer Account** (for payment integration)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aruncode49/Flash.git
   cd Flash
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
   CONVEX_DEPLOYMENT=automatically_generated_by_convex
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
   NEXT_PUBLIC_CONVEX_URL=your_convex_project_url
   NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. Run the development server and convex database:
   ```bash
   npm run dev & npx convex dev
   ```

5. Open the application:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖼️ Screenshots

### Landing Page
![image](https://github.com/user-attachments/assets/7dbd1985-5c8e-407f-a5b9-00627dbe825e)

### Chat & Code Generation
![image](https://github.com/user-attachments/assets/6ecfe83f-bc87-4c38-84a1-86d4fcf1d10c)

![image](https://github.com/user-attachments/assets/ff4d240f-079b-4837-85bd-1ea3251413ca)

### Payment Page
![image](https://github.com/user-attachments/assets/e916e1be-75db-4011-a82c-77cb84b16cd8)

---

## 💬 Contact

If you have any questions or suggestions, feel free to reach out:
- **Email**: aruncode49@gmail.com
- **GitHub**: [@aruncode49](https://github.com/aruncode49)

---

**Enjoy using Flash AI and supercharge your development workflow! 🚀**

