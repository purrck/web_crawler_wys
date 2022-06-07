
const SITE_URL = "https://www.bmb68.com"
module.exports = {
  SITE_URL,
  SPIDER_TYPE: {
    "TEXT": {
      target: '#main-container .text-list-html .list-text-my ul',
      target_inner: '#main-container .content',
      site: '/xiaoshuo/list-另类小说',
      dir: 'llxs',
      label: 'p'
    },
    "IMAGE": {
      target: '#tpl-img-content',
      site: '/tupian/list-%E4%BA%9A%E6%B4%B2%E8%89%B2%E5%9B%BE',
      target_inner: '#main-container .content',
      dir: 'jtll',
      label: 'img'
    },
    "VIDEO": {
      target: '.content-list ',
      site: '/shipin/list-美女主播',
      target_inner: '#downlist1 input',
      dir: 'mvzb',
      fixedFile: 'url1',
      label: 'img'
    }
  }
}