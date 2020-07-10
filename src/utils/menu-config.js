
export const dpaConsoleMenu = [
  // {
  //   label: '渠道监控',
  //   path: 'qdjk',
  //   icon: 'channelAudit',
  //   submenus: [
  //     {
  //       label: '渠道统计',
  //       path: 'qdtj',
  //       children: [
  //         {
  //           label: '报表',
  //           path: 'portionstats/reportForm'
  //         },
  //         {
  //           label: '渠道份额',
  //           path: 'portionstats'
  //         }
  //       ]
  //     }
  //   ],
  //   children: [
  //     {
  //       label: '矛盾点分析',
  //       path: 'analysis',
  //       hide: false
  //     }
  //   ]
  // },
  // {
  //   label: '项目管理',
  //   icon: 'xmgl',
  //   path: 'eeeeee'
  // },
  {
    label: '项目管理',
    icon: 'xmyxypz',
    path: '/dpa-console/project-mng'
  },
  {
    label: '项目运行与配置',
    icon: 'xmyxypz',
    path: '/dpa-console/project-opera-config'
  }
]

// menu list for dpa-customer
export const dpaCustomerMenu = [
  {
    label: '资源列表',
    icon: 'xmyxypz',
    path: '/dpa-customer/resource-list'
  },
  {
    label: '账单',
    icon: 'xmyxypz',
    path: '/dpa-customer/bills',
    children: [
      {
        label: '本月账单',
        path: '/dpa-customer/bill-cur-month',
        hide: false
      },
      {
        label: '历史账单',
        path: '/dpa-customer/bill-history',
        hide: false
      },
      {
        label: '费用预测',
        path: '/dpa-customer/cost-forcast',
        hide: false
      }
    ]
  },
  {
    label: '访问地址',
    icon: 'xmyxypz',
    path: '/dpa-customer/urls'
  }
]
