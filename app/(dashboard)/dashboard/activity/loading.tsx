import { Card, CardContent } from '@/components/ui/card';

export default function ExamplePageSkeleton() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Example
      </h1>
      <Card>
        <CardContent className="min-h-[88px]" />
      </Card>
    </section>
  );
}
