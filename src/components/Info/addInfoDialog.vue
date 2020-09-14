<template>
  <div class="addInfoDialog">
    <el-dialog
      :title="isInfoRevise ? '修改' : '增加'"
      :visible.sync="flag"
      @close="close"
      @open="open"
      width="580px"
    >
      <el-form :model="form">
        <el-form-item label="类型：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.txt"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="title" placeholder="请输入内容"></el-input>
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
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="flag = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, watch, watchEffect } from "@vue/composition-api";
import { addInfo } from "@/api/Info";
export default {
  name: "addInfoDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    typeOptions: {
      type: Array
    },
    isInfoRevise: {
      type: Boolean,
      default: false
    },
    selectInfoData: {}
  },
  setup(props, { emit, root }) {
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

    const open = function() {
      if (props.isInfoRevise) {
        let r = props.typeOptions.find(t => {
          return t.id == props.selectInfoData.categoryId;
        });
        form.region = r ? r.id : "";
        title.value = props.selectInfoData.title;
        profile.value = props.selectInfoData.content;
      } else {
        form.region = "";
        title.value = "";
        profile.value = "";
      }
    };

    const submit = function() {
      flag.value = false;
      let d = {
        categoryId: form.region == "" ? 0 : form.region,
        title: title.value,
        content: profile.value
      };

      if (props.isInfoRevise) {
        d["id"] = props.selectInfoData.id;
        emit("revise", d);
      } else {
        emit("add", d);
      }
    };
    return {
      open,
      submit,
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
