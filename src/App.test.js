import { hello } from './App'

jest.mock("mapbox-gl", () => {
  return {};
});

test('hello', () => {
  expect(hello).toBe("hello")
})

