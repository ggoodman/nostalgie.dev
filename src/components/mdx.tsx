import type { MDXProviderComponents } from 'nostalgie/styling';
import * as React from 'react';

export const mdxDocsComponents: MDXProviderComponents = {
  code: (props) => {
    return <code {...props} className="bg-gray-100 rounded-sm"></code>;
  },
  blockquote: (props) => (
    <blockquote {...props} className="border-l-8 border-gray-200 bg-gray-100 rounded-md py-1" />
  ),
  img: (props) => <img {...props} className="h-6 inline-block" />,
  pre: (props) => <pre {...props} className="bg-gray-800 overflow-auto py-1" />,
  ul: (props) => <ul {...props} className="list-disc list-outside ml-8" />,
};
