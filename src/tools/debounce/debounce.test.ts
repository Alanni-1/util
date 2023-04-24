import { debounce } from "./debounce";

test("debounce test", async() => {
  const mockFn = jest.fn()
  const debounced = await debounce(mockFn, 1000)
  debounced(1)
  debounced(2)
  debounced(3)
  expect(mockFn).toBeCalledTimes(0)
  expect(mockFn.mock.calls.length).toBe(1)
});
