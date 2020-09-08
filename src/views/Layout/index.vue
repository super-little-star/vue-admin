<template>
  <div id="layout">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./Console/Header";
import LayoutMain from "./Console/Main";
import LayoutNav from "./Console/Nav";
export default {
  name: "Layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup() {}
};
</script>

<style lang="scss" scoped></style>
