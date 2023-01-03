const SITE_URL = 'https://www.bmb68.com'
module.exports = {
  SITE_URL,
  SPIDER_TYPE: {
    TEXT: {
      site: '/xiaoshuo/list-都市激情',
      target: '#main-container .text-list-html .list-text-my ul',
      target_inner: '#main-container .content',
      label: 'p',
      dir: 'dsjj',
    },
    IMAGE: {
      site: '/meinv/list-星颜社',
      target: '#tpl-img-content',
      target_inner: '#main-container .content',
      label: 'img',
      dir: 'meinv-星颜社',
    },
    VIDEO: {
      site: '/shipin/list-美女主播',
      target: '.content-list ',
      target_inner: '#downlist1 input',
      label: 'img',
      dir: 'mvzb',
      fixedFile: 'url1',
    },
    BT: {
      site: 'https://www.188758.xyz/search.php?keyword=%E9%93%83%E6%9C%A8%E7%BE%8E%E5%92%B2',
      target: '.movie_list',
      target_inner: '.download .card-body a',
      label: 'a',
      dir: 'btDownload',
      fixedFile: 'btList_linmumeilin',
    },
  },
}
