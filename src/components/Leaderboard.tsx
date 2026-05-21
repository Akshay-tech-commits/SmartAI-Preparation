import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trophy, Medal, Star, Target } from 'lucide-react';

const topUsers: any[] = [];

export function Leaderboard() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Global Leaderboard</h1>
        <p className="text-muted-foreground">See how you stack up against thousands of top students.</p>
      </div>

      <div className="flex justify-center gap-8 py-8">
        {topUsers.length > 0 ? (
          [
            { rank: 2, name: 'Priya S.', xp: '11.2k', h: 'h-40', color: 'bg-slate-300' },
            { rank: 1, name: 'Rahul S.', xp: '12.4k', h: 'h-52', color: 'bg-yellow-400' },
            { rank: 3, name: 'Amit K.', xp: '9.8k', h: 'h-32', color: 'bg-orange-400' },
          ].map((podium) => (
            <div key={podium.rank} className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className={cn("w-16 h-16 border-4", podium.rank === 1 ? "border-yellow-400" : "border-border")}>
                  <AvatarFallback>{podium.name[0]}</AvatarFallback>
                </Avatar>
                <div className={cn("absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg", podium.color)}>
                  #{podium.rank}
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold">{podium.name}</div>
                <div className="text-xs text-muted-foreground">{podium.xp} XP</div>
              </div>
              <div className={cn("w-16 rounded-t-xl opacity-20", podium.h, podium.color)} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center gap-8 py-12 opacity-50 grayscale">
             <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-muted border-4 border-border" />
                <div className="w-12 h-4 bg-muted rounded" />
             </div>
             <div className="flex flex-col items-center gap-4 scale-125">
                <Trophy className="w-16 h-16 text-muted" />
                <div className="w-16 h-4 bg-muted rounded" />
             </div>
             <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-muted border-4 border-border" />
                <div className="w-12 h-4 bg-muted rounded" />
             </div>
          </div>
        )}
      </div>

      <Card className="border-border/40 overflow-hidden shadow-xl">
        {topUsers.length > 0 ? (
          <div className="divide-y divide-border">
            {topUsers.map((user) => (
              <div key={user.rank} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                <div className="w-8 font-bold text-muted-foreground text-center">{user.rank}</div>
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-bold text-sm">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.badge}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {user.xp}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Experience</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">The ranking season hasn't started yet. Be the first to earn XP!</p>
          </div>
        )}
      </Card>
      
      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-bold">--</div>
          <div>
            <div className="font-bold">Your Ranking</div>
            <p className="text-xs text-muted-foreground">Start solving problems to get your global rank.</p>
          </div>
        </div>
        <Button variant="secondary" size="sm">How to Earn XP</Button>
      </div>
    </div>
  );
}


