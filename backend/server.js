const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/database");

// =======================================
// Routes
// =======================================
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const speechRoutes = require("./routes/speechRoutes");
const profileRoutes = require("./routes/profileRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// =======================================
// Middleware
// =======================================
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// =======================================
// Static Folder (Uploads)
// =======================================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =======================================
// API Routes
// =======================================
app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/speech", speechRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/interview", interviewRoutes);
console.log("Registering Dashboard Routes...");

app.use("/api/dashboard", dashboardRoutes);

// =======================================
// Home Route
// =======================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 AI Interview Backend Running Successfully",
  });
});

// =======================================
// 404 Handler
// =======================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found.`,
  });
});

// =======================================
// Global Error Handler
// =======================================
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =======================================
// Start Server
// =======================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("======================================");
      console.log("🚀 AI Interview Backend Started");
      console.log(`🌐 Server : http://localhost:${PORT}`);
      console.log(
        `📂 Environment : ${
          process.env.NODE_ENV || "development"
        }`
      );
      console.log("======================================");
    });

  } catch (error) {

    console.error("❌ Failed to start server");

    console.error(error);

    process.exit(1);

  }
};

startServer();