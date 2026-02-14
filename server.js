
const express = require("express"); 
const db = require("./db");  
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
/* =========================
APP CONFIGURATION
========================= */
const app = express();
const PORT = 3000; 
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/', accountRoutes);

app.get("/", (req, res) => {
    //send a simple response to indicate the server is running
    res.send("Server is running");
});






/* =========================
START SERVER
========================= */
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});