<template>
  <div>
    <el-form :inline="true" :model="searchFormInline" class="searchForm">
      <el-form-item label="类型：" class="type">
        <el-select clearable v-model="typeValue" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.txt"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：" class="date">
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字" class="keyword">
        <mSelect :config="keywordOptions" :mSelect.sync="keywordVal" />
        <el-input v-model="contentVal" placeholder="请输入搜索内容"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchEvent"
          >搜索</el-button
        >
      </el-form-item>
      <el-form-item class="addbtn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="
            isInfoRevise = false;
            dialogVisible = true;
          "
          >添加</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="579"
      @selection-change="handleSelectionChange"
      v-loading="isTableLoading"
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column
        prop="categoryId"
        label="类型"
        width="130"
        :formatter="toType"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="150" :formatter="toDate">
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="revEvent(scope)"
            >编辑</el-button
          >

          <el-button size="mini" type="success" @click="detaEvent(scope.row)"
            >信息详情</el-button
          >

          <el-button size="mini" type="danger" @click="delEvent(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-row class="bottom">
      <el-col :span="8"
        ><el-button @click="delAllEvent">批量删除</el-button></el-col
      >
      <el-col :span="16"
        ><el-pagination
          class="pull-right"
          background
          :page-size="10"
          :current-page.sync="currentPage"
          layout="total,jumper, prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total"
        >
        </el-pagination
      ></el-col>
    </el-row>

    <addInfoDialog
      :isInfoRevise="isInfoRevise"
      :dialogVisible.sync="dialogVisible"
      :typeOptions="typeOptions"
      :selectInfoData="selectInfoData"
      @add="add"
      @revise="revise"
    />
  </div>
</template>
<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import addInfoDialog from "@c/Info/addInfoDialog";
import { common } from "@/api/common";
import { addInfo, getInfo, removeInfo, reviseInfo } from "@/api/Info";
import { dateFormat } from "@u/dateTool";
import mSelect from "@c/mySelect";
export default {
  name: "infolist",
  components: { addInfoDialog, mSelect },
  setup(props, { root }) {
    const { getInfoCategory, category } = common();
    const isInfoRevise = ref(false);
    const selectId = ref([]);
    const isTableLoading = ref(false);
    //搜索表单
    const searchFormInline = reactive({
      type: "",
      date: "",
      keyword: "",
      content: ""
    });

    //类型选择器
    const typeOptions = ref([]);
    const typeValue = ref(null);

    //关键字选择器
    const keywordOptions = reactive({
      init: ["title", "id"]
    });
    const keywordVal = ref("id");

    //日期选择器
    const pickerOptions = reactive({
      shortcuts: [
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          }
        }
      ]
    });
    const dateValue = ref(null);

    //输入内容
    const contentVal = ref(null);

    //表格
    const tableData = ref([]);

    //弹窗
    const dialogVisible = ref(false);

    //分页
    const handleCurrentChange = val => {
      sendGetInfo();
    };
    const total = ref(0);
    const currentPage = ref(1);
    //MessageBox
    const delEvent = function(scope) {
      root
        .MsgBoxTips("是否删除该信息？")
        .then(() => {
          sendRemoveInfo([scope.row.id]);
        })
        .catch(() => {
          root.$message.info("已取消删除");
        });
    };
    const delAllEvent = function() {
      if (selectId.value.length == 0)
        root.$message.warning("请选择想要删除的信息");
      else {
        root
          .MsgBoxTips("是否删除全部信息？")
          .then(() => {
            sendRemoveInfo(selectId.value);
          })
          .catch(() => {
            root.$message.info("已取消删除");
          });
      }
    };

    const selectInfoData = ref({});
    const revEvent = function(scope) {
      dialogVisible.value = true;
      isInfoRevise.value = true;
      selectInfoData.value = scope.row;
      console.log(selectInfoData.value);
    };
    const revise = function(d) {
      console.log(d);
      reviseInfo(d).then(data => {
        root.$message.success(data.message);
        let r = tableData.value.find(t => {
          return t.id == d.id;
        });
        r.title = d.title;
        r.content = d.content;
        r.categoryId = d.categoryId;
      });
    };

    const detaEvent = function(row) {
      root.$router.push({
        name: "detailInfo",
        params: {
          data: row
        }
      });
    };

    const add = function(d) {
      isInfoRevise.value = false;
      addInfo(d).then(data => {
        root.$message.success(data.message);
        if (tableData.value.length < 10) tableData.value.push(data.data);
        total.value++;
      });
    };

    const findCategoryTxt = function(id) {
      let r = typeOptions.value.find(t => {
        return t.id == id;
      });
      return r ? r.txt : "无";
    };

    const transInfo = function(d) {
      return {
        userId: d.userId,
        id: d.id,
        title: d.title,
        category: findCategoryTxt(d.categoryId),
        content: d.content
      };
    };

    const sendGetInfo = function() {
      isTableLoading.value = true;
      getInfo({
        categoryId: typeValue.value,
        startTime: dateValue.value ? dateValue.value[0].valueOf() : null,
        endTime: dateValue.value ? dateValue.value[1].valueOf() : null,
        id: keywordVal.value == "id" ? contentVal.value : "",
        title: keywordVal.value == "title" ? contentVal.value : "",
        page: currentPage.value
      }).then(data => {
        isTableLoading.value = false;
        tableData.value = data.data.info;
        total.value = data.data.count;
      });
    };
    const sendRemoveInfo = function(id) {
      removeInfo({
        id: id
      }).then(data => {
        root.$message.success(data.message);
        if (tableData.value.length == id.length) currentPage.value--;
        if (currentPage.value == 0) {
          tableData.value.splice(0, id.length);
          total.value--;
        } else {
          sendGetInfo();
        }
      });
    };

    const toDate = function(row, column, cellValue, index) {
      return dateFormat(parseInt(cellValue));
    };
    const toType = function(row, column, cellValue, index) {
      return findCategoryTxt(cellValue);
    };

    const handleSelectionChange = function(val) {
      selectId.value = val.map(item => item.id);
    };

    const searchEvent = function() {
      sendGetInfo();
    };

    watch(
      () => category.item,
      value => {
        typeOptions.value = value;
        root.$store.commit("info/SetCategory", typeOptions.value);
      }
    );

    onMounted(() => {
      sendGetInfo();
      getInfoCategory();
    });

    return {
      detaEvent,
      searchEvent,
      isTableLoading,
      handleSelectionChange,
      toType,
      toDate,
      currentPage,
      total,
      findCategoryTxt,
      isInfoRevise,
      selectInfoData,
      revEvent,
      revise,
      add,
      delAllEvent,
      delEvent,
      dialogVisible,
      typeOptions,
      typeValue,
      pickerOptions,
      dateValue,
      searchFormInline,
      keywordOptions,
      keywordVal,
      contentVal,
      tableData,
      handleCurrentChange
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@s/config.scss";
.searchForm {
  display: flex;
  justify-content: flex-start;
  .el-button--primary {
    background-color: $subColor;
    border-color: $subColor;
  }
}
.keyword {
  padding-left: 15px;
  display: flex;
  justify-content: flex-start;
  .el-input {
    width: 150px;
    margin-right: 5px;
  }
  .el-select {
    width: 80px;
    margin-right: 5px;
  }
}
.type {
  .el-select {
    width: 150px;
  }
}
.date {
  padding-left: 15px;
  .el-date-editor--daterange.el-input__inner {
    width: 250px;
  }
}
.addbtn {
  position: fixed;
  right: 40px;
}
.bottom {
  margin-top: 20px;
}
</style>
