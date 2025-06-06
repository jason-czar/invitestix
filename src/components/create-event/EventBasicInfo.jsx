import React from "react";
import { Upload, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function EventBasicInfo({ eventData, onEventDataChange, onIcsUpload }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.ics')) {
      onIcsUpload(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Event Information</h2>
        <p className="text-gray-600">Enter your event details or import from Apple Calendar</p>
      </div>

      {/* Import Options */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="neu-inset p-6">
          <div className="flex items-center gap-3 mb-4">
            <LinkIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Apple Calendar URL</h3>
          </div>
          <Input
            placeholder="Paste Apple Calendar invite URL..."
            value={eventData.apple_calendar_url}
            onChange={(e) => onEventDataChange('apple_calendar_url', e.target.value)}
            className="neu-button border-none"
          />
        </div>

        <div className="neu-inset p-6">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Upload ICS File</h3>
          </div>
          <input
            type="file"
            accept=".ics"
            onChange={handleFileUpload}
            className="neu-button w-full px-4 py-2 text-sm file:neu-button file:mr-4 file:px-4 file:py-2 file:border-none file:text-gray-700"
          />
        </div>
      </div>

      {/* Manual Entry */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="Enter event title..."
              value={eventData.title}
              onChange={(e) => onEventDataChange('title', e.target.value)}
              className="neu-button border-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Event location..."
              value={eventData.location}
              onChange={(e) => onEventDataChange('location', e.target.value)}
              className="neu-button border-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your event..."
            value={eventData.description}
            onChange={(e) => onEventDataChange('description', e.target.value)}
            className="neu-button border-none h-24"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date & Time *</Label>
            <Input
              id="start_date"
              type="datetime-local"
              value={eventData.start_date}
              onChange={(e) => onEventDataChange('start_date', e.target.value)}
              className="neu-button border-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_date">End Date & Time</Label>
            <Input
              id="end_date"
              type="datetime-local"
              value={eventData.end_date}
              onChange={(e) => onEventDataChange('end_date', e.target.value)}
              className="neu-button border-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="total_capacity">Total Capacity</Label>
          <Input
            id="total_capacity"
            type="number"
            placeholder="100"
            value={eventData.total_capacity}
            onChange={(e) => onEventDataChange('total_capacity', parseInt(e.target.value))}
            className="neu-button border-none"
          />
        </div>
      </div>
    </div>
  );
}