import * as React from "react";
import { useState } from "react";
import AppBar from "../components/appBar";
import "../styles/feedback.css";
import { ThemeProvider } from "@mui/material/styles";
import { darkGreentheme } from "../themes/darkGreen";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
export default function Feedback() {
  const token = localStorage.getItem("token");
  const [text, setText] = useState("");
  const [selected, setSelected] = useState(false);

  /*const feedBackDataObj = {
    employeeId: 1,
    hygieneStatus: 3,
    colleagueStatus: 4,
    juniorStatus: 2,
    seniorStatus: 3,
    staffStatus: 4,
    parkingStatus: 5,
    washroomStatus: 3,
  };*/

  async function handleSubmit() {
    try {
      let employeeId;
      if(!selected){
        employeeId = localStorage.getItem("userEmployeeId");
      }
      console.log("function called");
      const response = await fetch("http://localhost:1337/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: employeeId,
          text: text,
        }),
      });
      console.log(response);
      const responseData = await response.json();
      console.log(responseData.message);
      setText("");
    } catch (error) {
      console.log(error);
    }
  }
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
          navigate("/sign-in");
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
  React.useEffect(() => {
    check();
  }, []);

  //   {
  //     position: 'absolute',
  //     top: '50%',
  //     left: '50%',
  //     transform: translate(-50%, -50%),
  //     width:'90vw',
  //     height:'100vh',
  //     // marginTop:'40px',
  //     // marginLeft: '40px',
  //     backgroundColor:'black',
  //     // border:'2px solid red',
  //     borderRadius:'10px'

  // }

  return (
    <>
      <ThemeProvider theme={darkGreentheme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <AppBar />
          <div className="container">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Multiline"
                multiline
                maxRows={5}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
             <br></br>
             <ToggleButton
                value="check"
                selected={selected}
                onChange={() => {
                  setSelected(!selected);
                }}
              >
                <CheckIcon />
              </ToggleButton>
              <Button variant="outlined" onClick={handleSubmit} className="submit">
                Submit Feedback
              </Button>
              <p>Click on the check box to send anonymous response</p>
            </Box>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}
