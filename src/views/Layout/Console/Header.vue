<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="clickMenu">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right ">
      <div class="user-info  pull-left">
        <div class="pull-left header-icon">
          <svg-icon iconClass="headerIcon" className="headerIcon" />
        </div>
        <div class="pull-left">管理员</div>
      </div>
      <div class="pull-left header-icon">
        <svg-icon iconClass="logout" className="logout" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, { root }) {
    const clickMenu = function() {
      root.$store.commit("SetCollapse");
    };
    return {
      clickMenu
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@s/config.scss";
#header-wrap {
  position: fixed;
  top: 0%;
  right: 0;
  left: $navMenu;
  height: $layoutHeader;
  line-height: $layoutHeader;
  background: #fff;
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.header-icon {
  padding: 10px 10px;
  svg {
    font-size: 30px;
    cursor: pointer;
    color: initial;
  }
}
.user-info {
  height: 100%;
  padding: 0 15px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 10px 5px;
  }
}

.open {
  #header-wrap {
    left: $navMenu;
    transition: all 0.3s ease-in 0s;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
    transition: all 0.3s ease-out 0s;
  }
}
</style>
