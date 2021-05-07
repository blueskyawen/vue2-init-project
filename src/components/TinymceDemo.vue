<template>
  <form method="post">
    <textarea id="mytextarea">Hello, World!</textarea>
  </form>
</template>

<script>
//引入tinymce编辑器
import Editor from '@tinymce/tinymce-vue'
//引入node_modules里的tinymce相关文件文件
// import tinymce from 'tinymce/tinymce'
export default {
  name: "TreeDemo",
  data () {
    return {
      value: '',
      config: {}
    }
  },
  created() {
  },
  mounted() {
    tinymce.init({
      selector: '#mytextarea',
      // toolbar: false,
      height: 500,
      min_height: 500,
      max_height: 500,
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'table emoticons template paste help save'
      ],
      toolbar: 'undo redo | formats | bold italic underline strikethrough | align | ' +
        'bullist numlist outdent indent | link image | print preview media fullpage | ' +
        'forecolor backcolor emoticons blockquote copy fontselect fontsizeselect formatselect lineheight save removeformat searchreplace | help',
      toolbar_groups: {
        alignment: {
          text: 'Align',
          icon: 'chevron-down', // 工具栏组，怎么自定义图标？
          tooltip: '对齐方式',
          items: 'alignleft aligncenter alignright alignjustify'
        }
      },
      toolbar_sticky: true,
      toolbar_mode: 'floating', //  'floating', 'sliding', 'scrolling', or 'wrap'
      menu: {
        file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
        edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
        view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
        insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
        table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
        help: { title: 'Help', items: 'help' },
        MyFavors: {title: '阿文', items: 'code visualaid | searchreplace | emoticons'} // 自定义菜单
      },
      menubar: 'MyFavors file edit view insert format tools table help',
    });
  }
}
</script>

<style scoped>

</style>
