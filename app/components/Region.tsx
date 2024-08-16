import React, { useState } from 'react'
import { domesticDestinations, overseasDestinations } from '@/app/data/destinations';

interface RegionProps {
    plan: Plan;
}

const Region: React.FC<RegionProps> = ({ plan }) => {
    const [region, setRegion] = useState('domestic')
    const [suggestions, setSuggestions] = useState<{ kanji: string, furigana: string }[]>([]);


    const getDestinations = () => {
        return region === 'domestic' ? domesticDestinations : overseasDestinations;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'departure' || name === 'destination') {
            if (value.length > 0) {
                const filteredSuggestions = getDestinations().filter((d) =>
                    d.kanji.startsWith(value) || d.furigana.startsWith(value)
                );
                setSuggestions(filteredSuggestions);
            } else {
                setSuggestions([]);
            }
        }
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegion(e.target.value);
        // setPlan(prevPlan => ({
        //     ...prevPlan,
        //     destination: ''
        // }));
        setSuggestions([]);
    }

    const handleSuggestionClick = (field: 'departure' | 'destination', suggestion: Furigana) => {
        // setPlan(prevPlan => ({
        //     ...prevPlan,
        //     [field]: suggestion.kanji
        // }));
        setSuggestions([]);
    };

    return (
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
    )
}

export default Region