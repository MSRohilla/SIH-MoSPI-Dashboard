import React from 'react';
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  // Format today's date for the "Last Updated" text
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <footer className="bg-[#0B1528] text-gray-300 font-sans border-t border-blue-900 mt-auto flex-shrink-0 relative z-50">
      <div className="px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-screen-xl mx-auto">
          
          {/* Column 1: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Navigating to Airfare Methodology...'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> Airfare Methodology</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Navigating to MoSPI Tenders portal...'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> Tenders</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Navigating to RTI submission...'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> Right to Information (RTI)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Navigating to Careers...'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> Careers</a></li>
            </ul>
          </div>

          {/* Column 2: Related Portals */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Related Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.open('https://india.gov.in', '_blank'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> India.gov.in <ExternalLink className="w-3 h-3 ml-1 opacity-70" /></a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.open('https://mygov.in', '_blank'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> MyGov <ExternalLink className="w-3 h-3 ml-1 opacity-70" /></a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.open('https://rbi.org.in', '_blank'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> Reserve Bank of India (RBI) <ExternalLink className="w-3 h-3 ml-1 opacity-70" /></a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.open('https://dgca.gov.in', '_blank'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> DGCA <ExternalLink className="w-3 h-3 ml-1 opacity-70" /></a></li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Policies</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Opening Privacy Policy...'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Opening Terms of Use...'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> Terms of Use</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Opening Web Information Manager info...'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> Web Information Manager</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Opening Accessibility Statement...'); }} className="hover:text-blue-400 hover:underline transition-colors flex items-center"><span className="mr-2">›</span> Accessibility Statement</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400 shrink-0" />
                <span>
                  <strong>Ministry of Statistics and Programme Implementation (MoSPI)</strong><br />
                  Sardar Patel Bhavan,<br />
                  Sansad Marg,<br />
                  New Delhi - 110001
                </span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                <span>+91-11-23364440</span>
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                <a href="mailto:napi.support@mospi.gov.in" className="hover:text-blue-400 hover:underline transition-colors">napi.support@mospi.gov.in</a>
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#050B14] border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center text-center text-xs text-gray-500 w-full max-w-screen-xl mx-auto px-6 py-4">
          <p className="mb-2 md:mb-0">
            Designed for <strong>Smart India Hackathon (SIH) 2026</strong> | Problem Statement 26056
          </p>
          <p className="font-mono">
            Last Updated: {today}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
