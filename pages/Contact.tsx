import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, Calendar, Send, MapPin } from 'lucide-react';
// 1. Import EmailJS
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';

const Contact: React.FC = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialService = queryParams.get('service') || queryParams.get('interest') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: initialService,
    date: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if(initialService) {
        setFormData(prev => ({...prev, serviceInterest: initialService}));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // 2. Get keys from environment
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // 3. Create the parameters object (Must match {{variables}} in your EmailJS template)
    const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.serviceInterest,
        date: formData.date,
        message: formData.message
    };

    try {
      // 4. Send the email
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', serviceInterest: '', date: '', message: '' }); // Clear form
    } catch (error) {
      console.error("Email failed to send:", error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <Helmet>
        <title>Book a Session | Contact BlueSphere Photography</title>
        <meta name="description" content="Ready to book? Contact us for family shoots, weddings, or headshots in Canberra. Fast response times and flexible booking availability." />
        <link rel="canonical" href="https://bluespherephoto.com/contact" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Let's Create Something Beautiful</h1>
          <p className="text-stone-600 max-w-xl mx-auto">
            Ready to book your session with BlueSphere Photography? 
            Fill out the form below and I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 h-fit">
            <h3 className="text-xl font-bold text-stone-900 mb-6">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Phone</p>
                  <p className="text-stone-600 text-sm">+61 459190709</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Email</p>
                  <p className="text-stone-600 text-sm break-all">bluespherephoto@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Location</p>
                  <p className="text-stone-600 text-sm">Canberra, ACT & Surrounds</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Calendar className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Availability</p>
                  <p className="text-stone-600 text-sm">Sat - Sun: 9am - 5pm, Weekdays: Please request</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">Message Sent!</h3>
                <p className="text-stone-600">Thank you for reaching out to BlueSphere. We will be in touch shortly.</p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-blue-600 font-medium hover:text-blue-800"
                >
                    Send another message
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                 <div className="bg-red-100 p-4 rounded-full mb-4">
                   <Mail className="h-8 w-8 text-red-600" />
                 </div>
                 <h3 className="text-xl font-bold text-stone-900 mb-2">Something went wrong.</h3>
                 <p className="text-stone-600 mb-4">We couldn't send your message. Please verify your internet connection or email us directly.</p>
                 <button onClick={() => setStatus('idle')} className="text-blue-600 hover:underline">Try Again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border-stone-300 border bg-stone-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border-stone-300 border bg-stone-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                      placeholder="0400 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border-stone-300 border bg-stone-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="serviceInterest" className="block text-sm font-medium text-stone-700 mb-1">Interested In</label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full rounded-md border-stone-300 border bg-stone-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    >
                      <option value="">Select a service...</option>
                      <option value="Family & Portrait">Family & Portrait Photography</option>
                      <option value="Event & Wedding">Event & Wedding Photography</option>
                      <option value="Headshots & Branding">Headshots & Personal Branding</option>
                      <option value="Commercial & Property">Commercial & Property</option>
                      <option value="canvas">Canvas / Wall Art</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-stone-700 mb-1">Preferred Date (Optional)</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-md border-stone-300 border bg-stone-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">How can we help?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-md border-stone-300 border bg-stone-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    placeholder="Tell us a bit about the session or event..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-stone-900 text-white font-bold py-4 rounded-lg hover:bg-blue-600 transition transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;