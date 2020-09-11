<template>
  <div class="addInfoDialog">
    <el-dialog title="新增" :visible.sync="flag" @close="close" width="580px">
      <el-form :model="form">
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="title" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="类型：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择类型">
          </el-select>
        </el-form-item>

        <el-form-item label="概况：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="profile"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="flag = false">确 定</el-button>
        <el-button @click="flag = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, watch, watchEffect } from "@vue/composition-api";
export default {
  name: "addInfoDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const form = reactive({
      name: "",
      region: ""
    });
    const flag = ref(false);
    const formLabelWidth = ref("70px");
    const profile = ref("");
    const title = ref("");

    watchEffect(() => {
      flag.value = props.dialogVisible;
    });

    const close = function() {
      emit("update:dialogVisible", false);
    };
    return {
      title,
      close,
      form,
      flag,
      formLabelWidth,
      profile
    };
  },

  watch: {
    dialogVisible: {
      handler(newVal, oldVal) {
        this.flag = newVal;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
