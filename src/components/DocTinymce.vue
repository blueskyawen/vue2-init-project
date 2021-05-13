<template>
  <div class="hello">
    <button @click="toTop">toTop</button>
    <div>
      <Editor ref="myeditor" v-model="contentValue" :init="editConfig" @onChange="handleOnChange"
              @onNodeChange="handleOnNodeChange"/>
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
import _ from "underscore"

function insertToc(editor) {
  if ($(editor.container).find('.editor-toc').length !== 0) {
    $(editor.container).find('.editor-toc').show();
    return;
  }
  editor.execCommand('mceInsertToc');
  function activeTocItem(toc_container$, editor) {
    let iframe_doc$ = $(editor.iframeElement.contentWindow.document.documentElement);
    let curId = '';
    toc_container$.find('a').css('color', '#595959').each(function () {
      let id = $(this).attr('href').slice(1);
      if (iframe_doc$.find('#' + id).first().offset().top <= iframe_doc$.scrollTop() + 10) {
        curId = id;
      }
    });
    toc_container$.find("[href='#"+ curId + "']").css('color', '#25b864')
  }
  function insertCataList(toc_container$, editor) {
    let cata_ul$ = toc_container$.find('ul').first();
    cata_ul$.find('ul').css('padding-left', '12px')
      .end().find('li').css({
      'padding-left': '12px',
      'line-height': '24px'
    }).end().find('a').css({
      'cursor': 'pointer',
      'color': '#595959',
      'font-size': '12px'
    }).click(function() {
      let id = $(this).attr('href').slice(1);
      let iframe_doc$ = $(editor.iframeElement.contentWindow.document.documentElement);
      iframe_doc$.scrollTop(iframe_doc$.find('#' + id).first().offset().top);
    }).hover(function () {
      $(this).css('color', '#999');
    }, function () {
      $(this).css('color', '#595959');
    });
  }
  let toc_container$ = $(editor.iframeElement.contentWindow.document.documentElement.getElementsByClassName("our-toc")[0].cloneNode(true));
  toc_container$.css({
    'display': 'block',
    'position': 'absolute',
    'width': '280px',
    'top': '60px',
    'left': 'calc(50% + 420px)',
    'height': '100%'
  });
  toc_container$.addClass('editor-toc');
  let toc_header$ = toc_container$.children('div');
  toc_header$.html('大纲');
  toc_header$.css({
    'display': 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'font-size': '16px',
    'font-weight': 'bold',
    'margin-bottom': '10px',
    'color': '#595959',
    'padding': '5px 12px',
    'border-bottom': 'solid 1px #e8e8e8',
    'box-sizing': 'border-box'
  });
  let toc_close$ = $('<span>X</span>');
  toc_close$.css({
    'display': 'inline-block',
    'font-size': '14px',
    'font-weight': 'normal',
    'cursor': 'pointer'
  }).hover(function() {
    $(this).css('font-weight','bold');
  }, function () {
    $(this).css('font-weight','normal');
  }).click(function() {
    toc_container$.hide();
  });
  toc_header$.append(toc_close$);
  toc_container$.find('ul').css('list-style', 'none');
  insertCataList(toc_container$, editor);
  $(editor.container.children[0]).append(toc_container$);
  let handleScroll = _.debounce(activeTocItem, 500);
  $(editor.iframeElement.contentWindow).scroll(function () {
    handleScroll(toc_container$, editor)
  });
}

