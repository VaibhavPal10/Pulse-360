import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ChartComponent from '../components/chartComponents/ChartComponent';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { darkGreentheme } from '../themes/darkGreen';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@emotion/react';

function EmpReview() {
  
const randomLabels = Array.from({ length: 30 }, (_, index) => index + 1);
const randomData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1);
  const productivityData = {
    labels: randomLabels,
    datasets: [
      {
        label: 'Productivity',
        data: randomData,
        backgroundColor : 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const retentionData = {
    labels: randomLabels,
    datasets: [
      {
        label: 'Retention Rate',
        data: randomData,
        backgroundColor: 'rgba(31, 63, 117, 0.7)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const participationData = {
    labels: randomLabels,
    datasets: [
      {
        data: randomData,
        backgroundColor: ['rgba(31, 63, 165, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const [chart, setChart] = useState(productivityData);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    check();
  }, []);

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
      const data = await response.json();
      const validity = data.status;

      if (!data.error) {
        if (validity === "invalid") {
          localStorage.removeItem("token");
          navigate('/sign-in');
        } else if (validity === "valid") {
          console.log("user authenticated!");
        } else {
          console.log("error during authentication");
        }
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleChartChange = (chartType) => {
    if (chartType === 'productivity') {
      setChart(productivityData);
    } else if (chartType === 'retention') {
      setChart(retentionData);
    } else if (chartType === 'participation') {
      setChart(participationData);
    }
  };

  return (
    <ThemeProvider theme={darkGreentheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <div className="EmpReview">
          <h1>Employee Metrics</h1>
          <ChartComponent data={chart} />
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
              <Button onClick={() => handleChartChange('productivity')}>Productivity</Button>
              <Button onClick={() => handleChartChange('retention')}>Retention</Button>
              <Button onClick={() => handleChartChange('participation')}>Participation</Button>
            </ButtonGroup>
          </Box>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default EmpReview;
