import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface CustomerServiceSectionProps {
  onCalculate: (result: any) => void;
}

const CustomerServiceSection: React.FC<CustomerServiceSectionProps> = ({ onCalculate }) => {
  const [budget, setBudget] = useState<string>('');
  const [result, setResult] = useState<{
    metric: string;
    description: string;
    source: string;
    rawValue: number;
    type: 'money' | 'hours';
  } | null>(null);

  const handleCalculate = () => {
    const numericValue = parseInt(budget);
    if (!isNaN(numericValue)) {
      const savings = numericValue * 0.7; // 70% savings
      const calculatedResult = {
        metric: `$${savings.toLocaleString()}`,
        description: 'Potential annual savings',
        source: 'Industry research shows up to 70% cost reduction',
        rawValue: savings,
        type: 'money' as const
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
          <Bot className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold dark:text-white">Customer Service AI Agent</h2>
      </div>

      <div className="space-y-4 flex-grow">
        <p className="text-gray-600 dark:text-gray-300">What is your current annual customer service budget?</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-8 py-2 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter amount"
            />
          </div>
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
            <div className="text-gray-600 dark:text-gray-300 mb-4">
              {result.description}
            </div>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-semibold">Key Statistics:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a 
                    href="https://www.singlegrain.com/blog/ms/klarna-ai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Klarna reduced support ticket resolution time from 11 to 2 minutes, generating $40M annual profit improvements
                  </a>
                </li>
                <li>
                  <a 
                    href="https://adamconnell.me/chatbot-statistics/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Businesses typically save around 30% on customer support costs with chatbots
                  </a>
                </li>
                <li>
                  <a 
                    href="https://ai-for.business/ai-case-study-saving-80-on-customer-support-costs-with-generative-ai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Cost per ticket reduced from $40 to $8 (80% reduction), with AI handling 93% of support questions
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

export default CustomerServiceSection;