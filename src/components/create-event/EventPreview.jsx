import React from "react";
import { Calendar, MapPin, Users, DollarSign, Ticket } from "lucide-react";
import { format } from "date-fns";

export default function EventPreview({ eventData, ticketTiers }) {
  const totalCapacity = ticketTiers.reduce((sum, tier) => sum + tier.quantity, 0);
  const totalRevenuePotential = ticketTiers.reduce((sum, tier) => sum + (tier.price * tier.quantity), 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Review Your Event</h2>
        <p className="text-gray-600">Confirm all details before publishing your event</p>
      </div>

      {/* Event Details Preview */}
      <div className="neu-inset p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Event Information</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{eventData.title}</h4>
            {eventData.description && (
              <p className="text-gray-600 mt-2">{eventData.description}</p>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>
                {eventData.start_date ? 
                  format(new Date(eventData.start_date), "MMM d, yyyy 'at' h:mm a") : 
                  "Start date not set"
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{eventData.location || "Location not set"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Tiers Preview */}
      <div className="neu-inset p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Ticket Tiers</h3>
        <div className="space-y-4">
          {ticketTiers.map((tier, index) => (
            <div key={index} className="neu-flat p-4 flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-800">{tier.name}</h4>
                {tier.description && (
                  <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>Qty: {tier.quantity}</span>
                  <span>Policy: {tier.refund_policy.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-800">${(tier.price / 100).toFixed(2)}</p>
                <p className="text-sm text-gray-500">per ticket</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="neu-flat p-4 text-center">
          <div className="neu-inset p-3 inline-block mb-3">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Total Capacity</p>
          <p className="text-2xl font-bold text-gray-800">{totalCapacity}</p>
        </div>

        <div className="neu-flat p-4 text-center">
          <div className="neu-inset p-3 inline-block mb-3">
            <Ticket className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Ticket Tiers</p>
          <p className="text-2xl font-bold text-gray-800">{ticketTiers.length}</p>
        </div>

        <div className="neu-flat p-4 text-center">
          <div className="neu-inset p-3 inline-block mb-3">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Revenue Potential</p>
          <p className="text-2xl font-bold text-gray-800">${(totalRevenuePotential / 100).toFixed(2)}</p>
        </div>
      </div>

      {/* Ticket Page URL Preview */}
      <div className="neu-inset p-6 bg-blue-50">
        <h3 className="font-semibold text-gray-800 mb-2">Your Ticket Page URL</h3>
        <p className="text-sm text-gray-600 mb-3">Share this link with potential attendees</p>
        <div className="neu-flat p-3 bg-white">
          <code className="text-blue-600 font-mono text-sm">
            https://tickets.invitetix.com/e/{eventData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'event-slug'}
          </code>
        </div>
      </div>
    </div>
  );
}