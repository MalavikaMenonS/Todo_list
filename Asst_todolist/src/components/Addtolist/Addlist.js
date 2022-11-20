import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./Addtolist.css";

function Addlist({ fetchData, disp, list, setList }) {
  const [disablebtn, setdisablebtn] = useState(false);
  const [flag, setflag] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [editValue, setEditValue] = useState("");

  const addClick = async () => {
    // list[a] = editValue;
     setflag(false)
     setdisablebtn(false);
    // setList([...list]);
    // setEditValue("")

    // inputRef.current.value="";
    const response = await fetch(`http://localhost:3000/todo/`+ editId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: editValue }),
    });
    // const result = await response.json();
    setEditValue("")
    fetchData();
  };

  const removeProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    // const result = await response.json();
    fetchData();
    // props.listelements([]);
    // console.log(props.list)
    // list.slice(0, index)
    // list.slice(index + 1, props.list.length)

    // list.splice(index, 1);
    // setList([...list]);
    // console.log(list);
  };

  async function editProduct(id, item) {
    setEditId(id);
    setdisablebtn(true);
    // seta(index);
    setflag(true);
  }
  // useEffect(() => {
  //   console.log(list)
  // }, [list]);

  return (
    <>
      {flag && (
        <>
          <br />
          <TextField
            label="edit here"
            onChange={(e) => setEditValue(e.target.value)}
            variant="outlined"
            value={editValue}
          />

          <div className="top">
            <Button variant="outlined" onClick={addClick}>
              + update
            </Button>
          </div>
        </>
      )}
      <div className="entire">
        <h1>To do List</h1>

        {disp.map((i, index) => {
          // console.log(i);
          return (
            <div key={i.id}>
              {index + 1}
              {i.item}
              <button onClick={() => editProduct(i.id, i.item)}>Edit</button>
              <button disabled={disablebtn} onClick={() => removeProduct(i.id)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Addlist;
