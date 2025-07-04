
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, AlertCircle, Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  duration: number;
  importance: 'high' | 'medium' | 'low';
}

const TaskInputForm = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    duration: '',
    importance: '' as 'high' | 'medium' | 'low' | ''
  });

  const addTask = () => {
    if (newTask.title && newTask.duration && newTask.importance) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        duration: parseInt(newTask.duration),
        importance: newTask.importance as 'high' | 'medium' | 'low'
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', duration: '', importance: '' });
    }
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getImportanceBadge = (importance: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[importance as keyof typeof colors];
  };

  const generatePlan = () => {
    console.log('Generating plan with tasks:', tasks);
    // TODO: Send tasks to AI API for schedule generation
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-600" />
          Add Your Tasks
        </CardTitle>
        <CardDescription>
          Enter your tasks with duration and importance level
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Task Form */}
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div>
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              type="text"
              placeholder="What do you need to do?"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="task-duration">Duration (minutes)</Label>
              <Input
                id="task-duration"
                type="number"
                placeholder="30"
                value={newTask.duration}
                onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="task-importance">Importance</Label>
              <Select
                value={newTask.importance}
                onValueChange={(value) => setNewTask({ ...newTask, importance: value as 'high' | 'medium' | 'low' })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={addTask}
            disabled={!newTask.title || !newTask.duration || !newTask.importance}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Task List */}
        {tasks.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Your Tasks ({tasks.length})</h3>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <Badge className={getImportanceBadge(task.importance)}>
                      {task.importance}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    {task.duration} minutes
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTask(task.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button
              onClick={generatePlan}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Generate My AI Schedule
            </Button>
          </div>
        )}

        {tasks.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No tasks added yet</p>
            <p className="text-sm">Add your first task above to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskInputForm;
