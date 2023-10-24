import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";
import { Link, useHistory } from "react-router-dom";

function ListAssignment(props) {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");
  const [forceChecked, setForceChecked] = useState(false);

  useEffect(() => {
    // called once after intial render
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    console.log("fetchAssignments");
    setMessage("");
    fetch(`${SERVER_URL}/assignment`)
      .then((response) => response.json())
      .then((data) => {
        console.log("assignment length " + data.length);
        setAssignments(data);
      })
      .catch((err) => console.error(err));
  };

  const handleToggleCheck = (e) => {
    setMessage("");
    setForceChecked(e.target.checked);
  };

  const handleDelete = (id) => {
    setMessage("");
    console.log("deleteAssignment " + id);
    fetch(
      `${SERVER_URL}/assignment/${id}${forceChecked ? "?force=true" : ""}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          setAssignments(
            [...assignments].filter((assignment) => assignment.id !== id)
          );
          setMessage("Assignment successfully deleted");
        } else {
          const data = await response.json();
          setMessage(data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  const headers = [
    "Assignment Name",
    "Course Title",
    "Due Date",
    " ",
    " ",
    " ",
  ];

  return (
    <div>
      <h3>Assignments</h3>
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
            {assignments.map((row, idx) => (
              <tr key={idx}>
                <td>{row.assignmentName}</td>
                <td>{row.courseTitle}</td>
                <td>{row.dueDate}</td>
                <td>
                  <Link to={`/gradeAssignment/${assignments[idx].id}`}>
                    Grade
                  </Link>
                </td>
                <td>
                  <Link to={`/editAssignment/${assignments[idx].id}`}>
                    Edit
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <Link id="add-assignment" to={`/addAssignment`}>
          {" "}
          Add Assignment{" "}
        </Link>
      </div>
      <div className="right container">
        <label htmlFor="force"> Force Delete? </label>
        <input
          id="force"
          type="checkbox"
          value={forceChecked}
          onChange={(e) => handleToggleCheck(e)}
        ></input>
      </div>
    </div>
  );
}

export default ListAssignment;
