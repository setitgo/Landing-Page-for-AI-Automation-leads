import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mic, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

const WEBHOOK_URL = 'https://hook.us2.make.com/yvwrv9vktgq96amk9c5i8v0u3n6r5fpt';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      navigate('/assessment');
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
      >
        AI Value Assessment Tool for Business
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-600 dark:text-gray-300 mb-12"
      >
        Unlock the future of your business with AI-powered solutions
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12"
      >
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Get Your Free AI Audit</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Discover how AI can revolutionize your business. Our cutting-edge AI Value Assessment Tool analyzes your
          business needs and recommends tailored AI solutions to boost efficiency, customer satisfaction, and revenue.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Get My Free AI Audit →'
            )}
          </button>
        </form>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
            <Bot className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">AI Chatbots</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enhance customer support with intelligent, 24/7 virtual assistants
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
            <Mic className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Voice Agents</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Implement voice-activated solutions for seamless, hands-free interactions
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
            <Workflow className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Workflow Automation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Streamline operations with AI-powered process optimization
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;