
import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

export default function RecentEvents({ events, isLoading }) {
  return (
    <div className="neu-flat p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Events</h3>
      
      {isLoading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : events.length > 0 ? (
        <div className="space-y-4">
          {events.slice(0, 5).map((event) => (
            <Link 
              key={event.id} 
              to={createPageUrl(`EventDetails?id=${event.id}`)}
              className="block"
            >
              <div className="neu-button p-4 text-left">
                <h4 className="font-semibold text-gray-800 mb-2">{event.title}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {event.start_date
                        ? format(new Date(event.start_date), "MMM d, yyyy")
                        : "Date TBD"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.tickets_sold || 0} tickets sold</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="neu-inset p-6 text-center">
          <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No events yet</p>
        </div>
      )}
    </div>
  );
}
