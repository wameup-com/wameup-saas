import { checkoutAction } from '@/lib/payments/actions';
import { Check } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const freePlan = products.find((product) => product.name === 'Free');
  const starterPlan = products.find((product) => product.name === 'Starter');
  const proPlan = products.find((product) => product.name === 'Pro');

  const freePrice = prices.find((price) => price.productId === freePlan?.id);
  const starterPrice = prices.find((price) => price.productId === starterPlan?.id);
  const proPrice = prices.find((price) => price.productId === proPlan?.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <PricingCard
          name={freePlan?.name || 'Free'}
          price={freePrice?.unitAmount || 0}
          interval={freePrice?.interval || 'month'}
          trialDays={0}
          features={[
            'Up to 3 automations',
            '1 workspace member',
            'Community support',
          ]}
          priceId={freePrice?.id}
        />
        <PricingCard
          name={starterPlan?.name || 'Starter'}
          price={starterPrice?.unitAmount || 3500}
          interval={starterPrice?.interval || 'month'}
          trialDays={starterPrice?.trialPeriodDays || 14}
          features={[
            'Unlimited automations',
            'Up to 5 workspace members',
            'Email support',
          ]}
          priceId={starterPrice?.id}
          highlighted
        />
        <PricingCard
          name={proPlan?.name || 'Pro'}
          price={proPrice?.unitAmount || 6500}
          interval={proPrice?.interval || 'month'}
          trialDays={proPrice?.trialPeriodDays || 14}
          features={[
            'Everything in Starter, and:',
            'Unlimited workspace members',
            '24/7 priority support',
          ]}
          priceId={proPrice?.id}
        />
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
  highlighted = false,
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`pt-6 rounded-xl p-6 border ${highlighted ? 'border-orange-500 shadow-md' : 'border-gray-200'}`}>
      {highlighted && (
        <span className="inline-block text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mb-3">
          Most popular
        </span>
      )}
      <h2 className="text-2xl font-medium text-gray-900 mb-2">{name}</h2>
      {trialDays > 0 && (
        <p className="text-sm text-gray-600 mb-4">with {trialDays} day free trial</p>
      )}
      <p className="text-4xl font-medium text-gray-900 mb-6">
        ${price / 100}{' '}
        <span className="text-xl font-normal text-gray-600">/ {interval}</span>
      </p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <form action={checkoutAction}>
        <input type="hidden" name="priceId" value={priceId} />
        <SubmitButton />
      </form>
    </div>
  );
}
