const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoutes);

const PORT = process.env.PORT || 3000;
sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
         console.log(`Backend server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed', err.message);
    });