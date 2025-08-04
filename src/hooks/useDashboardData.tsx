import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  totalProperties: number;
  activeDeals: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingTasks: number;
  completedTasks: number;
}

export interface LeadData {
  id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  created_at: string;
}

export interface PropertyData {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  status: string;
  created_at: string;
}

export interface DealData {
  id: string;
  deal_value: number;
  stage: string;
  expected_close_date: string | null;
  created_at: string;
}

export interface TaskData {
  id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  due_date: string | null;
  created_at: string;
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    totalProperties: 0,
    activeDeals: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [deals, setDeals] = useState<DealData[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch all data in parallel
      const [
        leadsResponse,
        propertiesResponse,
        dealsResponse,
        tasksResponse,
      ] = await Promise.all([
        supabase.from("leads").select("*").eq("agent_id", user.id),
        supabase.from("properties").select("*"),
        supabase.from("deals").select("*").eq("agent_id", user.id),
        supabase.from("tasks").select("*").eq("assigned_to", user.id),
      ]);

      if (leadsResponse.data) setLeads(leadsResponse.data);
      if (propertiesResponse.data) setProperties(propertiesResponse.data);
      if (dealsResponse.data) setDeals(dealsResponse.data);
      if (tasksResponse.data) setTasks(tasksResponse.data);

      // Calculate stats
      const totalLeads = leadsResponse.data?.length || 0;
      const newLeads = leadsResponse.data?.filter(lead => lead.status === "new").length || 0;
      const totalProperties = propertiesResponse.data?.length || 0;
      const activeDeals = dealsResponse.data?.filter(deal => !["won", "lost"].includes(deal.stage)).length || 0;
      
      const totalRevenue = dealsResponse.data
        ?.filter(deal => deal.stage === "won")
        .reduce((sum, deal) => sum + (deal.commission_amount || 0), 0) || 0;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyRevenue = dealsResponse.data
        ?.filter(deal => {
          if (deal.stage === "won" && deal.actual_close_date) {
            const closeDate = new Date(deal.actual_close_date);
            return closeDate.getMonth() === currentMonth && closeDate.getFullYear() === currentYear;
          }
          return false;
        })
        .reduce((sum, deal) => sum + (deal.commission_amount || 0), 0) || 0;

      const pendingTasks = tasksResponse.data?.filter(task => task.status === "pending").length || 0;
      const completedTasks = tasksResponse.data?.filter(task => task.status === "completed").length || 0;

      setStats({
        totalLeads,
        newLeads,
        totalProperties,
        activeDeals,
        totalRevenue,
        monthlyRevenue,
        pendingTasks,
        completedTasks,
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addLead = async (leadData: Omit<LeadData, "id" | "created_at">) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("leads")
      .insert([{ ...leadData, agent_id: user.id }])
      .select()
      .single();

    if (!error && data) {
      setLeads(prev => [...prev, data]);
      fetchDashboardData(); // Refresh stats
    }
    return { data, error };
  };

  const addProperty = async (propertyData: Omit<PropertyData, "id" | "created_at">) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("properties")
      .insert([{ ...propertyData, agent_id: user.id }])
      .select()
      .single();

    if (!error && data) {
      setProperties(prev => [...prev, data]);
      fetchDashboardData(); // Refresh stats
    }
    return { data, error };
  };

  const addTask = async (taskData: Omit<TaskData, "id" | "created_at">) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ ...taskData, assigned_to: user.id }])
      .select()
      .single();

    if (!error && data) {
      setTasks(prev => [...prev, data]);
      fetchDashboardData(); // Refresh stats
    }
    return { data, error };
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    const { error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", taskId);

    if (!error) {
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, status } : task
        )
      );
      fetchDashboardData(); // Refresh stats
    }
    return { error };
  };

  return {
    stats,
    leads,
    properties,
    deals,
    tasks,
    loading,
    refreshData: fetchDashboardData,
    addLead,
    addProperty,
    addTask,
    updateTaskStatus,
  };
};