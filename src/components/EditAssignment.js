import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";

const EditAssignment = (props) => {
  const [assignment, setAssignment] = useState({});
  const [message, setMessage] = useState("");

  const assignmentId = /\d+$/.exec(window.location.pathname)[0];
  const token = sessionStorage.getItem("token") || "";
  const headers = ["Name", "Due Date"];

  useEffect(() => {
    fetchAssignment();
  }, []);

  const fetchAssignment = () => {
    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAssignment(data);
      })
      .catch((err) => console.error(err));
  };

  const onChangeName = (e) => {
    setMessage("");
    setAssignment((prev) => ({ ...prev, assignmentName: e.target.value }));
  };

  const onChangeDate = (e) => {
    setMessage("");
    setAssignment((prev) => ({ ...prev, dueDate: e.target.value }));
  };

  const handleSubmit = async () => {
    setMessage("");

    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(assignment),
    }).then(async (response) => {
      if (response.ok) {
        setMessage("Successfully updated course");
      } else {
        const data = await response.json();
        setMessage(data.message);
        console.error(`PUT assignment error: ${response.statusText}`);
      }
    });
  };

  return (
    <div>
      <h3>Update Assignment</h3>
      <div margin="auto">
        <h4>{message}&nbsp;</h4>
        <table className="Center">
          <thead>
            <tr>
              {headers.map((title, idx) => (
                <th key={idx}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="name"
                  value={assignment.assignmentName}
                  type="text"
                  placeholder="Assignment Name"
                  onChange={(e) => onChangeName(e)}
                />
              </td>
              <td>
                <input
                  name="date"
                  value={assignment.dueDate}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => onChangeDate(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button id="sgrade" type="button" margin="auto" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditAssignment;
