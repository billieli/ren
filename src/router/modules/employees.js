import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    meta: {
      title: ' 员工管理 ', icon: 'people'
    }
  },
  {
    path: '/employees/datail/:id',
    component: () => import('@/views/employees/components/detail.vue'),
    hidden: true

  },
  {
    path: 'print/:id',
    component: () => import('@/views/employees/components/printer.vue'),
    hidden: true

  }
  ]
}
