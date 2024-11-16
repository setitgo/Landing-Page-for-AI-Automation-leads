import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

interface OnboardingSectionProps {
  onCalculate: (result: any) => void;
}

const OnboardingSection: React.FC<OnboardingSectionProps> = ({ onCalculate }) => {
  const [monthlyOnboardings, setMonthlyOnboardings] = useState<string>('');
  const [onboardingSalary, setOnboardingSalary] = useState<string>('4000');
  const [result, setResult] = useState<{
    metric: string;
    description: string;
    source: string;
    rawValue: number;
    type: 'money';
    details: {
      currentCost: number;
      newCost: number;
      timeReduction: number;
    };
  } | null>(null);

  const handleCalculate = () => {
    const numericOnboardings = parseInt(monthlyOnboardings);
    const numericSalary = parseInt(onboardingSalary);
    
    if (!isNaN(numericOnboardings) && !isNaN(numericSalary)) {
      const onboardingTimeReduction = 0.90; // 90% reduction
      const oldOnboardingTimeHours = 20; // Standard onboarding time per client
      const newOnboardingTimeHours = oldOnboardingTimeHours * (1 - onboardingTimeReduction);
      
      // Calculate costs
      const hourlyRate = numericSalary / 160; // Monthly salary to hourly rate
      const currentMonthlyCost = numericOnboardings * oldOnboardingTimeHours * hourlyRate;
      const newMonthlyCost = numericOnboardings * newOnboardingTimeHours * hourlyRate;
      const monthlySavings = currentMonthlyCost - newMonthlyCost;
      
      const calculatedResult = {
        metric: `$${monthlySavings.toLocaleString()}`,
        description: 'Monthly cost savings through automated onboarding',
        source: 'Based on industry average of 90% time reduction',
        rawValue: monthlySavings,
        type: 'money' as const,
        details: {
          currentCost: currentMonthlyCost,
          newCost: newMonthlyCost,
          timeReduction: oldOnboardingTimeHours - newOnboardingTimeHours
        }
      };
      
      setResult(calculatedResult);
      onCalculate(calculatedResult);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <UserPlus className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold dark:text-white">One-Click Onboarding</h2>
      </div>

      <div className="space-y-4 flex-grow">
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            How many new clients/employees do you onboard monthly?
          </p>
          <input
            type="number"
            value={monthlyOnboardings}
            onChange={(e) => setMonthlyOnboardings(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter number of onboardings"
          />
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Monthly salary for onboarding staff ($)
          </p>
          <input
            type="number"
            value={onboardingSalary}
            onChange={(e) => setOnboardingSalary(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter monthly salary"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all"
        >
          Calculate Savings
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
          >
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {result.metric}
            </div>
            <div className="text-gray-600 dark:text-gray-300 mb-4">
              {result.description}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Monthly Cost</p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  ${result.details.currentCost.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">New Monthly Cost</p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  ${result.details.newCost.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-semibold">Key Benefits:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a 
                    href="https://qflowbpm.com/process-onboarding/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Reduce onboarding time from 5+ days to just 10 minutes
                  </a>
                </li>
                <li>
                  <a 
                    href="https://enboarder.com/blog/employee-engagement-onboarding-stats/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Up to 60% year-over-year revenue growth with automated onboarding
                  </a>
                </li>
                <li>
                  <a 
                    href="https://withe.co/blog/employee-onboarding-statistics" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    82% improvement in new hire retention
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.blaze.tech/post/the-essential-guide-to-employee-onboarding-automation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Save up to 20% of salary costs from improved retention
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OnboardingSection;