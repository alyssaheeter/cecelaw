import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { requireAuth } from "./middleware/auth";
import casesRouter from "./routes/cases";
import exportRouter from "./routes/export";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.send("OK");
});

app.use("/cases", requireAuth, casesRouter);
app.use("/cases", requireAuth, exportRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
