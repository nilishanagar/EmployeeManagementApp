import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetEmployeeById } from "../api";
import { notify } from "../utils";
import "./EmployeeDetails.css"; // Import the CSS file

export const EmployeeDetails = () => {
  const { id } = useParams();
  const [empDetails, setEmpDetails] = useState({});
  const navigate = useNavigate();

  console.log(id);

  const fetchEmpById = async () => {
    try {
      const { data } = await GetEmployeeById(id);
      console.log(data);
      setEmpDetails(data);
    } catch (err) {
      notify("Failed to fetch employee, try again later..", "error");
    }
  };

  useEffect(() => {
    fetchEmpById();
  }, [id]);

  return (
    <div className="container px-5 mx-auto mt-5">
      <div className="card px-4">
        <div className="card-header">
          <h2>Employee Details</h2>
        </div>

        <div className="card-body ">
          <div className="employee-details">
            <div className="employee-image">
              <img
                src={empDetails.profileImage}
                alt={empDetails.name}
                className="img-fluid rounded"
              />
            </div>

            <div className="employee-info">
              <p><strong>Name: </strong>{empDetails.name}</p>
              <p><strong>Email: </strong>{empDetails.email}</p>
              <p><strong>Mobile No: </strong>{empDetails.mobile_no}</p>
              <p><strong>Designation: </strong>{empDetails.designation}</p>
              <p><strong>Course: </strong>{Array.isArray(empDetails.course) ? empDetails.course.join(", ") : empDetails.course}</p>
            </div>
          </div>

          <button className="btn btn-primary mt-3" onClick={() => navigate('/employee')}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
