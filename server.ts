import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini AI Setup
  const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/ai/analyze-resume", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || text.length < 10) {
        return res.status(400).json({ error: "The extracted text is too short. Please ensure your PDF is not a scan or an image." });
      }

      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze this resume text and provide a comprehensive, critical evaluation for top-tier Tech Roles (SDE/FAANG):
        1. ATS Score (0-100): Be realistic. If it lacks quantitative results or keywords, score it appropriately.
        2. Key Strengths (list of 3-5 strings): Highlighting specific technical achievements or career progression.
        3. Improvement Tips (list of 3-5 strings): Direct, actionable advice (e.g., 'Use STAR method', 'Add specific React versions', 'Mention AWS services').
        4. Skill Gap Analysis (list of 3-5 primary skills missing for the targeted roles based on the text provided).
        5. A short overall summary (max 2 sentences): A unique summary specifically based on the provided text.

        Return ONLY a raw JSON object with the following structure:
        {
          "score": number,
          "strengths": string[],
          "improvements": string[],
          "skillsGap": string[],
          "summary": string
        }

        Resume Text:
        ${text}`,
      });

      const responseText = response.text;
      try {
        // Extract JSON if AI wraps it in code blocks or adds prefix text
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const cleanJson = jsonMatch ? jsonMatch[0] : responseText;
        
        const analysis = JSON.parse(cleanJson);
        res.json({ analysis });
      } catch (parseError) {
        console.error("AI Response Parse Error:", responseText);
        res.status(500).json({ error: "AI returned an invalid format. Please try again." });
      }
    } catch (error: any) {
      console.error("AI Analysis Error:", error);
      if (error.status === 429 || error.message?.includes("QUOTA_EXCEEDED") || error.message?.includes("RESOURCE_EXHAUSTED")) {
        return res.status(429).json({ error: "AI service quota exceeded. Please wait a few seconds and try again." });
      }
      res.status(500).json({ error: "Failed to analyze resume. Please try again." });
    }
  });

  app.post("/api/ai/mock-interview", async (req, res) => {
    try {
      const { role, round, history } = req.body;
      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an expert interviewer at a top tech company. 
        Role: ${role}
        Round: ${round}
        Previous Conversation: ${JSON.stringify(history)}
        Ask the next challenging interview question or provide feedback if the interview is over.
        Return ONLY a JSON object with "question" or "feedback" fields.`,
      });
      const responseText = response.text;
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const cleanJson = jsonMatch ? jsonMatch[0] : responseText;
        const result = JSON.parse(cleanJson);
        res.json({ response: JSON.stringify(result) });
      } catch (parseError) {
        console.error("Interview Response Parse Error:", responseText);
        res.json({ response: JSON.stringify({ question: responseText }) });
      }
    } catch (error: any) {
      console.error("AI Interview Error:", error);
      if (error.status === 429 || error.message?.includes("QUOTA_EXCEEDED") || error.message?.includes("RESOURCE_EXHAUSTED")) {
        return res.status(429).json({ error: "AI service quota exceeded. Please wait a few seconds and try again." });
      }
      res.status(500).json({ error: "Failed to generate interview response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
