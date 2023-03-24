const { login } = require('../utils/login')
const fn1 = (a, b) => a + b
const fn2 = (a, b) => a * b

test('login fn()', () => {
  expect(login()).toBe('https://pwa.shushifeng.com/#/infos/signin')
})

test(' fn2', () => {
  // expect(login()).toBe('https://pwa.shushifeng.com/#/infos/signin')
  expect(fn2(2, 3)).toBe(6)
})