import React, { useState, useEffect } from "react";
import { Event, TicketTier, Ticket } from "@/api/entities";
import { BarChart3, Calendar, DollarSign, Users, TrendingUp, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

import StatsCard from "../components/dashboard/StatsCard";
import RecentEvents from "../components/dashboard/RecentEvents";
import SalesChart from "../components/dashboard/SalesChart";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const { isAuthenticated } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRevenue: 0,
    totalTickets: 0,
    thisMonthRevenue: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const [eventsData, ticketsData] = await Promise.all([
        Event.list("-created_date"),
        Ticket.list("-created_date", 100)
      ]);
      
      setEvents(eventsData);
      setTickets(ticketsData);
      
      // Calculate stats
      const totalRevenue = ticketsData
        .filter(t => t.status === 'confirmed')
        .reduce((sum, t) => sum + (t.amount_paid || 0), 0);
      
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const thisMonthRevenue = ticketsData
        .filter(t => t.status === 'confirmed' && new Date(t.created_date) >= thisMonth)
        .reduce((sum, t) => sum + (t.amount_paid || 0), 0);

      setStats({
        totalEvents: eventsData.length,
        totalRevenue: totalRevenue / 100, // Convert from cents
        totalTickets: ticketsData.filter(t => t.status === 'confirmed').length,
        thisMonthRevenue: thisMonthRevenue / 100
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your event performance overview.</p>
        </div>
        <Link to={createPageUrl("CreateEvent")}>
          <div className="neu-button px-6 py-3">
            <span className="font-semibold text-gray-700">Create Event</span>
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Events"
          value={stats.totalEvents}
          icon={Calendar}
          color="blue"
          isLoading={isLoading}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="green"
          isLoading={isLoading}
        />
        <StatsCard
          title="Tickets Sold"
          value={stats.totalTickets}
          icon={Users}
          color="purple"
          isLoading={isLoading}
        />
        <StatsCard
          title="This Month"
          value={`$${stats.thisMonthRevenue.toFixed(2)}`}
          icon={TrendingUp}
          color="orange"
          trend="+12%"
          isLoading={isLoading}
        />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalesChart tickets={tickets} isLoading={isLoading} />
        </div>
        <div>
          <RecentEvents events={events} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}