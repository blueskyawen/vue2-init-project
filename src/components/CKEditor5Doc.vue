<template>
  <div style="width: 100%;margin:auto">
    <div>
      <button @click="getContent">GetContent</button>
      <button @click="getPlugins">GetPluginsName</button>
      <button @click="getToolBar">GetToolBar</button>
      <button @click="saveData">SaveContent</button>
    </div>
    <div class="document-editor">
      <div class="document-editor__toolbar2" id="toolbar-container"></div>
      <div class="document-editor__editable-container2">
        <div class="document-editor__editable2" id="editor"></div>
      </div>
      <div class="toc">
        <h2>大纲</h2>
        <ul>
          <li><a href="#aa111">1.1 概述</a></li>
          <li><a href="#aa222">1.2 架构</a></li>
          <li><a href="#aa333">1.2 特性</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';

export default {
  name: "CKEditor5",
  data () {
    return {
      editor: null,
      mdcontent: '<h2 id="aa111"><span style="color:rgb(23,43,77);">1.1 概述</span></h2><p><span style="color:rgb(23,43,77);">应用公共网关是公司JRES3.0产品簇下的一个独立平台级产品。它负责为恒生内部基于JRES3.0技术框架研发的业务应用提供与外部终端或外部系统之间的接入与接出能力；同时，它也提供基于JRES3.0技术框架研发的应用间内部互通能力。</span></p><p>&nbsp;</p><p><span style="color:rgb(23,43,77);">在JRES3.0技术体系下，恒生系统内部环境均采用公司标准的T2/T3或者HS-HTTP RESTful协议进行互通，有效的提高了内部系统之间的通讯效率，降低了系统复杂度。但是，当与外部对接时，不同行业、不同用户面临着个性化的交互协议，应用公共网关平台便是用于实现协议适配的中间件产品。</span></p><h2  id="aa222"><span style="color:rgb(23,43,77);">1.2 架构设计</span></h2><p><span style="color:rgb(23,43,77);">JRES3.0应用公共网关平台由核心路由负载组件、接入/接出扩展组件、管理控制组件三部分组成，各部分通过恒生HTTP RESTful协议进行交互。</span></p><p>&nbsp;</p><h2 id="aa333"><span style="color:rgb(23,43,77);">1.3 功能特性</span></h2><p><span style="color:rgb(23,43,77);">应用公共网关平台按功能划分为四个模块，各部分结构如下：</span></p><p><span style="color:rgb(23,43,77);">其中：</span></p><p>&nbsp;</p><p><span style="color:rgb(23,43,77);"><strong>核心路由负载组件：</strong>负责对接JRES3.0技术体系内的注册中心，实现符合恒生JRES3.0技术标准的服务路由与负载均衡。目前该组件已有HS-IAR子产品实现。</span></p><p><span style="color:rgb(23,43,77);"><strong>接入/接出扩展组件：</strong>负责完成非标（不符合恒生服务标准）服务于标准恒生服务之间的协议转换，同时，提供接入/接出方身份认证和访问控制能力。该组件采用Java的Spring Cloud框架集成Zuul组件实现的过滤链框架</span></p>'
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
              'textPartLanguage', "pageBreak", "undo", "redo", "|" , "myPlugin"],
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
  height: 100% !important;
}
.toc {
  position: absolute;
  top: 70px;
  /* right: 201px; */
  z-index: 2;
  display: inline-block;
  width: 300px;
  left: calc(50% + 400px);
}
.toc h2 {
  padding-bottom: 10px;
  border-bottom: solid 1px #ccc;
}
</style>
