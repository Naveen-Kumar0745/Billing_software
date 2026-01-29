import express from "express";
import cors from "cors";
import authHandler from "./api/auth.js";
import billsHandler from "./api/bills.js";

const app = express();
app.use(cors());
app.use(express.json());

// Auth routes
app.post("/api/auth", authHandler);

// Bills routes
app.get("/api/bills", billsHandler);
app.post("/api/bills", billsHandler);

// Health check
app.get("/", (req, res) => {
  res.send("Billing backend running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
