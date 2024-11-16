import React, { useState } from 'react';
import { Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

interface WorkflowAutomationSectionProps {
  onCalculate: (result: any) => void;
}

const WorkflowAutomationSection: React.FC<WorkflowAutomationSectionProps> = ({ onCalculate }) => {
  const [manualHours, setManualHours] = useState<string>('');
  const [result, setResult] = useState<{
    metric: string;
    description: string;
    source: string;
    rawValue: number;
    type: 'money' | 'hours';
    details: {
      currentCosts: number;
      aiCosts: number;
      laborSavings: number;
      errorSavings: number;
    };
  } | null>(null);

  const calculateSavings = (hours: number) => {
    const hourlyRate = 50; // Average hourly labor cost
    const errorCostMultiplier = 200; // Cost per error
    const currentErrorRate = 0.15; // 15% error rate in manual processes
    
    // Current costs
    const currentLaborCost = hours * hourlyRate;
    const currentErrorCost = (hours * currentErrorRate) * errorCostMultiplier;
    const totalCurrentCost = currentLaborCost + currentErrorCost;
    
    // AI-automated costs (70% reduction in hours, 90% reduction in errors)
    const aiHours = hours * 0.3;
    const aiLaborCost = aiHours * hourlyRate;
    const aiErrorCost = (aiHours * (currentErrorRate * 0.1)) * errorCostMultiplier;
    const totalAiCost = aiLaborCost + aiErrorCost;
    
    const monthlySavings = totalCurrentCost - totalAiCost;
    const laborSavings = currentLaborCost - aiLaborCost;
    const errorSavings = currentErrorCost - aiErrorCost;

    return {
      savings: monthlySavings,
      details: {
        currentCosts: totalCurrentCost,
        aiCosts: totalAiCost,
        laborSavings,
        errorSavings
      }
    };
  };

  const handleCalculate = () => {
    const hours = parseInt(manualHours);
    if (!isNaN(hours)) {
      const { savings, details } = calculateSavings(hours);
      
      const calculatedResult = {
        metric: `$${savings.toLocaleString()}`,
        description: 'Monthly cost savings through AI automation',
        source: 'Based on industry averages for labor costs and error rates',
        rawValue: savings,
        type: 'money' as const,
        details
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
          <Workflow className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold dark:text-white">Workflow Automation</h2>
      </div>

      <div className="space-y-4 flex-grow">
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            How many hours per month do you spend on manual workflows?
          </p>
          <input
            type="number"
            value={manualHours}
            onChange={(e) => setManualHours(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter hours per month"
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Monthly Costs</p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  ${result.details.currentCosts.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">AI-Automated Costs</p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  ${result.details.aiCosts.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-semibold">Key Benefits:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a 
                    href="https://beslick.com/what-is-ai-workflow-automation/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    70% reduction in manual processing time and 90% reduction in errors
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.pulpstream.com/resources/blog/ai-workflow-automation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Scale operations without additional human resources
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.leewayhertz.com/ai-for-workflow-automation/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Improved decision-making and enhanced customer experience
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

export default WorkflowAutomationSection;