import { checkoutAction } from '@/lib/payments/actions';
import { Check } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';

export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const freePlan = products.find((p) => p.name === 'Free');
  const starterPlan = products.find((p) => p.name === 'Starter');
  const proPlan = products.find((p) => p.name === 'Pro');

  const freePrice = prices.find((p) => p.productId === freePlan?.id);
  const starterPrice = prices.find((p) => p.productId === starterPlan?.id);
  const proPrice = prices.find((p) => p.productId === proPlan?.id);

  return (
    <section className="relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-[60px] max-w-[510px] text-center">
          <span className="mb-2 block text-lg font-semibold text-[#3758F9]">
            Pricing Table
          </span>
          <h2 className="mb-3 text-3xl font-bold text-[#111928] sm:text-4xl md:text-[40px] md:leading-[1.2]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base text-[#637381]">
            Start free and scale as you grow. All plans include a 14-day free trial — no credit card required.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center -mx-4">
          <PricingCard
            name={freePlan?.name ?? 'Free'}
            price={freePrice?.unitAmount ?? 0}
            interval={freePrice?.interval ?? 'month'}
            trialDays={0}
            features={[
              'Up to 500 conversations/mo',
              '1 WhatsApp number',
              '2 team members',
              'Basic automation flows',
              'Community support',
            ]}
            priceId={freePrice?.id}
          />
          <PricingCard
            name={starterPlan?.name ?? 'Starter'}
            price={starterPrice?.unitAmount ?? 3500}
            interval={starterPrice?.interval ?? 'month'}
            trialDays={starterPrice?.trialPeriodDays ?? 14}
            features={[
              'Up to 5,000 conversations/mo',
              '3 WhatsApp numbers',
              'Unlimited team members',
              'Advanced automation & broadcasts',
              'Priority email support',
            ]}
            priceId={starterPrice?.id}
            popular
          />
          <PricingCard
            name={proPlan?.name ?? 'Pro'}
            price={proPrice?.unitAmount ?? 6500}
            interval={proPrice?.interval ?? 'month'}
            trialDays={proPrice?.trialPeriodDays ?? 14}
            features={[
              'Unlimited conversations',
              'Unlimited WhatsApp numbers',
              'Unlimited team members',
              'Custom integrations & API',
              '24/7 dedicated support',
            ]}
            priceId={proPrice?.id}
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
  popular = false,
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
  popular?: boolean;
}) {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white py-10 px-8 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] sm:p-12 lg:py-10 lg:px-6 xl:p-[50px]">
        {popular && (
          <p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-tl-md rounded-bl-md bg-[#3758F9] py-2 px-5 text-sm font-semibold text-white">
            Most Popular
          </p>
        )}

        <span className="mb-5 block text-xl font-semibold text-[#111928]">{name}</span>

        <h2 className="mb-11 text-4xl font-bold text-[#111928] xl:text-[42px]">
          <span className="text-xl font-medium">$</span>
          <span className="ml-1">{price / 100}</span>
          <span className="text-base font-normal text-[#637381]"> / {interval}</span>
        </h2>

        {trialDays > 0 && (
          <p className="mb-5 text-sm text-[#637381]">{trialDays}-day free trial included</p>
        )}

        <div className="mb-[50px]">
          <h5 className="mb-5 text-base font-semibold text-[#111928]">What's included</h5>
          <div className="flex flex-col gap-[14px]">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#3758F9]/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#3758F9]" />
                </div>
                <span className="text-base text-[#637381]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <form action={checkoutAction}>
          <input type="hidden" name="priceId" value={priceId} />
          <SubmitButton popular={popular} />
        </form>
      </div>
    </div>
  );
}
