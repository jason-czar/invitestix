import React, { useState } from "react";
import { Event, TicketTier } from "@/api/entities";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Upload, Link as LinkIcon, Plus } from "lucide-react";
import { UploadFile } from "@/api/integrations";

import EventBasicInfo from "../components/create-event/EventBasicInfo";
import TicketTierForm from "../components/create-event/TicketTierForm";
import EventPreview from "../components/create-event/EventPreview";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    apple_calendar_url: "",
    ics_file_url: "",
    total_capacity: 100
  });
  const [ticketTiers, setTicketTiers] = useState([
    {
      name: "General Admission",
      price: 2000, // $20.00 in cents
      quantity: 100,
      description: "Standard event access",
      refund_policy: "no_refund"
    }
  ]);

  const handleEventDataChange = (field, value) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleIcsUpload = async (file) => {
    try {
      const { file_url } = await UploadFile({ file });
      setEventData(prev => ({ ...prev, ics_file_url: file_url }));
      // TODO: Parse ICS file to extract event details
    } catch (error) {
      console.error("Error uploading ICS file:", error);
    }
  };

  const addTicketTier = () => {
    setTicketTiers(prev => [...prev, {
      name: "",
      price: 0,
      quantity: 50,
      description: "",
      refund_policy: "no_refund"
    }]);
  };

  const updateTicketTier = (index, field, value) => {
    setTicketTiers(prev => prev.map((tier, i) => 
      i === index ? { ...tier, [field]: value } : tier
    ));
  };

  const removeTicketTier = (index) => {
    setTicketTiers(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Generate unique slug
      const slug = eventData.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Date.now();

      // Create event
      const event = await Event.create({
        ...eventData,
        slug,
        host_id: "current-user", // Will be set by backend
        status: "published"
      });

      // Create ticket tiers
      await Promise.all(ticketTiers.map(tier => 
        TicketTier.create({
          ...tier,
          event_id: event.id
        })
      ));

      navigate(createPageUrl("Events"));
    } catch (error) {
      console.error("Error creating event:", error);
    }
    setIsSubmitting(false);
  };

  const steps = [
    { title: "Event Details", component: EventBasicInfo },
    { title: "Ticket Tiers", component: TicketTierForm },
    { title: "Review", component: EventPreview }
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(createPageUrl("Events"))}
          className="neu-button p-3"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Create Event</h1>
          <p className="text-gray-600">Set up your event and start selling tickets</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="neu-flat p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  isActive ? 'neu-inset text-blue-600' : 
                  isCompleted ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                <span className={`ml-3 font-medium ${
                  isActive ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-16 h-px bg-gray-300 mx-6"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="neu-card p-8">
        <CurrentStepComponent
          eventData={eventData}
          onEventDataChange={handleEventDataChange}
          onIcsUpload={handleIcsUpload}
          ticketTiers={ticketTiers}
          onTicketTierUpdate={updateTicketTier}
          onAddTicketTier={addTicketTier}
          onRemoveTicketTier={removeTicketTier}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className={`neu-button px-6 py-3 ${currentStep === 1 ? 'opacity-50' : ''}`}
        >
          <span className="font-semibold text-gray-700">Previous</span>
        </button>

        {currentStep < steps.length ? (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="neu-button px-6 py-3 bg-blue-50"
          >
            <span className="font-semibold text-blue-700">Next</span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="neu-button px-8 py-3 bg-green-50"
          >
            <span className="font-semibold text-green-700">
              {isSubmitting ? "Creating..." : "Create Event"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}