import React, { useState } from 'react';
import { TravelPlan } from '@/app/interfaces/TravelPlan';

interface TravelFormProps {
  onSubmit: (plan: TravelPlan) => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit }) => {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ destination, departureDate, arrivalDate });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-lg">Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-lg">Departure Date:</label>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-lg">Arrival Date:</label>
        <input
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Create Plan
      </button>
    </form>
  );
};

export default TravelForm;
