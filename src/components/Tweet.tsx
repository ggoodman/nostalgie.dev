import * as React from 'react';

export function Tweet() {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-50 border border-gray-200 rounded-md flex flex-col items-center justify-center px-5 py-5 mx-12 my-8 max-w-lg">
        <div className="w-full flex flex-row mb-4">
          <img
            className="overflow-hidden rounded-full w-12 h-12 m-0"
            src="https://pbs.twimg.com/profile_images/975876868455809024/eK7mDppU_bigger.jpg"
            alt=""
          />
          <div className="flex-grow pl-3">
            <div className="font-bold text-md">
              <a href="https://twitter.com/dhh" target="_blank" rel="noopener noreferrer">
                DHH
              </a>
            </div>
            <div className="text-xs text-gray-600 hover:no-underline">
              <a href="https://twitter.com/dhh" target="_blank" rel="noopener noreferrer">
                @dhh
              </a>
            </div>
          </div>
          <div className="w-8 text-right text-3xl">
            <svg viewBox="328 355 335 276" xmlns="http://www.w3.org/2000/svg">
              <path
                d="
            M 630, 425
            A 195, 195 0 0 1 331, 600
            A 142, 142 0 0 0 428, 570
            A  70,  70 0 0 1 370, 523
            A  70,  70 0 0 0 401, 521
            A  70,  70 0 0 1 344, 455
            A  70,  70 0 0 0 372, 460
            A  70,  70 0 0 1 354, 370
            A 195, 195 0 0 0 495, 442
            A  67,  67 0 0 1 611, 380
            A 117, 117 0 0 0 654, 363
            A  65,  65 0 0 1 623, 401
            A 117, 117 0 0 0 662, 390
            A  65,  65 0 0 1 630, 425
            Z"
                style={{ fill: '#3BA9EE' }}
              />
            </svg>
          </div>
        </div>
        <div className="w-full mb-4">
          <div className="text-sm">
            {`"Starting a new project? Make sure to write your project idea down because by the time
            you are finished setting up the vast boilerplate you have probably forgotten it", the
            grand reset of in-browser ES6/ESM is long over due. `}
            <a
              className="text-blue-600 hover:underline hover:text-blue-700"
              href="https://askonomm.com/blog/i-dont-want-to-do-frontend-anymore"
            >
              askonomm.com/blog/i-dont-want-to-do-frontend-anymore
            </a>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end">
          <a
            className="text-xs text-gray-500 hover:underline"
            href="https://twitter.com/dhh/status/1359426190893862912"
            target="blank"
            rel="noopener noreferrer"
          >
            Oct 15th 8:33pm
          </a>
        </div>
      </div>
    </div>
  );
}
