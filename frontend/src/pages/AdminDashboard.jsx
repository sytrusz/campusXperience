import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { createTheme } from "@mui/material/styles";
import EventIcon from "@mui/icons-material/Event";

import UserManagement from '../components/UserManagement'
import AdminManagement from '../components/AdminManagement'

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "users",
    title: "Users",
    icon: <PersonIcon />,
  },
  {
    segment: "admin",
    title: "Admin",
    icon: <PersonIcon />,
  },
  {
    segment: "events",
    title: "Events",
    icon: <EventIcon />,
  },
  {
    kind: "divider",
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const makeAuthorizedRequest = async (url, options = {}) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  // Attempt to parse JSON response, but handle cases where response is empty
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  // If no JSON response, return an empty object or status
  return {};
};



function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        width: "100%",
      }}
    >
      {pathname === "/dashboard" && <Typography>Dashboard Overview</Typography>}
      {pathname === "/users" && <UserManagement />}
      {pathname === "/admin" && <AdminManagement />}
      {pathname === "/events" && <EventManagement />}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default function AdminDashboard(props) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
