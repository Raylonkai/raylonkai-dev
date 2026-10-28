import { getNavigationItem, navigation } from './navigation';

type VimKeyEvent = Pick<
  KeyboardEvent,
  | 'key'
  | 'altKey'
  | 'ctrlKey'
  | 'metaKey'
  | 'shiftKey'
  | 'isComposing'
  | 'defaultPrevented'
  | 'repeat'
>;

type VimAction =
  { type: 'navigate'; href: string } | { type: 'scroll'; top: number };

export function getVimAction(
  event: VimKeyEvent,
  pathname: string,
): VimAction | undefined {
  if (
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.isComposing ||
    event.defaultPrevented
  ) {
    return;
  }

  if (event.key === 'j' || event.key === 'k') {
    return { type: 'scroll', top: event.key === 'j' ? 80 : -80 };
  }

  if ((event.key !== 'h' && event.key !== 'l') || event.repeat) return;

  const current = getNavigationItem(pathname);
  if (!current) return;

  const index = navigation.indexOf(current);
  const destination = navigation[index + (event.key === 'h' ? -1 : 1)];

  if (destination) return { type: 'navigate', href: destination.href };
}
