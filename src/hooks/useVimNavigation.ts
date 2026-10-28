import { useEffect } from 'react';
import { getVimAction } from '../lib/vim-navigation';

const interactiveSelector = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'summary',
  'audio',
  'video',
  'canvas',
  '[role="textbox"]',
  '[role="searchbox"]',
  '[role="button"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="combobox"]',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[role="listbox"]',
  '[role="menu"]',
  '[role="tree"]',
  '[role="grid"]',
  '[role="tablist"]',
  '[role="dialog"]',
  '[role="application"]',
  '[data-vim-ignore]',
].join(',');

export function useVimNavigation(
  enabled: boolean,
  pathname: string,
  navigate: (path: string) => void,
) {
  useEffect(() => {
    if (!enabled) return;

    function onKeyDown(event: KeyboardEvent) {
      if (
        document.fullscreenElement ||
        window.getSelection()?.isCollapsed === false ||
        event
          .composedPath()
          .some(
            (target) =>
              target instanceof HTMLElement &&
              (target.isContentEditable || target.closest(interactiveSelector)),
          )
      ) {
        return;
      }

      const action = getVimAction(event, pathname);
      if (!action) return;

      event.preventDefault();

      if (action.type === 'navigate') {
        navigate(action.href);
      } else {
        window.scrollBy({ top: action.top, behavior: 'instant' });
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled, pathname, navigate]);
}
