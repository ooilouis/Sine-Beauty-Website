import React, { useEffect, useMemo, useState } from 'react';
import type { LandingPage } from '../contexts/CmsDataContext';

interface LandingPageTemplateProps {
  data: LandingPage;
}

const getUtmParams = () => {
  const search = new URLSearchParams(window.location.search);
  return {
    source: search.get('utm_source') || '',
    medium: search.get('utm_medium') || '',
    campaign: search.get('utm_campaign') || '',
    term: search.get('utm_term') || '',
    content: search.get('utm_content') || '',
  };
};

const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({ data }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    concern: '',
  });
  const utm = useMemo(() => getUtmParams(), []);

  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    document.title = data.metaTitle || `${data.name} | Caring Skin`;
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', data.metaDescription || data.subheadline || '');

    return () => {
      document.title = previousTitle;
      descriptionTag?.setAttribute('content', previousDescription);
    };
  }, [data.metaDescription, data.metaTitle, data.name, data.subheadline]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!leadData.name.trim() || !leadData.phone.trim()) return;
    setFormSubmitted(true);
  };

  const whatsappUrl = useMemo(() => {
    const base = data.ctaUrl?.includes('wa.me') ? data.ctaUrl : 'https://wa.me/6587680183';
    const message = [
      `Hi, I am interested in ${data.name}.`,
      `Name: ${leadData.name || '-'}`,
      `Phone: ${leadData.phone || '-'}`,
      `Email: ${leadData.email || '-'}`,
      `Concern: ${leadData.concern || '-'}`,
      `UTM Source: ${utm.source || '-'}`,
      `UTM Medium: ${utm.medium || '-'}`,
      `UTM Campaign: ${utm.campaign || '-'}`,
    ].join('\n');

    return `${base}?text=${encodeURIComponent(message)}`;
  }, [data.ctaUrl, data.name, leadData, utm]);

  return (
    <div className="bg-white text-gray-800">
      <section className="relative min-h-[68vh] pt-32 pb-20">
        <div className="absolute inset-0">
          <img src={data.heroImage} alt={data.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-teal-100">Google Ads Landing Page</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">{data.headline}</h1>
            <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl">{data.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={data.ctaUrl || '#'}
                target={data.ctaUrl?.startsWith('http') ? '_blank' : undefined}
                rel={data.ctaUrl?.startsWith('http') ? 'noreferrer' : undefined}
                className="rounded-full bg-teal-500 px-7 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-teal-600"
              >
                {data.ctaText || 'Book Now'}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/70 bg-white/10 px-7 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.benefits.map((benefit, index) => (
              <div key={`${benefit}-${index}`} className="rounded-lg border border-gray-100 bg-gray-50 px-5 py-4">
                <h3 className="font-semibold text-gray-900">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f8fbfa]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-serif text-gray-900">Why Choose Caring Skin</h2>
              <ul className="mt-6 space-y-3">
                {data.trustPoints.map((point, index) => (
                  <li key={`${point}-${index}`} className="flex items-start gap-2 text-gray-700">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {data.formEnabled && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-serif text-gray-900">Get Your Personalised Plan</h3>
                {!formSubmitted ? (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name*"
                      value={leadData.name}
                      onChange={(event) => setLeadData((prev) => ({ ...prev, name: event.target.value }))}
                      className="w-full rounded border border-gray-200 px-3 py-2 focus:border-teal-500 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Phone Number*"
                      value={leadData.phone}
                      onChange={(event) => setLeadData((prev) => ({ ...prev, phone: event.target.value }))}
                      className="w-full rounded border border-gray-200 px-3 py-2 focus:border-teal-500 focus:outline-none"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={leadData.email}
                      onChange={(event) => setLeadData((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full rounded border border-gray-200 px-3 py-2 focus:border-teal-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Skin concern"
                      value={leadData.concern}
                      onChange={(event) => setLeadData((prev) => ({ ...prev, concern: event.target.value }))}
                      className="h-28 w-full rounded border border-gray-200 px-3 py-2 focus:border-teal-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded bg-teal-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-teal-600"
                    >
                      Submit Lead
                    </button>
                  </form>
                ) : (
                  <div className="mt-5 rounded border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                    {data.thankYouMessage || 'Thanks, our team will contact you shortly.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageTemplate;
