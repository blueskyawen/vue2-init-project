<template>
  <div class="hello">
    <Editor v-model="contentValue" :init="editConfig" />
  </div>
</template>

<script>
//引入tinymce编辑器
import Editor from '@tinymce/tinymce-vue'

//引入node_modules里的tinymce相关文件文件
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'  //编辑器主题，不引入则报错
// import 'tinymce/icons/default'
import 'tinymce/icons/default/icons'
export default {
  name: "DocTinymce",
  data () {
    return {
      contentValue: '',
      editConfig: {
        language_url: '/static/tinymce/langs/zh_CN.js',  //引入语言包文件
        language: "zh_CN", //中文
        skin_url: '/static/tinymce/skins/ui/oxide',
        height: 500,
        min_height: 500,
        max_height: 500,
        menubar: false,
        toolbar_sticky: true,
        toolbar_mode: 'floating', //  'floating', 'sliding', 'scrolling', or 'wrap'
        statusbar: false,
        content_css : 'document', //default，dark，document，writer
        plugins: 'code',
        toolbar: 'code'
      }
    }
  },
  components: {
    Editor
  },
  mounted() {
    tinymce.init({})
  }
}
</script>

<style scoped>

</style>
