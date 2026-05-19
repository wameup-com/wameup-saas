import Link from 'next/link';

const features = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.58 3.37 17.07L2 22L7.07 20.65C8.53 21.49 10.21 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.5 15.5C17.25 16.25 16 16.88 15.38 16.93C14.75 16.98 14.15 17.19 11.38 16.07C8.08 14.76 6.04 11.41 5.88 11.2C5.72 10.99 4.62 9.52 4.62 8C4.62 6.48 5.41 5.74 5.7 5.42C5.99 5.1 6.35 5.01 6.57 5.01C6.79 5.01 7.01 5.01 7.21 5.02C7.42 5.02 7.7 4.95 7.98 5.62C8.26 6.29 8.98 7.83 9.07 8C9.16 8.17 9.22 8.37 9.11 8.6C9 8.83 8.94 8.97 8.77 9.17C8.6 9.37 8.42 9.61 8.27 9.76C8.1 9.93 7.93 10.11 8.12 10.42C8.31 10.73 8.98 11.82 9.95 12.7C11.21 13.83 12.26 14.18 12.57 14.35C12.88 14.52 13.07 14.5 13.26 14.28C13.45 14.06 14.1 13.3 14.31 12.99C14.52 12.68 14.74 12.73 15.03 12.84C15.32 12.95 16.84 13.7 17.15 13.87C17.46 14.04 17.67 14.12 17.74 14.27C17.8 14.41 17.8 15.12 17.5 15.5Z" fill="white"/>
      </svg>
    ),
    title: 'Smart Automation',
    description: 'Build WhatsApp chatbot flows that handle customer queries around the clock — no coding required.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16ZM7 9H9V11H7V9ZM11 9H13V11H11V9ZM15 9H17V11H15V9Z" fill="white"/>
      </svg>
    ),
    title: 'Team Inbox',
    description: 'Manage every WhatsApp conversation from a shared inbox. Assign chats, add notes, and collaborate in real time.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 3L3 10.53V11.5L9.84 14.16L12.5 21H13.46L21 3ZM5.88 10.79L17.36 5.28L10.34 13.18L5.88 10.79ZM13.22 18.12L10.83 13.66L18.73 6.64L13.22 18.12Z" fill="white"/>
      </svg>
    ),
    title: 'Broadcast Campaigns',
    description: 'Send personalised bulk messages to segmented contact lists. Reach thousands instantly with one click.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="white"/>
      </svg>
    ),
    title: 'Analytics & Reports',
    description: 'Track delivery rates, read receipts, and agent performance. Make data-driven decisions every day.',
  },
];

const testimonials = [
  {
    stars: 5,
    quote: '"Wameup reduced our response time by 80%. Our customers love the instant replies and our team is no longer overwhelmed."',
    name: 'Sarah K.',
    role: 'E-commerce Director, ShopFast',
    initials: 'SK',
  },
  {
    stars: 5,
    quote: '"We handle 3× more conversations with the same team. The automation flows are incredibly flexible — set up in minutes."',
    name: 'Ahmed R.',
    role: 'Customer Success Lead, NovaTech',
    initials: 'AR',
  },
  {
    stars: 5,
    quote: '"The broadcast feature helped us run a weekend campaign that drove $50K in sales. The ROI was immediate."',
    name: 'Maria L.',
    role: 'Marketing Manager, BoldBrands',
    initials: 'ML',
  },
];

const steps = [
  {
    number: '01',
    title: 'Connect Your WhatsApp',
    description: 'Link your WhatsApp Business number in minutes. No technical setup — just scan a QR code and you\'re live.',
  },
  {
    number: '02',
    title: 'Build Automation Flows',
    description: 'Create chatbot flows visually with our drag-and-drop builder. Set triggers, conditions, and responses with ease.',
  },
  {
    number: '03',
    title: 'Watch Conversations Convert',
    description: 'Handle more customers automatically, hand off to agents when needed, and track every result in real time.',
  },
];

