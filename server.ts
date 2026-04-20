import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Admin, Contact, Enquiry, Gallery } from "./src/models.ts";

dotenv.config();

async function getMongoUri(): Promise<string> {
  const uri = process.env.MONGODB_URI;
  if (uri && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"))) {
    return uri;
  }
  // No URI configured — spin up an in-memory MongoDB for development
  console.log("INFO: No MONGODB_URI found. Starting in-memory MongoDB for development...");
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const mongod = await MongoMemoryServer.create();
  const memUri = mongod.getUri();
  console.log("INFO: In-memory MongoDB ready at", memUri);
  return memUri;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Database Connection
  try {
    const mongoUri = await getMongoUri();
    await mongoose.connect(mongoUri);
    console.log("SUCCESS: Connected to MongoDB");
    // Seed Admin if not exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
      await Admin.create({ username: "admin", password: hashedPassword });
      console.log("Admin seeded — username: admin, password:", process.env.ADMIN_PASSWORD || "admin123");
    }
  } catch (err) {
    console.error("CRITICAL: MongoDB connection failed. Database features will be disabled.", err);
    mongoose.set('bufferCommands', false);
  }

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET || "secret", (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // --- API Routes ---

  // Auth
  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin && await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET || "secret");
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  // Contacts
  app.post("/api/contacts", async (req, res) => {
    try {
      const contact = await Contact.create(req.body);
      res.status(201).json(contact);
    } catch (err: any) {
      if (err.name === 'MongooseError' || err.name === 'MongoError') {
        res.status(503).json({ message: "Database not available. Please try again later." });
      } else {
        res.status(400).json({ message: "Error saving contact" });
      }
    }
  });

  app.get("/api/contacts", authenticateToken, async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json(contacts);
    } catch (err) {
      res.status(503).json({ message: "Database not available" });
    }
  });

  app.delete("/api/contacts/:id", authenticateToken, async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  });

  app.patch("/api/contacts/:id/read", authenticateToken, async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(contact);
  });

  // Enquiries
  app.post("/api/enquiries", async (req, res) => {
    try {
      const enquiry = await Enquiry.create(req.body);
      res.status(201).json(enquiry);
    } catch (err: any) {
      if (err.name === 'MongooseError' || err.name === 'MongoError') {
        res.status(503).json({ message: "Database not available. Please try again later." });
      } else {
        res.status(400).json({ message: "Error saving enquiry" });
      }
    }
  });

  app.get("/api/enquiries", authenticateToken, async (req, res) => {
    try {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 });
      res.json(enquiries);
    } catch (err) {
      res.status(503).json({ message: "Database not available" });
    }
  });

  app.delete("/api/enquiries/:id", authenticateToken, async (req, res) => {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  });

  app.patch("/api/enquiries/:id/read", authenticateToken, async (req, res) => {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(enquiry);
  });

  // Gallery
  app.get("/api/gallery", async (req, res) => {
    try {
      const items = await Gallery.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      // Return empty array instead of 503 so frontend mock data takes over
      res.json([]);
    }
  });

  app.post("/api/gallery", authenticateToken, async (req, res) => {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
  });

  app.delete("/api/gallery/:id", authenticateToken, async (req, res) => {
    await Gallery.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
