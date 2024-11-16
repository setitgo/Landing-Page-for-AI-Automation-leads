import React, { useState } from 'react';
import { PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

interface VirtualReceptionistSectionProps {
  onCalculate: (result: any) => void;
}

const VirtualReceptionistSection: React.FC<VirtualReceptionistSectionProps> = ({ onCalculate }) => {
  const [callVolume, setCallVolume] = useState<string>('');
  const [leadValue, setLeadValue] = useState<string>('100');
  const [result, setResult] = useState<{
    metric: string;
    description: string;
    source: string;
    rawValue: number;
    type: 'money' | 'hours';
  } | null>(null);

  const handleCalculate = () => {
    const numericCallVolume = parseInt(callVolume);
    const numericLeadValue = parseInt(leadValue);
    
    if (!isNaN(numericCallVolume) && !isNaN(numericLeadValue)) {
      const missedCalls = Math.round(numericCallVolume * 0.25); // 25% missed calls
      const potentialRevenue = missedCalls * numericLeadValue;
      
      const calculatedResult = {
        metric: `$${potentialRevenue.toLocaleString()}`,
        description: `Potential monthly revenue from ${missedCalls} captured missed calls`,
        source: 'Based on industry average of 25% missed calls',
        rawValue: potentialRevenue,
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
          <PhoneCall className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold dark:text-white">Virtual Receptionist</h2>
      </div>

      <div className="space-y-4 flex-grow">
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">What is your monthly call volume?</p>
          <input
            type="number"
            value={callVolume}
            onChange={(e) => setCallVolume(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter number of calls"
          />
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Average value per lead ($)</p>
          <input
            type="number"
            value={leadValue}
            onChange={(e) => setLeadValue(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter value per lead"
          />
        </div>
        
        <button
          onClick={handleCalculate}
          className="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all"
        >
          Calculate
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
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-semibold">Key Benefits:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a 
                    href="https://dialzara.com/blog/how-much-does-an-ai-virtual-receptionist-cost/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Save up to $250,000 over five years compared to full-time reception staff
                  </a>
                </li>
                <li>
                  <a 
                    href="https://dialzara.com/blog/what-is-an-ai-virtual-receptionist-and-how-can-it-benefit-your-business/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Handle up to 100 calls simultaneously, eliminating wait times
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.reddit.com/r/SideProject/comments/1e2kbdz/i_recreated_an_ai_phone_agent_that_saved_20000_in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Business saved $20,000 in just 30 days by eliminating missed calls
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

export default VirtualReceptionistSection;