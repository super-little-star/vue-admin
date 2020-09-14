<template>
  <div>
    <el-form :inline="true" :model="searchFormInline" class="searchForm">
      <el-form-item label="类型：" class="type">
        <el-select
          v-model="typeValue"
          placeholder="请选择"
          @change="typeChange"
        >
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
        <el-select v-model="keywordVal" placeholder="请选择">
          <el-option
            v-for="item in keywordOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-model="contentVal" placeholder="请输入搜索内容"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
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

    <el-table :data="tableData" border style="width: 100%" height="579">
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column
        prop="categoryId"
        label="类型"
        width="130"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="150"> </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="revEvent(scope)"
            >编辑</el-button
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
export default {
  name: "infolist",
  components: { addInfoDialog },
  setup(props, { root }) {
    const { getInfoCategory, category } = common();
    const isInfoRevise = ref(false);
    //搜索表单
    const searchFormInline = reactive({
      type: "",
      date: "",
      keyword: "",
      content: ""
    });

    //类型选择器
    const typeOptions = ref([]);
    const typeValue = ref("");
    const typeChange = function() {
      console.log(typeValue.value);
    };

    //关键字选择器
    const keywordOptions = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
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
    const dateValue = ref("");

    //输入内容
    const contentVal = ref("");

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
      console.log(scope);
      root
        .MsgBoxTips("是否删除该信息？")
        .then(() => {
          removeInfo({
            id: scope.row.id
          }).then(data => {
            root.$message.success(data.message);
            if (tableData.value.length == 1) currentPage.value--;
            sendGetInfo();
          });
        })
        .catch(() => {
          root.$message.info("已取消删除");
        });
    };
    const delAllEvent = function() {
      root
        .MsgBoxTips("是否删除全部信息？")
        .then(() => {
          root.$message.success("删除成功");
        })
        .catch(() => {
          root.$message.info("已取消删除");
        });
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
      getInfo({
        page: currentPage.value
      }).then(data => {
        tableData.value = data.data.info;
        total.value = data.data.count;
      });
    };

    watch(
      () => category.item,
      value => {
        typeOptions.value = value;
      }
    );

    onMounted(() => {
      sendGetInfo();
      getInfoCategory();
    });

    return {
      typeChange,
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
