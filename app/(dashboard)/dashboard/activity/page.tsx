import { Card, CardContent } from '@/components/ui/card';
import { Layers } from 'lucide-react';

export default function ExamplePage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Example
      </h1>
      <Card>
        <CardContent className="flex flex-col items-center justify-center text-center py-20">
          <div className="bg-[#3758F9]/10 rounded-full p-4 mb-6">
            <Layers className="h-10 w-10 text-[#3758F9]" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Your logic goes here
          </h2>
          <p className="text-sm text-gray-500 max-w-sm">
            This page is a blank canvas. Any feature — analytics, reports,
            integrations, or custom tools — can be built right here.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
