
// import React, { useState } from "react";
// import "../styles/ruledata.css";
// import RuleEngine from "../astfile/RuleEngine";

// const Ruledata = () => {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState(0);
//   const [department, setDepartment] = useState("");
//   const [salary, setSalary] = useState(0);
//   const [experience, setExperience] = useState(0);
//   const [results, setResults] = useState({ rule1: null, rule2: null });
//   const [error, setError] = useState(null);

//   const handleEvaluateEligibility = () => {
//     setError(null); 
//     if (!name.trim() || !department.trim() || age <= 0 || salary <= 0 || experience < 0) {
//       setError("Please provide valid values for all fields.");
//       return;
//     }

//     const userData = { age, department, salary, experience };

//     try {
//       const ast1 = RuleEngine.create_rule("((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)");
//       const ast2 = RuleEngine.create_rule("((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)");

//       const isEligibleForRule1 = RuleEngine.evaluate_rule(ast1, userData);
//       const isEligibleForRule2 = RuleEngine.evaluate_rule(ast2, userData);

//       setResults({ rule1: isEligibleForRule1, rule2: isEligibleForRule2 });
//     } catch (error) {
//       setError(`Failed to evaluate rule: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h1>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3029/3029066.png"
//             alt="icon"
//             className="icon"
//           />
//           Dynamic Rule Engine
//         </h1>

//         <form>
//           <h2>Enter User Data:</h2>
//           <div className="input-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter user's name"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="age">Age:</label>
//             <input
//               type="number"
//               id="age"
//               value={age}
//               onChange={(e) => setAge(Number(e.target.value))}
//               placeholder="Enter age"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="department">Department:</label>
//             <input
//               type="text"
//               id="department"
//               value={department}
//               onChange={(e) => setDepartment(e.target.value)}
//               placeholder="Enter department"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="salary">Salary:</label>
//             <input
//               type="number"
//               id="salary"
//               value={salary}
//               onChange={(e) => setSalary(Number(e.target.value))}
//               placeholder="Enter salary"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="experience">Experience (years):</label>
//             <input
//               type="number"
//               id="experience"
//               value={experience}
//               onChange={(e) => setExperience(Number(e.target.value))}
//               placeholder="Enter experience in years"
//             />
//           </div>

//           <button type="button" className="btn-success" onClick={handleEvaluateEligibility}>
//             Evaluate Eligibility
//           </button>
//           {error && <div className="error-message">{error}</div>}
//         </form>
//         {results.rule1 !== null && (
//           <div className={`result ${results.rule1 ? 'eligible' : 'not-eligible'}`}>
//             User is {results.rule1 ? 'eligible' : 'not eligible'} for Rule 1.
//           </div>
//         )}
//         {results.rule2 !== null && (
//           <div className={`result ${results.rule2 ? 'eligible' : 'not-eligible'}`}>
//             User is {results.rule2 ? 'eligible' : 'not eligible'} for Rule 2.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Ruledata;
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "../styles/ruledata.css";
import RuleEngine from "../astfile/RuleEngine";

const Ruledata = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState(0);
  const [experience, setExperience] = useState(0);
  const [results, setResults] = useState({ rule1: null, rule2: null });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEvaluateEligibility = async () => {
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success message

    // Input validation
    if (!name.trim() || !department.trim() || age <= 0 || salary <= 0 || experience < 0) {
      setError("Please provide valid values for all fields.");
      return;
    }

    const userData = { age, department, salary, experience };

    try {
      // Create ASTs for both rules
      const ast1 = RuleEngine.create_rule("((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)");
      const ast2 = RuleEngine.create_rule("((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)");

      // Evaluate both rules
      const isEligibleForRule1 = RuleEngine.evaluate_rule(ast1, userData);
      const isEligibleForRule2 = RuleEngine.evaluate_rule(ast2, userData);

      setResults({ rule1: isEligibleForRule1, rule2: isEligibleForRule2 });

      // If user is eligible for either rule, save the user data
      if (isEligibleForRule1 || isEligibleForRule2) {
        const response = await axios.post('http://localhost:8080/data', {
          name,
          age,
          department,
          salary,
          experience,
        });

        if (response.status === 200) {
          setSuccess("User data saved successfully.");
          console.log("User saved:", response.data);
        } else {
          throw new Error("Failed to save user data.");
        }
      }

    } catch (error) {
      setError(`Failed to evaluate rule or save user data: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3029/3029066.png"
            alt="icon"
            className="icon"
          />
          Dynamic Rule Engine
        </h1>

        <form>
          <h2>Enter User Data:</h2>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter user's name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="Enter age"
            />
          </div>
          <div className="input-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter department"
            />
          </div>
          <div className="input-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              placeholder="Enter salary"
            />
          </div>
          <div className="input-group">
            <label htmlFor="experience">Experience (years):</label>
            <input
              type="number"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              placeholder="Enter experience in years"
            />
          </div>

          <button type="button" className="btn-success" onClick={handleEvaluateEligibility}>
            Evaluate Eligibility
          </button>

          {/* Error display */}
          {error && <div className="error-message">{error}</div>}
          {/* Success display */}
          {success && <div className="success-message">{success}</div>}
        </form>

        {/* Result display */}
        {results.rule1 !== null && (
          <div className={`result ${results.rule1 ? 'eligible' : 'not-eligible'}`}>
            User is {results.rule1 ? 'eligible' : 'not eligible'} for Rule 1.
          </div>
        )}
        {results.rule2 !== null && (
          <div className={`result ${results.rule2 ? 'eligible' : 'not-eligible'}`}>
            User is {results.rule2 ? 'eligible' : 'not eligible'} for Rule 2.
          </div>
        )}
      </div>
    </div>
  );
};

export default Ruledata;

