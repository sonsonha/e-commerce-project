const express = require('express');
const sql = require('mssql');
const cors = require('cors');
// const config  = require('./config/config');
const userRoutes = require('./routes/userRoutes'); // Import routes
const variantRoutes = require('./routes/variantRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');  

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
app.use('/api/categories', categoryRoutes);
app.use('/api/variants', variantRoutes);
app.use('/api/products', productRoutes);  // Sử dụng routes cho sản phẩm

app.use(express.json());


// Lắng nghe server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
