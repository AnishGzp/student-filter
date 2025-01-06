import { useState } from "react";
import "./App.css";

function App() {
  const [percentageMark, setPercentageMark] = useState("");
  const [totalMarks, setTotalMarks] = useState(""); // Total marks for each student
  const [students, setStudents] = useState([]); // List of student percentages
  const [summary, setSummary] = useState({
    below40: [],
    between40and60: [],
    above60: [],
  });

  const handleTotalMarksChange = (e) => {
    setTotalMarks(e.target.value);
  };

  const handleSubmit = () => {
    // Parse the textarea input into an array of numbers
    const marksArray = totalMarks
      .split(/[\s,]+/) // Split by spaces, commas, or newlines
      .map((mark) => Number(mark.trim())) // Convert to numbers
      .filter((mark) => !isNaN(mark) && mark >= 0); // Filter valid numbers

    // Group students by percentage ranges
    const below40 = [];
    const between40and60 = [];
    const above60 = [];

    marksArray.forEach((mark, index) => {
      const percentage = parseFloat(mark / percentageMark).toFixed(2) * 100; // Percentage is the value entered
      console.log(percentage);

      const student = { id: index + 1, percentage };

      if (percentage < 40) {
        below40.push(student);
      } else if (percentage >= 40 && percentage <= 60) {
        between40and60.push(student);
      } else {
        above60.push(student);
      }
    });

    // Update state
    setStudents(marksArray);
    setSummary({
      below40,
      between40and60,
      above60,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Percentage Grouping</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="inpt">Enter the total marks</label>
        <input
          type="number"
          id="inpt"
          style={{
            display: "block",
            width: "100%",
            height: "30px",
            marginTop: "10px",
          }}
          onChange={(e) => setPercentageMark(e.target.value)}
        />

        <label>
          Enter Total Marks (Percentages) for Students:
          <textarea
            value={totalMarks}
            onChange={handleTotalMarksChange}
            placeholder="Enter marks separated by spaces, commas, or newlines"
            style={{
              display: "block",
              width: "100%",
              height: "100px",
              marginTop: "10px",
            }}
          ></textarea>
        </label>
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Group Students
        </button>
      </div>
      <div>
        <h2>Summary</h2>
        <p>Below 40%: {summary.below40.length} students</p>
        <p>40% - 60%: {summary.between40and60.length} students</p>
        <p>Above 60%: {summary.above60.length} students</p>
      </div>
      <div>
        <h2>Grouped Students</h2>
        <h3>Below 40%</h3>
        <ul>
          {summary.below40.map((student) => (
            <li key={student.id}>
              Student {student.id}: {student.percentage}%
            </li>
          ))}
        </ul>
        <h3>40% - 60%</h3>
        <ul>
          {summary.between40and60.map((student) => (
            <li key={student.id}>
              Student {student.id}: {student.percentage}%
            </li>
          ))}
        </ul>
        <h3>Above 60%</h3>
        <ul>
          {summary.above60.map((student) => (
            <li key={student.id}>
              Student {student.id}: {student.percentage}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
