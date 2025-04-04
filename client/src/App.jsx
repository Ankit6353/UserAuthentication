import "./App.css";
import { useState } from "react";
import Registration from "./pages/Registration";
import { WelcomePage } from "./pages/WelcomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      {!isLoggedIn ? (
        <Registration onLogin={handleLogin} />
      ) : (
        <WelcomePage role={userRole} />
      )}
    </main>
  );
}

export default App;
