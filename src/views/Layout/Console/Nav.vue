<template>
  <div id="nav-wrap">
    <div class="logo" align="center">
      <svg-icon iconClass="logo" className="mylogo" />
    </div>
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

          <template v-for="subitem in item.children">
            <el-menu-item
              v-if="!subitem.hidden"
              :key="subitem.id"
              :index="subitem.path"
              >{{ subitem.meta.name }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/composition-api";
export default {
  setup(props, { root }) {
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse;
    });
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
@import "@s/config.scss";
#nav-wrap {
  position: fixed;
  top: 0%;
  left: 0%;
  height: 100vh;
  width: $navMenu;
  background: #344a5f;

  overflow: hidden;
}

.logo {
  border-bottom: 1px solid #263646;
  svg {
    font-size: 80px;
  }
}

.open {
  #nav-wrap {
    width: $navMenu;
    transition: all 0.3s ease-in 0s;
    .logo {
      svg {
        transition: all 0.3s ease-in 0s;
      }
    }
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
    transition: all 0.3s ease-out 0s;
  }
  .logo {
    svg {
      font-size: 40px;
      transition: all 0.3s ease-out 0s;
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: $navMenu;
}
</style>
