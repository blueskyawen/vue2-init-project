<template>
  <div style="width: 60%;margin:auto">
    <div>
      <button @click="getContent">GetContent</button>
      <button @click="getPlugins">GetPluginsName</button>
      <button @click="getToolBar">GetToolBar</button>
      <button @click="saveData">SaveContent</button>
    </div>
    <!-- The toolbar will be rendered in this container. -->
    <div id="toolbar-container"></div>

    <!-- This container will become the editable. -->
    <div id="editor"></div>
  </div>
</template>

<script>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
export default {
  name: "CKEditor5",
  data () {
    return {
      editor: null,
      mdcontent: "# JRES3.0应用网关平台\n" +
        "\n" +
        "## 1.1     概述\n" +
        "\n" +
        "应用公共网关是公司JRES3.0产品簇下的一个独立平台级产品。它负责为恒生内部基于JRES3.0技术框架研发的业务应用提供与外部终端或外部系统之间的接入与接出能力；同时，它也提供基于JRES3.0技术框架研发的应用间内部互通能力。\n" +
        "\n" +
        "![](http://rdcdocs.hundsun.com/download/attachments/9473938/1.png?version=1&modificationDate=1565939282000&api=v2)\n" +
        "\n" +
        "在JRES3.0技术体系下，恒生系统内部环境均采用公司标准的T2/T3或者HS-HTTP RESTful协议进行互通，有效的提高了内部系统之间的通讯效率，降低了系统复杂度。但是，当与外部对接时，不同行业、不同用户面临着个性化的交互协议，应用公共网关平台便是用于实现协议适配的中间件产品。\n" +
        "\n" +
        "## 1.2     架构设计\n" +
        "\n" +
        "JRES3.0应用公共网关平台由核心路由负载组件、接入/接出扩展组件、管理控制组件三部分组成，各部分通过恒生HTTP RESTful协议进行交互。\n" +
        "\n" +
        "*   aaaaa\n" +
        "*   bbbb"
    }
  },
  mounted() {
    this.initEditor();
  },
  beforeDestroy() {
    if (this.editor) {
      console.log('destroy editor');
      this.editor.destroy().then(res => {
        console.log( 'destroy editor **** success' );
        this.editor = null;
      }).catch( error => {
          console.log( 'destroy editor **** fail' );
          console.error( error );
        } );
    }
  },
  methods: {
    initEditor () {
      DecoupledEditor
        .create( document.querySelector( '#editor' ), {
          toolbar: {
            items: ["heading", "|", "fontSize", "fontFamily", "fontColor", "fontBackgroundColor", "bold", "italic", "strikethrough",
              "underline", "alignment", "|", "indent", "outdent", "numberedList", "bulletedList", "|", "blockQuote",
              "imageTextAlternative", "link", "uploadImage", "mediaEmbed", "insertTable", "selectAll", "ckfinder",
              "|", "codeBlock", "code", "horizontalLine", "imageInsert", 'subscript', 'superscript','todoList',
              "removeFormat", "MathType", 'ChemType', "highlight", "htmlEmbed", 'restrictedEditing', 'specialCharacters',
              'textPartLanguage', "pageBreak", "undo", "redo"],
            viewportTopOffset: 30,
            shouldNotGroupWhenFull: true // true时工具栏自动换行
          },
          title: {
            placeholder: '请输入标题'
          },
          placeholder: '正文内容区...',
        } )
        .then( editor => {
          const toolbarContainer = document.querySelector( '#toolbar-container' );

          toolbarContainer.appendChild( editor.ui.view.toolbar.element );
          // editor.setData( '<p>Some text CKEditor5.</p>' );
          editor.model.document.on( 'change:data', () => {
            console.log( 'The data has changed!' );
          } );
          this.editor = editor;
        } )
        .catch( error => {
          console.error( error );
        } );
    },
    getContent () {
      console.log(this.editor.getData());
    },
    getPlugins () {
      console.log(DecoupledEditor.builtinPlugins.map( plugin => plugin.pluginName ));
    },
    getToolBar () {
      console.log(Array.from(this.editor.ui.componentFactory.names()));
    },
    saveData () {
      this.editor.setData(this.mdcontent);
    }
  }
}
</script>

<style scoped>
.ck-editor__editable_inline {
  height: 300px !important;
}
</style>
