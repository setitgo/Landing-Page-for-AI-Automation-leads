import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CalendlyModal from '../components/CalendlyModal';
import CustomerServiceSection from '../components/CustomerServiceSection';
import VirtualReceptionistSection from '../components/VirtualReceptionistSection';
import AppointmentSetterSection from '../components/AppointmentSetterSection';
import OnboardingSection from '../components/OnboardingSection';
import WorkflowAutomationSection from '../components/WorkflowAutomationSection';
import TotalSavings from '../components/TotalSavings';

const AssessmentTool = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [sectionResults, setSectionResults] = useState<Record<string, any>>({});
  const userName = localStorage.getItem('userName') || '';

  const handleSectionCalculation = (title: string, result: any) => {
    setSectionResults(prev => ({
      ...prev,
      [title]: result
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
      >
        Welcome{userName ? `, ${userName}` : ''}! Let's Analyze Your Business
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <CustomerServiceSection 
          onCalculate={(result) => handleSectionCalculation('Customer Service AI Agent', result)} 
        />
        <VirtualReceptionistSection 
          onCalculate={(result) => handleSectionCalculation('Virtual Receptionist', result)} 
        />
        <AppointmentSetterSection 
          onCalculate={(result) => handleSectionCalculation('AI Appointment Setter', result)} 
        />
        <OnboardingSection 
          onCalculate={(result) => handleSectionCalculation('One-Click Onboarding', result)} 
        />
        <WorkflowAutomationSection 
          onCalculate={(result) => handleSectionCalculation('Workflow Automation', result)} 
        />
      </div>

      {Object.keys(sectionResults).length > 0 && (
        <TotalSavings results={sectionResults} />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 text-center"
      >
        <button
          onClick={() => setShowCalendly(true)}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
        >
          Book a FREE AI Audit
        </button>
      </motion.div>

      {showCalendly && (
        <CalendlyModal onClose={() => setShowCalendly(false)} />
      )}
    </div>
  );
};

export default AssessmentTool;