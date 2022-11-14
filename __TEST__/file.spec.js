const { gotAUnCallingFileName } = require('../utils/index')
const { downloadBT } = require('../utils/download')
test('file part', (done) => {
  const path = '/Users/wangyuansi/Desktop/yourself/node/yellow/_dist/BT/btDownload/btList1.txt'
  gotAUnCallingFileName(path).then((e) => {
    expect(e).toBe('/Users/wangyuansi/Desktop/yourself/node/yellow/_dist/BT/btDownload/btList1I.txt')
    done()
  })
})
