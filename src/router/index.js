import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CKEditor5Doc from '@/components/CKEditor5Doc'
import TreeDemo from '@/components/TreeDemo'
import ELTree from '@/components/ELTree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/tinymce'
    },
    {
      path: '/tinymce',
      name: 'tinymce',
      component: HelloWorld
    },
    {
      path: '/ckeditorDoc',
      name: 'ckeditor5Doc',
      component: CKEditor5Doc
    },
    {
      path: '/tree',
      name: 'TreeDemo',
      component: TreeDemo
    },
    {
      path: '/el-tree',
      name: 'ELTree',
      component: ELTree
    }
  ]
})
