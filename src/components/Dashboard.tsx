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
  Activity,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import DashboardCustomizer, { DashboardSettings } from './DashboardCustomizer';
import { useState } from 'react';

const Dashboard = () => {
  // Customization state
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [dashboardSettings, setDashboardSettings] = useState<DashboardSettings>({
    widgets: {
      leadPipeline: true,
      dealPipeline: true,
      agentPerformance: true,
      clientFollowup: true,
      adminTasks: true,
      systemHealth: true,
      reportsInsights: true,
      criticalAlerts: true,
    },
    filters: {
      dateRange: '30d',
      selectedAgent: 'all',
      propertyType: 'all',
      leadSource: 'all',
    },
    layout: {
      gridSize: 'medium',
      arrangement: 'default',
      compactView: false,
    },
    charts: {
      leadPipelineChart: 'line',
      dealPipelineChart: 'bar',
      performanceChart: 'radar',
    },
    view: {
      theme: 'system',
      density: 'comfortable',
      animations: true,
    },
  });

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

  // Agent performance data for radar chart
  const agentRadarData = [
    { skill: 'Lead Gen', Sarah: 95, Mike: 88, Emma: 92, Alex: 85 },
    { skill: 'Closing', Sarah: 90, Mike: 85, Emma: 88, Alex: 80 },
    { skill: 'Follow-up', Sarah: 88, Mike: 92, Emma: 90, Alex: 85 },
    { skill: 'Prospecting', Sarah: 92, Mike: 80, Emma: 85, Alex: 88 },
    { skill: 'Negotiation', Sarah: 85, Mike: 90, Emma: 88, Alex: 92 },
  ];

  // Helper functions
  const getGridClass = () => {
    switch (dashboardSettings.layout.gridSize) {
      case 'small': return 'grid-cols-1 lg:grid-cols-4';
      case 'medium': return 'grid-cols-1 lg:grid-cols-3';
      case 'large': return 'grid-cols-1 lg:grid-cols-2';
      case 'xl': return 'grid-cols-1';
      default: return 'grid-cols-1 lg:grid-cols-3';
    }
  };

  const getDensityClass = () => {
    switch (dashboardSettings.view.density) {
      case 'compact': return 'gap-3 p-3';
      case 'comfortable': return 'gap-6 p-6';
      case 'spacious': return 'gap-8 p-8';
      default: return 'gap-6 p-6';
    }
  };

  const renderChart = (type: string, data: any[], chartKey: keyof typeof dashboardSettings.charts) => {
    const chartType = dashboardSettings.charts[chartKey];
    
    switch (chartType) {
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--kai-charcoal))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Area 
              type="monotone" 
              dataKey="leads" 
              stroke="hsl(var(--kai-silver))" 
              fill="hsl(var(--kai-silver))"
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--kai-charcoal))" />
            <XAxis dataKey={chartKey === 'leadPipelineChart' ? 'month' : 'stage'} stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Bar 
              dataKey={chartKey === 'leadPipelineChart' ? 'leads' : 'count'} 
              fill="hsl(var(--kai-silver))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
      case 'radar':
        return (
          <RadarChart data={agentRadarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Sarah" dataKey="Sarah" stroke="hsl(var(--kai-silver))" fill="hsl(var(--kai-silver))" fillOpacity={0.6} />
            <Radar name="Mike" dataKey="Mike" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.3} />
          </RadarChart>
        );
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--kai-charcoal))" />
            <XAxis dataKey={chartKey === 'leadPipelineChart' ? 'month' : 'stage'} stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Line 
              type="monotone" 
              dataKey={chartKey === 'leadPipelineChart' ? 'leads' : 'count'} 
              stroke="hsl(var(--kai-silver))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--kai-silver))', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-background ${getDensityClass()}`}>
      {/* Header with Customization Controls */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold gradient-metallic mb-2 tracking-wide">
            KAI DASHBOARD
          </h1>
          <p className="text-muted-foreground text-lg">
            Real Estate Agency Automation & Performance Center
          </p>
        </div>
        
        {/* Customization Controls */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCustomizerOpen(true)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Customize
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {dashboardSettings.filters.dateRange}
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(dashboardSettings.filters.selectedAgent !== 'all' || 
        dashboardSettings.filters.propertyType !== 'all' || 
        dashboardSettings.filters.leadSource !== 'all') && (
        <div className="mb-6">
          <Card className="card-kai border-kai-silver/20">
            <CardContent className="py-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Active Filters:</span>
                <div className="flex gap-2 flex-wrap">
                  {dashboardSettings.filters.selectedAgent !== 'all' && (
                    <Badge variant="secondary">Agent: {dashboardSettings.filters.selectedAgent}</Badge>
                  )}
                  {dashboardSettings.filters.propertyType !== 'all' && (
                    <Badge variant="secondary">Property: {dashboardSettings.filters.propertyType}</Badge>
                  )}
                  {dashboardSettings.filters.leadSource !== 'all' && (
                    <Badge variant="secondary">Source: {dashboardSettings.filters.leadSource}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Critical Alerts Panel */}
      {dashboardSettings.widgets.criticalAlerts && (
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
      )}

      {/* Main Dashboard Grid */}
      {dashboardSettings.widgets.leadPipeline && (
        <div className={`grid ${getGridClass()} gap-6 mb-8`}>
          
          {/* Lead Pipeline Overview */}
          <div className={dashboardSettings.layout.gridSize !== 'xl' ? 'lg:col-span-2' : ''}>
            <Card className="card-kai h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="h-6 w-6" />
                  Lead Pipeline Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Lead Metrics Row */}
                <div className={`grid ${dashboardSettings.layout.compactView ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
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
                  {!dashboardSettings.layout.compactView && (
                    <>
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
                    </>
                  )}
                </div>

                {/* Lead Trend Chart */}
                <div className={dashboardSettings.layout.compactView ? 'h-48' : 'h-64'}>
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart('leadTrend', leadTrendData, 'leadPipelineChart')}
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
                <div className={dashboardSettings.layout.compactView ? 'h-48 mb-2' : 'h-64 mb-4'}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={dashboardSettings.layout.compactView ? 40 : 60}
                        outerRadius={dashboardSettings.layout.compactView ? 80 : 100}
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
      )}

      {/* Deal Pipeline & Agent Performance */}
      <div className={`grid ${getGridClass()} ${getDensityClass().replace(/p-\d+/, '')} mb-8`}>
        
        {/* Deal Pipeline Status */}
        {dashboardSettings.widgets.dealPipeline && (
          <Card className="card-kai">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <BarChart3 className="h-6 w-6" />
                Deal Pipeline Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={dashboardSettings.layout.compactView ? 'h-48 mb-3' : 'h-64 mb-4'}>
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart('dealPipeline', dealPipelineData, 'dealPipelineChart')}
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
        )}

        {/* Agent Performance */}
        {dashboardSettings.widgets.agentPerformance && (
          <Card className="card-kai">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="h-6 w-6" />
                Agent Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardSettings.charts.performanceChart === 'radar' ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart('performance', agentRadarData, 'performanceChart')}
                  </ResponsiveContainer>
                </div>
              ) : (
                /* Top Performers List */
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
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Client Follow-up & System Health */}
      <div className={`grid ${getGridClass()} ${getDensityClass().replace(/p-\d+/, '')} mb-8`}>
        
        {/* Client Follow-up & Nurturing */}
        {dashboardSettings.widgets.clientFollowup && (
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
        )}

        {/* Admin & Operational Tasks */}
        {dashboardSettings.widgets.adminTasks && (
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
        )}

        {/* System Health & Automation */}
        {dashboardSettings.widgets.systemHealth && (
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
        )}
      </div>

      {/* Reports & Insights */}
      {dashboardSettings.widgets.reportsInsights && (
        <Card className="card-kai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <BarChart3 className="h-6 w-6" />
              Reports & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid grid-cols-1 ${dashboardSettings.layout.compactView ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
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
              {!dashboardSettings.layout.compactView && (
                <div className="text-center p-4 rounded-lg bg-kai-charcoal/50">
                  <div className="text-2xl font-bold text-kai-silver mb-2">8.4</div>
                  <div className="text-sm text-muted-foreground mb-1">Lead Velocity</div>
                  <div className="text-xs text-muted-foreground">Days to conversion</div>
                </div>
              )}
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
      )}

      {/* Dashboard Customizer */}
      <DashboardCustomizer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        settings={dashboardSettings}
        onSettingsChange={setDashboardSettings}
      />
    </div>
  );
};

export default Dashboard;