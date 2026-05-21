import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Trophy, 
  TrendingUp, 
  Clock, 
  Target,
  CheckCircle2,
  AlertCircle,
  Building2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';

export function DashboardContent() {
  const { user } = useStore();
  
  // Real apps would fetch these from Firestore
  const stats = [
    { label: 'Resume Score', value: '0/100', icon: Target, color: 'text-blue-500', trend: 'N/A' },
    { label: 'DSA Solved', value: '0', icon: CheckCircle2, color: 'text-green-500', trend: 'N/A' },
    { label: 'Interview Confidence', value: '0%', icon: TrendingUp, color: 'text-purple-500', trend: 'N/A' },
    { label: 'Current Streak', value: '0 Days', icon: Trophy, color: 'text-orange-500', trend: 'Best: 0' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.displayName?.split(' ')[0] || 'User'}!</h1>
          <p className="text-muted-foreground mt-1">Ready to start your placement preparation journey?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className={stat.color + " w-5 h-5"} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Start practicing to see trends
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="col-span-1 border-border/40">
          <CardHeader>
            <CardTitle>Activity Over Time</CardTitle>
            <CardDescription>Problems solved and average interview performance</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-border mt-4">
            <div className="text-center text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p>No activity data yet</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 border-border/40">
          <CardHeader>
            <CardTitle>Company Readiness</CardTitle>
            <CardDescription>Your probability of clearing the rounds</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-border mt-4">
            <div className="text-center text-muted-foreground">
              <Building2 className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p>Complete mocks to see readiness</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-border/40">
          <CardHeader>
            <CardTitle>Upcoming Interviews & Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
               <p className="text-muted-foreground">You have no scheduled tasks.</p>
               <Button variant="link" className="mt-2">Schedule a mock interview</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>AI Goal Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Learning Roadmap</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[0%] rounded-full" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-muted-foreground">Tell your AI Mentor about your goals to generate a learning path.</p>
              </div>
              <button className="w-full py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-all">
                Setup Learning Path
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
