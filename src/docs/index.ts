import * as React from 'react';

export enum NavKind {
  Section,
  Page,
}

export interface NavSection {
  kind: NavKind.Section;
  title: string;
  slug: string;
  children: NavChildren;
}

export interface NavPage {
  kind: NavKind.Page;
  title: string;
  slug: string;
  component: React.ElementType;
}

export type NavChildren = Array<NavSection | NavPage>;

export const nav: NavChildren = [
  {
    kind: NavKind.Page,
    title: 'Getting Started',
    slug: 'quickstart',
    component: React.lazy(() => import('./Quickstart.mdx')),
  },
  {
    kind: NavKind.Section,
    title: 'Features',
    slug: 'features',
    children: [
      {
        kind: NavKind.Page,
        title: 'Routing',
        slug: 'routing',
        component: React.lazy(() => import('./features/Routing.mdx')),
      },
      {
        kind: NavKind.Page,
        title: 'Auth',
        slug: 'auth',
        component: React.lazy(() => import('./features/Auth.mdx')),
      },
      {
        kind: NavKind.Page,
        title: 'Markup',
        slug: 'markup',
        component: React.lazy(() => import('./features/Markup.mdx')),
      },
      {
        kind: NavKind.Page,
        title: 'Functions',
        slug: 'functions',
        component: React.lazy(() => import('./features/Functions.mdx')),
      },
    ],
  },
];
