const { buffTransferCN } = require('../action/bt_index')
test('buffTransferCN fn()', () => {
  const str =
    'WGme+8jOWAvOW+l+aUtuiXjw=='
  expect(buffTransferCN(str)).toBe('值得收藏')
})
