import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendlyModalProps {
  onClose: () => void;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="calendly-inline-widget" data-url="https://calendly.com/pateljilly1/30min" style={{ minWidth: '320px', height: '700px' }}></div>
        <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </motion.div>
    </motion.div>
  );
};

export default CalendlyModal;