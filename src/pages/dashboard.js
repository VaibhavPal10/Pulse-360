import React from "react";
import AppBar from "../components/appBar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/dashboard.css";
import { Link } from "react-router-dom";
import { ThemeContext, ThemeProvider } from "@emotion/react";
import Container from '@mui/material/Container';
import { darkGreentheme } from '../themes/darkGreen';
import { CssBaseline } from "@mui/material";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function check() {
    try {
      const response = await fetch("http://localhost:1337/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      console.log(response);
      const data = await response.json();
      const validity = data.status;
      if (!data.error) {
        console.log(validity);
        if (validity === "invalid") {
          localStorage.removeItem("token");
          navigate('/sign-in');
        } else if (validity === "valid") {
          console.log("user authenticated!");
        } else {
          console.log("error during authentification");
        }
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }
  check();
  return (
    <>
      <ThemeProvider theme={darkGreentheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
      <AppBar />
       <div className="list">
          <Link to="/feedback" className="formLink">Feedback</Link><br></br>
          <Link to="/survey" className="formLink">Survey</Link>
       </div>
       </Container>
      </ThemeProvider>
    </>
    );
}
