import React from "react";
import { TrendingUp } from "lucide-react";

export default function StatsCard({ title, value, icon: Icon, color, trend, isLoading }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600", 
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600"
  };

  return (
    <div className="neu-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`neu-flat p-3 ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">{trend}</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        {isLoading ? (
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        )}
      </div>
    </div>
  );
}