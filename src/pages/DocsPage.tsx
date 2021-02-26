import { Markup } from 'nostalgie/markup';
import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from 'nostalgie/routing';
import * as React from 'react';
import { mdxDocsComponents } from '../components/mdx';
import { ScrollPadding } from '../components/ScrollPadding';
import { nav, NavChildren, NavKind } from '../docs';

export default function DocsPages() {
  const pages = React.useMemo(() => {
    const pages = [];
    const queue = nav.map((node) => ({ node, path: ['', 'docs'] }));

    while (queue.length) {
      const { node, path } = queue.shift()!;

      switch (node.kind) {
        case NavKind.Page:
          pages.push({
            path: [...path, node.slug].join('/'),
            Component: node.component,
            title: node.title,
            description: node.description,
            image: node.image,
          });
          break;
        case NavKind.Section:
          queue.push(
            ...node.children.map((child) => ({ node: child, path: [...path, node.slug] }))
          );
          break;
      }
    }

    return pages;
  }, [nav]);

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const onClickToggleSidebar = React.useCallback(() => {
    setSidebarOpen((open) => !open);
  }, [setSidebarOpen]);
  const location = useLocation();

  // Close sidebar on page change
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <Switch>
      {pages.map(({ Component, path, title, description, image }) => (
        <Route key={path} exact path={path}>
          <Markup>
            <title>{`Nostalgie - ${title}`}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {image ? (
              <meta property="og:image" content={new URL(image, import.meta.url).href} />
            ) : null}
          </Markup>
          <ScrollPadding className="flex-1 flex flex-col md:flex-row items-stretch container mx-auto relative">
            <div
              className="md:hidden self-center hover:cursor-pointer hover:opacity-80 fixed right-2 top-3 z-40 bg-white rounded-md p-1 opacity-60"
              onClick={onClickToggleSidebar}
            >
              <svg className="h-6 opacity-100" viewBox="0 0 100 80">
                <rect width="100" height="20" rx="8"></rect>
                <rect y="30" width="100" height="20" rx="8"></rect>
                <rect y="60" width="100" height="20" rx="8"></rect>
              </svg>
            </div>

            <aside
              className={`w-full md:w-60 fixed top-0 md:static overflow-auto md:overflow-visible h-screen md:h-auto flex-initial border-b md:border-b-0 md:border-r border-gray-200 z-10 flex flex-col ${
                sidebarOpen ? '' : 'hidden md:block'
              }`}
            >
              <NavChildren className="flex-1 px-1 py-4 pt-12 md:pt-0 bg-white" nodes={nav} />
            </aside>

            <div className="overflow-y-auto flex-1">
              <React.Suspense fallback="">
                <div className="px-4 py-6 lg:px-16 max-w-full prose">
                  <Component components={mdxDocsComponents}></Component>
                </div>
              </React.Suspense>
            </div>
          </ScrollPadding>
        </Route>
      ))}
      <Route exact path="/docs">
        <Redirect to="/docs/tutorials/getting-started" />
      </Route>
    </Switch>
  );
}

const NavChildren = ({
  className = '',
  depth = 0,
  nodes,
  path = ['', 'docs'],
}: {
  className?: string;
  depth?: number;
  nodes: NavChildren;
  path?: string[];
}) => (
  <ul className={`flex flex-col space-y-1 ${className}`}>
    {nodes.map((node) => {
      switch (node.kind) {
        case NavKind.Page:
          const nodePath = [...path, node.slug].join('/');
          const match = useRouteMatch({ exact: true, path: nodePath });
          return (
            <li
              key={node.slug}
              className={`text-md font-normal leading-6 px-3 py-1 hover:bg-gray-300
              rounded block ${match ? 'bg-indigo-900 text-gray-100 hover:bg-indigo-700' : ''}`}
            >
              <Link
                is="a"
                to={nodePath}
                className="px-4 text-md block font-normal"
                style={{ display: 'block', paddingLeft: `${depth + 0}rem` }}
              >
                {node.title}
              </Link>
            </li>
          );
        case NavKind.Section:
          return (
            <li key={node.slug} className="leading-8">
              <div
                className="px-3 text-md font-light uppercase tracking-tight"
                style={{ paddingLeft: `${depth + 1}rem` }}
              >
                {node.title}
              </div>
              <NavChildren depth={depth + 1} nodes={node.children} path={[...path, node.slug]} />
            </li>
          );
      }
    })}
  </ul>
);
