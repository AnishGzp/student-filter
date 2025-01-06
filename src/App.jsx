import React, { useState } from "react";
import "./App.css";

function App() {
  const [totalMarks, setTotalMarks] = useState("");
  const [studentMarks, setStudentMarks] = useState("");
  const [summary, setSummary] = useState({
    below40: [],
    bw40and50: [],
    bw50and60: [],
    bw60and70: [],
    bw70and80: [],
    bw80and90: [],
    above90: [],
  });

  const handleSubmit = () => {
    const marksArray = studentMarks
      .split(/[\s,]+/)
      .map((mark) => Number(mark.trim()))
      .filter((mark) => !isNaN(mark) && mark >= 0);

    const below40 = [];
    const bw40and50 = [];
    const bw50and60 = [];
    const bw60and70 = [];
    const bw70and80 = [];
    const bw80and90 = [];
    const above90 = [];

    marksArray.forEach((mark, index) => {
      const percentage = parseFloat(mark / totalMarks).toFixed(2) * 100;
      const student = { id: index + 1, percentage };

      if (percentage < 40) {
        below40.push(student);
      } else if (percentage >= 40 && percentage < 50) {
        bw40and50.push(student);
      } else if (percentage >= 50 && percentage < 60) {
        bw50and60.push(student);
      } else if (percentage >= 60 && percentage < 70) {
        bw60and70.push(student);
      } else if (percentage >= 70 && percentage < 80) {
        bw70and80.push(student);
      } else if (percentage >= 80 && percentage < 90) {
        bw80and90.push(student);
      } else if (percentage >= 90) {
        above90.push(student);
      }
    });

    setSummary({
      below40,
      bw40and50,
      bw50and60,
      bw60and70,
      bw70and80,
      bw80and90,
      above90,
    });
  };

  console.log(summary);

  return (
    <div className="container">
      <h3>Students Filter on Percentage</h3>
      <div className="instruction">
        <h4>Instruction</h4>
        <ul>
          <li>
            Enter students number by comma, space or on new line [marks marks
            marks ...]
          </li>
          <li>Do not enter two marks together [marksmarks]</li>
          <li>Click Group Students after entering all the marks</li>
        </ul>
      </div>
      <div className="inputBox">
        <div>
          <label htmlFor="totalMarks">Enter the total marks</label>
          <input
            type="number"
            id="totalMarks"
            onChange={(e) => setTotalMarks(e.target.value)}
          />
        </div>
        <label htmlFor="studentMarks">Enter the students marks</label>
        <textarea
          id="studentMarks"
          onChange={(e) => setStudentMarks(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Group Students</button>
      </div>

      <div className="detailBox">
        <table border={1}>
          <thead>
            <td>Below 40%</td>
            <td>40% to 50%</td>
            <td>50% to 60%</td>
            <td>60% to 70%</td>
            <td>70% to 80%</td>
            <td>80% to 90%</td>
            <td>Above 90%</td>
            <td>Total Students</td>
          </thead>
          <tbody>
            <td>{summary.below40.length}</td>
            <td>{summary.bw40and50.length}</td>
            <td>{summary.bw50and60.length}</td>
            <td>{summary.bw60and70.length}</td>
            <td>{summary.bw70and80.length}</td>
            <td>{summary.bw80and90.length}</td>
            <td>{summary.above90.length}</td>
            <td>
              {summary.below40.length +
                summary.bw40and50.length +
                summary.bw50and60.length +
                summary.bw60and70.length +
                summary.bw70and80.length +
                summary.bw80and90.length +
                summary.above90.length}
            </td>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
