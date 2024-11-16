import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface TotalSavingsProps {
  results: Record<string, {
    rawValue: number;
    type: 'money' | 'hours';
  }>;
}

const TotalSavings: React.FC<TotalSavingsProps> = ({ results }) => {
  const totalMoney = Object.values(results)
    .filter(result => result.type === 'money')
    .reduce((sum, result) => sum + result.rawValue, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-8 text-white shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6">Total Potential Impact</h2>
      
      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-4">
          <DollarSign className="h-6 w-6" />
          <h3 className="text-xl font-semibold">Monthly Financial Impact</h3>
        </div>
        <p className="text-3xl font-bold mb-2">
          ${totalMoney.toLocaleString()}
        </p>
        <p className="text-sm opacity-80">
          Combined savings from all AI-powered optimizations
        </p>
      </div>

      <p className="mt-6 text-sm opacity-80">
        * Calculations based on industry averages and reported business outcomes. 
        Actual results may vary based on implementation and specific business conditions.
      </p>
    </motion.div>
  );
};

export default TotalSavings;