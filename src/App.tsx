import { Link, Route, Switch, useRouteMatch } from 'nostalgie/routing';
import { MDXProvider, MDXProviderComponents, styled } from 'nostalgie/styling';
import * as React from 'react';
import { nav, NavChildren, NavKind, NavPage } from './docs';
import GitHub from './icons/GitHub';
import './styles/code.css';

const DocsIndex = React.lazy(() => import('./docs/Index.mdx'));

const Main = styled.main`
  overflow-x: hidden;
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
      <div className="text-gray-500 dark:bg-gray-900 dark:text-gray-50 min-h-screen">
        <nav className="flex sticky max-w-7xl mx-auto w-full top-0 z-40 lg:z-50 bg-white dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 justify-center">
          <div className="flex-none pl-4 flex items-center lg:w-60 xl:w-72 xl:pl-8 pr-4 text-3xl p-3 h-18">
            <Link to="/">Nostalgie.dev</Link>
          </div>
          <div className="flex space-x-6 md:space-x-10 items-center justify-end">
            <a
              className="block mr-3 md:mr-0"
              href="https://github.com/ggoodman/nostalgie"
            >
              <span className="sr-only">Open Nostalgie on GitHub</span>
              <GitHub className="block w-6 h-6 fill-current" />
            </a>
         </div>
        </nav>
        <div className="max-w-7xl mx-auto w-full flex flex-1 flex-row">
          <NavChildren nodes={nav} />

          <Main className="min-w-0 w-full flex-auto lg:static lg:max-h-full leading-7 prose">
            <MDXProvider components={mdxDocsComponents}>
              <Switch>
                <React.Suspense fallback="">
                  <Route exact path="/">
                    <div className="px-8 py-4 lg:px-16 prose">
                      <DocsIndex></DocsIndex>
                    </div>
                  </Route>
                  {pages.map(({ Component, path }) => (
                    <Route key={path} exact path={path}>
                      <div className="px-8 py-4 lg:px-16 min-w-0">
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
}) => {

  return(
  <aside
      className={`h-full bg-black inset-0 flex-none w-full fixed z-40 bg-opacity-25 lg:bg-white lg:dark:bg-gray-900 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block py-1`}
    >
      <div className="h-full bg-white dark:bg-gray-900 mr-24 overflow-hidden overflow-y-hidden scrolling-touch lg:h-auto lg:block lg:sticky lg:bg-transparent lg:top-16 lg:mr-0">
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
    </div>
  </aside>
);
}

