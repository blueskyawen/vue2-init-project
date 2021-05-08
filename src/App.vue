<template>
  <div id="app" style="position: fixed; height: 100%; width: 100%">
    <div class="tabs">
      <router-link class="tab-item" to="/tinymce">Tinymce</router-link>
      <router-link class="tab-item" to="/ckeditorDoc">CKEditor5-Doc</router-link>
      <router-link class="tab-item" to="/TinymceDemo">TinymceDemo</router-link>
      <router-link class="tab-item" to="/DocTinymce">DocTinymce</router-link>
      <router-link class="tab-item" to="/FreeModeTinymce">FreeModeTinymce</router-link>
      <router-link class="tab-item" to="/el-tree">EL-Tree</router-link>
      <router-link class="tab-item" to="/amEditor">am-editor</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tabs {
  display: flex;
  padding-left: 50px;
}
.tabs .tab-item {
  display: inline-block;
  height: inherit;
  padding: 20px 30px;
  color: #0d0d0d;
  font-size: 14px;
}
.tabs .tab-item:hover {
  cursor: pointer;
  background: #f2f2f2;
}
.tabs .tab-item.router-link-active {
  color: #00a854;
  font-weight: bold;
}
</style>
