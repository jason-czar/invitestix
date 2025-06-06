import React from "react";
import { Filter } from "lucide-react";

export default function EventFilters({ filters, onFiltersChange }) {
  return (
    <div className="neu-flat p-4 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <select
        value={filters.status}
        onChange={(e) => onFiltersChange(prev => ({ ...prev, status: e.target.value }))}
        className="neu-button px-4 py-2 text-sm bg-transparent border-none outline-none"
      >
        <option value="all">All Status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="ended">Ended</option>
        <option value="cancelled">Cancelled</option>
      </select>
      
      <select
        value={filters.sortBy}
        onChange={(e) => onFiltersChange(prev => ({ ...prev, sortBy: e.target.value }))}
        className="neu-button px-4 py-2 text-sm bg-transparent border-none outline-none"
      >
        <option value="date">Sort by Date</option>
        <option value="revenue">Sort by Revenue</option>
      </select>
    </div>
  );
}