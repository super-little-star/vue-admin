<template>
  <el-select v-model="data.select" class="myselect">
    <el-option
      v-for="item in data.initOptions"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
    </el-option>
  </el-select>
</template>

<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";

export default {
  name: "mySelect",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    const data = reactive({
      initOptions: [],
      select: null,
      options: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "电话" },
        { value: "email", label: "邮件" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    });

    let initCom = () => {
      if (props.config.init == null) return;
      let tmep = [];
      let init = props.config.init;
      for (let i = 0; i < init.length; i++) {
        let d = data.options.find(item => {
          return item.value == init[i];
        });
        if (d != null) {
          tmep.push(d);
        }
      }

      if (tmep.length !== 0) {
        data.initOptions = tmep;
        data.select = init[0];
      }
    };

    watch(
      () => data.select,
      value => {
        emit("update:mSelect", value);
      }
    );

    onMounted(() => {
      initCom();
    });

    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped>
.myselect {
  width: 100px;
}
</style>
