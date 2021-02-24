import * as React from 'react';
import { mdx } from '../components/mdx';
import { ScrollPadding } from '../components/ScrollPadding';

const Index = React.lazy(() => import('../docs/Index.mdx'));

export default function LandingPage() {
  return (
    <ScrollPadding className=" container mx-auto">
      <React.Suspense fallback="">
        <div className="px-4 py-6">
          <Index components={mdx} />
        </div>
      </React.Suspense>
    </ScrollPadding>
  );
}
