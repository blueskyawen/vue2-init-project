<template>
  <div class="hello">
    <button @click="toTop">toTop</button>
    <div>
      <Editor ref="myeditor" v-model="contentValue" :init="editConfig" />
    </div>
  </div>
</template>

<script>
//引入tinymce编辑器
import Editor from '@tinymce/tinymce-vue'

//引入node_modules里的tinymce相关文件文件
// import tinymce from 'tinymce/tinymce'
// import 'tinymce/themes/silver'  //编辑器主题，不引入则报错
// import 'tinymce/icons/default'
// import 'tinymce/icons/default/icons'
import "../../static/tinymce/plugins/toc";

let hReg = /^h[1-6]$/;
let  cataTocList = []

function getTocList(editor, list) {
  var calcList = function (children, list) {
    if (children && children.length > 0) {
      for (let index =0; index < children.length; index++) {
        let x = children[index]
        console.log(x)
        console.log(x.localName)
        if (hReg.test(x.localName)) {
          let id = 'toc_' + parseInt(Math.random() * 100000);
          console.log(id)
          x.id = id;
          let node = {
            id: id,
            tag: x.localName,
            value: x.innerHTML,
            level: +x.localName[1],
            children: []
          };
          let listLength = list.length;
          if (listLength !== 0 && list[listLength - 1].level < node.level) {
            list[listLength - 1].children.push(node)
          } else {
            list.push(node)
          }
        }
      }
    }
  }
  try {
    let bodyItems = editor.iframeElement.contentWindow.document.documentElement.children[1].children;
    calcList(bodyItems, list);
  } catch(e) {
    console.log(e)
  }
  setTimeout(() => {
    console.log(editor.getContent())
  }, 1000);
}

