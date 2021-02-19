import * as React from 'react';
import { mdxDocsComponents } from '../components/mdx';
import { ScrollPadding } from '../components/ScrollPadding';

const Index = React.lazy(() => import('../docs/Index.mdx'));

export default function LandingPage() {
  return (
    <ScrollPadding className="prose container mx-auto">
      <React.Suspense fallback="">
        <div className="px-4 py-6">
          <Index components={mdxDocsComponents} />
        </div>
      </React.Suspense>
    </ScrollPadding>
  );
}
