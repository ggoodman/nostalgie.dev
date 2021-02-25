import { MDXProviderComponents, styled } from 'nostalgie/styling';
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

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = (px: number) => `${round(px / 16)}rem`;
const em = (px: number, base: number) => `${round(px / base)}em`;

export const A = ({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { ref?: React.Ref<HTMLAnchorElement> }) => (
  <a className={combineClasses('text-gray-900 underline font-medium', className)} {...props} />
);

const StyledBlockquote = styled.blockquote({
  quotes: '"\\201C""\\201D""\\2018""\\2019"',
  '& p:first-of-type::before': {
    content: 'open-quote',
  },
  '& p:last-of-type::after': {
    content: 'close-quote',
  },
  marginTop: em(32, 20),
  marginBottom: em(32, 20),
});
export const Blockquote = ({
  className,
  ...props
}: React.BlockquoteHTMLAttributes<HTMLQuoteElement> & { ref?: React.Ref<HTMLQuoteElement> }) => (
  <StyledBlockquote
    className={combineClasses(
      'font-medium italic text-gray-900 border-l-8 border-gray-200 bg-gray-100 rounded-md py-1 px-4',
      className
    )}
    {...props}
  />
);

export const Delete = ({
  className,
  ...props
}: React.DelHTMLAttributes<HTMLModElement> & { ref?: React.Ref<HTMLModElement> }) => (
  <del className={combineClasses('', className)} {...props} />
);

export const Em = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }) => (
  <em className={combineClasses('', className)} {...props} />
);

const StyledH1 = styled.blockquote({
  fontSize: em(36, 16),
  marginTop: '0',
  marginBottom: em(32, 36),
  lineHeight: round(40 / 36),
});
export const H1 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> }) => (
  <StyledH1 className={combineClasses('text-gray-900 font-extrabold', className)} {...props} />
);

const StyledH2 = styled.blockquote({
  fontSize: em(24, 16),
  marginTop: em(48, 24),
  marginBottom: em(24, 24),
  lineHeight: round(32 / 24),
  '& + *': {
    marginTop: '0',
  },
});
export const H2 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> }) => (
  <StyledH2 className={combineClasses('text-gray-900 font-bold', className)} {...props} />
);

const StyledH3 = styled.blockquote({
  fontSize: em(20, 16),
  marginTop: em(32, 20),
  marginBottom: em(12, 20),
  lineHeight: round(32 / 20),
  '& + *': {
    marginTop: '0',
  },
});
export const H3 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> }) => (
  <StyledH3 className={combineClasses('text-gray-900 font-semibold', className)} {...props} />
);

const StyledH4 = styled.blockquote({
  marginTop: em(24, 16),
  marginBottom: em(8, 16),
  lineHeight: round(24 / 16),
  '& + *': {
    marginTop: '0',
  },
});
export const H4 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> }) => (
  <StyledH4 className={combineClasses('text-gray-900 font-semibold', className)} {...props} />
);

const StyledImg = styled.blockquote({
  marginTop: em(32, 16),
  marginBottom: em(32, 16),
});
export const Img = ({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { ref?: React.Ref<HTMLImageElement> }) => (
  <StyledImg className={combineClasses('', className)} {...props} />
);

const StyledHr = styled.hr({
  marginTop: em(48, 16),
  marginBottom: em(48, 16),
  '& + *': {
    marginTop: '0',
  },
});
export const Hr = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement> & { ref?: React.Ref<HTMLHRElement> }) => (
  <StyledHr className={combineClasses('border-gray-200 border-t', className)} {...props} />
);

const StyledP = styled.p({
  fontSize: rem(16),
  lineHeight: round(28 / 16),
  marginTop: em(20, 16),
  marginBottom: em(20, 16),
});
export const P = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) => (
  <StyledP className={combineClasses('', className)} {...props} />
);

const StyledLi = styled.li({});
export const Li = ({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement> & { ref?: React.Ref<HTMLLIElement> }) => (
  <StyledLi className={combineClasses('', className)} {...props} />
);

const StyledUl = styled.ul({
  '& > li': {
    position: 'relative',
    paddingLeft: em(28, 16),
  },
  '& > li::before': {
    content: '" "',
    position: 'absolute',
    backgroundColor: (ctx) => ctx.theme('colors.gray.300'),
    borderRadius: '50%',
    width: em(6, 16),
    height: em(6, 16),
    top: `calc(${em(28 / 2, 16)} - ${em(3, 16)})`,
    left: em(4, 16),
  },
  marginTop: em(20, 16),
  marginBottom: em(20, 16),
  '& > li p': {
    marginTop: em(12, 16),
    marginBottom: em(12, 16),
  },
  '& > li > *:first-child': {
    marginTop: em(20, 16),
  },
  '& > li > *:last-child': {
    marginBottom: em(20, 16),
  },
  '& ul, & ol': {
    marginTop: em(12, 16),
    marginBottom: em(12, 16),
  },
});
export const Ul = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement> & { ref?: React.Ref<HTMLUListElement> }) => (
  <StyledUl className={combineClasses('', className)} {...props} />
);

export const mdx: MDXProviderComponents = {
  a: A,
  blockquote: Blockquote,
  delete: Delete,
  em: Em,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  img: Img,
  hr: Hr,
  li: Li,
  p: P,
  ul: Ul,
};

function combineClasses(tailwindClasses: string, className?: string) {
  return `${tailwindClasses}${className ? ' ' + className : ''}`;
}
