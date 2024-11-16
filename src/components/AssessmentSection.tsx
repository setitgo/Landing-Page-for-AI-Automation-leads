import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AssessmentSectionProps {
  title: string;
  icon: LucideIcon;
  question: string;
  calculateValue: (input: number) => {
    metric: string;
    description: string;
    source: string;
    rawValue: number;
    type: 'money' | 'hours';
  };
  index: number;
  onCalculate: (result: any) => void;
}

const AssessmentSection: React.FC<AssessmentSectionProps> = ({
  title,
  icon: Icon,
  question,
  calculateValue,
  index,
  onCalculate
}) => {
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<{
    metric: string;
    description: string;
    source: string;
    rawValue: number;
    type: 'money' | 'hours';
  } | null>(null);

  const handleCalculate = () => {
    const numericValue = parseInt(value);
    if (!isNaN(numericValue)) {
      const calculatedResult = calculateValue(numericValue);
      setResult(calculatedResult);
      onCalculate(calculatedResult);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <Icon className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
      </div>

      <div className="space-y-4 flex-grow">
        <p className="text-gray-600 dark:text-gray-300">{question}</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter number"
          />
          <button
            onClick={handleCalculate}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all whitespace-nowrap"
          >
            Calculate
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
          >
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {result.metric}
            </div>
            <div className="text-gray-600 dark:text-gray-300 mb-2">
              {result.description}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              Source: {result.source}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AssessmentSection;