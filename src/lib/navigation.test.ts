import { describe, expect, test } from 'bun:test';
import { getNavigationItem } from './navigation';

describe('page navigation metadata', () => {
  test.each([
    ['/', 'Home', '/'],
    ['/about', 'About', '/about'],
    ['/projects', 'Projects', '/projects'],
    ['/lab', 'Lab', '/lab'],
    ['/notes', 'Notes', '/notes'],
    ['/ABOUT/', 'About', '/about'],
    ['/Notes/', 'Notes', '/notes'],
  ] as const)(
    '%s selects the correct title and canonical link',
    (path, label, href) => {
      const item = getNavigationItem(path);
      expect(item?.label).toBe(label);
      expect(item?.href).toBe(href);
    },
  );

  test.each(['//', '/about//', '/about/nested', '/unknown', '/notebook', ''])(
    '%s does not mark a known page active',
    (path) => {
      expect(getNavigationItem(path)).toBeUndefined();
    },
  );
});
