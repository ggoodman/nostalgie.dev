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
  description: string;
  slug: string;
  component: React.ElementType;
}

export type NavChildren = Array<NavSection | NavPage>;

export const nav: NavChildren = [
  {
    kind: NavKind.Page,
    title: 'Getting Started',
    description: 'Learn to get started with Nostalgie, the full-stack React framework.',
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
        description:
          'Learn to use the routing features of Nostalgie, the full-stack React framework.',
        slug: 'routing',
        component: React.lazy(() => import('./features/Routing.mdx')),
      },
      {
        kind: NavKind.Page,
        title: 'Auth',
        description:
          'Learn to use the authentication and authorization features of Nostalgie, the full-stack React framework.',
        slug: 'auth',
        component: React.lazy(() => import('./features/Auth.mdx')),
      },
      {
        kind: NavKind.Page,
        title: 'Markup',
        description:
          'Learn to control the title, head tags and other markup using Nostalgie, the full-stack React framework.',
        slug: 'markup',
        component: React.lazy(() => import('./features/Markup.mdx')),
      },
      {
        kind: NavKind.Page,
        title: 'Functions',
        description:
          'Learn to how easy it is to author and invoke server-side functions using Nostalgie, the full-stack React framework.',
        slug: 'functions',
        component: React.lazy(() => import('./features/Functions.mdx')),
      },
    ],
  },
];
