import * as React from 'react';
import { mdxDocsComponents } from '../components/mdx';
import { ScrollPadding } from '../components/ScrollPadding';

const Changelog = React.lazy(() => import('../CHANGELOG.md'));

export default function ChangelogPage() {
  return (
    <ScrollPadding className="prose container mx-auto">
      <React.Suspense fallback="">
        <div className="px-4 py-6">
          <Changelog components={mdxDocsComponents} />
        </div>
      </React.Suspense>
    </ScrollPadding>
  );
}