const faqs = [
  {
    q: 'Does Wameup work with regular WhatsApp?',
    a: 'Wameup works with the WhatsApp Business API. We support both small businesses with the Business App and larger companies using the official API through Meta.',
  },
  {
    q: 'Can multiple agents handle conversations?',
    a: 'Yes. You can add unlimited team members to your shared inbox. Assign conversations, leave internal notes, and collaborate without your customers noticing.',
  },
  {
    q: 'Is there a free trial?',
    a: 'All paid plans include a 14-day free trial — no credit card required. You can also start on our Free plan with no time limit.',
  },
  {
    q: 'What happens when the bot can\'t answer?',
    a: 'When a chatbot flow reaches its limit or detects a complex query, it seamlessly transfers the conversation to a human agent with full context preserved.',
  },
  {
    q: 'Can I send bulk messages to my contacts?',
    a: 'Yes. Our Broadcast feature lets you send personalised messages to contact segments. All broadcasts are sent through the official WhatsApp Business API, keeping you fully compliant.',
  },
];

const stats = [
  { value: '10,000+', label: 'Businesses' },
  { value: '50M+', label: 'Messages Automated' },
  { value: '73%', label: 'Avg Automation Rate' },
  { value: '4.9 / 5', label: 'Customer Rating' },
];

