const { buffTransferCN } = require('../action/bt_index')
test('buffTransferCN fn()', () => {
  const str =
    '44CQ5omL5py655u05pKt57K+5ZOB56aP5Yip44CR5aWz56We57qn5Li75pKt44CQ6ZW/6IW/5aeR5aiYNeOAkeiVvuS4neWGheijpOm7keS4neivseaDke+8jOaegeWTgeWlvei6q+adkOmBk+WFt+aPkumAvOWRu+WQn+acieeJueWGme+8jOWAvOW+l+aUtuiXjw=='
  expect(buffTransferCN(str)).toBe('【手机直播精品福利】女神级主播【长腿姑娘5】蕾丝内裤黑丝诱惑，极品好身材道具插逼呻吟有特写，值得收藏')
})
