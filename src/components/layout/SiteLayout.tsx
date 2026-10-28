import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useVimNavigation } from '../../hooks/useVimNavigation';
import { getNavigationItem, navigation } from '../../lib/navigation';

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const [vimEnabled, setVimEnabled] = useState(true);
  const currentPage = getNavigationItem(location);
  const title = currentPage?.label ?? 'Page not found';
  const main = useRef<HTMLElement>(null);
  const previousLocation = useRef(location);

  useVimNavigation(vimEnabled, location, navigate);

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
                  aria-current={currentPage?.href === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="keyboard-controls">
          <label>
            <input
              type="checkbox"
              checked={vimEnabled}
              aria-describedby="vim-help"
              onChange={(event) => {
                setVimEnabled(event.target.checked);
                if (event.target.checked) main.current?.focus();
              }}
            />{' '}
            Vim navigation
          </label>
          <p id="vim-help">
            <kbd>h</kbd>/<kbd>l</kbd>: previous/next page. <kbd>j</kbd>/
            <kbd>k</kbd>: scroll down/up. Active outside controls; no page
            wrapping.
          </p>
        </div>
      </header>
      <main id="main-content" ref={main} tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
