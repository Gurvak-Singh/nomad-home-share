import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/features/auth/LoginForm";
import RegisterForm from "@/features/auth/RegisterForm";
import { useAuth } from "@/features/auth/AuthContext";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          ← Back to home
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {showLogin ? (
            <LoginForm 
              onSuccess={() => navigate("/")} 
              onRegisterClick={() => setShowLogin(false)}
            />
          ) : (
            <RegisterForm 
              onSuccess={() => navigate("/")} 
              onLoginClick={() => setShowLogin(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
