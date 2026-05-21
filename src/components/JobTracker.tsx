import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  MapPin, 
  Clock, 
  Filter, 
  Search,
  Building2,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const jobs: any[] = [];

export function JobTracker() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job & Internship Tracker</h1>
          <p className="text-muted-foreground mt-1">Keep track of your applications and deadlines.</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" />
          Add Application
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total', count: 0, color: 'bg-blue-500' },
          { label: 'Interviewing', count: 0, color: 'bg-yellow-500' },
          { label: 'Applied', count: 0, color: 'bg-purple-500' },
          { label: 'Offers', count: 0, color: 'bg-green-500' },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/40">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mt-1">{stat.label}</div>
              <div className={cn("w-full h-1 mt-4 rounded-full opacity-20", stat.color)} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input className="pl-10 rounded-xl" placeholder="Search companies or roles..." />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job.company + job.role} className="border-border/40 hover:bg-muted/30 transition-colors overflow-hidden group">
              <CardContent className="p-0">
                <div className="flex items-center p-4 gap-6">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center shrink-0 border border-border">
                    <Building2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold truncate">{job.role}</h3>
                      <Badge variant="outline" className={cn(
                        "text-[10px] uppercase",
                        job.status === 'Interviewing' ? "border-yellow-500 text-yellow-500 bg-yellow-500/5" :
                        job.status === 'Applied' ? "border-blue-500 text-blue-500 bg-blue-500/5" :
                        job.status === 'Offers' ? "border-green-500 text-green-500 bg-green-500/5" :
                        "border-muted text-muted-foreground"
                      )}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Updated {job.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
             <Building2 className="w-12 h-12 mx-auto text-muted-foreground/20 mb-4" />
             <h3 className="text-lg font-medium">No applications tracked yet</h3>
             <p className="text-muted-foreground max-w-sm mx-auto mt-2">
               Your dream job awaits. Add your first job application to start tracking your progress.
             </p>
             <Button className="mt-6" variant="outline">
                Add Your First Job
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}


