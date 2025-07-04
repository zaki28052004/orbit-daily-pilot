
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Cloud, Sparkles, Clock, CheckSquare, Sun } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Calendar className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            PlanMyDay
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered smart daily planner that organizes your day intelligently by combining custom tasks, weather, calendar events, and inspirational content.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">AI-Powered Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Smart scheduling that considers your preferences, weather, and priorities
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Cloud className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Weather Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Plans adapt to weather conditions for optimal outdoor activities
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckSquare className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Organize tasks by duration and importance for maximum productivity
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started Free
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </SignInButton>
          </div>
          <p className="text-sm text-gray-500">No credit card required • Free to start</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PlanMyDay
              </h1>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning! Ready to plan your day?
          </h2>
          <p className="text-gray-600">
            Let's create an intelligent schedule based on your tasks and preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <TaskInputCard />
            <ScheduleTimelineCard />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WeatherCard />
            <NasaApodCard />
            <TodayEventsCard />
          </div>
        </div>
      </main>
    </div>
  );
};

const TaskInputCard = () => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-blue-600" />
          Add Your Tasks
        </CardTitle>
        <CardDescription>
          Enter your tasks with duration and importance level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center py-8 text-gray-500">
            <CheckSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Task input form will be implemented here</p>
            <p className="text-sm">Requires backend integration</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ScheduleTimelineCard = () => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Your AI-Generated Schedule
        </CardTitle>
        <CardDescription>
          Smart timeline based on your tasks, weather, and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>AI schedule timeline will appear here</p>
          <p className="text-sm">Requires OpenAI integration</p>
        </div>
      </CardContent>
    </Card>
  );
};

const WeatherCard = () => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-yellow-600" />
          Today's Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6 text-gray-500">
          <Sun className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>Weather data will appear here</p>
          <p className="text-sm">Requires OpenWeatherMap API</p>
        </div>
      </CardContent>
    </Card>
  );
};

const NasaApodCard = () => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Daily Inspiration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6 text-gray-500">
          <Sparkles className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>NASA APOD will appear here</p>
          <p className="text-sm">Requires NASA API</p>
        </div>
      </CardContent>
    </Card>
  );
};

const TodayEventsCard = () => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Today's Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6 text-gray-500">
          <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>Calendar events will appear here</p>
          <p className="text-sm">Requires database integration</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
