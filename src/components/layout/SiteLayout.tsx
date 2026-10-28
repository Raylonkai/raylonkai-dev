import { useEffect, useRef, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/lab', label: 'Lab' },
  { href: '/notes', label: 'Notes' },
];

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const path = location.replace(/\/$/, '').toLowerCase() || '/';
  const title =
    navigation.find(({ href }) => href === path)?.label ?? 'Page not found';
  const main = useRef<HTMLElement>(null);
  const previousLocation = useRef(location);

  useEffect(() => {
    document.title = `${title} | raylonkai.dev`;

    if (previousLocation.current !== location) {
      main.current?.focus();
      window.scrollTo(0, 0);
      previousLocation.current = location;
    }
  }, [location, title]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="site-name" href="/">
          raylonkai.dev
        </Link>
        <nav aria-label="Primary">
          <ul className="navigation">
            {navigation.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={path === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main-content" ref={main} tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
