import type { MDXProps } from 'nostalgie/styling';
import * as React from 'react';
import * as GettingStartedTutorial from './tutorials/GettingStarted.mdx';
import GettingStartedImageUrl from './tutorials/GettingStarted/getting_started.png';

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
  image?: string;
  slug: string;
  component: React.ElementType<MDXProps>;
}

export type NavChildren = Array<NavSection | NavPage>;

export const nav: NavChildren = [
  {
    kind: NavKind.Section,
    title: 'Tutorials',
    slug: 'tutorials',
    children: [
      {
        kind: NavKind.Page,
        title: GettingStartedTutorial.frontmatter['title'] as string,
        description: GettingStartedTutorial.frontmatter['description'] as string,
        image: GettingStartedImageUrl,
        slug: GettingStartedTutorial.frontmatter['slug'] as string,
        component: React.lazy(() => import('./tutorials/GettingStarted.mdx')),
      },
    ],
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
  {
    kind: NavKind.Section,
    title: 'Reference',
    slug: 'reference',
    children: [
      {
        kind: NavKind.Page,
        title: 'Server Functions',
        description: 'Discover the API for loading data and calling server-side logic.',
        slug: 'functions',
        component: React.lazy(() => import('./reference/Functions.mdx')),
      },
      {
        kind: NavKind.Page,
        title: 'Lazy Loading',
        description: 'Discover the API for lazy loading components and for code-splitting.',
        slug: 'lazy',
        component: React.lazy(() => import('./reference/Lazy.md')),
      },
    ],
  },
  {
    kind: NavKind.Section,
    title: 'Discussions',
    slug: 'discussions',
    children: [
      {
        kind: NavKind.Page,
        title: 'Key Concepts',
        description: 'Learn about some key concepts in Nostalgie, the full-stack React framework.',
        slug: 'key-concepts',
        component: React.lazy(() => import('./discussions/Concepts.mdx')),
      },
    ],
  },
];
