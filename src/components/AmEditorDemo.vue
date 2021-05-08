<template>
  <div>
    <!--am-toolbar v-if="engine" :engine="engine" :items="items" />-->
    <div className="editor-wrapper">
      <div className="editor-container">
        <div ref="container">This is Container</div>
      </div>
    </div>
  </div>
</template>

<script>
/* import Engine, { EngineInterface } from "@aomao/engine"
import Redo from '@aomao/plugin-redo';
import Undo from '@aomao/plugin-undo';
import Bold from '@aomao/plugin-bold';
import AmToolbar , { ToolbarPlugin, ToolbarComponent } from '@aomao/toolbar-vue'
const plugins = [
  Redo,
  Undo,
  Bold,
  ToolbarPlugin
];
const cards = [
  ToolbarComponent,
];
export default {
  name: "AmEditorDemo",
  data () {
    return {
      container: null,
      engine: null,
      members: [],
      items:[['collapse'],
        ['undo', 'redo', 'paintformat', 'removeformat'],
        ['heading', 'fontsize'],
        [
          'bold',
          'italic',
          'strikethrough',
          'underline',
          'moremark',
        ],
        ['fontcolor', 'backcolor'],
        ['alignment'],
        ['unorderedlist', 'orderedlist', 'tasklist', 'indent'],
        ['link', 'quote', 'hr'],]
    }
  },
  components: {
    AmToolbar
  },
  created() {
  },
  mounted() {
    //实例化引擎
    this.engine = new Engine(this.refs.container,{
      plugins,
      cards,
    });
    this.engine.messageSuccess = (msg) => {
      console.log(msg);
    };
    this.engine.messageError = (error) => {
      console.error(error);
    };
    //初始化本地协作，用作记录历史
    this.engine.ot.initLockMode();

    //设置编辑器值
    this.engine.setValue("<strong>我在这里哟～</strong>")
    //监听编辑器值改变事件
    this.engine.on('change', value => {
      console.log('value', value);
      console.log('html:', this.engine.getHtml());
    });
  },
  beforeDestroy() {
    if (this.engine) {
      this.engine.destroy()
    }
  }
} */
</script>

<style scoped>
.editor-wrapper {
  background: #fafafa;
  padding: 62px 0;
  height: calc(100% - 20px);
  overflow: auto;
}

.editor-container {
  position: relative;
  width: 812px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #f0f0f0;
}

.editor-container .am-engine {
  min-height: 824px;
  padding: 40px 60px 90px;
}
</style>
