const express = require("express");
const heroRoutes = require("./routes/heroRoutes");
const app = express();
app.use(express.json());
app.use("/api/heroes", heroRoutes);
app.listen(3000, () => console.log("WikiWatch: http://localhost:3000"));
