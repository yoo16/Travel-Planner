'use client'

import React, { useState } from 'react';
import { TravelPlan } from '@/app/interfaces/TravelPlan';
import { domesticDestinations, overseasDestinations } from '@/app/data/destinations';

interface TravelFormProps {
    onSubmit: (plan: TravelPlan) => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit }) => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [budget, setBudget] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState<{ kanji: string, furigana: string }[]>([]);
    const [region, setRegion] = useState('domestic'); // 'domestic' か 'overseas'

    const getDestinations = () => {
        return region === 'domestic' ? domesticDestinations : overseasDestinations;
    };

    const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setDeparture(input);

        if (input.length > 0) {
            const filteredSuggestions = getDestinations().filter((d) =>
                d.kanji.startsWith(input) || d.furigana.startsWith(input)
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setDestination(input);

        if (input.length > 0) {
            const filteredSuggestions = getDestinations().filter((d) =>
                d.kanji.startsWith(input) || d.furigana.startsWith(input)
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleDepartureSuggestion = (suggestion: Furigana) => {
        setDeparture(suggestion.kanji);
        setSuggestions([]);
    };

    const handleDestinationSuggestion = (suggestion: Furigana) => {
        setDestination(suggestion.kanji);
        setSuggestions([]);
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegion(e.target.value);
        setDestination('');
        setSuggestions([]);
    };

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(parseInt(e.target.value, 10));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ departure, destination, departureDate, arrivalDate, budget });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">地域:</label>
                <div className="flex space-x-4">
                    <label>
                        <input
                            type="radio"
                            value="domestic"
                            checked={region === 'domestic'}
                            onChange={handleRegionChange}
                            className="mr-2"
                        />
                        日本国内
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="overseas"
                            checked={region === 'overseas'}
                            onChange={handleRegionChange}
                            className="mr-2"
                        />
                        海外
                    </label>
                </div>
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">出発地:</label>
                <input
                    type="text"
                    value={departure}
                    onChange={handleDepartureChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {suggestions.length > 0 && (
                    <ul className="border border-gray-300 rounded-md mt-2 bg-white shadow-lg max-h-40 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleDepartureSuggestion(suggestion)}
                                className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                            >
                                {suggestion.kanji} ({suggestion.furigana})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">目的地:</label>
                <input
                    type="text"
                    value={destination}
                    onChange={handleDestinationChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                />
                {suggestions.length > 0 && (
                    <ul className="border border-gray-300 rounded-md mt-2 bg-white shadow-lg max-h-40 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleDestinationSuggestion(suggestion)}
                                className="p-2 cursor-pointer hover:bg-gray-500 hover:text-white"
                            >
                                {suggestion.kanji} ({suggestion.furigana})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">出発日:</label>
                <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">到着日:</label>
                <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">予算: {budget.toLocaleString()} 円</label>
                <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="5000"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="p-0 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">キーワード:</label>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                AIプラン
            </button>
        </form>
    );
};

export default TravelForm;
