import { hello } from './App'

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

jest.mock("!mapbox-gl", () => {
  return {};
});

test('hello', () => {
  expect(hello).toBe("hello")
})

