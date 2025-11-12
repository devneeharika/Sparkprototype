import { useState } from "react";
import { LandingScreen } from "./components/LandingScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";
import { HomeScreen } from "./components/HomeScreen";
import { Toaster } from "./components/ui/sonner";

type Screen =
  | "landing"
  | "login"
  | "register"
  | "forgotPassword"
  | "home";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("landing");

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col overflow-hidden bg-white">
      {currentScreen === "landing" && (
        <LandingScreen
          onLogin={() => setCurrentScreen("login")}
          onRegister={() => setCurrentScreen("register")}
        />
      )}

      {currentScreen === "login" && (
        <LoginScreen
          onBack={() => setCurrentScreen("landing")}
          onLogin={() => setCurrentScreen("home")}
          onRegisterClick={() => setCurrentScreen("register")}
          onForgotPasswordClick={() =>
            setCurrentScreen("forgotPassword")
          }
        />
      )}

      {currentScreen === "register" && (
        <RegisterScreen
          onBack={() => setCurrentScreen("landing")}
          onRegister={() => setCurrentScreen("home")}
        />
      )}

      {currentScreen === "forgotPassword" && (
        <ForgotPasswordScreen
          onBack={() => setCurrentScreen("login")}
          onSuccess={() => setCurrentScreen("login")}
        />
      )}

      {currentScreen === "home" && (
        <HomeScreen
          onLogout={() => setCurrentScreen("landing")}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}