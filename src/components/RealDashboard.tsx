import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Home, 
  DollarSign, 
  TrendingUp, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Clock,
  BarChart3,
  Settings,
  Filter,
  FileText,
  Activity,
  Shield,
  RefreshCw,
  LogOut,
  Plus
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RealDashboard = () => {
  const { user, signOut } = useAuth();
  const { stats, leads, properties, deals, tasks, loading, refreshData, addLead, addProperty, addTask, updateTaskStatus } = useDashboardData();
  const { toast } = useToast();

  // Form states for adding new items
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", source: "website", status: "new" });
  const [newProperty, setNewProperty] = useState({ 
    title: "", 
    price: 0, 
    address: "", 
    city: "", 
    state: "", 
    zip_code: "", 
    property_type: "house", 
    status: "active" 
  });
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium", status: "pending", due_date: null });

  const handleAddLead = async () => {
    const { error } = await addLead(newLead);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Lead added successfully!" });
      setNewLead({ name: "", email: "", phone: "", source: "website", status: "new" });
    }
  };

  const handleAddProperty = async () => {
    const { error } = await addProperty(newProperty);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Property added successfully!" });
      setNewProperty({ 
        title: "", 
        price: 0, 
        address: "", 
        city: "", 
        state: "", 
        zip_code: "", 
        property_type: "house", 
        status: "active" 
      });
    }
  };

  const handleAddTask = async () => {
    const { error } = await addTask(newTask);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Task added successfully!" });
      setNewTask({ title: "", description: "", priority: "medium", status: "pending", due_date: null });
    }
  };

  const handleTaskComplete = async (taskId: string) => {
    const { error } = await updateTaskStatus(taskId, "completed");
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Task completed!" });
    }
  };

  // Chart data for leads by source
  const leadSourceData = leads.reduce((acc, lead) => {
    const source = lead.source;
    const existing = acc.find(item => item.name === source);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: source, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Chart data for deals by stage
  const dealStageData = deals.reduce((acc, deal) => {
    const stage = deal.stage;
    const existing = acc.find(item => item.name === stage);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: stage, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">KAI Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.email}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={signOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newLeads} new this period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              Total listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDeals}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ${stats.monthlyRevenue.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Add Lead */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Add New Lead
                </CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>Enter the lead information below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="leadName">Name</Label>
                <Input 
                  id="leadName"
                  value={newLead.name} 
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="leadEmail">Email</Label>
                <Input 
                  id="leadEmail"
                  type="email"
                  value={newLead.email} 
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="leadPhone">Phone</Label>
                <Input 
                  id="leadPhone"
                  value={newLead.phone} 
                  onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="leadSource">Source</Label>
                <Select value={newLead.source} onValueChange={(value) => setNewLead({...newLead, source: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="advertising">Advertising</SelectItem>
                    <SelectItem value="walk_in">Walk-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddLead} className="w-full">
                Add Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Property */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Add Property
                </CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>Enter the property details below.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyTitle">Title</Label>
                <Input 
                  id="propertyTitle"
                  value={newProperty.title} 
                  onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="propertyPrice">Price</Label>
                <Input 
                  id="propertyPrice"
                  type="number"
                  value={newProperty.price} 
                  onChange={(e) => setNewProperty({...newProperty, price: Number(e.target.value)})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="propertyAddress">Address</Label>
                <Input 
                  id="propertyAddress"
                  value={newProperty.address} 
                  onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="propertyCity">City</Label>
                <Input 
                  id="propertyCity"
                  value={newProperty.city} 
                  onChange={(e) => setNewProperty({...newProperty, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="propertyState">State</Label>
                <Input 
                  id="propertyState"
                  value={newProperty.state} 
                  onChange={(e) => setNewProperty({...newProperty, state: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="propertyZip">Zip Code</Label>
                <Input 
                  id="propertyZip"
                  value={newProperty.zip_code} 
                  onChange={(e) => setNewProperty({...newProperty, zip_code: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="propertyType">Type</Label>
                <Select value={newProperty.property_type} onValueChange={(value) => setNewProperty({...newProperty, property_type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Button onClick={handleAddProperty} className="w-full">
                  Add Property
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Task */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Add Task
                </CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new task to track.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskTitle">Title</Label>
                <Input 
                  id="taskTitle"
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="taskDescription">Description</Label>
                <Input 
                  id="taskDescription"
                  value={newTask.description} 
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="taskPriority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddTask} className="w-full">
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Lead Sources Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            {leadSourceData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadSourceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No lead data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Deal Stages Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Deal Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            {dealStageData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dealStageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No deal data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.email}</div>
                  </div>
                  <Badge variant={lead.status === 'new' ? 'default' : 'secondary'}>
                    {lead.status}
                  </Badge>
                </div>
              ))}
              {leads.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No leads yet. Add your first lead!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Tasks
              <div className="flex gap-2 text-sm">
                <span className="text-muted-foreground">Pending: {stats.pendingTasks}</span>
                <span className="text-success">Done: {stats.completedTasks}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleTaskComplete(task.id)}
                      disabled={task.status === 'completed'}
                    >
                      <CheckCircle2 className={`h-4 w-4 ${task.status === 'completed' ? 'text-success' : ''}`} />
                    </Button>
                    <div>
                      <div className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </div>
                      {task.description && (
                        <div className="text-sm text-muted-foreground">{task.description}</div>
                      )}
                    </div>
                  </div>
                  <Badge variant={task.priority === 'urgent' ? 'destructive' : 'outline'}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No tasks yet. Add your first task!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealDashboard;