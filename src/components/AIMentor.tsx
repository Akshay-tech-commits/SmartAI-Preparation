import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  Target, 
  Map as MapIcon,
  BookOpen,
  Zap,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const QuickActions = [
  { icon: MapIcon, label: 'Learning Roadmap', desc: 'Step-by-step skill guide' },
  { icon: Target, label: 'Skill Gap Analysis', desc: 'Identify what you are missing' },
  { icon: BrainCircuit, label: 'Project Ideas', desc: 'Custom project suggestions' },
  { icon: BookOpen, label: 'Interview Guide', desc: 'Best strategies for FAANG' }
];

export function AIMentor() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMsg = () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // API simulation (Mock)
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "I'm your AI Career Mentor. I've reset my context to give you a fresh start. Tell me about your career goals so we can build a learning roadmap together!" 
      }]);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col h-[calc(100vh-64px)] gap-8">
      <div className="flex justify-between items-start shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            AI Career Mentor
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </h1>
          <p className="text-muted-foreground mt-1">Personalized guidance powered by advanced AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        <div className="lg:col-span-1 space-y-6 overflow-auto pr-2">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Quick Actions</h3>
          {QuickActions.map((action) => (
            <button
              key={action.label}
              className="w-full text-left p-4 rounded-xl border border-border bg-card/50 hover:bg-muted/50 transition-all hover:shadow-md group"
            >
              <action.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-sm">{action.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{action.desc}</div>
            </button>
          ))}
          
          <Card className="border-border/40 bg-primary/5 mt-8 opacity-60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Mentor Pulse</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect your profile and start chatting to see your career growth trajectory here.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-3 flex flex-col border-border/40 shadow-xl overflow-hidden bg-card/30 backdrop-blur-sm">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <BrainCircuit className="w-10 h-10 text-primary opacity-30" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Start a Conversation</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                      Ask about roadmaps, interview strategies, or how to land your first role at a top-tier tech company.
                    </p>
                  </div>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "flex gap-4",
                        m.role === 'user' ? "flex-row-reverse" : ""
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                        m.role === 'ai' ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      )}>
                        {m.role === 'ai' ? <BrainCircuit className="w-6 h-6" /> : <User className="w-6 h-6" />}
                      </div>
                      <div className={cn(
                        "p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm",
                        m.role === 'ai' ? "bg-card border border-border rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"
                      )}>
                        {m.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div className="p-4 bg-muted/50 rounded-2xl flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.32s]" />
                    <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.16s]" />
                    <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 bg-muted/30 border-t border-border mt-auto">
            <div className="flex gap-3 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                  placeholder="Ask about roadmaps, projects, or career advice..."
                  className="rounded-xl h-12 px-6 focus-visible:ring-primary border-border bg-background"
                />
                <Button 
                  onClick={sendMsg}
                  disabled={!input.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 rounded-lg w-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


