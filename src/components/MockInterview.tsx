import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Mic, 
  Send, 
  Loader2, 
  BrainCircuit, 
  User, 
  Terminal,
  Trophy,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Message {
  role: 'ai' | 'user';
  content: string;
}

export function MockInterview() {
  const [started, setStarted] = useState(false);
  const [role, setRole] = useState('Frontend Developer');
  const [round, setRound] = useState('Technical');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const startInterview = async () => {
    setStarted(true);
    setLoading(true);
    try {
      const response = await fetch('/api/ai/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, round, history: [] })
      });
      const data = await response.json();
      
      if (response.status === 429) {
        throw new Error('AI rate limit reached. Please wait a few seconds and try again.');
      }
      
      if (!response.ok) throw new Error(data.error || 'Failed to start interview');
      
      setMessages([{ role: 'ai', content: JSON.parse(data.response).question }]);
    } catch (error: any) {
      toast.error(error.message || 'Failed to start interview');
      setStarted(false); // Go back to session setup if failed to start
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/ai/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, round, history: [...messages, { role: 'user', content: userMessage }] })
      });
      const data = await response.json();
      
      if (response.status === 429) {
        throw new Error('AI rate limit reached. Please wait a few seconds and try again.');
      }
      
      if (!response.ok) throw new Error(data.error || 'Failed to get response');
      
      const aiResponse = JSON.parse(data.response);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse.question || aiResponse.feedback }]);
    } catch (error: any) {
      toast.error(error.message || 'Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  if (!started) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Mock Interview</h1>
          <p className="text-muted-foreground mt-1">Practice with our advanced AI that learns from your answers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Setup Session</CardTitle>
              <CardDescription>Configure your interview parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Role</label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Frontend Engineer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Round</label>
                <select 
                  className="w-full p-2 rounded-md border border-input bg-background"
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                >
                  <option>Technical</option>
                  <option>Behavioral</option>
                  <option>HR</option>
                  <option>System Design</option>
                </select>
              </div>
              <Button onClick={startInterview} className="w-full gap-2">
                <BrainCircuit className="w-5 h-5" />
                Start My Mock Interview
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                 <History className="w-12 h-12 text-muted-foreground/20" />
                 <div className="space-y-1">
                    <div className="font-medium text-sm">No interviews recorded</div>
                    <p className="text-xs text-muted-foreground px-4">Start your first session to track your performance and get AI-powered feedback.</p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] p-8 flex flex-col max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{round} Interview - {role}</h2>
          <div className="flex gap-2 mt-1">
            <div className="px-2 py-0.5 bg-green-500/10 text-green-600 rounded text-[10px] font-bold uppercase tracking-wider">Live Session</div>
            <div className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-[10px] font-bold uppercase tracking-wider">Round 1/2</div>
          </div>
        </div>
        <Button variant="destructive" size="sm" onClick={() => setStarted(false)}>End Interview</Button>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col border-border/40 shadow-2xl relative">
        <ScrollArea className="flex-1 p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-[80%] mb-6",
                  m.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                  m.role === 'ai' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {m.role === 'ai' ? <BrainCircuit className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  m.role === 'ai' 
                    ? "bg-card border border-border rounded-tl-none shadow-sm" 
                    : "bg-primary text-primary-foreground rounded-tr-none"
                )}>
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <div className="flex gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-pulse">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div className="bg-muted p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm italic">Interviewer is thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </ScrollArea>

        <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm">
          <div className="flex gap-2 items-center max-w-4xl mx-auto">
            <Button variant="outline" size="icon" className="rounded-full shrink-0">
              <Mic className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your response here..."
                className="rounded-full py-6 px-6 pr-12 focus-visible:ring-primary"
              />
              <Button 
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                size="icon" 
                className="absolute right-1 top-1 bottom-1 h-auto w-10 rounded-full"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="mt-4 text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Pro Tip: Be concise and use the STAR method for behavioral questions.</p>
      </div>
    </div>
  );
}


