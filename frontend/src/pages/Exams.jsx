import { useContext, useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const ExamsPage = () => {
  const { token } = useAppContext();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.REACT_APP_API_URL}/attt/exams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setExams(data))
      .catch(err => console.error("Error fetching exams", err));
  }, [token]);

  return (
    <div>
      <h2>Driving Exam Dates</h2>
      <ul>
        {exams.map((exam, i) => (
          <li key={i}>{exam.date} – {exam.location} – {exam.availableSeats} seats</li>
        ))}
      </ul>
    </div>
  );
};

export default ExamsPage;
// Compare this snippet from frontend/src/context/AppContext.js: