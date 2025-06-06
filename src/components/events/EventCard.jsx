
import React from "react";
import { Calendar, MapPin, Users, DollarSign, Eye, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

export default function EventCard({ event }) {
  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-100 text-gray-600",
      published: "bg-green-100 text-green-600",
      ended: "bg-blue-100 text-blue-600",
      cancelled: "bg-red-100 text-red-600"
    };
    return colors[status] || colors.draft;
  };

  return (
    <div className="neu-card p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{event.title}</h3>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={createPageUrl(`EventDetails?id=${event.id}`)}>
            <button className="neu-button p-2">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </Link>
          <Link to={createPageUrl(`EditEvent?id=${event.id}`)}>
            <button className="neu-button p-2">
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
          </Link>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            {event.start_date
              ? format(new Date(event.start_date), "MMM d, yyyy 'at' h:mm a")
              : "Date not set"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="neu-inset p-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Sold</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{event.tickets_sold || 0}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Revenue</span>
          </div>
          <p className="text-lg font-bold text-gray-800">${((event.total_revenue || 0) / 100).toFixed(2)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2">
        <Link to={createPageUrl(`Checkout?event=${event.slug}`)}>
          <button className="neu-button w-full py-3 bg-blue-50">
            <span className="font-semibold text-blue-700">View Ticket Page</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
