import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const BOT_TOKEN = "7279946400:AAH-WdHZDESeI2uBrd26PnVF8YlMZkN4l4s";
const CHAT_ID = "5281349537"; // tumhara chat id

// === Website → Telegram route ===
app.post("/send", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: data.description });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// === Server start ===
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
