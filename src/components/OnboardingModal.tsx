
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Coffee, Car } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

interface UserPreferences {
  wakeTime: string;
  city: string;
  breakStyle: string;
  commuteMode: string;
}

const OnboardingModal = ({ open, onClose }: OnboardingModalProps) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    wakeTime: '',
    city: '',
    breakStyle: '',
    commuteMode: ''
  });
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "What time do you usually wake up?",
      description: "This helps us schedule your day effectively",
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      field: 'wakeTime',
      type: 'time'
    },
    {
      title: "Which city are you in?",
      description: "We'll use this for weather-based planning",
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      field: 'city',
      type: 'text'
    },
    {
      title: "What's your preferred break style?",
      description: "How do you like to recharge during the day?",
      icon: <Coffee className="w-6 h-6 text-orange-600" />,
      field: 'breakStyle',
      type: 'select',
      options: ['Short frequent breaks', 'Long focused sessions', 'Flexible timing']
    },
    {
      title: "How do you usually commute?",
      description: "This helps us plan travel time for events",
      icon: <Car className="w-6 h-6 text-purple-600" />,
      field: 'commuteMode',
      type: 'select',
      options: ['Walking', 'Cycling', 'Public transport', 'Driving', 'Remote work']
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    console.log('User preferences:', preferences);
    // TODO: Save preferences to database via API
    onClose();
  };

  const currentStepData = steps[currentStep];
  const isCurrentStepComplete = preferences[currentStepData.field as keyof UserPreferences];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              {currentStepData.icon}
            </div>
            Welcome to PlanMyDay!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                {currentStepData.icon}
              </div>
              <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentStepData.type === 'time' && (
                <div>
                  <Label htmlFor={currentStepData.field}>Wake up time</Label>
                  <Input
                    id={currentStepData.field}
                    type="time"
                    value={preferences[currentStepData.field as keyof UserPreferences]}
                    onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              {currentStepData.type === 'text' && (
                <div>
                  <Label htmlFor={currentStepData.field}>City</Label>
                  <Input
                    id={currentStepData.field}
                    type="text"
                    placeholder="Enter your city"
                    value={preferences[currentStepData.field as keyof UserPreferences]}
                    onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              {currentStepData.type === 'select' && (
                <div>
                  <Label htmlFor={currentStepData.field}>Choose an option</Label>
                  <Select
                    value={preferences[currentStepData.field as keyof UserPreferences]}
                    onValueChange={(value) => handleInputChange(currentStepData.field, value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentStepData.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isCurrentStepComplete}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
