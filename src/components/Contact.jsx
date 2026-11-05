import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceRequired: 'HVAC Systems Contracting',
    projectDetails: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState(null);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Direct mailto handoff protocol (guarantees real handoff without fake backend)
    const recipient = companyInfo.contact.email;
    const subject = encodeURIComponent(`Project Inquiry: ${formData.serviceRequired} - ${formData.companyName || formData.fullName}`);
    const body = encodeURIComponent(
      `Dear PERG Technical Services LLC Team,\n\n` +
      `Here are the details of our project inquiry:\n\n` +
      `• Full Name: ${formData.fullName}\n` +
      `• Company Name: ${formData.companyName || 'N/A'}\n` +
      `• Email Address: ${formData.email}\n` +
      `• Phone Number: ${formData.phone}\n` +
      `• Service Required: ${formData.serviceRequired}\n\n` +
      `• Project Details & Scope:\n${formData.projectDetails}\n\n` +
      `Submitted via PERG Corporate Website Inquiry Form.`
    );

    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    try {
      // Trigger user's email client
      window.location.href = mailtoUrl;

      // Provide clear, honest client feedback explaining the handoff
      setIsSubmitted(true);
      setSubmissionFeedback({
        type: 'success',
        message: `Your inquiry has been prepared for dispatch to ${recipient}. If your default mail application didn't open automatically, please send your email directly using the link below.`
      });
    } catch (err) {
      setSubmissionFeedback({
        type: 'info',
        message: `Please email your details directly to ${recipient}.`
      });
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
                  <a
                    href={companyInfo.registeredOffice.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-perg-blue hover:text-perg-blue-dark mt-3 transition-colors"
                  >
                    <span>View Location on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
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
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    <a href={`tel:${companyInfo.contact.mobilePhone.replace(/\s+/g, '')}`} className="hover:text-perg-blue transition-colors">
                      {companyInfo.contact.mobilePhone}
                    </a>
                    <span className="text-slate-400 font-normal"> (Mobile / WhatsApp)</span>
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

            {/* Dubai Trade License Badge */}
            <div className="p-4 rounded-xl bg-perg-blue-subtle border border-perg-blue/20 text-xs text-slate-600 flex items-center justify-between">
              <div>
                <span className="font-bold text-perg-blue">Dubai Trade License: </span>
                <span className="font-mono text-slate-800">{companyInfo.tradeLicenseNo}</span>
              </div>
              <div>
                <span className="font-bold text-perg-blue">Chamber No: </span>
                <span className="font-mono text-slate-800">{companyInfo.chamberOfCommerceNo}</span>
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

              {submissionFeedback && (
                <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-900 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-perg-blue shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{submissionFeedback.message}</p>
                    <a
                      href={`mailto:${companyInfo.contact.email}?subject=Project%20Inquiry%20-%20${formData.serviceRequired}&body=Full%20Name:%20${encodeURIComponent(formData.fullName)}%0D%0ACompany:%20${encodeURIComponent(formData.companyName)}%0D%0APhone:%20${encodeURIComponent(formData.phone)}%0D%0ADetails:%20${encodeURIComponent(formData.projectDetails)}`}
                      className="text-xs font-bold text-perg-blue underline"
                    >
                      Click here to re-open email draft directly
                    </a>
                  </div>
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

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-perg-blue hover:bg-perg-blue-dark text-white text-base font-bold py-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-perg-blue focus:ring-offset-2"
                >
                  <span>Send Inquiry</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  Protected under PERG confidentiality standards. We never disclose client tenders or project specifications.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
