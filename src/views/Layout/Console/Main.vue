<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@s/config.scss";
#main-wrap {
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30;
  padding-right: 30px;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
    transition: all 0.3s ease-in 0s;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
    transition: all 0.3s ease-out 0s;
  }
}
</style>
