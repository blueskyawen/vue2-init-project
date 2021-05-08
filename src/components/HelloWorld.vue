<template>
  <div class="hello">
    <form>
      <Editor v-model="contentValue" :init="editConfig_2"  @onSaveContent="handleSave" />
    </form>
  </div>
</template>

<script>
//引入tinymce编辑器
import Editor from '@tinymce/tinymce-vue'

//引入node_modules里的tinymce相关文件文件
import tinymce from 'tinymce/tinymce'
// import 'tinymce/skins/content/document/content.css'
import 'tinymce/themes/silver'  //编辑器主题，不引入则报错
// import 'tinymce/icons/default'
import 'tinymce/icons/default/icons'
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/save";
import "tinymce/plugins/bbcode";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis.min.js";
import "tinymce/plugins/emoticons/js/emojiimages.min.js";
import "tinymce/plugins/fullpage";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/hr";
import "tinymce/plugins/image";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/legacyoutput";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/noneditable";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/print";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/autosave";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/tabfocus";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/toc";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'tinymce-vue-cli-2.0',
      contentValue: '<h1>请输入标题</h1>',
      editConfig_2: {
        // placeholder: '请输入标题',
        language_url: '/static/tinymce/langs/zh_CN.js',  //引入语言包文件
        language: "zh_CN", //中文
        skin_url: '/static/tinymce/skins/ui/oxide',
        // 开头几个插件时收费的
        // checklist autoresize
        plugins:
          "fullpage print preview paste importcss searchreplace autolink autosave save directionality code visualblocks" +
          " visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor " +
          "toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
        // imagetools_cors_hosts: ["picsum.photos"],
        // menubar: "file edit view insert format tools table help",
        toolbar:
          "checklist | hr fullpage restoredraft undo redo | bold italic underline strikethrough | fontselect " +
          "fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist " +
          "bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print" +
          " | insertfile image media template link anchor codesample blockquote | ltr rtl | quicklink quickimage quicktable",
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        link_list: [
          { title: "My page 1", value: "https://www.tiny.cloud" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_list: [
          { title: "My page 1", value: "https://www.tiny.cloud" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_class_list: [
          { title: "None", value: "" },
          { title: "Some class", value: "class-name" },
        ],
        image_advtab: true,
        // importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
          /* Provide file and text for the link dialog */
          if (meta.filetype === "file") {
            callback("https://www.google.com/logos/google.jpg", {
              text: "My text",
            });
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === "image") {
            callback("https://www.google.com/logos/google.jpg", {
              alt: "My alt text",
            });
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === "media") {
            callback("movie.mp4", {
              source2: "alt.ogg",
              poster: "https://www.google.com/logos/google.jpg",
            });
          }
        },
        templates: [
          {
            title: "New Table",
            description: "creates a new table",
            content:
              '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
          },
          {
            title: "Starting my story",
            description: "A cure for writers block",
            content: "Once upon a time...",
          },
          {
            title: "New list with dates",
            description: "New List with dates",
            content:
              '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
          },
        ],
        template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
        template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
        height: 800,
        min_height: 800,
        max_height: 800,
        image_caption: true,
        quickbars_selection_toolbar:
          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "wrap",
        contextmenu: "link image imagetools table",
        // skin: useDarkMode ? "oxide-dark" : "oxide",
        // content_css: useDarkMode ? "dark" : "document",
        content_css: "/static/tinymce/skins/content/document/content.css",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        /* enable title field in the Image dialog*/
        // 实现图片弹出框的右边点击本地文件选择的功能
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        file_picker_types: "image",
        // 实现图片弹出框的拖动或浏览上传功能
        readonly: true,
        elementpath: false,
        resize: true,
        default_link_target: "_blank",
        autoresize_bottom_margin: 50,
        autoresize_overflow_padding: 50,
        custom_undo_redo_levels: 50,
        object_resizing: true,
        // menubar: false,
        // toolbar: false
        quickbars_insert_toolbar: false
      },
    }
  },
  components: {
    Editor
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    handleSave(event) {
      console.log('handleSave handleSave');
      event.preventDefault();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
