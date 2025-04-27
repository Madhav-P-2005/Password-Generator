# 🔐 Password Generator App (React Native)

This is a **React Native Password Generator App** that allows users to generate strong, customizable passwords based on selected criteria like lowercase letters, uppercase letters, numbers, and symbols.  
It also includes **form validation** using **Yup** and **Formik**, and allows copying the generated password to the clipboard easily.

---


## 📱 Preview

![Password Generator App Preview](Preview.png)

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Install additional libraries:**
   ```bash
   npm install yup formik react-native-bouncy-checkbox @react-native-clipboard/clipboard
   ```

4. **Link native dependencies (only if needed):**
   ```bash
   npx react-native link
   ```

---

## ⚙️ Features

- ✅ Set password length (validated using Yup).
- ✅ Choose to include:
  - Lowercase Letters (a-z)
  - Uppercase Letters (A-Z)
  - Numbers (0-9)
  - Symbols (!@#$%^&*()_+)
- ✅ Copy the generated password to clipboard.
- ✅ Form validation with **Formik** and **Yup**.
- ✅ Reset form and password easily.
- ✅ Clean and modern UI.

---

## 🛠️ Tech Stack

- **React Native**
- **Formik** (for form handling)
- **Yup** (for schema validation)
- **@react-native-clipboard/clipboard** (to copy to clipboard)
- **react-native-bouncy-checkbox** (for attractive checkboxes)

---

## 🧠 Learning Points

- Setting up Formik with Yup for form validation.
- Creating dynamic strings based on user selection.
- Copying text to the clipboard.
- Managing React Native UI components and styling.

---

## 🚀 How to Run the App

- Run on Android:
  ```bash
  npx react-native run-android
  ```

- Run on iOS (MacOS required):
  ```bash
  npx react-native run-ios
  ```

---

## 📚 Resources & Learning Path

- 🎥 [React Native Mastery Course by Hitesh Choudhary](https://youtu.be/kGtEax1WQFg?si=FUApkKlAI_QWQMAk)
- 📘 [React Native Official Documentation](https://reactnative.dev/docs/getting-started)
- 📘 [Yup (Schema Validation) Documentation](https://www.npmjs.com/package/yup)
- 📘 [Formik (Forms Handling) Documentation](https://formik.org/docs/overview)
- 📘 [React Native Bouncy Checkbox (NPM)](https://www.npmjs.com/package/react-native-bouncy-checkbox)
- 📘 [React Native Clipboard (NPM)](https://www.npmjs.com/package/@react-native-clipboard/clipboard)
- 🎨 [UIColor Picker (LearnCodeOnline)](https://www.uicolorpicker.learncodeonline.in/)

---

## 🙌 Credits

This app is part of my journey following the [**React Native Mastery Course**](https://youtu.be/kGtEax1WQFg?si=FUApkKlAI_QWQMAk) by **Hitesh Choudhary**.

---

## 📄 License

This project is open-source and free to use for learning purposes.  
Feel free to fork, modify, and improve! 🤝

---

> Built with ❤️ using React Native