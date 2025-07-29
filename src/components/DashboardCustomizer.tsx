import React, { useState } from 'react';
import { 
  Settings, 
  Filter, 
  Layout, 
  Eye, 
  EyeOff, 
  Calendar,
  Users,
  Building,
  BarChart3,
  PieChart,
  Grid3X3,
  Columns,
  Rows,
  Monitor,
  Moon,
  Sun,
  ChevronDown,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface DashboardSettings {
  // Widget visibility
  widgets: {
    leadPipeline: boolean;
    dealPipeline: boolean;
    agentPerformance: boolean;
    clientFollowup: boolean;
    adminTasks: boolean;
    systemHealth: boolean;
    reportsInsights: boolean;
    criticalAlerts: boolean;
  };
  
  // Filters
  filters: {
    dateRange: string;
    selectedAgent: string;
    propertyType: string;
    leadSource: string;
  };
  
  // Layout options
  layout: {
    gridSize: string;
    arrangement: string;
    compactView: boolean;
  };
  
  // Chart preferences
  charts: {
    leadPipelineChart: string;
    dealPipelineChart: string;
    performanceChart: string;
  };
  
  // Theme and view
  view: {
    theme: string;
    density: string;
    animations: boolean;
  };
}

interface DashboardCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DashboardSettings;
  onSettingsChange: (settings: DashboardSettings) => void;
}

const DashboardCustomizer: React.FC<DashboardCustomizerProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}) => {
  const [openSections, setOpenSections] = useState({
    widgets: true,
    filters: false,
    layout: false,
    charts: false,
    view: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateWidgetVisibility = (widget: keyof DashboardSettings['widgets'], visible: boolean) => {
    onSettingsChange({
      ...settings,
      widgets: {
        ...settings.widgets,
        [widget]: visible
      }
    });
  };

  const updateFilter = (filter: keyof DashboardSettings['filters'], value: string) => {
    onSettingsChange({
      ...settings,
      filters: {
        ...settings.filters,
        [filter]: value
      }
    });
  };

  const updateLayout = (layout: keyof DashboardSettings['layout'], value: string | boolean) => {
    onSettingsChange({
      ...settings,
      layout: {
        ...settings.layout,
        [layout]: value
      }
    });
  };

  const updateChart = (chart: keyof DashboardSettings['charts'], value: string) => {
    onSettingsChange({
      ...settings,
      charts: {
        ...settings.charts,
        [chart]: value
      }
    });
  };

  const updateView = (view: keyof DashboardSettings['view'], value: string | boolean) => {
    onSettingsChange({
      ...settings,
      view: {
        ...settings.view,
        [view]: value
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-96 bg-background border-l shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Dashboard Settings
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Widget Visibility */}
          <Collapsible open={openSections.widgets} onOpenChange={() => toggleSection('widgets')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-3 h-auto">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">Widget Visibility</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.widgets ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              {Object.entries(settings.widgets).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => updateWidgetVisibility(key as keyof DashboardSettings['widgets'], checked)}
                  />
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Filters */}
          <Collapsible open={openSections.filters} onOpenChange={() => toggleSection('filters')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-3 h-auto">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">Filters</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.filters ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-3">
              <div>
                <Label className="text-sm flex items-center gap-2 mb-2">
                  <Calendar className="h-3 w-3" />
                  Date Range
                </Label>
                <Select value={settings.filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm flex items-center gap-2 mb-2">
                  <Users className="h-3 w-3" />
                  Agent
                </Label>
                <Select value={settings.filters.selectedAgent} onValueChange={(value) => updateFilter('selectedAgent', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All agents</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Chen</SelectItem>
                    <SelectItem value="alex">Alex Rodriguez</SelectItem>
                    <SelectItem value="lisa">Lisa Wang</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm flex items-center gap-2 mb-2">
                  <Building className="h-3 w-3" />
                  Property Type
                </Label>
                <Select value={settings.filters.propertyType} onValueChange={(value) => updateFilter('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Layout Options */}
          <Collapsible open={openSections.layout} onOpenChange={() => toggleSection('layout')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-3 h-auto">
                <div className="flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  <span className="font-medium">Layout</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.layout ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-3">
              <div>
                <Label className="text-sm flex items-center gap-2 mb-2">
                  <Grid3X3 className="h-3 w-3" />
                  Grid Size
                </Label>
                <Select value={settings.layout.gridSize} onValueChange={(value) => updateLayout('gridSize', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (4 columns)</SelectItem>
                    <SelectItem value="medium">Medium (3 columns)</SelectItem>
                    <SelectItem value="large">Large (2 columns)</SelectItem>
                    <SelectItem value="xl">Extra Large (1 column)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm flex items-center gap-2 mb-2">
                  <Columns className="h-3 w-3" />
                  Arrangement
                </Label>
                <Select value={settings.layout.arrangement} onValueChange={(value) => updateLayout('arrangement', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="analytics-first">Analytics First</SelectItem>
                    <SelectItem value="operations-first">Operations First</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="compact" className="text-sm">Compact View</Label>
                <Switch
                  id="compact"
                  checked={settings.layout.compactView}
                  onCheckedChange={(checked) => updateLayout('compactView', checked)}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Chart Preferences */}
          <Collapsible open={openSections.charts} onOpenChange={() => toggleSection('charts')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-3 h-auto">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="font-medium">Chart Types</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.charts ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-3">
              <div>
                <Label className="text-sm mb-2 block">Lead Pipeline</Label>
                <Select value={settings.charts.leadPipelineChart} onValueChange={(value) => updateChart('leadPipelineChart', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-2 block">Deal Pipeline</Label>
                <Select value={settings.charts.dealPipelineChart} onValueChange={(value) => updateChart('dealPipelineChart', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="funnel">Funnel Chart</SelectItem>
                    <SelectItem value="horizontal">Horizontal Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-2 block">Performance</Label>
                <Select value={settings.charts.performanceChart} onValueChange={(value) => updateChart('performanceChart', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="radar">Radar Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="scatter">Scatter Plot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* View Options */}
          <Collapsible open={openSections.view} onOpenChange={() => toggleSection('view')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-3 h-auto">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span className="font-medium">View Options</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.view ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-3">
              <div>
                <Label className="text-sm flex items-center gap-2 mb-2">
                  <Sun className="h-3 w-3" />
                  Theme
                </Label>
                <Select value={settings.view.theme} onValueChange={(value) => updateView('theme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-2 block">Density</Label>
                <Select value={settings.view.density} onValueChange={(value) => updateView('density', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="animations" className="text-sm">Animations</Label>
                <Switch
                  id="animations"
                  checked={settings.view.animations}
                  onCheckedChange={(checked) => updateView('animations', checked)}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Active Filters Summary */}
          <div className="pt-4 border-t">
            <Label className="text-sm font-medium mb-2 block">Active Filters</Label>
            <div className="flex flex-wrap gap-1">
              {Object.entries(settings.filters).map(([key, value]) => {
                if (value === 'all' || !value) return null;
                return (
                  <Badge key={key} variant="secondary" className="text-xs">
                    {key}: {value}
                  </Badge>
                );
              })}
              {Object.values(settings.filters).every(v => v === 'all' || !v) && (
                <span className="text-xs text-muted-foreground">No active filters</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomizer;