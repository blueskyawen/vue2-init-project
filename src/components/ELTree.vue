<template>
  <div class="el-tree">
    <el-tree :data="data" :props="defaultProps" node-key="id" default-expand-all
             :highlight-current="true"
             :expand-on-click-node="false"
             icon-class="tree-icon"
             @node-click="handleNodeClick"
             @node-drag-start="handleDragStart"
             @node-drag-enter="handleDragEnter"
             @node-drag-leave="handleDragLeave"
             @node-drag-over="handleDragOver"
             @node-drag-end="handleDragEnd"
             @node-drop="handleDrop"
             draggable
             :allow-drop="allowDrop"
             :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="hoverNode=data" @mouseleave="hoverNode={}">
        <span class="text">
          <i class="el-icon-folder" v-if="data.children"></i>
          <i class="el-icon-document" v-else></i>
          <span>{{ node.label }}</span>
        </span>
        <span class="opers" v-show="clickNode.id == data.id || hoverNode.id == data.id">
          <span v-show="data.children">新建</span>
          <span v-show="!data.children">编辑</span>
          <span v-show="!data.children">删除</span>
          <span v-show="!data.children">转移</span>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "ELTree",
  data () {
    return {
      data: [
        {
          id: 1,
          label: '国外经典著作【分类】',
          children: [{
            id: 3,
            label: '哈利波特与死亡圣器【分类】',
            children: [{
              id: 6,
              label: '第一章：哈利波特上学记【文章】',
            },{
              id: 9,
              label: '第二章：哈利波特上学记【文章】',
            }]
          }]
        },
        {
          id: 2,
          label: '中国四大名著【分类】',
          children: [{
              id: 4,
              label: '西游记【分类】',
              children: [{
                id: 7,
                label: '第一回 灵根育孕源流出 心性修持大道生',
              },{
                id: 10,
                label: '第二回 悟彻菩提真妙理 断魔归本合元神',
              }]
            },
           {
              id: 5,
              label: '三国演义【分类】',
              children: [{
                id: 8,
                label: '第一回 宴桃园豪杰三结义 斩黄巾英雄首立功',
              },{
                id: 11,
                label: '第二回 张翼德怒鞭督邮 何国舅谋诛宦竖',
              }]
           }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      expandKeys: [],
      clickNode: {},
      hoverNode: {}
    }
  },
  created() {
    this.getExpandKeys(this.data, this.expandKeys);
  },
  methods: {
    getExpandKeys(data, keys) {
      if (Array.isArray(data)) {
        data.forEach(item => {
          keys.push(item.id);
          if (item.children) {
            this.getExpandKeys(item.children,keys);
          }
        });
      }
    },
    handleNodeClick(data) {
      console.log(data);
      this.clickNode = data
    },
    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      console.log(this.data)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      return !!dropNode.data.children;
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    }
  }
}
</script>

<style scoped>
.el-tree {
  margin: 20px 0 20px 30px;
  width: 60%;
}
.custom-tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  width: 100%;
}
.opers {
  font-size: 12px;
}
.opers > span {
  margin-right: 5px;
}
.opers > span:hover {
  color: #00b386;
}
.tree-icon {
  color: red;
}
.text {
  font-size: 12px;
}
.custom-tree-node:hover .opers {
  display: block;
}
</style>
