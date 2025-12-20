import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY in backend/.env" });
  }

  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    const SYSTEMT_PROMPT=`You are a medical assistant.
For every user health query, respond only in three bullet points:
Immediate pre-medical steps the user can safely take at home.
Things to avoid to prevent worsening the condition.
Doctor to consult(choose amongst them, which is closely related to that disease)

Dr Rahul Sharama
General physician

Dr Ananya Verma
Gynecologist

Dr. Amit Sharma
General physician

Dr. Neha Pandey
General physician

Dr. Neha Pandey
General physician

Dr. Rahul Mehta
Dermatologist

Dr. Ankit Gupta
Neurologist

Dr. Pooja Malhotra
Dermatologist

Rules:
Give accurate, safe, non-diagnostic information only.
Always recommend a doctor in the third bullet point
Do not give extra explanations, warnings, or additional text outside the three bullets.
Keep language simple, clear, and practical.`;
    const prompt=`${SYSTEMT_PROMPT}\n\n Topic:${message}`;
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return res.json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Gemini request failed",
      details: err?.message || String(err),
    });
  }
});

export default router;

// import express from "express"
// import axios from "axios"
// import dotenv from "dotenv"
// dotenv.config();

// const router = express.Router();

// router.post("/", async (req, res) => {
//     const { message } = req.body;
//     console.log(message)
//     if (!message || !message.trim()) {
//         return res.status(400).json({
//             error: "message is required"
//         })
//     }

//     const HF_API_KEY = process.env.HF_API_KEY;
//     if (!HF_API_KEY) {
//         return res.status(500).json({
//             error: "missing hf_api_key in backend"
//         })
//     }

//     const model = process.env.HF_MODEL || "HuggingFaceH4/zephyr-7b-beta";
//     try {
//         const response = await axios.post(
//             "https://router.huggingface.co/v1/chat/completions",
//             {
//                 model,
//                 messages: [
//                     {
//                         role: "system",
//                         content:
//                             "You are a medical info assistant.\n" +
//                             "You MUST answer the user.\n" +
//                             "Output format EXACTLY:\n" +
//                             "FINAL:\n" +
//                             "- Possible cause: ...\n" +
//                             "- Common causes: ...\n" +
//                             "- Home care: ...\n" +
//                             "- Red flags: ...\n" +
//                             "- Doctor: ...\n" +
//                             "Do not output <think>. Do not output anything before FINAL.",
//                     },
//                     { role: "user", content: message },
//                 ],
//                 temperature: 0.7,
//                 max_tokens: 200
//             }, {
//             headers: {
//                 Authorization: `Bearer ${HF_API_KEY}`,
//                 "Content-Type": "application/json",
//             }
//         }
//         )

//         const replyRaw =
//             response.data?.choices?.[0]?.message?.content ??
//             response.data?.choices?.[0]?.text ??
//             "";

//         let reply = String(replyRaw).trim();

//         // If it starts with <think>, just drop the tag and use the text as the answer
//         reply = reply.replace(/^<think>\s*/i, "").trim();
//         console.log("replyRaw=", replyRaw)
//         console.log("reply=", reply)
//         return res.json({ reply: reply || "No response" });



//     }
//     catch (err) {
//         const details = err.response?.data || err.message || err;
//         console.log(details);
//         return res.status(500).json({
//             error: "hugging face request failed",
//             details,
//         })
//     }
// })

// export default router;