function insertToc22(editor) {
  if ($(editor.container).find('.editor-toc').length !== 0) {
    $(editor.container).find('.editor-toc').show();
    return;
  }
  function activeTocItem(toc_container$, editor) {
    let iframe_doc$ = $(editor.iframeElement.contentWindow.document.documentElement);
    let curId = '';
    toc_container$.find('a').css('color', '#595959').each(function () {
      let id = $(this).attr('href').slice(1);
      if (iframe_doc$.find('#' + id).first().offset().top <= iframe_doc$.scrollTop() + 10) {
        curId = id;
      }
    });
    toc_container$.find("[href='#"+ curId + "']").css('color', '#25b864')
  }
  var hs = $(editor.iframeElement.contentDocument.body).find('h1,h2,h3,h4,h5,h6');
  if (hs.length == 0) return;
  var s = '';
  let toc_container$ = $('<div class="editor-toc"></div>');
  toc_container$.css({
    'display': 'block',
    'position': 'absolute',
    'width': '280px',
    'top': '60px',
    'left': 'calc(50% + 420px)',
    'height': '100%'
  });
  let toc_header$ = $('<div class="editor-header"></div>');
  toc_header$.html('大纲');
  toc_header$.css({
    'display': 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'font-size': '16px',
    'font-weight': 'bold',
    'margin-bottom': '10px',
    'color': '#595959',
    'padding': '5px 12px',
    'border-bottom': 'solid 1px #e8e8e8',
    'box-sizing': 'border-box'
  });
  let toc_close$ = $('<span>X</span>');
  toc_close$.css({
    'display': 'inline-block',
    'font-size': '14px',
    'font-weight': 'normal',
    'cursor': 'pointer'
  }).hover(function() {
    $(this).css('font-weight','bold');
  }, function () {
    $(this).css('font-weight','normal');
  }).click(function() {
    $(this).closest('.editor-toc').hide();
  });
  toc_header$.append(toc_close$);
  toc_container$.append(toc_header$);
  let toc_catelogs$ = $('<div style="padding: 5px 12px"></div>');
  hs.each(function(index, element) {
    var tagName = $(this).get(0).tagName;
    var level = +tagName[1];

    if(tagName[0].toUpperCase() == "H"){
      let contentH = $(this).html();//获取内容
      var markid="mark-"+tagName+"-"+index.toString();
      $(this).attr("id",markid);//为当前h标签设置id
      let cateItem$ = $('<a href="#' + markid +'"></a>');
      cateItem$.css({
        'cursor': 'pointer',
        'color': '#595959',
        'font-size': '12px',
        'line-height': '24px',
        'display': 'block',
        'box-sizing': 'border-box',
        'padding-left': 12 * (level - 1) + 'px'
      }).click(function() {
        let id = $(this).attr('href').slice(1);
        let iframe_doc$ = $(editor.iframeElement.contentWindow.document.documentElement);
        iframe_doc$.scrollTop(iframe_doc$.find('#' + id).first().offset().top);
      }).hover(function () {
        $(this).css('color', '#999');
      }, function () {
        $(this).css('color', '#595959');
      });
      cateItem$.append($(contentH));
      toc_catelogs$.append(cateItem$);
    }
  });
  toc_container$.append(toc_catelogs$);
  $(editor.container.children[0]).append(toc_container$);
  let handleScroll = _.debounce(activeTocItem, 500);
  $(editor.iframeElement.contentWindow).scroll(function () {
    handleScroll(toc_container$, editor)
  });
}

export default {
  name: "DocTinymce",
  data () {
    return {
      contentValue: '',
      editConfig: {
        setup: function (editor) {
          let that = this;
          editor.ui.registry.addButton('docToc', {
            icon: 'toc',
            tooltip: '大纲',
            onAction: function (_) {
              insertToc22(editor)
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
        quickbars_image_toolbar: false,
        contextmenu: false,
        block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5',
      },
      myeditor: null
    }
  },
  components: {
    Editor
  },
  mounted() {
    tinymce.init({}).then((editor) => {
      this.myeditor = this.$refs.myeditor.editor
      console.log(this.myeditor)
    })
  },
  methods: {
    handleSave() {
      console.log('handleSave handleSave')
      console.log(this.myeditor.container.firstChild)
      console.log(this.myeditor.iframeElement.contentWindow.document.documentElement.scrollTop)
      console.log(this.myeditor)
    },
    toTop() {
      this.myeditor.iframeElement.contentWindow.document.documentElement.scrollTop = 0
    },
    getCatelogs() {
      console.log('getCatelogs')
    },
    handleOnChange() {
      console.log('handleOnChange')
    },
    handleOnNodeChange() {
      console.log('handleOnNodeChange')
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
