import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

import * as pdfjsLib from 'pdfjs-dist';

// Set up worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      setFile(selectedFile);
      setResults(null);
    }
  };

  const extractTextFromPdf = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  };

  const analyzeResume = async () => {
    if (!file) return;
    setAnalyzing(true);
    
    try {
      const text = await extractTextFromPdf(file);
      const cleanText = text.replace(/\s+/g, ' ').trim();
      console.log('Extracted text sample:', cleanText.substring(0, 100));
      
      if (!cleanText || cleanText.length < 20) {
        throw new Error('This PDF seems to be an image scan or contains very little selectable text. AI needs text to analyze. Please upload a digital PDF (not a phone photo/scan) for full analysis.');
      }

      const response = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText })
      });
      
      const data = await response.json();
      
      if (response.status === 429) {
        throw new Error('AI service is currently busy (limit exceeded). Please wait 15 seconds and try again. Your resume is ready to go!');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume');
      }

      setResults(data.analysis);
      toast.success('Resume analyzed successfully!');
    } catch (error: any) {
      console.error('Analysis Error:', error);
      toast.error(error.message || 'Failed to analyze resume', {
        duration: 5000,
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Resume Analyzer</h1>
        <p className="text-muted-foreground mt-1">Get instant feedback and ATS optimization tips for your resume.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit border-border/40">
          <CardHeader>
            <CardTitle>Resume Upload</CardTitle>
            <CardDescription>Upload your PDF resume to start</CardDescription>
          </CardHeader>
          <CardContent>
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-all group overflow-hidden relative">
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
              {file ? (
                <div className="flex flex-col items-center p-4">
                  <FileText className="w-12 h-12 text-primary mb-2" />
                  <span className="text-sm font-medium text-center truncate max-w-[200px]">{file.name}</span>
                  <button 
                    onClick={(e) => { e.preventDefault(); setFile(null); }}
                    className="mt-4 text-xs text-destructive hover:underline"
                  >
                    Remove and Change
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                  <span className="text-sm font-medium">Click to upload or drag & drop</span>
                  <span className="text-xs text-muted-foreground mt-1">PDF only (max 5MB)</span>
                </div>
              )}
            </label>
            <button
              onClick={analyzeResume}
              disabled={!file || analyzing}
              className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-5 h-5" />
                  Run AI Analysis
                </>
              )}
            </button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-border/40 min-h-[400px]">
          <AnimatePresence mode="wait">
            {!results ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center p-12"
              >
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                  <FileText className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ready for Analysis</h3>
                <p className="text-muted-foreground max-w-sm">
                  Upload your resume to see your ATS score, skill gap analysis, and personalized improvement tips.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 space-y-8"
              >
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - results.score / 100)} className={cn("transition-all duration-1000 ease-out", results.score > 75 ? "text-green-500" : results.score > 50 ? "text-yellow-500" : "text-red-500")} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{results.score}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">ATS Score</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {results.score >= 80 ? "Excellent Work!" : results.score >= 60 ? "Good Potential!" : "Action Needed!"}
                    </h3>
                    <p className="text-muted-foreground">{results.summary}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Key Strengths
                    </h4>
                    <ul className="space-y-2">
                      {results.strengths.map((s: string) => (
                        <li key={s} className="text-sm bg-green-500/10 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg border border-green-500/20">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                      Improvement Tips
                    </h4>
                    <ul className="space-y-2">
                      {results.improvements.map((s: string) => (
                        <li key={s} className="text-sm bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-3 py-2 rounded-lg border border-yellow-500/20">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold">Skill Gap Analysis</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.skillsGap.map((tag: string) => (
                      <div key={tag} className="px-4 py-2 bg-muted rounded-full text-sm font-medium flex items-center gap-2 border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        {tag}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Mastering these key skills will significantly improve your ATS ranking for targeted roles.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}


