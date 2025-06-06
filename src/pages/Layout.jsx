
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Calendar, Ticket, BarChart3, QrCode, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
  },
  {
    title: "My Events",
    url: createPageUrl("Events"),
    icon: Calendar,
  },
  {
    title: "Scan Tickets",
    url: createPageUrl("Scanner"),
    icon: QrCode,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-200">
      <style>{`
        :root {
          --neu-bg: #e0e0e0;
          --neu-shadow-light: #ffffff;
          --neu-shadow-dark: #bebebe;
          --neu-inset-light: #ffffff;
          --neu-inset-dark: #b8b8b8;
        }
        
        .neu-card {
          background: var(--neu-bg);
          border-radius: 20px;
          box-shadow: 
            8px 8px 16px var(--neu-shadow-dark),
            -8px -8px 16px var(--neu-shadow-light);
        }
        
        .neu-inset {
          background: var(--neu-bg);
          border-radius: 16px;
          box-shadow: 
            inset 4px 4px 8px var(--neu-inset-dark),
            inset -4px -4px 8px var(--neu-inset-light);
        }
        
        .neu-button {
          background: var(--neu-bg);
          border-radius: 12px;
          box-shadow: 
            4px 4px 8px var(--neu-shadow-dark),
            -4px -4px 8px var(--neu-shadow-light);
          transition: all 0.2s ease;
          border: none;
        }
        
        .neu-button:hover {
          box-shadow: 
            6px 6px 12px var(--neu-shadow-dark),
            -6px -6px 12px var(--neu-shadow-light);
        }
        
        .neu-button:active {
          box-shadow: 
            inset 2px 2px 4px var(--neu-inset-dark),
            inset -2px -2px 4px var(--neu-inset-light);
        }
        
        .neu-flat {
          background: var(--neu-bg);
          border-radius: 16px;
          box-shadow: 
            2px 2px 4px var(--neu-shadow-dark),
            -2px -2px 4px var(--neu-shadow-light);
        }
      `}</style>
      
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-80 p-6">
          <div className="neu-card p-8 h-full">
            {/* Logo */}
            <div className="mb-12">
              <div className="neu-inset p-6 mb-4 inline-block">
                <Ticket className="w-8 h-8 text-gray-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">InviteTix</h1>
              <p className="text-gray-500 text-sm mt-1">Apple Pay Event Tickets</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-4">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link key={item.title} to={item.url}>
                    <div className={`neu-button p-4 flex items-center gap-4 w-full text-left transition-all duration-200 ${
                      isActive ? 'neu-inset' : ''
                    }`}>
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">{item.title}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Create Event CTA */}
            <div className="mt-12">
              <Link to={createPageUrl("CreateEvent")}>
                <div className="neu-button p-4 flex items-center gap-3 w-full text-left bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                  <div className="neu-flat p-2">
                    <Plus className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-blue-700">Create Event</span>
                </div>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="neu-card p-8 h-full overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
