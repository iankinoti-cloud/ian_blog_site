import React from 'react';

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>(function Link({ children, href, ...props }, ref) {
  return <a href={href} ref={ref} {...props}>{children}</a>;
});

export default Link;
