import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CKEditor5Doc from '@/components/CKEditor5Doc'
import TinymceDemo from '@/components/TinymceDemo'
import ELTree from '@/components/ELTree'
import DocTinymce from '@/components/DocTinymce'
import FreeModeTinymce from '@/components/FreeModeTinymce'

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
      path: '/TinymceDemo',
      name: 'TinymceDemo',
      component: TinymceDemo
    },
    {
      path: '/el-tree',
      name: 'ELTree',
      component: ELTree
    },
    {
      path: '/DocTinymce',
      name: 'DocTinymce',
      component: DocTinymce
    },
    {
      path: '/FreeModeTinymce',
      name: 'FreeModeTinymce',
      component: FreeModeTinymce
    }
  ]
})
