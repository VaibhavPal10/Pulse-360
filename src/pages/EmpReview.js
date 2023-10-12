import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
// import ProductivityChart from './components/chartComponents/ProductivityChart.js';
// import Chart from '../components/chartComponents/RetentionChart.js';
// import Chart from '../components/chartComponents/ParticipationChart.js';
import ChartComponent from '../components/chartComponents/ChartComponent';
// import footer from "../components/Footer";

import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { darkGreentheme } from '../themes/darkGreen';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
function EmpReview() {
  const [productivity, setProductivity] = useState('');
  const [retention, setRetention] = useState('');
  const [participation, setParticipation] = useState('');
  fetch('http://localhost:3000/api/KPIController')
    .then((response)=>{
      if(response){
        console.log(response);
        return response.json();
      }
    })
    .then((data)=>{
      setParticipation(data.participationRate);
      setProductivity(data.productivity);
      setRetention(data.retentionRate);
    })
    .catch((error)=>{
      console.log(error);
    })
  const token = localStorage.getItem('token');
  // Sample data (replace with your actual data)
  const productivityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Productivity',
        data: [85, 92, 78, 88, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const retentionData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Retention Rate',
        data: [85, 88, 90, 92],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const participationData = {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
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
    <ThemeProvider  theme={darkGreentheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
    <div className="EmpReview">
      <h1>Employee Metrics</h1>
      <ChartComponent data={retentionData} />
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Box>
    </div>
    </Container>
    </ThemeProvider>
  );
}

export default EmpReview;
