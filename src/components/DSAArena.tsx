import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Play, 
  Send, 
  ChevronRight, 
  CheckCircle2, 
  X,
  Layout,
  Maximize2,
  BrainCircuit
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const problems = [
  { 
    id: '1', 
    title: 'Two Sum', 
    difficulty: 'Easy', 
    category: 'Arrays',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]',
    template: 'function twoSum(nums, target) {\n  // Write your code here\n};'
  },
  { 
    id: '2', 
    title: 'Longest Palindromic Substring', 
    difficulty: 'Medium', 
    category: 'Strings',
    description: 'Given a string `s`, return the longest palindromic substring in `s`.',
    example: 'Input: s = "babad"\nOutput: "bab"',
    template: 'function longestPalindrome(s) {\n  // Write your code here\n};'
  }
];

export function DSAArena() {
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [code, setCode] = useState(selectedProblem.template);
  const [activeTab, setActiveTab] = useState('description');
  const [output, setOutput] = useState('');

  const runCode = () => {
    setOutput('Running test cases...\nTest 1: Passed\nTest 2: Passed\nTest 3: Failed (Timed out)');
    toast.message('Code executed', { description: '2/3 test cases passed' });
  };

  const submitCode = () => {
    toast.success('Solution submitted successfully!');
  };

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Sidebar List */}
      <div className="w-80 border-r border-border bg-card/30 flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-bold flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Problem Library
          </h2>
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase">{problems.length} Available</span>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {problems.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedProblem(p); setCode(p.template); }}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-all group",
                  selectedProblem.id === p.id 
                    ? "bg-primary/10 border border-primary/20" 
                    : "hover:bg-muted/50 border border-transparent"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={cn(
                    "font-medium text-sm transition-colors",
                    selectedProblem.id === p.id ? "text-primary" : "text-foreground"
                  )}>{p.title}</span>
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase",
                    p.difficulty === 'Easy' ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
                  )}>{p.difficulty}</span>
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{p.category}</div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Description */}
          <div className="border-r border-border flex flex-col bg-background">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="px-4 border-b border-border flex items-center justify-between h-12 bg-card/20 shrink-0">
                <TabsList className="bg-transparent gap-4">
                  <TabsTrigger value="description" className="data-[active]:bg-transparent data-[active]:border-b-2 data-[active]:border-primary data-[active]:shadow-none rounded-none h-12 px-0">Description</TabsTrigger>
                  <TabsTrigger value="editorial" className="data-[active]:bg-transparent data-[active]:border-b-2 data-[active]:border-primary data-[active]:shadow-none rounded-none h-12 px-0">Editorial</TabsTrigger>
                  <TabsTrigger value="submissions" className="data-[active]:bg-transparent data-[active]:border-b-2 data-[active]:border-primary data-[active]:shadow-none rounded-none h-12 px-0">Submissions</TabsTrigger>
                </TabsList>
                <button className="text-muted-foreground hover:text-foreground">
                  <BrainCircuit className="w-4 h-4" />
                </button>
              </div>
              
              <TabsContent value="description" className="flex-1 p-6 overflow-auto mt-0">
                <h1 className="text-2xl font-bold mb-4">{selectedProblem.title}</h1>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-foreground/80 leading-relaxed font-sans">
                    {selectedProblem.description}
                  </p>
                  <h4 className="mt-8 mb-4 font-bold text-sm uppercase tracking-wide text-muted-foreground">Example 1</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-xs whitespace-pre-wrap border border-border">
                    {selectedProblem.example}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="editorial" className="flex-1 p-6 overflow-auto mt-0">
                <h1 className="text-2xl font-bold mb-4">Editorial Solution</h1>
                <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
                  <p className="text-foreground/80">
                    The optimal approach for <strong>{selectedProblem.title}</strong> uses a hash map to achieve O(N) time complexity.
                  </p>
                  <pre className="bg-muted p-4 rounded-lg font-mono text-xs border border-border leading-relaxed">
                    {selectedProblem.id === '1' ? 
`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}` :
`function longestPalindrome(s) {
  if (!s || s.length < 1) return "";
  let start = 0, end = 0;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
  
  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(i, i);
    let len2 = expandAroundCenter(i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.substring(start, end + 1);
}`}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="submissions" className="flex-1 p-6 overflow-auto mt-0">
                <h1 className="text-2xl font-bold mb-4">Past Submissions</h1>
                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                  <p className="text-muted-foreground">You have no prior submissions for this problem.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Code Editor */}
          <div className="flex flex-col bg-[#1e1e1e]">
            <div className="h-12 border-b border-white/5 bg-black/20 flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Code2 className="w-3 h-3" />
                  JavaScript
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-white/60 hover:text-white">
                  <Layout className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-white/60 hover:text-white">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 relative overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={code}
                theme="vs-dark"
                onChange={(v) => setCode(v || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16 }
                }}
              />
            </div>

            {/* Bottom Panel */}
            <div className="h-48 border-t border-white/5 bg-black/40 flex flex-col">
              <div className="h-10 px-4 border-b border-white/5 flex items-center justify-between shrink-0">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Console Output</span>
                <button onClick={() => setOutput('')} className="text-[10px] text-muted-foreground hover:text-white uppercase font-bold">Clear</button>
              </div>
              <div className="flex-1 p-4 font-mono text-xs text-green-400/90 whitespace-pre-wrap overflow-auto">
                {output || 'Click "Run" to see test results...'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="h-14 border-t border-border bg-card px-4 flex items-center justify-between shrink-0">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <BrainCircuit className="w-4 h-4" />
            AI Hint
          </Button>
          <div className="flex gap-3">
            <Button onClick={runCode} variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
              <Play className="w-4 h-4" />
              Run Code
            </Button>
            <Button onClick={submitCode} className="gap-2 px-8">
              <Send className="w-4 h-4" />
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


