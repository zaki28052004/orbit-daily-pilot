"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useApiClient } from "@/hooks/useApiClient";
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Cloud, 
  Calendar, 
  Sun, 
  Moon,
  Star,
  Clock,
  MapPin,
  Zap
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  duration: number;
  importance: "low" | "medium" | "high";
}

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
}

interface WeatherData {
  temperature: string;
  condition: string;
  location: string;
}

interface ApodData {
  title: string;
  description: string;
  imageUrl: string;
}

const RetroGrid = ({
  className,
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden opacity-30 [perspective:200px]",
        className,
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
          )}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  );
};

const ScrollingSunMoon = () => {
  const { scrollYProgress } = useScroll();
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Transform scroll progress to rotation and position
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const yPosition = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDarkMode(hour < 6 || hour > 18);
  }, []);

  return (
    <motion.div
      className="fixed top-10 right-10 z-50 pointer-events-none"
      style={{
        y: yPosition,
        rotate: rotation,
        opacity: opacity,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          filter: isDarkMode 
            ? ["drop-shadow(0 0 20px rgba(147, 197, 253, 0.8))", "drop-shadow(0 0 40px rgba(147, 197, 253, 1))", "drop-shadow(0 0 20px rgba(147, 197, 253, 0.8))"]
            : ["drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))", "drop-shadow(0 0 40px rgba(251, 191, 36, 1))", "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {isDarkMode ? (
          <Moon className="w-16 h-16 text-blue-300" />
        ) : (
          <Sun className="w-16 h-16 text-yellow-400" />
        )}
      </motion.div>
    </motion.div>
  );
};

