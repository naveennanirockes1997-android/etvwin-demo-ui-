import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-12 px-4 md:px-12 border-t border-white/5">
      <div className="container mx-auto">
        <div className="flex gap-6 mb-8 items-center">
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><img src="/src/assets/images/facebook.png" alt="Facebook" className="w-6 h-6" /></a>
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><img src="/src/assets/images/insta.png" alt="Instagram" className="w-6 h-6" /></a>
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><img src="/src/assets/images/twiter.png" alt="Twitter" className="w-6 h-6" /></a>
          <a href="#" className="text-text-muted hover:text-white transition-colors"><Youtube size={24} /></a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col gap-3">
            <a href="#" className="text-text-muted hover:underline text-sm">Audio Description</a>
            <a href="#" className="text-text-muted hover:underline text-sm">Help Center</a>
            <a href="#" className="text-text-muted hover:underline text-sm">Gift Cards</a>
            <a href="#" className="text-text-muted hover:underline text-sm">Media Center</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="text-text-muted hover:underline text-sm">Investor Relations</a>
            <a href="#" className="text-text-muted hover:underline text-sm">Jobs</a>
            <a href="#" className="text-text-muted hover:underline text-sm">Terms of Use</a>
            <a href="#" className="text-text-muted hover:underline text-sm">Privacy</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="text-text-muted hover:underline text-sm">Legal Notices</a>
            <a href="#" className="text-text-muted hover:underline text-sm">Cookie Preferences</a>
            <a href="#" className="text-text-muted hover:underline text-sm">Corporate Information</a>
            <a href="#" className="text-text-muted hover:underline text-sm">Contact Us</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <button className="border border-white/20 px-4 py-2 text-text-muted text-xs hover:text-white hover:border-white transition-all">
            Service Code
          </button>
          <p className="text-text-muted text-[12px]">
            &copy; 1997-{currentYear} OTTWIN, Inc. 
            <span className="ml-2">Built with React & Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
