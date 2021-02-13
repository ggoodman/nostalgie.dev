import { Helmet } from 'nostalgie/helmet';
import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from 'nostalgie/routing';
import { MDXProviderComponents, styled } from 'nostalgie/styling';
import * as React from 'react';
import { nav, NavChildren, NavKind } from './docs';
import './styles/code.css';

const DocsIndex = React.lazy(() => import('./docs/Index.mdx'));
const Changelog = React.lazy(() => import('./CHANGELOG.md'));

const ScrollPadding = styled.div`
  padding-left: calc((100vw - 100%) / 2);
`;

export const mdxDocsComponents: MDXProviderComponents = {
  code: (props) => {
    return <code {...props} className="bg-gray-100 rounded-sm px-2 py-1"></code>;
  },
  blockquote: (props) => (
    <blockquote {...props} className="border-l-8 border-gray-200 bg-gray-100 rounded-md py-1" />
  ),
  img: (props) => <img {...props} className="h-6 inline-block" />,
  pre: (props) => <pre {...props} className="bg-gray-800 overflow-auto p-0" />,
  ul: (props) => <ul {...props} className="list-disc list-outside ml-8" />,
};

function NavbarLink(
  props: React.PropsWithChildren<{
    color: 'red' | 'yellow' | 'blue' | 'indigo' | 'purple' | 'pink' | 'green';
    to: string;
  }>
) {
  const match = useRouteMatch({ exact: false, path: props.to });
  const activeClassNames = match
    ? `border-${props.color}-700 hover:border-${props.color}-500`
    : 'border-transparent';
  return (
    <Link className={`px-4 border-b-4 ${activeClassNames}`} to={props.to}>
      {props.children}
    </Link>
  );
}

export default function App() {
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
    <>
      <Helmet>
        <title>Nostalgie</title>
        <meta
          name="description"
          content="Nostalgie is an opinionated, full-stack, runtime-agnostic framework for building web apps and web pages using React."
        />
      </Helmet>
      <div className="flex flex-col max-h-screen h-screen overflow-hidden">
        <div className="h-12 flex flex-col border-b border-gray-200">
          <nav className="flex-1 container flex flex-row items-end mx-auto z-30">
            <div className="md:w-60 flex-initial">
              <Link className="px-4 nostalgie text-3xl font-light tracking-widest" to="/">
                Nostalgie
              </Link>
            </div>
            <div className="pl-8 lg:px-16 flex flex-row items-center text-lg font-bold">
              <NavbarLink color="indigo" to="/docs">
                Docs
              </NavbarLink>
              <NavbarLink color="green" to="/changelog">
                Changelog
              </NavbarLink>
            </div>
          </nav>
        </div>
        <div className="flex-1 overflow-x-hidden flex flex-col justify-items-stretch">
          <Switch>
            <Route exact path="/">
              <React.Suspense fallback="">
                <ScrollPadding className="prose container mx-auto">
                  <div className="px-4 py-4">
                    <DocsIndex components={mdxDocsComponents}></DocsIndex>
                  </div>
                </ScrollPadding>
              </React.Suspense>
            </Route>
            <Route exact path="/changelog">
              <React.Suspense fallback="">
                <ScrollPadding className="prose container mx-auto">
                  <div className="px-4 py-4">
                    <Changelog components={mdxDocsComponents}></Changelog>
                  </div>
                </ScrollPadding>
              </React.Suspense>
            </Route>
            {pages.map(({ Component, path, title, description }) => (
              <Route key={path} exact path={path}>
                <Helmet>
                  <title>{`Nostalgie - ${title}`}</title>
                  <meta name="description" content={description} />
                </Helmet>
                <ScrollPadding className="flex flex-col md:flex-row items-stretch container mx-auto relative">
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
                      <div className="px-4 py-4 lg:px-16 max-w-full prose">
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
            <Route path="/*">
              <ScrollPadding className="flex flex-row container px-2 mx-auto">
                <h1 className="text-8xl">Page not found</h1>
              </ScrollPadding>
            </Route>
          </Switch>
        </div>
      </div>
    </>
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
