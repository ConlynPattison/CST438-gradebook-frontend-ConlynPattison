import React, { useState } from "react";
import { SERVER_URL } from "../constants";

const AddAssignment = (props) => {
  const [assignmentName, setAssignmentName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseId, setCourseId] = useState(0);
  const [message, setMessage] = useState("");

  const headers = ["Name", "Due Date", "Course ID"];

  const onChangeName = (e) => {
    setMessage("");
    setAssignmentName(e.target.value);
  };

  const onChangeDate = (e) => {
    setMessage("");
    setDueDate(e.target.value);
  };

  const onChangeId = (e) => {
    setMessage("");
    setCourseId(e.target.value);
  };

  const handleSubmit = () => {
    const dtoObject = {
      assignmentName,
      dueDate,
      courseTitle: "",
      courseId,
    };

    setMessage("");

    fetch(`${SERVER_URL}/assignment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoObject),
    })
      .then(async (response) => {
        if (response.ok) return response.text();
        else {
          const data = await response.json();
          setMessage(data.message);
          return;
        }
      })
      .then(
        (data) =>
          data !== undefined &&
          setMessage(
            `Successfully created assignment with id: ${parseInt(data, 10)}`
          )
      );
  };

  return (
    <div>
      <h3>Create Assignment</h3>
      <div margin="auto">
        <h4 id="create-message">{message}&nbsp;</h4>
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
                  id="name-text"
                  value={assignmentName}
                  type="text"
                  placeholder="Assignment Name"
                  onChange={(e) => onChangeName(e)}
                />
              </td>
              <td>
                <input
                  name="date"
                  id="due-date"
                  value={dueDate}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => onChangeDate(e)}
                />
              </td>
              <td>
                <input
                  name="id"
                  id="course-id"
                  value={courseId}
                  type="number"
                  placeholder="00000000"
                  onChange={(e) => onChangeId(e)}
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

export default AddAssignment;
