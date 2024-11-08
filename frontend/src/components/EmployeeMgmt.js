import React, { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import { DeleteEmployeeById, GetAllEmployees } from "../api";
import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";
import Navbar from '../components/Navbar'; // Import Navbar

function EmployeeMgmt() {
    const [showModal, setShowModal] = useState(false);
    const [updateEmpObj, setUpdateEmpObj] = useState(null);
    const [employeeData, setEmployeeData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });
    
    // Fetch employees based on search term, page, and limit
    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        try {
            const data = await GetAllEmployees(search, page, limit);
            setEmployeeData((prevData) => ({
                employees: data.employees || [],
                pagination: {
                    ...prevData.pagination,
                    currentPage: data.pagination.currentPage,
                    totalEmployees: data.pagination.totalEmployees,
                    totalPages: data.pagination.totalPages
                }
            }));
        } catch (err) {
            alert("Error", err);
        }
    };

    // Fetch employees when component mounts or pagination changes
    useEffect(() => {
        fetchEmployees('', employeeData.pagination.currentPage, employeeData.pagination.pageSize);
    }, [employeeData.pagination.currentPage, employeeData.pagination.pageSize]);  // Only trigger when page or size changes

    // Open Add Employee modal
    const handleAddEmployee = () => {
        setUpdateEmpObj(null);
        setShowModal(true);
    };

    // Open Update Employee modal with selected employee data
    const handleUpdateEmployee = (empObj) => {
        setUpdateEmpObj(empObj);
        setShowModal(true);
    };

    // Search employees based on search term and reset to page 1
    const handleSearch = (e) => {
        const term = e.target.value;
        fetchEmployees(term, 1, employeeData.pagination.pageSize); // Reset to page 1 for search
    };

    // Handle page change (pagination)
    const handlePagination = (page) => {
        setEmployeeData((prevData) => ({
            ...prevData,
            pagination: {
                ...prevData.pagination,
                currentPage: page,
            },
        }));
    };

    return (
        <div>
            {/* Navbar placed above the main content */}
            <Navbar />

            <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
                <h1>Employee Management App</h1>
                <div className="w-100 d-flex justify-content-center">
                    <div className="w-80 border bg-light p-3" style={{ width: "80%" }}>
                        <div className="d-flex justify-content-between mb-3">
                            <button className="btn btn-primary" onClick={handleAddEmployee}>
                                Add Employee
                            </button>
                            <input
                                type="text"
                                placeholder="Search employees..."
                                className="form-control w-50"
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>

                {/* Display Employee Table if employees are available */}
                {employeeData.employees.length > 0 ? (
                    <EmployeeTable
                        employee={employeeData.employees}
                        fetchEmployees={fetchEmployees}
                        pagination={employeeData.pagination}
                        handleUpdateEmployee={handleUpdateEmployee}
                        handlePagination={handlePagination}
                    />
                ) : (
                    <p>No employees found</p>
                )}

                {/* Modal for Add/Update Employee */}
               
                <AddEmployee
                    updateEmpObj={updateEmpObj}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    fetchEmployees={fetchEmployees}
                />

                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            </div>
        </div>
    );
}

export default EmployeeMgmt;
