import Landmine from '../components/landMine.vue'
import Index from '../components/index.vue'
import TxtReader from '../components/txtReader.vue'
import RemoveBlock from '../components/removeBlock/index.vue'

const router = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  // {
  //   path: '/canvas',
  //   name: 'Canvas签名',
  //   component: Canvas,
  // },
  {
    path: '/removeBlock',
    name: '方块消除',
    component: RemoveBlock,
  },
  {
    path: '/landmine',
    name: '扫雷小游戏',
    component: Landmine,
  },
  {
    path: '/txtReader',
    name: 'txt文本阅读器',
    component: TxtReader,
  },
  // {
  //   path: '/chart',
  //   name: '图表',
  //   component: Chart,
  // },
]

export default router
