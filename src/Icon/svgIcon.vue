<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { reactive, ref, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      tpye: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const msg = ref("svgIcon");
    const iconName = computed(() => {
      return "#icon-" + props.iconClass;
    });
    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });
    return {
      msg,
      iconName,
      svgClass
    };
  }
};
</script>
