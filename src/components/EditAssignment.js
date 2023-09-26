import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";

const EditAssignment = (props) => {
  const [assignment, setAssignment] = useState({});

  const assignmentId = /\d+$/.exec(window.location.pathname)[0];
  const headers = ["Name", "Due Date", "Course Title", "Course ID"];

  useEffect(() => {
    fetchAssignment();
  }, []);

  const fetchAssignment = () => {
    fetch(`${SERVER_URL}/assignment/${assignmentId}`)
      .then((response) => response.json())
      .then((data) => {
        setAssignment(data);
      })
      .catch((err) => console.error(err));
  };

  const onChangeName = (e) => {
    setAssignment((prev) => ({ ...prev, assignmentName: e.target.value }));
  };

  const onChangeDate = (e) => {
    setAssignment((prev) => ({ ...prev, dueDate: e.target.value }));
  };

  const onChangeTitle = (e) => {
    setAssignment((prev) => ({ ...prev, courseTitle: e.target.value }));
  };

  const onChangeId = (e) => {
    setAssignment((prev) => ({ ...prev, courseId: e.target.value }));
  };

  const handleSubmit = async () => {
    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignment),
    }).then((response) => {
      // TODO: Add message here
      if (response.ok);
      else throw new Error(`POST assignment error: ${response.statusText}`);
    });
  };

  return (
    <div>
      <h3>Update Assignment</h3>
      <div margin="auto">
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
              <td>
                <input
                  name="title"
                  value={assignment.courseTitle}
                  type="text"
                  placeholder="DEP - COURSE"
                  onChange={(e) => onChangeTitle(e)}
                />
              </td>
              <td>
                <input
                  name="id"
                  value={assignment.courseId}
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

export default EditAssignment;