const GlassCard = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => {
  return (
    <motion.div
      className={cn(
        "relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl" />
      {children}
    </motion.div>
  );
};

const Index = () => {
  console.log('Index component rendering');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <RetroGrid />
      <ScrollingSunMoon />
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
};

const LandingPage = () => {
  console.log('LandingPage component rendering');
  
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-8">
            <motion.div 
              className="relative"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <div className="p-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full shadow-2xl">
                <Calendar className="w-16 h-16 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            PlanMyDay
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-powered smart daily planner that organizes your day intelligently with
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> futuristic technology</span>,
            combining tasks, weather, calendar events, and inspirational content.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GlassCard className="p-8 group hover:scale-105 transition-transform duration-300">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-white">AI-Powered Planning</h3>
            <p className="text-white/70 text-lg">
              Advanced algorithms analyze your patterns and preferences for optimal scheduling
            </p>
          </GlassCard>

          <GlassCard className="p-8 group hover:scale-105 transition-transform duration-300">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Cloud className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-white">Weather Integration</h3>
            <p className="text-white/70 text-lg">
              Real-time weather data adapts your plans for perfect outdoor activities
            </p>
          </GlassCard>

          <GlassCard className="p-8 group hover:scale-105 transition-transform duration-300">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Clock className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-white">Smart Task Management</h3>
            <p className="text-white/70 text-lg">
              Intelligent prioritization and time allocation for maximum productivity
            </p>
          </GlassCard>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex gap-6 justify-center">
            <SignUpButton mode="modal">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Launch Your Future
                </motion.div>
              </Button>
            </SignUpButton>
            
            <SignInButton mode="modal">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
            </SignInButton>
          </div>
          
          <motion.p 
            className="text-sm text-white/60"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ No credit card required • Free to start • Join the future of planning
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  console.log('Dashboard component rendering');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const addTask = (taskData: Omit<Task, "id">) => {
    console.log('Adding task to dashboard:', taskData);
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    };
    setTasks(prev => {
      const updatedTasks = [...prev, newTask];
      console.log('Dashboard updated tasks:', updatedTasks);
      return updatedTasks;
    });
  };

  const deleteTask = (id: string) => {
    console.log('Deleting task:', id);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <div className="relative z-10 min-h-screen">
      {/* Futuristic Header */}
      <motion.header 
        className="backdrop-blur-xl bg-black/20 border-b border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="p-3 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl shadow-xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl blur-lg opacity-50 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PlanMyDay
                </h1>
                <p className="text-white/60 text-sm">AI-Powered Future Planning</p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <UserButton />
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {getGreeting()}
          </h2>
          <p className="text-2xl text-white/80 mb-4">
            Ready to plan your perfect day with AI assistance?
          </p>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Task Input and List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TaskInputForm onAddTask={addTask} />
              <TaskList tasks={tasks} onDeleteTask={deleteTask} />
            </div>
            
            {/* AI Schedule Generator */}
            <AiScheduleGenerator tasks={tasks} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <WeatherCard />
            <ApodCard />
            <CalendarEventsCard />
          </div>
        </div>
      </main>
    </div>
  );
};

const TaskInputForm = ({ onAddTask }: { onAddTask: (task: Omit<Task, "id">) => void }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [taskImportance, setTaskImportance] = useState<"low" | "medium" | "high">("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { post } = useApiClient();

  console.log('TaskInputForm - Current state:', { 
    title: taskTitle, 
    duration: taskDuration, 
    importance: taskImportance 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('TaskInputForm - Form submitted');
    
    if (!taskTitle.trim()) {
      console.log('TaskInputForm - Title is empty');
      return;
    }
    
    const duration = parseInt(taskDuration);
    if (!duration || duration <= 0) {
      console.log('TaskInputForm - Invalid duration:', taskDuration);
      return;
    }

    const taskData = {
      title: taskTitle.trim(),
      duration: duration,
      importance: taskImportance,
    };
    
    console.log('TaskInputForm - Submitting task with JWT token:', taskData);
    setIsSubmitting(true);
    
    try {
      // Example of making an authenticated request to your backend
      // Replace with your actual backend URL
      const response = await post('/api/tasks', taskData);
      
      if (response.ok) {
        console.log('Task saved to backend successfully');
        onAddTask(taskData);
        
        // Reset form
        setTaskTitle("");
        setTaskDuration("");
        setTaskImportance("medium");
        console.log('TaskInputForm - Form reset');
      }
    } catch (error) {
      console.error('Failed to save task to backend:', error);
      // Still add to local state even if backend fails
      onAddTask(taskData);
      
      // Reset form
      setTaskTitle("");
      setTaskDuration("");
      setTaskImportance("medium");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = taskTitle.trim() && taskDuration && parseInt(taskDuration) > 0;

  return (
    <Card className="p-6 bg-slate-800/50 border-slate-700">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
        <Plus className="w-5 h-5 text-blue-500" />
        Add New Task
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Enter task title..."
            value={taskTitle}
            onChange={(e) => {
              console.log('TaskInputForm - Title input changed:', e.target.value);
              setTaskTitle(e.target.value);
            }}
            className="bg-slate-700/50 border-slate-600 placeholder:text-slate-400 text-white rounded-xl focus:bg-slate-700 transition-all duration-300 focus:border-slate-500"
            autoComplete="off"
            disabled={isSubmitting}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Duration (min)"
            value={taskDuration}
            onChange={(e) => {
              console.log('TaskInputForm - Duration input changed:', e.target.value);
              setTaskDuration(e.target.value);
            }}
            className="bg-slate-700/50 border-slate-600 placeholder:text-slate-400 text-white rounded-xl focus:bg-slate-700 transition-all duration-300 focus:border-slate-500"
            min="1"
            autoComplete="off"
            disabled={isSubmitting}
          />
          <Select 
            value={taskImportance} 
            onValueChange={(value: "low" | "medium" | "high") => {
              console.log('TaskInputForm - Importance changed:', value);
              setTaskImportance(value);
            }}
            disabled={isSubmitting}
          >
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white rounded-xl focus:bg-slate-700 transition-all duration-300 focus:border-slate-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            type="submit" 
            disabled={!isFormValid || isSubmitting}
            className={cn(
              "w-full rounded-xl transition-all duration-300",
              isFormValid && !isSubmitting
                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg" 
                : "bg-gray-600 cursor-not-allowed opacity-50"
            )}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 mr-2"
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
                Saving...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </Card>
  );
};

const TaskList = ({ tasks, onDeleteTask }: { tasks: Task[]; onDeleteTask: (id: string) => void }) => {
  const getImportanceBadge = (importance: string) => {
    const variants = {
      low: "bg-green-500/20 text-green-300 border-green-500/30",
      medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      high: "bg-red-500/20 text-red-300 border-red-500/30",
    };
    return variants[importance as keyof typeof variants];
  };

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
        <Clock className="w-5 h-5 text-purple-500" />
        Your Tasks ({tasks.length})
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex-1">
                <div className="font-medium text-white">{task.title}</div>
                <div className="text-sm text-white/60">{task.duration} minutes</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getImportanceBadge(task.importance)}>
                  {task.importance}
                </Badge>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteTask(task.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {tasks.length === 0 && (
          <div className="text-center text-white/60 py-8">
            No tasks added yet. Add your first task above!
          </div>
        )}
      </div>
    </GlassCard>
  );
};

const AiScheduleGenerator = ({ tasks }: { tasks: Task[] }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [schedule, setSchedule] = useState<string[]>([]);

  const generateSchedule = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockSchedule = [
      "9:00 AM - Morning Planning (15 min)",
      ...tasks.map((task, index) => {
        const startTime = 9 + Math.floor((index * task.duration) / 60);
        const startMinutes = (index * task.duration) % 60;
        return `${startTime}:${startMinutes.toString().padStart(2, '0')} - ${task.title} (${task.duration} min)`;
      }),
      "12:00 PM - Lunch Break (60 min)",
      "5:00 PM - Review & Wrap-up (30 min)"
    ];
    
    setSchedule(mockSchedule);
    setIsGenerating(false);
  };

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
        <Sparkles className="w-5 h-5 text-pink-500" />
        AI Schedule Generator
      </h3>
      
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button 
          onClick={generateSchedule}
          disabled={tasks.length === 0 || isGenerating}
          className="w-full mb-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 rounded-xl transition-all duration-300 hover:shadow-lg"
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 mr-2"
            >
              <Zap className="w-4 h-4" />
            </motion.div>
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          {isGenerating ? "Generating..." : "Generate My AI Schedule"}
        </Button>
      </motion.div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {isGenerating ? (
          <div className="text-center text-white/60 py-8">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI is analyzing your tasks and creating the perfect schedule...
            </motion.div>
          </div>
        ) : schedule.length > 0 ? (
          <AnimatePresence>
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="p-3 bg-white/5 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center text-white/60 py-8">
            Add some tasks above, then click "Generate" to create your AI-powered schedule!
          </div>
        )}
      </div>
    </GlassCard>
  );
};

const WeatherCard = () => {
  const [weather] = useState<WeatherData>({
    temperature: "22°C",
    condition: "Partly Cloudy",
    location: "San Francisco, CA"
  });

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
        <Cloud className="w-5 h-5 text-blue-400" />
        Today's Weather
      </h3>
      <div className="text-center">
        <div className="text-3xl font-bold mb-2 text-white">{weather.temperature}</div>
        <div className="text-white/80 mb-2">{weather.condition}</div>
        <div className="text-sm text-white/60 flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3" />
          {weather.location}
        </div>
        <div className="mt-4 flex justify-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sun className="w-12 h-12 text-yellow-400" />
          </motion.div>
        </div>
      </div>
    </GlassCard>
  );
};

const ApodCard = () => {
  const [apod] = useState<ApodData>({
    title: "Spiral Galaxy NGC 1566",
    description: "A beautiful spiral galaxy located in the constellation Dorado, showcasing intricate spiral arms and stellar formation regions.",
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop&q=80"
  });

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
        <Star className="w-5 h-5 text-yellow-400" />
        NASA Image of the Day
      </h3>
      <div className="space-y-4">
        <div className="relative rounded-lg overflow-hidden">
          <motion.img 
            src={apod.imageUrl} 
            alt={apod.title}
            className="w-full h-32 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-white">{apod.title}</h4>
          <p className="text-sm text-white/70 line-clamp-3">{apod.description}</p>
        </div>
      </div>
    </GlassCard>
  );
};

const CalendarEventsCard = () => {
  const [events] = useState<CalendarEvent[]>([
    { id: "1", title: "Team Standup", time: "9:00 AM" },
    { id: "2", title: "Client Meeting", time: "2:00 PM" },
    { id: "3", title: "Code Review", time: "4:30 PM" }
  ]);

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
        <Calendar className="w-5 h-5 text-green-400" />
        Today's Events
      </h3>
      <div className="space-y-3">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <div className="font-medium text-white">{event.title}</div>
            <div className="text-sm text-white/60">{event.time}</div>
          </motion.div>
        ))}
        {events.length === 0 && (
          <div className="text-center text-white/60 py-4">
            No events scheduled for today
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default Index;
