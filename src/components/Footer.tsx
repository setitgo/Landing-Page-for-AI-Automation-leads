import React from 'react';
import { Rocket, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-purple-100 dark:border-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Rocket className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                SetItGo
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering businesses with AI-powered solutions
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Contact</h3>
            <div className="space-y-2">
              <a href="mailto:info@setitgo.com" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                <Mail className="h-4 w-4" />
                <span>info@setitgo.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                <Phone className="h-4 w-4" />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Legal</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Privacy Policy</a>
              <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-purple-100 dark:border-purple-900 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} SetItGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;