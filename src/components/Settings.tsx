import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  LogOut, 
  CreditCard,
  Target,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { auth } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function Settings() {
  const { user } = useStore();

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile, preferences, and security.</p>
      </div>

      <div className="flex items-center gap-6 p-6 rounded-2xl border border-border bg-card/50">
        <Avatar className="w-20 h-20 border-2 border-primary/20">
          <AvatarImage src={user?.photoURL || ''} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
            {user?.displayName?.[0] || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{user?.displayName || 'User'}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <div className="flex gap-2 mt-3">
            <Badge variant="outline">New Member</Badge>
          </div>
        </div>
        <Button variant="outline">Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          {[
            { icon: User, label: 'Profile Info' },
            { icon: Shield, label: 'Security & Password' },
            { icon: Bell, label: 'Notifications' },
            { icon: CreditCard, label: 'Billing & Plan' },
            { icon: Target, label: 'Goals & Preferences' },
          ].map(item => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm font-medium"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                {item.label}
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </button>
          ))}
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 mt-6 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>Update your name and primary email address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <Input defaultValue={user?.displayName || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Display Name</label>
                  <Input defaultValue={user?.displayName?.split(' ')[0] || ''} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <div className="flex gap-2">
                  <Input defaultValue={user?.email || ''} readOnly className="bg-muted text-muted-foreground" />
                  <Button variant="outline">Change</Button>
                </div>
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your learning experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Focus Mode</div>
                  <div className="text-xs text-muted-foreground">Hides all distractions during DSA and Mock Interviews.</div>
                </div>
                <div className="w-10 h-5 bg-primary rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Email Digest</div>
                  <div className="text-xs text-muted-foreground">Receive weekly reports of your prep progress.</div>
                </div>
                <div className="w-10 h-5 bg-muted rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


