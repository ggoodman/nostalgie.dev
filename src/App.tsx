import { Helmet } from 'nostalgie/helmet';
import { Link, Route, Switch, useRouteMatch } from 'nostalgie/routing';
import * as React from 'react';
import FaviconPath from './img/favicon.ico';
import { routes } from './routes';
import './styles/code.css';

type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<infer TProps>
  ? TProps
  : TComponentOrTProps;

interface NavbarAnchorProps
  extends React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>> {
  color: 'red' | 'yellow' | 'blue' | 'indigo' | 'purple' | 'pink' | 'green';
}

function NavbarAnchor({ color, ...props }: NavbarAnchorProps) {
  const activeClassNames = `border-transparent hover:border-${color}-700`;
  return (
    <a
      {...props}
      className={`px-1 sm:px-4 border-b-4 ${activeClassNames}`}
      target="_blank"
      rel="noopener noreferrer"
    />
  );
}

interface NavbarLinkProps extends ExtractProps<Link> {
  color: 'red' | 'yellow' | 'blue' | 'indigo' | 'purple' | 'pink' | 'green';
  to: string;
}

function NavbarLink({ color, ...props }: NavbarLinkProps) {
  const match = useRouteMatch({ exact: false, path: props.to });
  const activeClassNames = match
    ? `border-${color}-700 hover:border-${color}-500`
    : `border-transparent hover:border-${color}-700`;
  return <Link className={`px-1 sm:px-4 border-b-4 ${activeClassNames}`} {...props} />;
}

export default function App() {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={FaviconPath} type="image/x-icon"></link>
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
            <div className="pl-2 sm:pl-8 lg:px-16 flex flex-row items-center space-x-1 md:text-lg font-bold">
              <NavbarLink color="indigo" to="/docs">
                Docs
              </NavbarLink>
              <NavbarLink color="green" to="/changelog">
                Changelog
              </NavbarLink>
              <NavbarAnchor
                color="blue"
                href="https://discord.gg/dSHCnQxbba"
                title="Join the community on Discord!"
              >
                Discord
              </NavbarAnchor>
              <NavbarAnchor
                color="red"
                href="https://github.com/ggoodman/nostalgie"
                title="Check out Nostalgie on GitHub!"
              >
                GitHub
              </NavbarAnchor>
            </div>
          </nav>
        </div>
        <div className="flex-1 overflow-x-hidden flex flex-col justify-items-stretch">
          <React.Suspense fallback="">
            <Switch>
              {routes.map(({ id, ...props }) => (
                <Route key={id} {...props} />
              ))}
            </Switch>
          </React.Suspense>
        </div>
      </div>
    </>
  );
}
