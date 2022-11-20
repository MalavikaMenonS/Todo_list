import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Addlist from "../Addtolist/Addlist";
import { useEffect, useState } from "react";
import "./searchbar.css";
import { useNavigate, useParams } from "react-router-dom";

function Searchbar() {
  const [Userinput, setUserInput] = useState("");
  const [Listelement, setListElement] = useState([]);
  const [localUserId, setLocalUserId] = useState(
    localStorage.getItem("userId") || ""
  );
  const [disp, setdisp] = useState([]);
  // console.log(Userinput);
  const navigate = useNavigate();
  const params = useParams();
  const Logout = () => {
    localStorage.clear();
    navigate(`/`);
  };

  async function Addtolist() {
    // console.log(Userinput);
    // setListElement(Listelement.concat(Userinput));
    const response = await fetch(`http://localhost:3000/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: Userinput, userId: localUserId }),
    });
    await response.json();
    setUserInput("");
    fetchData();
  }
  const fetchData = async () => {
    const uid = localStorage.getItem("userId");
    console.log(uid);
    const response = await fetch(`http://localhost:3000/todo/${uid}`, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const result = await response.json();
    setdisp(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (params.userId !== "Carestack") {
  //     navigate(`/${params.userId}`);
  //   }
  // }, []);
  return (
    <div className="form">
      <Button variant="outlined" onClick={Logout}>
        Logout
      </Button>

      <div className="bar">
        <TextField
          id="name"
          label="Add new item"
          value={Userinput}
          onChange={(e) => setUserInput(e.target.value)}
          variant="outlined"
        />

        <br />
      </div>
      <div className="buton">
        <Button variant="outlined" onClick={Addtolist}>
          + ADD
        </Button>
      </div>

      <Addlist
        fetchData={fetchData}
        disp={disp}
        list={Listelement}
        setList={setListElement}
      />
    </div>
  );
}

export default Searchbar;
