import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 5003;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // Add this to handle JSON requests

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Resource routes
app.get("/resources", (req, res) => {
  res.sendFile(path.join(__dirname, "public/resource.html"));
});

// Mental Skills routes
app.get("/gamepage", (req, res) => {
  res.sendFile(path.join(__dirname, "public/gamePage.html"));
});

app.get("/mental-tasks", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Motivational Videos/Motivational.html"));
});

// Community route
app.get("/community", (req, res) => {
  res.sendFile(path.join(__dirname, "public/community.html"));
});

// Test route
app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "public/test/test.html"));
});

// Donate route
app.get("/donate", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Donate/donate.html"));
});

// Sign in route
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/signin.html"));
});

// Learning routes
app.get("/learnOne", (req, res) => {
  res.sendFile(path.join(__dirname, "public/adpitor-html/index.html"));
});

app.get("/learnTwo", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Meditation/Meditation.html"));
});

// Meditation route
app.get("/meditation", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Meditation/Meditation/Meditation.html"));
});

// Motivational videos route
app.get("/motivational", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Motivational Videos/Motivational Videos/Motivational.html"));
});

// Game routes
app.get("/games/tic-tac-toe", (req, res) => {
  res.sendFile(path.join(__dirname, "public/games/tic-tac-toe.html"));
});

app.get("/games/paint", (req, res) => {
  res.sendFile(path.join(__dirname, "public/games/paint.html"));
});

app.get("/games/simon", (req, res) => {
  res.sendFile(path.join(__dirname, "public/games/simon.html"));
});

app.get("/games/pattern", (req, res) => {
  res.sendFile(path.join(__dirname, "public/game-hackathon/game-law/frontEnd/SEEKHO/Game page.html"));
});

app.get("/games/puzzle", (req, res) => {
  res.sendFile(path.join(__dirname, "public/games/puzzle.html"));
});

// Motivational video navigation routes
app.get("/motivational-videos/:id", (req, res) => {
  const videoId = req.params.id;
  res.sendFile(path.join(__dirname, `public/Motivational Videos/Motivational${videoId}.html`));
});

// Footer routes
app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "public/help.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public/about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public/contact.html"));
});

app.get("/terms", (req, res) => {
  res.sendFile(path.join(__dirname, "public/terms.html"));
});

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, "public/privacy.html"));
});

// Review submission route
app.post("/submit-review", (req, res) => {
  // Handle review submission logic here
  res.json({ message: "Review submitted successfully" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Function to start server
const startServer = (portNumber) => {
  try {
    const server = app.listen(portNumber, () => {
      console.log(`Server is running on http://localhost:${portNumber}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${portNumber} is busy, trying ${portNumber + 1}`);
        server.close();
        startServer(portNumber + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer(port);
