const BASE_URL = 'http://localhost:8000';

export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employee?page=${page}&limit=${limit}&search=${search}`;

    try {
        const options = {
            method: 'GET',
            'Content-Type': 'application/json',
        };

        const result = await fetch(url, options);
        const data = await result.json();  
        // console.log("nili",data.data);
        return data.data;
    } catch (err) {
        console.error(err);
        return { error: 'An error occurred while fetching employees.' };
    }
};

export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/employee`;

    try {
        const formData = new FormData();
        for (const key in empObj) {
            formData.append(key, empObj[key]);
        }

        const options = {
            method: 'POST',
            body: formData, // No Content-Type header needed
        };

        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error(err);
        return { error: 'An error occurred while creating the employee.' };
    }
};

export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employee/${id}`;
    console.log('form', empObj);

    try {
        const formData = new FormData();
        for (const key in empObj) {
            formData.append(key, empObj[key]);
        }

        const options = {
            method: 'PUT',
            body: formData, // No Content-Type header needed
        };

        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error(err);
        return { error: 'An error occurred while updating the employee.' };
    }
};

export const DeleteEmployeeById = async (id) => {
    const url = `${BASE_URL}/api/employee/${id}`;

    try {
        const options = {
            method: 'DELETE',
            'Content-Type': 'application/json',
        };

        const result = await fetch(url, options);
        const data = await result.json();
        console.log('Delete data:',data);
        return data;
    } catch (err) {
        console.error(err);
        return { error: 'An error occurred while deleting the employee.' };
    }
};

export const GetEmployeeById = async (id) => {
    const url = `${BASE_URL}/api/employee/${id}`;

    try {
        const options = {
            method: 'GET',
            'Content-Type': 'application/json',
        };

        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error(err);
        return { error: 'An error occurred while fetching the employee.' };
    }
};
