<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
import LayoutHeader from "./Console/Header";
import LayoutMain from "./Console/Main";
import LayoutNav from "./Console/Nav";
export default {
  name: "Layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);

    return {
      menuStatus
    };
  }
};
</script>

<style lang="scss" scoped></style>
