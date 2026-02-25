import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/apiService";

import { LocalActivity } from "@mui/icons-material";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const selectedUser = location.state?.user;
  console.log("selectedUser:", selectedUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    if (!selectedUser) {
      navigate("/");
      return;
    }
    console.log("entered:", username, password);

    try {
      setLoading(true);
      const response = await apiClient.post("/auth/login", {
        username: username,
        password: password,
      });

      const data = response.data;

      // Save login in context
      login({
        id: data.userId,
        role: data.role,
        sessionId: data.sessionId,
      });
      setLoading(false);
      // Redirect based on role
      navigate(`/${selectedUser.id.toLowerCase()}`);

    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a1a1a",
      }}
    >
      <Card
        sx={{
          width: 380,
          px: 4,
          py: 4,
          backgroundColor: "#242424",
          borderRadius: "6px",
          border: "1px solid #333333",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h5"
            align="center"
            sx={{
              color: "#D4AF37",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Sign In
          </Typography>

          {selectedUser && (
            <Typography
              align="center"
              sx={{ color: "#999999", mb: 3 }}
            >
              Login as {selectedUser.role}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{ style: { color: "#999999" } }}
            InputProps={{ style: { color: "#E0E0E0" } }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#999999" } }}
            InputProps={{ style: { color: "#E0E0E0" } }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#D4AF37",
              color: "#1a1a1a",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#E8C547" },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <LocalActivity /> : "Sign In"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default SignIn;