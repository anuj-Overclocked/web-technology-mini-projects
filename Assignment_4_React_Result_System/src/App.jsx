import "./App.css";

const marks = [
  { subject: "Web Technology", mse: 25, ese: 60 },
  { subject: "Computer Networks", mse: 24, ese: 65 },
  { subject: "Ethical Hacking", mse: 26, ese: 62 },
  { subject: "DAA", mse: 23, ese: 64 },
];

function App() {
  const grandTotal = marks.reduce((sum, sub) => sum + sub.mse + sub.ese, 0);

  const percentage = ((grandTotal / 400) * 100).toFixed(2);

  const result = percentage >= 40 ? "PASS" : "FAIL";
  const grade =
  percentage >= 90 ? "O" :
  percentage >= 80 ? "A+" :
  percentage >= 70 ? "A" :
  percentage >= 60 ? "B+" :
  percentage >= 50 ? "B" :
  "C";

  return (
    <div className="container">
      <div className="result-card">
        <h1>VIT Semester Result</h1>

        <p><strong>Name:</strong> Anuj K</p>
        <p><strong>Roll No:</strong> 15</p>
        <p><strong>Branch:</strong> Computer Engineering</p>
        <p><strong>Semester:</strong> Semester V</p>

        <h2>Marks Details</h2>

        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>MSE (30)</th>
              <th>ESE (70)</th>
              <th>Total (100)</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((sub, index) => (
              <tr key={index}>
                <td>{sub.subject}</td>
                <td>{sub.mse}</td>
                <td>{sub.ese}</td>
                <td>{sub.mse + sub.ese}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Percentage : {percentage}%</h3>

<h3>Grade : {grade}</h3>

<h3 className={result === "PASS" ? "pass" : "fail"}>
  Result : {result}
</h3>
    <hr />

<p className="footer">
  © 2026 VIT Semester Result Portal
</p>

</div>
</div>
  );
}

export default App;