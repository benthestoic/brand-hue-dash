import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Star,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const leadTrendData = [
    { month: 'Jan', leads: 45 },
    { month: 'Feb', leads: 52 },
    { month: 'Mar', leads: 61 },
    { month: 'Apr', leads: 58 },
    { month: 'May', leads: 67 },
    { month: 'Jun', leads: 73 }
  ];

  const dealPipelineData = [
    { stage: 'Lead', count: 24 },
    { stage: 'Showing', count: 18 },
    { stage: 'Offer', count: 12 },
    { stage: 'Contract', count: 8 },
    { stage: 'Closed', count: 6 }
  ];

  const leadSourceData = [
    { name: 'Instagram', value: 35, color: 'hsl(var(--kai-silver))' },
    { name: 'PropertyFinder', value: 28, color: 'hsl(var(--kai-charcoal))' },
    { name: 'Bayut', value: 22, color: 'hsl(var(--success))' },
    { name: 'Referrals', value: 15, color: 'hsl(var(--kai-silver))' }
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-metallic mb-2 tracking-wide">
          KAI DASHBOARD
        </h1>
        <p className="text-muted-foreground text-lg">
          Real Estate Agency Automation & Performance Center
        </p>
      </div>

      {/* Critical Alerts Panel */}
      <div className="mb-6">
        <Card className="card-kai border-kai-silver/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-kai-silver">
              <AlertTriangle className="h-5 w-5" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="destructive" className="text-xs">
                3 Deals Stalled &gt; 14 Days
              </Badge>
              <Badge variant="outline" className="text-kai-silver border-kai-silver text-xs">
                5 Follow-ups Overdue
              </Badge>
              <Badge variant="outline" className="text-kai-silver border-kai-silver text-xs">
                2 Listings Need Updates
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Lead Pipeline Overview */}
        <div className="lg:col-span-2">
          <Card className="card-kai h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target className="h-6 w-6" />
                Lead Pipeline Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lead Metrics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">67</div>
                  <div className="text-sm text-muted-foreground">New Leads</div>
                  <div className="text-xs text-success">+12% vs last month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground">Hot Leads</div>
                  <div className="text-xs text-success">+8% vs last month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">18</div>
                  <div className="text-sm text-muted-foreground">Appointments</div>
                  <div className="text-xs text-muted-foreground">-3% vs last month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-sm text-muted-foreground">Closed Deals</div>
                  <div className="text-xs text-success">+25% vs last month</div>
                </div>
              </div>

              {/* Lead Trend Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={leadTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--kai-charcoal))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Line 
                      type="monotone" 
                      dataKey="leads" 
                      stroke="hsl(var(--kai-silver))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--kai-silver))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lead Sources */}
        <div>
          <Card className="card-kai h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <PieChart className="h-6 w-6" />
                Lead Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {leadSourceData.map((source, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <span className="text-sm font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deal Pipeline & Agent Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Deal Pipeline Status */}
        <Card className="card-kai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <BarChart3 className="h-6 w-6" />
              Deal Pipeline Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dealPipelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--kai-charcoal))" />
                  <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--kai-silver))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Avg. Deal Time</div>
                <div className="font-semibold">45 days</div>
              </div>
              <div>
                <div className="text-muted-foreground">Closing Rate</div>
                <div className="font-semibold text-success">25%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent Performance */}
        <Card className="card-kai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Users className="h-6 w-6" />
              Agent Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Top Performers */}
            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", deals: 8, completion: 95 },
                { name: "Mike Chen", deals: 6, completion: 88 },
                { name: "Emma Davis", deals: 5, completion: 92 },
                { name: "Alex Rivera", deals: 4, completion: 85 }
              ].map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-kai-charcoal/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-metallic flex items-center justify-center text-kai-onyx font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.deals} deals closed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{agent.completion}%</div>
                    <div className="text-xs text-muted-foreground">Task completion</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Follow-up & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Client Follow-up & Nurturing */}
        <Card className="card-kai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <MessageSquare className="h-6 w-6" />
              Client Follow-up
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-kai-silver">12</div>
                <div className="text-xs text-muted-foreground">Pending Follow-ups</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-success">48</div>
                <div className="text-xs text-muted-foreground">Messages Sent</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Client Satisfaction</span>
                <span className="font-medium">4.7/5</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Repeat Client Rate</span>
                <span className="font-medium">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Admin & Operational Tasks */}
        <Card className="card-kai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <FileText className="h-6 w-6" />
              Admin Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Documents</span>
                <Badge variant="outline" className="text-kai-silver border-kai-silver">7</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Overdue Listings</span>
                <Badge variant="destructive">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-assigned Tasks</span>
                <Badge variant="outline" className="text-success border-success">15</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Manual Escalations</span>
                <Badge variant="outline" className="text-kai-silver border-kai-silver">2</Badge>
              </div>
            </div>
            
            <Button className="w-full mt-4" variant="outline">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* System Health & Automation */}
        <Card className="card-kai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Settings className="h-6 w-6" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">System Uptime</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">99.9%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Workflows Active</span>
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">23/25</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Status</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">All Good</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Update</span>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports & Insights */}
      <Card className="card-kai">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-6 w-6" />
            Reports & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-kai-charcoal/50">
              <div className="text-2xl font-bold text-success mb-2">$485K</div>
              <div className="text-sm text-muted-foreground mb-1">Monthly Revenue</div>
              <div className="text-xs text-success">+18% vs last month</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-kai-charcoal/50">
              <div className="text-2xl font-bold text-primary mb-2">127</div>
              <div className="text-sm text-muted-foreground mb-1">Hours Saved</div>
              <div className="text-xs text-success">Through automation</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-kai-charcoal/50">
              <div className="text-2xl font-bold text-kai-silver mb-2">8.4</div>
              <div className="text-sm text-muted-foreground mb-1">Lead Velocity</div>
              <div className="text-xs text-muted-foreground">Days to conversion</div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Weekly Report
            </Button>
            <Button variant="outline" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              ROI Analysis
            </Button>
            <Button variant="outline" className="flex-1">
              <BarChart3 className="h-4 w-4 mr-2" />
              Trend Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;