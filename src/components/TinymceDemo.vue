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
      height: '100%',
      content_css : 'document',
      // min_height: 500,
      // max_height: 500,
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'table emoticons template paste help save imagetools'
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
      init_instance_callback : function(editor) {
        console.log('Editor: ' + editor.id + ' is now initialized.');
      },
      branding: false,
      block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
      contextmenu: 'link image table',
      lineheight_formats: '1 1.1 1.2 1.3 1.4 1.5 2',
      font_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n',
      fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
      placeholder: 'Type here...',
      resize: false,
      statusbar: false,
      image_title: true,
      automatic_uploads: true,
      images_reuse_filename: true,
      file_picker_types: 'image',
      file_picker_callback: function (cb, value, meta) {
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
      },
      images_dataimg_filter: function(img) {
        return !img.hasAttribute('internal-blob');  // blocks the upload of <img> elements with the attribute "internal-blob".
      },
      images_upload_handler: example_image_upload_handler
    });
  }
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
form {
  height: 100%;
}
</style>
