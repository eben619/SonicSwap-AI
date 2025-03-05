import React from 'react';
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
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center">
          <span>Volatility Threshold</span>
          <InfoIcon size={16} className="ml-1 text-muted-foreground" />
        </label>
        <span className="text-sm font-semibold">{value}%</span>
      </div>
      <Slider
        value={[value]}
        min={1}
        max={50}
        step={1}
        onValueChange={(value: number[]) => onValueChange(value[0])}
        className="cursor-pointer"
      />
      <p className="text-xs text-muted-foreground">
        Swap will trigger when price fluctuation exceeds this threshold in a 24-hour period
      </p>
    </div>
  );
};

export default VolatilityThresholdSlider;