import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  CardActions
} from "@mui/material";
import { apiRequest } from "../apiService"; // Assuming the apiRequest function is in a file like apiService.js

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false); // Loading state for API call
  const [errorMessage, setErrorMessage] = useState(""); // To display API error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    let isValid = true;
    const newErrors = {
      name: !name,
      email: !/\S+@\S+\.\S+/.test(email),
      password: password.length < 6,
      confirmPassword: confirmPassword !== password,
    };

    setErrors(newErrors);

    Object.values(newErrors).forEach((error) => {
      if (error) isValid = false;
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      try {
        // Make the API call for registration
        const response = await apiRequest('/users', 'POST', {
          user:  {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword
          }
        }, { noAuth: true });

        console.log( "Response from API", response)
        
        if (response.token) {
          localStorage.setItem("jwtToken", response.token); // Store the token in localStorage
          console.log("Registration successful:", response);
          setErrorMessage(''); // Clear error message if registration is successful
        }
      } catch (error) {
        handleErrors(error)
      }

      setLoading(false);
    }
  };

  const handleErrors = (errorData) => {
    
    if (errorData) {
      const fieldErrors = errorData.errors;      
      
      setErrors({
        name: fieldErrors.name || '',
        email: fieldErrors.email || '',
        password: fieldErrors.password || '',
        confirmPassword: fieldErrors.password_confirmation || '',
      });
      setErrorMessage(errorData.message || "Registration failed. Please try again.");
      console.error("Registration error:", errorData.message);
    } else { // fallback when errors key not sent in response
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration error:", errorData.message);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Card sx={{ width: '100%', boxShadow: 3 }}>
          <CardContent>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
              Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              {errorMessage && (
                <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
                  {errorMessage}
                </Typography>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    helperText={errors.name && "Name is required"}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    helperText={errors.confirmPassword && "Passwords do not match"}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
              </Grid>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#1565c0", // Darker blue on hover
                    },
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
