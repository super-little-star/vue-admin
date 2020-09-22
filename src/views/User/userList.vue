<template>
  <div id="userlist">
    <el-row :gutter="20">
      <el-col :span="18">
        <label>关键字：</label>
        <mSelect :config="select" :mSelect.sync="select.model" />
        <el-input
          v-model="content"
          class="margin-left-10"
          style="width:150px;"
        ></el-input>
        <el-button class="margin-left-10" type="danger" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="6">
        <el-button type="danger" class="pull-right">新增用户</el-button>
      </el-col>
    </el-row>
    <mTable :config="configTable" :selection.sync="configTable.selection">
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button type="danger" size="mini" @click="delEvent(slotData.data)">
          删除
        </el-button>
        <el-button type="success" size="mini" @click="editEvent(slotData.data)">
          编辑
        </el-button>
      </template>
    </mTable>
  </div>
</template>
<script>
import { reactive, ref, watch } from "@vue/composition-api";
import mSelect from "@c/mySelect";
import mTable from "@c/myTable";
export default {
  name: "userlist",
  components: {
    mSelect,
    mTable
  },
  setup(props, { root }) {
    const content = ref(null);
    const select = reactive({
      init: ["name", "phone", "email"],
      model: null
    });

    const state = ref(false);

    const configTable = reactive({
      checkbox: true,
      head: [
        { label: "邮箱、用户名", key: "email" },
        { label: "姓名", key: "name", width: 150 },
        { label: "手机号", key: "phone", width: 200 },
        { label: "地区", key: "address", width: 350 },
        { label: "角色", key: "role", width: 200 },
        { label: "禁用状态", key: "status", type: "slot" },
        { label: "操作", key: "operation", type: "slot" }
      ],
      tableData: [
        {
          email: "suosssss@qq.com",
          name: "王小虎",
          phone: "135888888",
          address: "广东省",
          role: "超管",
          state: false
        },
        {
          email: "suosssss@qq.com",
          name: "王小虎",
          phone: "135888888",
          address: "广东省",
          role: "超管",
          state: true
        }
      ],
      selection: []
    });

    const delEvent = function(data) {
      console.log(data);
    };
    const editEvent = function(data) {
      console.log(data);
    };

    return {
      delEvent,
      editEvent,
      state,
      configTable,
      select,
      content
    };
  }
};
</script>

<style lang="scss" scoped>
#userlist {
  label {
    line-height: 40px;
    font-size: 15px;
    font-weight: bold;
  }
}
</style>
