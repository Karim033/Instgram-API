const express = require('express');
const connectDB = require('./DB/connectionDB');
const { userRouter, postRouter, reportRouter } = require('./Router/allRouter');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(userRouter, postRouter, reportRouter)
connectDB();
app.listen(port, () => console.log(`listening on http://localhost:${port}`));


