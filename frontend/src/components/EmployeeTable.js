import React, { useEffect } from 'react';
import { notify } from "../utils";
import { Link } from 'react-router-dom';
import { DeleteEmployeeById } from '../api';

function EmployeeTable({ employee, fetchEmployees,pagination,handleUpdateEmployee }) {
    // Table headers
    const headers = ['Unique id', 'Image', 'Name', 'Email', 'Mobile No', 'Designation', 'Gender', 'Course', 'Create Date', 'Action'];
    const { currentPage, totalPages } = pagination;


    const handleDeleteEmployee = async (id) => {
        try {
            const { success, message } = await DeleteEmployeeById(id);
            console.log("Delete response:", success, message);  // Log the response
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            fetchEmployees();
        } catch (err) {
            console.error(err);
            notify('Failed to delete Employee', 'error')
        }
    }

    // TableRow component to render each employee's data
    const TableRow = ({ employee }) => {
        return (
            <tr>
                <td>{employee._id}</td>
                <td>
                    <img src={employee.profileImage} alt="Profile" width="50" height="50" />
                </td>
                <td>
                    <Link to={`/employee/${employee._id}`} className="text-decoration-none">
                        {employee.name}
                    </Link>
                </td>
                <td>{employee.email}</td>
                <td>{employee.mobile_no}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td>
                    <i
                        className=" p-2 bi bi-pencil-fill text-warning md-4"
                        role="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        onClick={() => handleUpdateEmployee(employee)}
                        title="Edit"
                    ></i>
                    <i
                        className="bi bi-trash-fill text-danger md-4"
                        role="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        onClick={() => handleDeleteEmployee(employee._id)}
                        title="Delete"
                    ></i>
                </td>
            </tr>
        );
    };

    // Array of page numbers for pagination controls
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };

    // Fetch data for a specific page
    const handlePagination = (page) => {
        if (page !== currentPage) {
            fetchEmployees('', page); // Only calls if the page is different
        }
    };
    

    useEffect(() => {
        // Initial fetch when component mounts
        fetchEmployees('', currentPage, 5);
    }, [currentPage]);

    return (
        <>
            {console.log("Employee data:", employee)} {/* Debugging the employee data */}
            
            {/* Table */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render employees or a message when no data is available */}
                    {employee && employee.length > 0 ? (
                        employee.map((emp) => <TableRow key={emp._id} employee={emp} />)
                    ) : (
                        <tr>
                            <td colSpan={headers.length}>No employees to display</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="d-flex justify-content-between align-items-center my-3">
                <span className="badge bg-primary">Page {currentPage} of {totalPages}</span>
                <div>
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePagination(page)}
                            className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="btn btn-outline-primary ms-2"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default EmployeeTable;
