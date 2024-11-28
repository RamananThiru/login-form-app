import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, password } = formData;
    let isValid = true;
    const newErrors = {
      email: !/\S+@\S+\.\S+/.test(email),
      password: password.length < 6,
    };

    setErrors(newErrors);

    Object.values(newErrors).forEach((error) => {
      if (error) isValid = false;
    });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login successful:", formData);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email && "Enter a valid email"}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password && "Password must be at least 6 characters long"}
            sx={{ mt: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
