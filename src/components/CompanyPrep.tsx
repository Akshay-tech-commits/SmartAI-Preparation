import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Building2, 
  ChevronRight, 
  Search, 
  Filter,
  CheckCircle2,
  Lock,
  ExternalLink,
  BookMarked
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const companies: any[] = [];

export function CompanyPrep() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Specific Prep</h1>
          <p className="text-muted-foreground mt-1">Targeted patterns, previously asked questions, and experience reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10 rounded-full bg-card" placeholder="Search companies..." />
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.length > 0 ? (
          companies.map((company) => (
            <Card key={company.name} className="border-border/40 hover:shadow-xl transition-all group cursor-pointer overflow-hidden relative">
              <div className={cn("absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 -mr-12 -mt-12 transition-opacity group-hover:opacity-20", company.color)} />
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg", company.color)}>
                  {company.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle>{company.name}</CardTitle>
                    <Badge variant="secondary" className="text-[10px] uppercase">{company.status}</Badge>
                  </div>
                  <CardDescription>{company.count}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[10px] font-normal">Aptitude</Badge>
                    <Badge variant="outline" className="text-[10px] font-normal">Coding</Badge>
                    <Badge variant="outline" className="text-[10px] font-normal">HR Round</Badge>
                  </div>
                  <Button className="w-full mt-4 group/btn" variant="secondary">
                    Start Prep 
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-20 border-2 border-dashed border-border rounded-xl">
             <Building2 className="w-12 h-12 mx-auto text-muted-foreground/20 mb-4" />
             <h3 className="text-lg font-medium">No company tracks available</h3>
             <p className="text-muted-foreground max-w-sm mx-auto mt-2">
               Company-specific preparation modules will appear here as you progress in your roadmap.
             </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/40 overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-primary" />
              Recent Interview Experiences
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border p-0">
             <div className="p-12 text-center text-muted-foreground">
               No recent experiences shared by the community yet.
             </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/40 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader>
            <CardTitle>Special Tracks</CardTitle>
            <CardDescription>Hand-picked paths for upcoming drives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center py-6">
            <div className="text-xs text-muted-foreground italic">No active special tracks currently.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


