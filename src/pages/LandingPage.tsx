import FunctionClientCode from 'code:./landing/functionClient.tsx';
import OpinionatedCode from 'code:./landing/opinionated.js';
import ServerFunctionCode from 'code:./landing/serverFunction.ts';
import { Link } from 'nostalgie/routing';
import * as React from 'react';
import { H3, Li, P, Ul } from '../components/mdx';
import { ScrollPadding } from '../components/ScrollPadding';

export default function LandingPage() {
  return (
    <ScrollPadding className="container mx-auto antialiased">
      <div className="px-4 py-6 text-gray-900">
        <header className="">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
            Remember when web development was <em>simple</em>?
          </h1>
          <p className="text-gray-500 max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10">
            Nostalgie is an opinionated, full-stack, runtime-agnostic framework for building web
            apps and web pages using react.
          </p>
        </header>
        <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 mb-10">
          <Link
            to="/docs/tutorials/getting-started"
            className="px-5 py-3 bg-purple-700 text-gray-50 block rounded-lg text-xl font-bold"
          >
            Get started
          </Link>
          <pre className="bg-gray-100 md:text-xl text-gray-800 px-5 py-3 rounded-lg w-full md:w-3/4">
            <code>npx create-nostalgie-app my-app</code>
          </pre>
        </div>
        <p className="text-gray-600 max-w-screen-lg text-xl sm:text-3xl sm:leading-10 font-light italic mb-20 md:mb-32">
          Try it. You're less than 30 seconds away from that feeling you thought you had lost
          forever.
        </p>
        <div id="opinionated" className="mb-20 md:mb-32 w-full lg:w-3/5">
          <h2 className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-purple-600 mb-3">
            Opinionated
          </h2>
          <p className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8">
            Nostalgie is opinionated so that you don't have to be.
          </p>
          <p className="text-gray-500 text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6">
            Nostalgie focuses on areas that are critical to every modern web. It makes a bet on
            leading technologies in each category. In having these opinions and in making these
            choices, Nostalgie provides a tightly integrated, highly-productive environment to get
            @#$% done.
          </p>
          <OpinionatedCode className="rounded-lg" />
        </div>
        <div id="server-functions" className="mb-20 md:mb-32 w-full lg:w-3/5">
          <h2 className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-red-600 mb-3">
            Server Functions
          </h2>
          <p className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8">
            Calling APIs and server-side logic is unnecessarily painful. It doesn't have to be.
          </p>
          <p className="text-gray-500 text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6">
            Nostalgie automatically wires your server-side functions to your client-side hooks with
            typing, authentication, caching and deduplication. You may even realize that you don't
            need complex state management anymore.
          </p>
          <H3>Server</H3>
          <ServerFunctionCode className="rounded-lg mg-8" />
          <H3>Browser</H3>
          <FunctionClientCode className="rounded-lg" />
        </div>
        <div id="features" className="mb-20">
          <div className="w-full lg:w-3/5 mb-8">
            <h2 className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-blue-600 mb-3">
              Features
            </h2>
            <p className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8">
              Nostalgie has you covered for the critical parts of your app.
            </p>
            <p className="text-gray-500 text-lg sm:text-2xl font-medium sm:leading-10 space-y-6">
              There are a few things that almost every app needs but that are <em>hard</em> and
              repetitive. It's a lot of work to do these things well and while you're struggling
              with them, you're not building your app. Nostalgie frees you from this burden so that
              you get get on innovating and delivering value.
            </p>
          </div>
          <div className="grid grid-cols-1 grid-flow-row grid-rows-auto md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border rounded-lg overflow-hidden shadow">
              <div className="bg-green-500 text-gray-50 px-4 py-2 text-xl sm:text-3xl">
                <h2 className="">Routing</h2>
              </div>
              <div className="p-4 leading-7">
                <P>
                  Your app lives on the web and the web works with URLs. Nostalgie has you covered.
                </P>
                <Ul>
                  <Li>
                    <h3 className="text-lg font-semibold">Code splitting</h3>
                    <P>
                      Easy and idiomatic code splitting. You use <code>React.lazy</code> and we
                      handle the rest. Ten layers of lazy components? No problem; these will render,
                      fully hydrated in a single pass on the server.
                    </P>
                  </Li>
                  <Li>
                    <h3 className="text-lg font-semibold">Best practices</h3>
                    <P>
                      Only the code needed by your users will be sent to them. Every bit of critical
                      JavaScript and CSS will be preloaded. Waterfalls are beautiful but we don't
                      want them in our web apps.
                    </P>
                  </Li>
                </Ul>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow">
              <div className="bg-pink-500 text-gray-50 px-4 py-2 text-xl sm:text-3xl">
                <h2 className="">Authentication</h2>
              </div>
              <div className="p-4 leading-7">
                <P>
                  Sometimes you need to know who is using your app. You may even want to know who is
                  using your app during server rendering. Nostalgie makes this easy:
                </P>
                <Ul>
                  <Li>
                    <h3 className="text-lg font-semibold">Integrated login</h3>
                    <P>
                      You configure Nostalgie with any compliant OpenID provider and you're all set.
                      You can log in users and know their identity and scopes whether you're in a
                      Server Function or in a React component.
                    </P>
                  </Li>
                  <Li>
                    <h3 className="text-lg font-semibold">Easy authorization</h3>
                    <P>
                      Wrap any component using the <code>withAuthenticationRequired</code> helper to
                      restrict it to authorized users. With a fallback render prop, you can render
                      an alternative for unauthorized users with an automatically-generated login
                      url.
                    </P>
                  </Li>
                </Ul>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow">
              <div className="bg-yellow-500 text-gray-50 px-4 py-2 text-xl sm:text-3xl">
                <h2 className="">SEO</h2>
              </div>
              <div className="p-4 leading-7">
                <P>
                  Getting the right information to all the right crawlers in React apps has never
                  been easy. Nostalgie makes it easy.
                </P>
                <Ul>
                  <Li>
                    <h3 className="text-lg font-semibold">
                      Manage <code>head</code> tags
                    </h3>
                    <P>
                      Nostalgie integrates with `react-helmet-async` so that you can tweak your
                      top-level markup anywhere in the render tree. Five levels deep in lazy-loaded
                      components? No problem.
                    </P>
                  </Li>
                  <Li>
                    <h3 className="text-lg font-semibold">SSR out of the box</h3>
                    <P>
                      Because of how Nostalgie does server-side rendering, your SEO tags will be
                      rendered on the server no matter where you set them.
                    </P>
                  </Li>
                </Ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollPadding>
  );
}
