import React from "react";
import { Plus, Trash2, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function TicketTierForm({ 
  ticketTiers, 
  onTicketTierUpdate, 
  onAddTicketTier, 
  onRemoveTicketTier 
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Ticket Tiers</h2>
        <p className="text-gray-600">Configure your ticket types and pricing</p>
      </div>

      <div className="space-y-6">
        {ticketTiers.map((tier, index) => (
          <div key={index} className="neu-inset p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Tier {index + 1}</h3>
              {ticketTiers.length > 1 && (
                <button
                  onClick={() => onRemoveTicketTier(index)}
                  className="neu-button p-2 bg-red-50"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tier Name *</Label>
                <Input
                  placeholder="e.g., General Admission"
                  value={tier.name}
                  onChange={(e) => onTicketTierUpdate(index, 'name', e.target.value)}
                  className="neu-button border-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Price (USD) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="number"
                    placeholder="20.00"
                    value={tier.price / 100}
                    onChange={(e) => onTicketTierUpdate(index, 'price', parseFloat(e.target.value) * 100)}
                    className="neu-button border-none pl-10"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quantity Available *</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={tier.quantity}
                  onChange={(e) => onTicketTierUpdate(index, 'quantity', parseInt(e.target.value))}
                  className="neu-button border-none"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label>Refund Policy</Label>
                <select
                  value={tier.refund_policy}
                  onChange={(e) => onTicketTierUpdate(index, 'refund_policy', e.target.value)}
                  className="neu-button w-full px-4 py-2 bg-transparent border-none outline-none"
                >
                  <option value="no_refund">No Refund</option>
                  <option value="partial_refund">Partial Refund</option>
                  <option value="full_refund">Full Refund</option>
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe what's included in this tier..."
                value={tier.description}
                onChange={(e) => onTicketTierUpdate(index, 'description', e.target.value)}
                className="neu-button border-none h-20"
              />
            </div>
          </div>
        ))}

        <button
          onClick={onAddTicketTier}
          className="neu-button w-full py-4 flex items-center justify-center gap-3 bg-blue-50"
        >
          <Plus className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-700">Add Another Tier</span>
        </button>
      </div>
    </div>
  );
}