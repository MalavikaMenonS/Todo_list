import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import "./SigninForm.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import {context} from '../../App'

function SigninForm({ setAuthorize }) {
  //    const{setAuthorize}=useContext(context);

  const navigate = useNavigate();
  const [UserName, getUserName] = useState("");
  const [Password, setPassword] = useState("");

  const submitForm = async () => {
    if (UserName === "" || Password === "") {
      alert("All fields are mandatory!!!");
    } else {
      const response = await fetch("http://localhost:3000/user/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: UserName, password: Password }),
      });
      const res = await response.json();
      if (res.flag === true) {
        setAuthorize(true);
        localStorage.setItem("authorize", res.flag);
        localStorage.setItem("userId", res.id);
        localStorage.setItem("username", res.username);
        navigate(`/user/${UserName}`);
      } else {
        alert("Invalid credentials!!!");
      }
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authorize")) === true) {
      navigate(`/user/${localStorage.getItem("username")}`);
    }
  });
  return (
    <>
      <div className="signin">
        <h1 className="heading">SIGN IN</h1>
        <div className="name">
          <TextField
            onChange={(e) => getUserName(e.target.value)}
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
          />
        </div>
        <div className="pwd">
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Enter password"
            variant="outlined"
          />
        </div>
        <br />
        <Button variant="contained" onClick={submitForm}>
          Submit
        </Button>
        <Grid>
          <Grid item>
            <Link href="/" variant="body2" style={{ color: "black" }}>
              <br />
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default SigninForm;
