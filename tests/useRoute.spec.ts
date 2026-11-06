import { describe, expect, it } from 'vitest';
import { parseRoute, routeToHash } from '../src/composables/useRoute';

describe('parseRoute', () => {
  it.each([
    ['', 'decode'],
    ['#/', 'decode'],
    ['#/algo-raro', 'decode'],
    ['#/codificar', 'encode'],
    ['#/codificar/', 'encode'],
    ['#/ajustes', 'settings'],
  ])('%s is %s', (hash, expected) => {
    expect(parseRoute(hash)).toBe(expected);
  });

  it('turns a route back into the same hash', () => {
    for (const hash of ['#/', '#/codificar', '#/ajustes']) {
      expect(routeToHash(parseRoute(hash))).toBe(hash);
    }
  });
});
