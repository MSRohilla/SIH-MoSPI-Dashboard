import React, { useState } from 'react';
import { Building2, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    category: 'Data Discrepancy',
    message: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit');
      }
      
      const data = await response.json();
      
      setToast({ show: true, message: `Ticket \${data.ticket_id} created successfully! Our team will contact you shortly.`, type: 'success' });
      setFormData({ name: '', email: '', organization: '', category: 'Data Discrepancy', message: '' });
    } catch (error) {
      setToast({ show: true, message: 'Failed to submit query. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 5000);
    }
  };

  return (
    <div className="p-6 md:p-8 animate-fade-in max-w-[1200px] mx-auto relative">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-24 right-8 z-50 animate-slide-up">
          <div className="bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-3" />
            <p className="font-medium text-sm">{toast.message}</p>
          </div>
        </div>
      )}

      <div className="mb-8 border-b border-gray-200 pb-6">
        <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight flex items-center">
          <MessageSquare className="w-7 h-7 mr-3 text-blue-600" />
          Contact & Support Portal
        </h2>
        <p className="text-gray-500 mt-2 text-lg">Official helpdesk for data verification, API integrations, and methodology inquiries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-2.5 rounded-lg mr-4 mt-1">
                <Building2 className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Nodal Division</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  National Accounts Division (NAD),<br/>
                  Ministry of Statistics & Programme Implementation (MoSPI),<br/>
                  Sankhyiki Bhawan, CBD Shahdara,<br/>
                  New Delhi - 110032
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
            <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-100 pb-3">Official Helpdesk</h3>
            
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded mr-4">
                <Phone className="w-4 h-4 text-gray-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Phone</p>
                <p className="text-sm font-semibold text-gray-900">+91-11-23364440</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded mr-4">
                <Mail className="w-4 h-4 text-gray-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Support Email</p>
                <p className="text-sm font-semibold text-blue-600">napi.support@mospi.gov.in</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded mr-4">
                <Clock className="w-4 h-4 text-gray-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Helpdesk Hours</p>
                <p className="text-sm font-semibold text-gray-900">09:30 - 18:00 IST (Mon-Fri)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Submit a Query</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-sm"
                    placeholder="official.email@domain.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Department / Organization <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-sm"
                    placeholder="e.g. Ministry of Finance"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Query Category <span className="text-red-500">*</span></label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-sm bg-white"
                >
                  <option>Data Discrepancy</option>
                  <option>API Access</option>
                  <option>Methodology Query</option>
                  <option>Other Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                <textarea 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-sm resize-y"
                  placeholder="Describe your issue or query in detail..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0f172a] hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-md shadow-sm transition-colors flex items-center justify-center w-full md:w-auto disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Query'}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
