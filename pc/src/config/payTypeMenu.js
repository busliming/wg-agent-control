module.exports = [{
  name: '线上支付',
  id: '1', 
  // icon: '',
  sub: [{
    id: '1-1',
    name: '支付宝扫码',
    componentName: 'zfbScanCode'
    }, 
    {
      id: '1-2',
      name: '微信扫码',
      componentName: 'weixinScanCode'
    },
    {
      id: '1-3',
      name: 'QQ钱包',
      componentName: 'qqWallet'
    }, 
    {
      id: '1-4',
      name: '美团扫码',
      componentName: 'meituanScanCode'
    },
    {
      id: '1-5',
      name: '银联支付',
      componentName: 'unionPay'
    }, 
    {
      id: '1-6',
      name: '银联扫码',
      componentName: 'unionPayScanCode'
    },
    {
      id: '1-7',
      name: '银联快捷',
      componentName: 'unionPayExpress'
    }
  ]},
  // {
  // name: '官方充值',
  // id: '2',
  //  // icon: ''
  // // componentName: officialPay
  // },
  // {
  //   name: '代理充值',
  //   id: '3',
  //   // icon: ''
  //   // componentName: agentPay
  // },
]
