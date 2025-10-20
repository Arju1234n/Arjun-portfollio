import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Copy, Check, FileDown } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!formData.name.trim()) e.name = 'Please enter your full name.';
    if (!validateEmail(formData.email)) e.email = 'Please enter a valid email address.';
    if (!formData.subject.trim()) e.subject = 'Please enter a subject.';
    if (formData.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // live clear errors on change
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'Please fix the highlighted fields.' } }));
      return;
    }
    setSubmitting(true);
    // Simulated submission; replace with API integration if needed
    setTimeout(() => {
      console.log('Form submitted:', formData);
      window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'Message sent! I will get back to you soon.' } }));
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1200);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "kumararjun5230@gmail.com",
      link: "mailto:kumararjun5230@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 6201539833",
      link: "tel:+916201539833"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Arrah, Bihar, India",
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: Github, name: "GitHub", url: "https://github.com/Arju1234n" },
    { icon: Linkedin, name: "LinkedIn", url: "https://www.linkedin.com/in/arjun-k-35990b21b/" },
    { icon: Twitter, name: "Twitter", url: "#" }, // Add your Twitter URL
    { icon: Mail, name: "Email", url: "mailto:kumararjun5230@gmail.com" }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side: Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Let's Connect</h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <info.icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 text-sm">{info.title}</p>
                      <a 
                        href={info.link}
                        className="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    </div>
                    {(info.title === 'Email' || info.title === 'Phone') && (
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(info.title === 'Phone' ? '+916201539833' : 'kumararjun5230@gmail.com');
                            if (info.title === 'Email') {
                              setEmailCopied(true);
                              setTimeout(() => setEmailCopied(false), 1500);
                            } else {
                              setPhoneCopied(true);
                              setTimeout(() => setPhoneCopied(false), 1500);
                            }
                          } catch {}
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                        title={`Copy ${info.title.toLowerCase()}`}
                      >
                        {(info.title === 'Email' ? emailCopied : phoneCopied) ? (
                          <>
                            <Check size={16} className="text-green-600" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={16} /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4">Find me on Social Media</h4>
                <p className="mb-6 opacity-80">
                  Follow my work and connect with me on my social platforms.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                      title={social.name}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Save my contact</h4>
                <p className="text-sm text-gray-600 mb-4">Download my vCard to add me to your contacts quickly.</p>
                <a
                  href="/arjun-kumar.vcf"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  <FileDown size={18} /> Download vCard
                </a>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6" aria-busy={submitting}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Arjun Kumar"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-colors duration-200 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Hi Arjun, let's connect!"
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'}`}
                >
                  {submitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    <Send size={20} />
                  )}
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

