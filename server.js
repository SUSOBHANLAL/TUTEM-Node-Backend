const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const vehicleTypeRoutes = require("./routes/vehicleTypeRoutes");
const driverVehicleDetailsRoutes = require("./routes/driverVehicleDetailsRoutes");
const driverStatusRoutes = require("./routes/driverStatusRoutes");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors for handling CORS issues
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
connectDB();

// Middleware
// Middleware
app.use(cors()); // Enable CORS for all routes
// Parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/vehicle-type/", vehicleTypeRoutes);
app.use("/api/driver-vehicle-details", driverVehicleDetailsRoutes);
app.use("/api/driver-status", driverStatusRoutes);

// app.use("/api/vehicle-type", require("./routes/vehicleTypeRoutes"));
// app.use(
//   "/api/driver-vehicle-details",
//   require("./routes/driverVehicleDetailsRoutes")
// );
// app.use("/api/driver-status", require("./routes/driverStatusRoutes"));

const { updateLocation } = require("./controllers/driverStatusController");

///////////////////////////////////////////////////////////////////////////
// here  trhis  are the for socket.io
//////////////////////////////////////////////////////
// Routes
// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set up views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const driverRoutes = require("./routes/driverRoutes");

app.use("/driver", driverRoutes);

// Socket.IO logic for location updates
const driverController = require("./controllers/driverController");
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for location updates from the client
  socket.on("locationUpdate", (data) => {
    driverController.updateLocation(data);
    // Broadcast the updated location to other clients
    socket.broadcast.emit("driverLocationUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
