import { Route } from 'nostalgie/routing';
import * as React from 'react';
import { ScrollPadding } from '../components/ScrollPadding';

export function NotFoundPage() {
  return (
    <Route path="/*">
      <ScrollPadding className="flex flex-row container px-2 mx-auto">
        <h1 className="text-8xl">Page not found</h1>
      </ScrollPadding>
    </Route>
  );
}
