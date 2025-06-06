import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays, isAfter } from "date-fns";

export default function SalesChart({ tickets, isLoading }) {
  const generateChartData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        date: format(date, "MMM dd"),
        sales: 0,
        revenue: 0
      };
    });

    tickets
      .filter(t => t.status === 'confirmed')
      .forEach(ticket => {
        const ticketDate = new Date(ticket.created_date);
        const dayIndex = last7Days.findIndex(day => 
          format(ticketDate, "MMM dd") === day.date
        );
        
        if (dayIndex !== -1) {
          last7Days[dayIndex].sales += 1;
          last7Days[dayIndex].revenue += (ticket.amount_paid || 0) / 100;
        }
      });

    return last7Days;
  };

  const data = generateChartData();

  return (
    <div className="neu-flat p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Sales Overview (Last 7 Days)</h3>
      
      {isLoading ? (
        <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="date" 
              stroke="#888"
              fontSize={12}
            />
            <YAxis 
              stroke="#888"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#e0e0e0',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '4px 4px 8px #bebebe, -4px -4px 8px #ffffff'
              }}
            />
            <Bar 
              dataKey="sales" 
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}