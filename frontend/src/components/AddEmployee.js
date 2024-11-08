import React, { useEffect, useState } from 'react';
import { CreateEmployee, UpdateEmployeeById } from '../api';
import { notify } from '../utils';

function AddEmployee({updateEmpObj, showModal, setShowModal, fetchEmployees }) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile_no: '',
        designation: '',
        gender: '',
        course: [],
        profileImage: null
    });

    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        console.log('update',updateEmpObj);
        if (updateEmpObj) {
            console.log('Employee to update: ', updateEmpObj); 
            setEmployee(updateEmpObj);
            setUpdateMode(true);
        }else {
          resetEmployeeStates();
          setUpdateMode(false);}
    }, [updateEmpObj]);

    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            mobile_no: '',
            designation: '',
            gender: '',
            course: [],
            profileImage: null
        });
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setEmployee(prevState => {
                const updatedCourses = checked
                    ? [...prevState.course, value]
                    : prevState.course.filter(course => course !== value);
                return { ...prevState, course: updatedCourses };
            });
        } else if (type === 'radio') {
            setEmployee({ ...employee, [name]: value });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (employee.mobile_no.length !== 10) {
        notify("Mobile number must be 10 digits long", "error");
        return;
    }
      try {
          const { success, message } = updateMode
              ? await UpdateEmployeeById(employee, employee._id)
              : await CreateEmployee(employee);
          console.log('create OR update ', success, message);
          if (success) {
              notify(message, 'success');
              fetchEmployees();  // Refresh the employee list
              setShowModal(false);  // Close the modal after adding the employee

          } else {
              notify(message, 'error')
          }
         
          resetEmployeeStates();
          setShowModal(false);
          setUpdateMode(false);
      } catch (err) {
          console.error(err);
          notify('Failed to create Employee', 'error')
      }
    };

    return (
        <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        {
                    console.log('updateemp',updateEmpObj)
                }
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>{updateMode ? 'Update Employee' : 'Add Employee'}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={employee.name} onChange={handleChange} required />

                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} required />

                            <label className="form-label">Mobile No</label>
                            <input type="text" className="form-control" name="mobile_no" value={employee.mobile_no} onChange={handleChange} required  maxLength="10"/>

                            <label className="form-label">Designation</label>
                            <select name="designation" value={employee.designation} onChange={handleChange}>
                                <option value="">select</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>

                             <div>
                             <label className="form-label">Gender</label>
                            <input type="radio" name="gender" value="M" checked={employee.gender === 'M'} onChange={handleChange} /> Male
                            <input type="radio" name="gender" value="F" checked={employee.gender === 'F'} onChange={handleChange} /> Female
                             </div>
                           

                             <div>
                             <label className="form-label" >Courses:</label>
                            <input type="checkbox" name="course" value="MCA" checked={employee.course.includes('MCA')} onChange={handleChange} /> MCA
                            <input type="checkbox" name="course" value="BCA" checked={employee.course.includes('BCA')} onChange={handleChange} /> BCA
                            <input type="checkbox" name="course" value="BSC" checked={employee.course.includes('BSC')} onChange={handleChange} /> BSC
                             </div>
                          

                            <label className="form-label">Image upload:</label>
                            <input type="file" name="profileImage" onChange={handleFileChange} />

                            <button className="btn btn-primary" type="submit">{updateMode ? 'Update' : 'Save'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
