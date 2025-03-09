import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { InfoIcon } from 'lucide-react';

interface VolatilityThresholdSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

const VolatilityThresholdSlider: React.FC<VolatilityThresholdSliderProps> = ({ 
  value, 
  onValueChange 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toFixed(1));
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Format value to always display one decimal place
  const formattedValue = value.toFixed(1);
  
  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    let newValue = parseFloat(inputValue);
    
    // Validate the input
    if (isNaN(newValue)) {
      newValue = value;
    } else {
      // Clamp between min and max
      newValue = Math.max(0.0, Math.min(50.0, newValue));
      // Round to 1 decimal place
      newValue = Math.round(newValue * 10) / 10;
    }
    
    setInputValue(newValue.toFixed(1));
    onValueChange(newValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setInputValue(formattedValue);
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center">
          <span>Volatility Threshold</span>
          <InfoIcon size={16} className="ml-1 text-muted-foreground" />
        </label>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="text-sm font-semibold w-16 text-right p-1 border rounded"
            aria-label="Edit volatility threshold percentage"
          />
        ) : (
          <span 
            className="text-sm font-semibold cursor-pointer hover:text-blue-500"
            onClick={() => setIsEditing(true)}
            role="button"
            tabIndex={0}
            aria-label="Click to edit volatility threshold"
          >
            {formattedValue}%
          </span>
        )}
      </div>
      <Slider
        value={[value]}
        min={0.0}
        max={50.0}
        step={0.1}
        onValueChange={(values: number[]) => onValueChange(values[0])}
        className="cursor-pointer"
      />
      <p className="text-xs text-muted-foreground">
        Swap will trigger when price fluctuation exceeds this threshold in a 24-hour period
      </p>
    </div>
  );
};

export default VolatilityThresholdSlider;