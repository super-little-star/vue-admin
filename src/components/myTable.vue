<template>
  <div class="myTable">
    <el-table
      :data="data.tableData"
      border
      @selection-change="handleSelectionChange"
      height="579"
    >
      <el-table-column
        v-if="data.checkbox"
        type="selection"
        width="40"
      ></el-table-column>
      <template v-for="item in data.head">
        <el-table-column
          :width="item.width"
          :key="item.key"
          :prop="item.key"
          :label="item.label"
          v-if="item.type == 'slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.key" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :width="item.width"
          :key="item.key"
          :prop="item.key"
          :label="item.label"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { onBeforeMount, reactive, ref } from "@vue/composition-api";
export default {
  name: "myTable",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    const data = reactive({
      checkbox: false,
      head: [],
      tableData: []
    });

    const handleSelectionChange = function(value) {
      emit("update:selection", value);
    };

    let init = () => {
      if (props.config == null) {
        console.log("myTable:配置信息是空的");
        return;
      }
      for (let key in props.config) {
        if (data[key] != null) {
          data[key] = props.config[key];
        }
      }
    };

    onBeforeMount(() => {
      init();
    });

    return {
      handleSelectionChange,
      data
    };
  }
};
</script>

<style lang="scss" scoped>
.myTable {
  width: 100%;
  margin-top: 20px;
}
</style>
