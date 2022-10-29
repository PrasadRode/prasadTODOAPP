import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const Main = () => {
  const [todos, setTodos] = useState([]);
  const [mytodo, setMytodo] = useState({ id: 0, title: "" });
  const [displayAddInput, setdisplayAddInput] = useState("none");
  const [addinput, setAddinput] = useState("");
  const [displayEditInput, setdisplayEditInput] = useState("none");
  const [loader, setloader] = useState(true);

  useEffect(() => {
    async function fetchdata() {
      try {
        let response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        let firstpagedata = response.data;
        let mydata = firstpagedata.slice(0, 10);
        setTodos(mydata);
        setloader(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchdata();
  }, []);
  function handleEdit(id, title) {
    setdisplayEditInput("block");
    setMytodo({ id: id, title: title });
  }
  function handleSubmit(e, mytitle) {
    e.preventDefault();
    if (displayEditInput === "block") {
      setdisplayEditInput("none");
    }
    let filteredarray = todos.filter((item, index) => index !== mytodo.id - 1);
    console.log(filteredarray);
    setTodos(
      [...filteredarray, { id: mytodo.id, title: mytitle }].sort(
        (a, b) => a.id - b.id
      )
    );
  }
  function handleDelete(id) {
    alert("Are you sure to want to delete?");
    setTodos(todos.filter((todo, index) => index !== id - 1));
  }
  function handleAddEvent(e) {
    e.preventDefault();
    if (displayAddInput === "none") {
      setdisplayAddInput("inline");
      return;
    }
    setdisplayAddInput("none");
    setTodos([...todos, { id: todos.length, title: addinput }]);
    setAddinput("");
  }
  function handlecomplete(id) {
    alert("Congratutions on compelting the task");

    setTodos(todos.filter((todo, index) => index !== id - 1));
  }
  return (
    <>
      <div className="head">
        <h2 className="heading"> Empyra TO DO APP</h2>

        <div className="editform" style={{ display: displayEditInput }}>
          <span>
            <h6>Edit Task:</h6>{" "}
          </span>
          <input
            type="text"
            onChange={(e) => setMytodo({ ...mytodo, title: e.target.value })}
            value={mytodo.title}
          />
          <button
            className="submitbutton btn"
            onClick={(e) => handleSubmit(e, mytodo.title)}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="main">
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>List of Pending Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loader ? (
              <tr>
                <td></td>
                <td>Loading Todo List</td>
              </tr>
            ) : (
              ""
            )}
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>
                  <span className="srNo">{index + 1}</span>
                </td>
                <td className="list_td">
                  <span className="list">{todo.title}</span>{" "}
                </td>
                <td>
                  <button onClick={() => handleEdit(todo.id, todo.title)}>
                    <span className="button_top editbutton">
                      <i className="fa-solid fa-pen"></i>{" "}
                    </span>
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>
                    <span className="button_top delbutton">
                      <i className="fa-sharp fa-solid fa-trash"></i>
                    </span>
                  </button>
                  <button onClick={() => handlecomplete(todo.id, todo.title)}>
                    <span className="button_top editbutton completebutton">
                      <i className="fa-solid fa-square-check"></i>{" "}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>
                <input
                  type="text"
                  value={addinput}
                  onChange={(e) => setAddinput(e.target.value)}
                  style={{ display: displayAddInput }}
                />
                <button className="btn" onClick={(e) => handleAddEvent(e)}>
                  Add Task
                </button>
              </th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <footer>
        <div className="footer">
          <h6>created by PRASAD RODE</h6>
        </div>
      </footer>
    </>
  );
};

export default Main;
