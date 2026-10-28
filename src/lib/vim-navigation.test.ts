import { describe, expect, test } from 'bun:test';
import { getVimAction } from './vim-navigation';

function keyEvent(key: string, overrides: Partial<KeyboardEvent> = {}) {
  return {
    key,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    isComposing: false,
    defaultPrevented: false,
    repeat: false,
    ...overrides,
  };
}

describe('Vim page navigation', () => {
  test.each([
    ['l', '/', '/about'],
    ['l', '/about', '/projects'],
    ['l', '/projects', '/lab'],
    ['l', '/lab', '/notes'],
    ['h', '/notes', '/lab'],
    ['h', '/lab', '/projects'],
    ['h', '/projects', '/about'],
    ['h', '/about', '/'],
    ['l', '/ABOUT/', '/projects'],
  ])('%s from %s opens %s', (key, pathname, href) => {
    expect(getVimAction(keyEvent(key), pathname)).toEqual({
      type: 'navigate',
      href,
    });
  });

  test.each([
    ['h', '/'],
    ['l', '/notes'],
    ['h', '/unknown'],
    ['l', '/unknown'],
    ['l', '/about//'],
  ])('%s at %s does not wrap or guess a destination', (key, pathname) => {
    expect(getVimAction(keyEvent(key), pathname)).toBeUndefined();
  });

  test.each(['h', 'l'])('holding %s does not skip pages', (key) => {
    expect(
      getVimAction(keyEvent(key, { repeat: true }), '/about'),
    ).toBeUndefined();
  });
});

describe('Vim scrolling and shortcut guards', () => {
  test.each([
    ['j', 80],
    ['k', -80],
  ] as const)('%s scrolls by %i pixels, including held keys', (key, top) => {
    expect(getVimAction(keyEvent(key), '/notes')).toEqual({
      type: 'scroll',
      top,
    });
    expect(getVimAction(keyEvent(key, { repeat: true }), '/notes')).toEqual({
      type: 'scroll',
      top,
    });
  });

  test.each([
    'altKey',
    'ctrlKey',
    'metaKey',
    'shiftKey',
    'isComposing',
    'defaultPrevented',
  ] as const)('%s preserves existing keyboard behavior', (flag) => {
    for (const key of ['h', 'j', 'k', 'l']) {
      expect(
        getVimAction(keyEvent(key, { [flag]: true }), '/about'),
      ).toBeUndefined();
    }
  });

  test.each(['H', 'J', 'K', 'L', 'ArrowDown', 'Tab', 'Enter', 'Escape', 'x'])(
    '%s is not a shortcut',
    (key) => {
      expect(getVimAction(keyEvent(key), '/about')).toBeUndefined();
    },
  );
});
