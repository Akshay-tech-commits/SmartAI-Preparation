import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle } from '@/lib/firebase';
import { useStore } from '@/store/useStore';
import { Sidebar } from '@/components/Sidebar';
import { DashboardContent } from '@/components/DashboardContent';
import { ResumeAnalyzer } from '@/components/ResumeAnalyzer';
import { MockInterview } from '@/components/MockInterview';
import { DSAArena } from '@/components/DSAArena';
import { AIMentor } from '@/components/AIMentor';
import { CompanyPrep } from '@/components/CompanyPrep';
import { Leaderboard } from '@/components/Leaderboard';
import { JobTracker } from '@/components/JobTracker';
import { Settings } from '@/components/Settings';
import { Toaster, toast } from 'sonner';

// Page Wrappers
const Dashboard = () => <DashboardContent />;
const ResumeAnalyzerPage = () => <ResumeAnalyzer />;
const MockInterviewsPage = () => <MockInterview />;
const DSAArenaPage = () => <DSAArena />;
const CompanyPrepPage = () => <CompanyPrep />;
const LeaderboardPage = () => <Leaderboard />;
const JobTrackerPage = () => <JobTracker />;
const AIMentorPage = () => <AIMentor />;
const SettingsPage = () => <Settings />;

const Landing = () => {
  const { setUser } = useStore();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Successfully logged in!");
    } catch (err: any) {
      console.error("Auth Error:", err);
      toast.error("Google Sign-In failed. Try Guest Mode.", {
        action: {
          label: "Guest Login",
          onClick: () => handleGuestLogin(),
        },
        duration: 8000,
      });
    }
  };

  const handleGuestLogin = () => {
    setUser({
      uid: "guest-user",
      displayName: "Guest Student",
      email: "guest@example.com",
      photoURL: "https://api.dicebear.com/7.x/adventurer/svg?seed=guest",
      emailVerified: true,
      metadata: {},
      providerData: [],
    } as any);
    toast.success("Logged in as Guest!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gradient-to-b from-background to-muted/20 w-full">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent leading-tight py-2">
          Master Your Career with SmartPrep AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The all-in-one AI platform for students to crush technical interviews, 
          optimize resumes, and track their path to elite tech companies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={handleSignIn}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/20 cursor-pointer"
          >
            Get Started Free
          </button>
          <button 
            onClick={handleGuestLogin}
            className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-lg hover:bg-secondary/80 transition-all cursor-pointer border border-border"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const { user, loading, setUser, setLoading } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setLoading]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground flex">
        {user ? (
          <>
            <Sidebar />
            <main className="flex-1 overflow-auto bg-muted/30">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/resume" element={<ResumeAnalyzerPage />} />
                <Route path="/interviews" element={<MockInterviewsPage />} />
                <Route path="/dsa" element={<DSAArenaPage />} />
                <Route path="/company-prep" element={<CompanyPrepPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/jobs" element={<JobTrackerPage />} />
                <Route path="/mentor" element={<AIMentorPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

