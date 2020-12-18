"use strict";

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
// TODO: Import Routers


const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// TODO: API Routes


// Catch-all handler to send back React's index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode, and listening on PORT ${PORT}.`));