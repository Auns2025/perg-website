import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { companyInfo } from '../data/companyData';

const initialFormState = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  serviceRequired: 'HVAC Systems Contracting',
  projectDetails: '',
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const servicesList = [
    'HVAC Systems Contracting',
    'Electrical Contracting',
    'Plumbing & Sanitary Systems',
    'Fire Fighting & Protection Systems',
    'ELV & Low Current Automation',
    'Turnkey MEP Project Management',
    'Technical Consultancy & Energy Audit',
    'Industrial Adhesives & Insulation Supply',
  ];

  // Lock body scroll and attach Escape key listener when success modal is open
  useEffect(() => {
    if (!showSuccessModal) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSuccessModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSuccessModal]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Please enter a contact phone number.';
    if (!formData.projectDetails.trim()) newErrors.projectDetails = 'Please provide brief details of your project or inquiry.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while in flight
    if (isSubmitting) return;

    setErrorMessage(null);

    // Validate inputs
    if (!validate()) return;

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const directEndpoint = import.meta.env.VITE_EMAIL_ENDPOINT || 'https://formsubmit.co/ajax/sales@pergglobal.com';

    // 1. If EmailJS credentials are fully provided, deliver via EmailJS
    if (serviceId && templateId && publicKey) {
      const templateParams = {
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim() || 'N/A',
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        serviceRequired: formData.serviceRequired,
        projectDetails: formData.projectDetails.trim(),
        name: formData.fullName.trim(),
        from_name: formData.fullName.trim(),
        user_name: formData.fullName.trim(),
        reply_to: formData.email.trim(),
        from_email: formData.email.trim(),
        user_email: formData.email.trim(),
        user_phone: formData.phone.trim(),
        company: formData.companyName.trim() || 'N/A',
        company_name: formData.companyName.trim() || 'N/A',
        service: formData.serviceRequired,
        service_required: formData.serviceRequired,
        message: formData.projectDetails.trim(),
        to_email: 'sales@pergglobal.com',
        recipient_email: 'sales@pergglobal.com',
        subject: `Project Inquiry: ${formData.serviceRequired} - ${formData.companyName.trim() || formData.fullName.trim()}`,
      };

      try {
        const response = await emailjs.send(serviceId, templateId, templateParams, {
          publicKey: publicKey,
        });

        if (response.status === 200 || response.text === 'OK') {
          // Reset form only after delivery confirmed
          setFormData(initialFormState);
          setErrors({});
          setErrorMessage(null);
          setShowSuccessModal(true);
        } else {
          throw new Error(`EmailJS returned status ${response.status}: ${response.text}`);
        }
      } catch (err) {
        console.error('[EmailJS Send Error]:', err);
        setErrorMessage('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // 2. Direct Delivery via FormSubmit AJAX (Standard Web API - sends activation link on first submission)
    try {
      const payload = {
        "Full Name": formData.fullName.trim(),
        "Company": formData.companyName.trim() || 'N/A',
        "Email Address": formData.email.trim(),
        "Phone Number": formData.phone.trim(),
        "Service Required": formData.serviceRequired,
        "Project Scope": formData.projectDetails.trim(),
        "_subject": `New Project Inquiry: ${formData.serviceRequired} - ${formData.companyName.trim() || formData.fullName.trim()}`,
        "_replyto": formData.email.trim(),
        "_template": "table",
        "_captcha": "false"
      };

      const response = await fetch(directEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
        // Reset form only after delivery confirmed
        setFormData(initialFormState);
        setErrors({});
        setErrorMessage(null);
        setShowSuccessModal(true);
      } else {
        throw new Error(result.message || `Delivery responded with status ${response.status}`);
      }
    } catch (err) {
      console.error('[Contact Form Delivery Error]:', err);
      // Preserve form data on failure
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-perg-blue uppercase mb-3">
            <span className="w-6 h-0.5 bg-perg-blue" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-perg-charcoal tracking-tight max-w-3xl">
            Start a Conversation With Our Team
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl">
            Our engineering consultants and project managers in Business Bay, Dubai are ready to review your project scope and tender specifications.
          </p>
        </div>

        {/* Two-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Authentic Company Details & Map Link */}
          <div className="lg:col-span-5 space-y-8">
            {/* Registered Head Office */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-perg-blue-light text-perg-blue flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Registered Head Office
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
                    {companyInfo.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {companyInfo.registeredOffice.suite}<br />
                    {companyInfo.registeredOffice.area}<br />
                    {companyInfo.registeredOffice.city}, {companyInfo.registeredOffice.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-perg-blue-light text-perg-blue flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Direct Telephone & Mobile
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    <a href={`tel:${companyInfo.contact.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-perg-blue transition-colors">
                      {companyInfo.contact.primaryPhone}
                    </a>
                    <span className="text-slate-400 font-normal"> (Main Office)</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-perg-blue-light text-perg-blue flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Commercial & Tender Inquiries
                  </div>
                  <a
                    href={`mailto:${companyInfo.contact.email}`}
                    className="text-sm font-semibold text-perg-blue hover:text-perg-blue-dark transition-colors"
                  >
                    {companyInfo.contact.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official domain: {companyInfo.contact.website}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-perg-blue-light text-perg-blue flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Official Working Hours
                  </div>
                  <p className="text-sm text-slate-700">
                    {companyInfo.contact.workHours}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Operations: P.O. Box 124610, Bur Dubai
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Modern Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm">
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">
                Send Project Inquiry
              </h3>
              <p className="text-sm text-slate-500 mb-8">
                Please complete the form below. Your request will be directly structured for our commercial engineering team.
              </p>

              {/* Error Message Box */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-3 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-800">{errorMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-red-400 hover:text-red-700 text-xs font-bold transition-colors"
                    aria-label="Dismiss error"
                  >
                    ✕
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Eng. Ahmed Al Mansoori"
                      className={`w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none ${
                        errors.fullName
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-slate-300 focus:border-perg-blue focus:ring-1 focus:ring-perg-blue'
                      }`}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Emaar, ADNOC, Al Shirawi"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-perg-blue focus:ring-1 focus:ring-perg-blue transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none ${
                        errors.email
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-slate-300 focus:border-perg-blue focus:ring-1 focus:ring-perg-blue'
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 123 4567"
                      className={`w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none ${
                        errors.phone
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-slate-300 focus:border-perg-blue focus:ring-1 focus:ring-perg-blue'
                      }`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Required */}
                <div>
                  <label htmlFor="serviceRequired" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Required
                  </label>
                  <select
                    id="serviceRequired"
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-perg-blue focus:ring-1 focus:ring-perg-blue bg-white transition-all"
                  >
                    {servicesList.map((srv, idx) => (
                      <option key={idx} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="projectDetails" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Details & Scope <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    rows={4}
                    value={formData.projectDetails}
                    onChange={handleChange}
                    placeholder="Provide overview of facility, location, estimated schedule, or specific BOQ requirements..."
                    className={`w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none ${
                      errors.projectDetails
                        ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:border-perg-blue focus:ring-1 focus:ring-perg-blue'
                    }`}
                    aria-invalid={!!errors.projectDetails}
                    aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined}
                  />
                  {errors.projectDetails && (
                    <p id="projectDetails-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.projectDetails}
                    </p>
                  )}
                </div>

                {/* Submit Button with Loading & Duplicate Submission Prevention */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-perg-blue hover:bg-perg-blue-dark disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-base font-bold py-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-perg-blue focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  Protected under PERG confidentiality standards. We never disclose client tenders or project specifications.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION MODAL (Mounted via Portal) */}
      {showSuccessModal && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Submission Successful"
        >
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setShowSuccessModal(false)}
            aria-label="Close modal overlay"
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 text-center z-10 transform transition-all">
            {/* Top Right Close Button */}
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              aria-label="Close popup"
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5 text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            {/* Exact Required Heading */}
            <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">
              Thank You!
            </h3>

            {/* Exact Required Message */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Your form has been submitted successfully. Our team will contact you shortly.
            </p>

            {/* OK Button */}
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-perg-blue hover:bg-perg-blue-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-perg-blue focus:ring-offset-2"
            >
              <span>OK</span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
