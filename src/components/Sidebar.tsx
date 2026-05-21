import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Code, 
  Trophy, 
  Briefcase, 
  Settings,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Resume Analyzer', path: '/resume' },
  { icon: MessageSquare, label: 'Mock Interviews', path: '/interviews' },
  { icon: Code, label: 'DSA Arena', path: '/dsa' },
  { icon: GraduationCap, label: 'Company Prep', path: '/company-prep' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: Briefcase, label: 'Job Tracker', path: '/jobs' },
  { icon: BrainCircuit, label: 'AI Mentor', path: '/mentor' },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <BrainCircuit className="text-primary-foreground w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">SmartPrep AI</span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
              isActive 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
            isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
