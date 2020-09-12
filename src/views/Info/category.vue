<template>
  <div id="category">
    <div
      style="padding-bottom:10px;margin-bottom:10px;border-bottom: 1px solid #eee;"
    >
      <el-button type="danger">添加分类</el-button>
    </div>

    <div>
      <el-row :gutter="30">
        <el-col :span="10">
          <div class="category-wrap">
            <div
              class="category"
              v-for="(item, index) in categoryList"
              :key="index"
            >
              <h4>
                <svg-icon iconClass="plus" className="plus"></svg-icon>
                {{ item.txt }}
                <div class="btn-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <!-- <el-button type="success" size="mini" round
                    >添加子级</el-button
                  > -->
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <!-- <ul>
                <li>
                  国内
                  <div class="btn-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul> -->
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <h4 class="menu-title">
            分类添加
          </h4>
          <el-form
            label-position="right"
            label-width="120px"
            :model="formLabelAlign"
            class="w410"
          >
            <el-form-item label="分类名称">
              <el-input v-model="formLabelAlign.categoryName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="addCategory">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "@vue/composition-api";
import { addFirstCategory, getCategory } from "@/api/Info";
export default {
  name: "infoCategory",
  setup(props, { root }) {
    const formLabelAlign = reactive({
      categoryName: ""
    });
    const categoryList = ref([]);
    const addCategory = function() {
      if (formLabelAlign.categoryName == "") {
        root.$message.warning("请输入分类名称");
        return;
      }
      addFirstCategory({
        categoryName: formLabelAlign.categoryName
      })
        .then(data => {
          root.$message.success(data.message);
          root.$router.push({ name: "infoCategory" });
        })
        .catch(data => {
          root.$message.error(data.message);
        });
    };

    const sendGetCategory = function() {
      getCategory().then(data => {
        categoryList.value = data.data;
      });
    };

    onMounted(() => {
      sendGetCategory();
    });
    return {
      categoryList,
      addCategory,
      formLabelAlign
    };
  }
};
</script>

<style lang="scss" scoped>
.category-wrap {
  :first-child {
    &::before {
      top: 20px;
    }
  }
  :last-child {
    &::before {
      bottom: 20px;
    }
  }
}
.menu-title {
  line-height: 44px;
  background: #f3f3f3;
  padding-left: 20px;
  margin-top: 0;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    width: 32px;
    top: 0px;
    left: 22px;
    bottom: 0px;
    border-left: 1px dotted #000;
  }
  ul {
    margin: 0px;
    padding: 0;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    margin: 0px;
    font-size: 14px;
    svg {
      position: absolute;
      color: initial;
      padding: 0;
      top: 12px;
      left: 12px;
      background: #fff;
      font-size: 20px;
    }
  }
  li {
    position: relative;
    padding-left: 40px;
    margin-left: 23px;
    list-style-type: none;
    font-size: 14px;
    &::before {
      content: "";
      position: absolute;
      width: 32px;
      top: 22px;
      left: 0px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    &:hover {
      transition: all 0.5s ease 0s;
      background: #f3f3f3;
      border-radius: 3px;
      .btn-group {
        display: block;
      }
    }
  }
}
.btn-group {
  display: none;
  float: right;
}
.w410 {
  width: 410px;
}
</style>
