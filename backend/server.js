const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express();
app.use(cors());
app.use(express.json()); // This middleware allows us to parse JSON request bodies

const config = {
    user: "sa",
    password: "ssha1227",
    server: "DESKTOP-IOFU9JG",
    database: "shopee",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instanceName: "SQLEXPRESS",
    },
    port: 1433
};

// Kiểm tra kết nối SQL Server
sql.connect(config)
    .then(() => {
        console.log("Connected to SQL Server successfully!");
    })
    .catch(err => {
        console.error("Error connecting to SQL Server:", err);
    });

// Sử dụng routes cho người dùng
app.use('/api/users', userRoutes);

// Lắng nghe server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
