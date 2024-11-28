import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import { Button, Box } from "@mui/material";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      <Button onClick={() => setIsLogin(!isLogin)} sx={{ mt: 2 }}>
        {isLogin ? "Go to Registration" : "Go to Login"}
      </Button>
    </Box>
  );
}

export default App;