export default function HomePage() {
  return (
    <>
      {/* ====== Hero ====== */}
      <section id="home" className="relative overflow-hidden bg-[#3758F9] pt-[140px] pb-0 md:pt-[160px] lg:pt-[180px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[820px] text-center">
            <h1 className="mb-6 text-4xl font-bold leading-snug text-white sm:text-5xl lg:text-[56px] lg:leading-[1.15]">
              WhatsApp Automation That Converts
            </h1>
            <p className="mx-auto mb-10 max-w-[600px] text-base font-medium text-white/80 sm:text-lg sm:leading-relaxed">
              Automate conversations, manage your team inbox, and grow your business — without adding headcount.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-md bg-white py-[14px] px-8 text-base font-semibold text-[#3758F9] shadow-sm transition duration-300 hover:bg-gray-100"
              >
                Start Free Trial
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md bg-white/10 py-[14px] px-8 text-base font-semibold text-white transition duration-300 hover:bg-white hover:text-[#3758F9]"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Hero visual — stats bar */}
          <div className="mx-auto max-w-[900px] rounded-t-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-white">80%</p>
                <p className="text-sm text-white/70 mt-1">Faster Response Time</p>
              </div>
              <div className="border-x border-white/20">
                <p className="text-3xl font-bold text-white">3×</p>
                <p className="text-sm text-white/70 mt-1">More Conversations Handled</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-sm text-white/70 mt-1">Automated Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute -left-9 bottom-0 z-[-1] opacity-40 pointer-events-none">
          <svg width="134" height="106" viewBox="0 0 134 106" fill="none" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 10 }, (_, col) =>
              Array.from({ length: 7 }, (_, row) => (
                <circle key={`${col}-${row}`} cx={1.667 + col * 14.667} cy={104 - row * 14.667} r="1.667" fill="white" />
              ))
            )}
          </svg>
        </div>
        <div className="absolute -right-6 -top-6 z-[-1] opacity-40 pointer-events-none">
          <svg width="134" height="106" viewBox="0 0 134 106" fill="none" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 10 }, (_, col) =>
              Array.from({ length: 7 }, (_, row) => (
                <circle key={`${col}-${row}`} cx={1.667 + col * 14.667} cy={104 - row * 14.667} r="1.667" fill="white" />
              ))
            )}
          </svg>
        </div>
      </section>

      {/* ====== Social Proof Stats Bar ====== */}
      <section className="bg-white border-b border-[#DFE4EA] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-[#111928]">{s.value}</p>
                <p className="text-sm text-[#637381] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Features ====== */}
      <section id="features" className="pt-20 pb-12 lg:pt-[120px] lg:pb-[70px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 mx-auto max-w-[500px] text-center lg:mb-[70px]">
            <span className="mb-2 block text-lg font-semibold text-[#3758F9]">Features</span>
            <h2 className="mb-3 text-3xl font-bold text-[#111928] sm:text-4xl md:text-[40px] md:leading-[1.2]">
              Everything You Need to Grow on WhatsApp
            </h2>
            <p className="text-base text-[#637381]">
              One platform to automate support, sales, and marketing — across all your WhatsApp numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-[#3758F9]">
                  <span className="absolute top-0 left-0 -z-[1] flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-[#3758F9]/20 transition-transform duration-300 group-hover:rotate-45" />
                  {feature.icon}
                </div>
                <h4 className="mb-3 text-xl font-bold text-[#111928]">{feature.title}</h4>
                <p className="text-[#637381]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== How It Works ====== */}
      <section className="py-20 lg:py-[120px] bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 mx-auto max-w-[500px] text-center lg:mb-[70px]">
            <span className="mb-2 block text-lg font-semibold text-[#3758F9]">How It Works</span>
            <h2 className="mb-3 text-3xl font-bold text-[#111928] sm:text-4xl md:text-[40px] md:leading-[1.2]">
              Up and Running in 3 Steps
            </h2>
            <p className="text-base text-[#637381]">
              No developers. No lengthy onboarding. Just connect, build, and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-[#DFE4EA] z-0" />

            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                <div className="relative z-10 w-20 h-20 rounded-full bg-[#3758F9] flex items-center justify-center mx-auto mb-6 shadow-[0px_8px_20px_rgba(55,88,249,0.3)]">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-[#111928] mb-3">{step.title}</h3>
                <p className="text-[#637381] text-base leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Testimonials ====== */}
      <section className="py-20 md:py-[100px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-[500px] text-center">
            <span className="mb-2 block text-lg font-semibold text-[#3758F9]">Testimonials</span>
            <h2 className="mb-3 text-3xl font-bold text-[#111928] sm:text-4xl md:text-[40px] md:leading-[1.2]">
              What Our Customers Say
            </h2>
            <p className="text-base text-[#637381]">
              Businesses of all sizes use Wameup to automate WhatsApp and scale their customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl bg-white py-8 px-8 shadow-[0px_10px_20px_0px_rgba(92,115,160,0.07)] border border-[#DFE4EA]">
                <div className="flex items-center gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <svg key={i} width="18" height="16" viewBox="0 0 18 16" fill="#FBB040" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.94043 0.360474L10.9477 6.06481H17.4433L12.1882 9.59028L14.1955 15.2946L8.94043 11.7691L3.68538 15.2946L5.69263 9.59028L0.437576 6.06481H6.93318L8.94043 0.360474Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#637381] text-base mb-6 leading-relaxed">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-[46px] h-[46px] rounded-full bg-[#3758F9]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#3758F9] text-sm font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#111928]">{t.name}</h3>
                    <p className="text-xs text-[#8899A8]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="py-20 lg:py-[120px] bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-2 block text-lg font-semibold text-[#3758F9]">FAQ</span>
            <h2 className="mb-3 text-3xl font-bold text-[#111928] sm:text-4xl md:text-[40px] md:leading-[1.2]">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#637381]">
              Everything you need to know about Wameup. Can't find the answer? Email us.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-[#DFE4EA] overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                  <span className="text-base font-semibold text-[#111928] pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3758F9]/10 flex items-center justify-center text-[#3758F9] transition-transform group-open:rotate-45">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-[#637381] text-base leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="relative z-10 overflow-hidden bg-[#3758F9] py-20 lg:py-[100px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-[570px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-[38px] md:leading-[1.3]">
              Ready to Automate Your WhatsApp?
            </h2>
            <p className="mb-8 mx-auto max-w-[500px] text-base text-white/80 leading-relaxed">
              Join thousands of businesses using Wameup to handle more conversations, close more deals, and delight more customers.
            </p>
            <Link
              href="/sign-up"
              className="inline-block py-3.5 px-8 text-base font-semibold text-white transition duration-300 rounded-md bg-[#13C296] hover:bg-[#0BB489]"
            >
              Start Free Trial — No Credit Card Required
            </Link>
          </div>
        </div>

        <span className="absolute top-0 left-0 pointer-events-none">
          <svg width="495" height="470" viewBox="0 0 495 470" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="55" cy="442" r="138" stroke="white" strokeOpacity="0.04" strokeWidth="50" />
            <circle cx="446" cy="0" r="39" stroke="white" strokeOpacity="0.04" strokeWidth="20" />
            <path d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z" stroke="white" strokeOpacity="0.08" strokeWidth="12" />
          </svg>
        </span>
        <span className="absolute bottom-0 right-0 pointer-events-none">
          <svg width="493" height="470" viewBox="0 0 493 470" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="462" cy="5" r="138" stroke="white" strokeOpacity="0.04" strokeWidth="50" />
            <circle cx="49" cy="470" r="39" stroke="white" strokeOpacity="0.04" strokeWidth="20" />
            <path d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z" stroke="white" strokeOpacity="0.06" strokeWidth="13" />
          </svg>
        </span>
      </section>
    </>
  );
}
