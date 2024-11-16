import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppointmentSetterSectionProps {
  onCalculate: (result: any) => void;
}

const AppointmentSetterSection: React.FC<AppointmentSetterSectionProps> = ({ onCalculate }) => {
  const [monthlyLeads, setMonthlyLeads] = useState<string>('');
  const [dealValue, setDealValue] = useState<string>('1000');
  const [result, setResult] = useState<{
    metric: string;
    description: string;
    source: string;
    rawValue: number;
    type: 'money' | 'hours';
  } | null>(null);

  const handleCalculate = () => {
    const numericLeads = parseInt(monthlyLeads);
    const numericDealValue = parseInt(dealValue);
    
    if (!isNaN(numericLeads) && !isNaN(numericDealValue)) {
      // Current setup (4% conversion rate)
      const currentConversions = Math.round(numericLeads * 0.04);
      const currentRevenue = currentConversions * numericDealValue;
      
      // With AI (21% conversion rate based on 5-minute response time)
      const aiConversions = Math.round(numericLeads * 0.21);
      const aiRevenue = aiConversions * numericDealValue;
      
      const additionalRevenue = aiRevenue - currentRevenue;
      
      const calculatedResult = {
        metric: `$${additionalRevenue.toLocaleString()}`,
        description: `Additional monthly revenue from ${aiConversions - currentConversions} more conversions`,
        source: 'Based on 5-minute response time vs. 30+ minutes',
        rawValue: additionalRevenue,
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
          <Calendar className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold dark:text-white">AI Appointment Setter</h2>
      </div>

      <div className="space-y-4 flex-grow">
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">How many leads do you receive monthly?</p>
          <input
            type="number"
            value={monthlyLeads}
            onChange={(e) => setMonthlyLeads(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter number of leads"
          />
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Average deal value ($)</p>
          <input
            type="number"
            value={dealValue}
            onChange={(e) => setDealValue(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter deal value"
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
                    href="https://www.callpage.io/blog/posts/speed-to-lead" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    21x higher lead qualification rate with 5-minute response time
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.trysetter.com/ai-appointment-setter" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Up to 381% increase in conversion rates with 10-second response time
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.reddit.com/r/SideProject/comments/1e2kbdz/i_recreated_an_ai_phone_agent_that_saved_20000_in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    20% increase in bookings and $20,000 saved in first month
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

export default AppointmentSetterSection;