const express=require('express');
const app= express();
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
const PORT=process.env.PORT || 8080;

require('./Models/db');

const EmployeeRouter = require('./Routes/EmployeeRoutes');
const bodyparser = require('body-parser'); 
const cors=require('cors');

app.use(cors());
app.use(bodyparser.json());
                  
app.use('/auth',AuthRouter);
app.use('/api/employee',EmployeeRouter);

console.log("Attempting to listen on port:", PORT);
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});