export default {
  name: "DocTinymce",
  data () {
    return {
      contentValue: 'sss',
      cataTocList: [],
      editConfig: {
        setup: function (editor) {
          let that = this;
          editor.ui.registry.addButton('docToc', {
            icon: 'toc',
            tooltip: '大纲',
            onAction: function (_) {
              getTocList(editor, cataTocList)
            }
          });
        },
        language: "zh_CN", //中文
        height: 'calc(100% - 60px)',
        menubar: false,
        toolbar_sticky: true,
        toolbar_mode: 'sliding', //  'floating', 'sliding', 'scrolling', or 'wrap'
        statusbar: false,
        // content_css : 'document', //default，dark，document，writer
        content_css: ['/static/tinymce/skins/content/document/content.css', '/static/tiny_common.css'],
        skin: 'oxide',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
        resize: false,
        plugins: 'emoticons fullscreen help code hr image imagetools link lists preview print save searchreplace table ' +
          'toc autolink autosave wordcount textpattern charmap codesample importcss noneditable quickbars',
        // plugins: 'directionality  visualblocks visualchars nonbreaking textpattern ',
        toolbar: 'docToc undo redo removeformat save | formatselect fontselect fontsizeselect | bold italic underline ' +
          'strikethrough | forecolor backcolor | align numlist bullist | ' +
          'link image blockquote | hr outdent indent charmap emoticons quicklink quickimage preview fullscreen print ' +
          '| lineheight searchreplace help selectall subscript superscript code hr | table toc tocupdate ' +
          'restoredraft wordcount codesample',
        help_tabs: ['shortcuts', 'keyboardnav'], // 帮助弹框的tabs
        file_picker_types: 'image',
        spellchecker_dialog: true,
        file_picker_callback: file_picker_callback_hander,
        images_upload_handler: example_image_upload_handler,
        images_dataimg_filter: function(img) {
          return !img.hasAttribute('internal-blob');  // blocks the upload of <img> elements with the attribute "internal-blob".
        },
        image_caption: true, // 插入图片的标题
        image_advtab: true, // 可设置图片高级样式
        image_title: true, // 图片标题
        image_uploadtab: true, // 图片上传tab
        default_link_target: '_blank',
        link_context_toolbar: true, // 光标在链接上显示工具栏
        link_title: false, // 不要链接标题
        lists_indent_on_tab: false,
        save_enablewhendirty: false, // 不用检查变化了才可用按钮
        save_oncancelcallback: () => { console.log('Save canceled'); },
        save_onsavecallback: () => { this.handleSave(); },
        toc_class: 'our-toc', // 自定义目录样式
        toc_header: 'div',
        textpattern_patterns: [
          {start: '*', end: '*', format: 'italic'},
          {start: '**', end: '**', format: 'bold'},
          {start: '#', format: 'h1'},
          {start: '##', format: 'h2'},
          {start: '###', format: 'h3'},
          {start: '####', format: 'h4'},
          {start: '#####', format: 'h5'},
          {start: '>', format: 'blockquote'},
          // The following text patterns require the `lists` plugin
          {start: '* ', cmd: 'InsertUnorderedList'},
          {start: '- ', cmd: 'InsertUnorderedList' },
          {start: '1. ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'decimal' }},
          {start: '1) ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'decimal' }},
          {start: 'a. ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-alpha' }},
          {start: 'a) ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-alpha' }},
          {start: 'i. ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-roman' }},
          {start: 'i) ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-roman' }},
          {start: '---', replacement: '<hr/>'},
          {start: '--', replacement: '—'},
        ],
        noneditable_noneditable_class: 'mceNonEditable',
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar: false,
        quickbars_image_toolbar: false
      },
      config_2: {
        plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks ' +
          'visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc ' +
          'insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft ' +
          'aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | ' +
          'pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor ' +
          'codesample | ltr rtl',
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        link_list: [
          { title: 'My page 1', value: 'https://www.tiny.cloud' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_list: [
          { title: 'My page 1', value: 'https://www.tiny.cloud' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_class_list: [
          { title: 'None', value: '' },
          { title: 'Some class', value: 'class-name' }
        ],
        importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
          /* Provide file and text for the link dialog */
          if (meta.filetype === 'file') {
            callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === 'image') {
            callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
          }
        },
        templates: [
          { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
          { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
          { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
        ],
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image imagetools table',
        skin: 'oxide',
        content_css: 'document',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
        autoresize_overflow_padding: 50
      },
      myeditor: null
    }
  },
  components: {
    Editor
  },
  mounted() {
    tinymce.init({})
    this.$nextTick(() => {
      this.myeditor = this.$refs.myeditor.editor
      console.log(this.myeditor.iframeElement)
      console.log(this.myeditor)
    })
  },
  methods: {
    handleSave() {
      console.log('handleSave handleSave')
      console.log(this.myeditor.container.firstChild)
      console.log(this.myeditor.iframeElement.contentWindow.document.documentElement.scrollTop)
      console.log(this.myeditor)
      console.log(cataTocList)
    },
    toTop() {
      this.myeditor.iframeElement.contentWindow.document.documentElement.scrollTop = 0
    },
    getCatelogs() {
      console.log('getCatelogs')
    }
  }
}

function file_picker_callback_hander(cb, value, meta) {
  var input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');

  /*
    Note: In modern browsers input[type="file"] is functional without
    even adding it to the DOM, but that might not be the case in some older
    or quirky browsers like IE, so you might want to add it to the DOM
    just in case, and visually hide it. And do not forget do remove it
    once you do not need it anymore.
  */

  input.onchange = function () {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function () {
      /*
        Note: Now we need to register the blob in TinyMCEs image blob
        registry. In the next release this part hopefully won't be
        necessary, as we are looking to handle it internally.
      */
      var id = 'blobid' + (new Date()).getTime();
      var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
      var base64 = reader.result.split(',')[1];
      var blobInfo = blobCache.create(id, file, base64);
      blobCache.add(blobInfo);

      /* call the callback and populate the Title field with the file name */
      cb(blobInfo.blobUri(), { title: file.name });
    };
    reader.readAsDataURL(file);
  };

  input.click();
}

function example_image_upload_handler (blobInfo, success, failure, progress) {
  var xhr, formData;

  xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('POST', 'postAcceptor.php');

  xhr.upload.onprogress = function (e) {
    progress(e.loaded / e.total * 100);
  };

  xhr.onload = function() {
    var json;

    if (xhr.status === 403) {
      failure('HTTP Error: ' + xhr.status, { remove: true });
      return;
    }

    if (xhr.status < 200 || xhr.status >= 300) {
      failure('HTTP Error: ' + xhr.status);
      return;
    }

    json = JSON.parse(xhr.responseText);

    if (!json || typeof json.location != 'string') {
      failure('Invalid JSON: ' + xhr.responseText);
      return;
    }

    success(json.location);
  };

  xhr.onerror = function () {
    failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
  };

  formData = new FormData();
  formData.append('file', blobInfo.blob(), blobInfo.filename());

  xhr.send(formData);
};

</script>

<style scoped>
.hello {
  height: 100%;
}
.hello div {
  height: inherit;
}
</style>
