import { Link, Route, Switch, useRouteMatch } from 'nostalgie/routing';
import { MDXProvider, MDXProviderComponents, styled } from 'nostalgie/styling';
import * as React from 'react';
import { nav, NavChildren, NavKind, NavPage } from './docs';
import './styles/code.css';

const DocsIndex = React.lazy(() => import('./docs/Index.mdx'));

const Main = styled.main`
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
`;

export const mdxDocsComponents: MDXProviderComponents = {
  blockquote: (props) => (
    <blockquote {...props} className="border-l-8 border-gray-200 bg-gray-100 rounded-md py-1" />
  ),
  // code: (props) => <code {...props} className="font-mono inline-block bg-blue-900 text-gray-100" />,
  img: (props) => <img {...props} className="h-6 inline-block" />,
  pre: (props) => <pre {...props} className="bg-gray-800 overflow-auto" />,
  ul: (props) => <ul {...props} className="list-disc list-outside ml-8" />,
};

export default function App() {
  const pages = React.useMemo(() => {
    const pages = [];
    const queue = nav.map((node) => ({ node, path: ['', 'docs'] }));

    while (queue.length) {
      const { node, path } = queue.shift()!;

      switch (node.kind) {
        case NavKind.Page:
          pages.push({ path: [...path, node.slug].join('/'), Component: node.component });
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

  return (
    <>
      <div className="flex flex-col max-h-screen h-screen overflow-hidden">
        <div className="h-8 px-6 text-xl font-extrabold tracking-wider border-b border-gray-200">
          <Link to="/">Nostalgie.dev</Link>
        </div>
        <div className="flex flex-1 flex-row overflow-hidden">
          <nav className="w-60 px-2 py-4 flex-grow-0 flex-shrink-0 overflow-y-auto border-r border-gray-200">
            <NavChildren nodes={nav} />
          </nav>

          <Main className="overflow-y-auto">
            <MDXProvider components={mdxDocsComponents}>
              <Switch>
                <React.Suspense fallback="">
                  <Route exact path="/">
                    <div className="px-8 py-4 lg:px-16 container prose">
                      <DocsIndex></DocsIndex>
                    </div>
                  </Route>
                  {pages.map(({ Component, path }) => (
                    <Route key={path} exact path={path}>
                      <div className="px-8 py-4 lg:px-16 container prose">
                        <Component></Component>
                      </div>
                    </Route>
                  ))}
                </React.Suspense>
              </Switch>
            </MDXProvider>
          </Main>
        </div>
      </div>
    </>
  );
}

function DocsContent({ page, path = [''] }: { page: NavPage; path?: string[] }) {}

const NavChildren = ({
  depth = 0,
  nodes,
  path = ['', 'docs'],
}: {
  depth?: number;
  nodes: NavChildren;
  path?: string[];
}) => (
  <ul className="flex flex-col space-y-1">
    {nodes.map((node) => {
      switch (node.kind) {
        case NavKind.Page:
          const nodePath = [...path, node.slug].join('/');
          const match = useRouteMatch({ exact: true, path: nodePath });
          return (
            <li
              key={node.slug}
              className={`text-md font-normal leading-6 px-4 py-1 hover:bg-gray-300
              rounded block ${match ? 'bg-blue-900 text-gray-100 hover:bg-blue-700' : ''}`}
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
                className="px-4 text-md font-light uppercase tracking-tight"
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
