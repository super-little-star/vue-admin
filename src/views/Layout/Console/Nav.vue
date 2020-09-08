<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#344a5f"
      text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>

          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.id"
            :index="subitem.path"
            >{{ subitem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  setup(props, { root }) {
    const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);

    const handleOpen = (key, keyPath) => {};
    const handleClose = (key, keyPath) => {};

    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0%;
  left: 0%;
  height: 100vh;
  width: $navMenu;
  background: #344a5f;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: $navMenu;
}
</style>
