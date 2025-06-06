import React, { useState, useEffect } from "react";
import { Event, TicketTier, Ticket } from "@/api/entities";
import { Calendar, MapPin, Users, DollarSign, Eye, Settings, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

import EventCard from "../components/events/EventCard";
import EventFilters from "../components/events/EventFilters";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "date"
  });

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, filters]);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const eventsData = await Event.list("-created_date");
      setEvents(eventsData);
    } catch (error) {
      console.error("Error loading events:", error);
    }
    setIsLoading(false);
  };

  const filterEvents = () => {
    let filtered = [...events];

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(event => event.status === filters.status);
    }

    // Sort
    if (filters.sortBy === "date") {
      filtered.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    } else if (filters.sortBy === "revenue") {
      filtered.sort((a, b) => (b.total_revenue || 0) - (a.total_revenue || 0));
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Events</h1>
          <p className="text-gray-600">Manage your events and track ticket sales.</p>
        </div>
        <Link to={createPageUrl("CreateEvent")}>
          <div className="neu-button px-6 py-3 flex items-center gap-3">
            <Plus className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Create Event</span>
          </div>
        </Link>
      </div>

      {/* Filters */}
      <EventFilters filters={filters} onFiltersChange={setFilters} />

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="neu-card p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="col-span-full">
            <div className="neu-inset p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500 mb-6">Create your first event to start selling tickets.</p>
              <Link to={createPageUrl("CreateEvent")}>
                <div className="neu-button px-6 py-3 inline-flex items-center gap-3">
                  <Plus className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-700">Create Event</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}