<template>
  <div id="detailInfo">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="类型：" prop="typeOption">
        <el-select clearable v-model="ruleForm.typeOption" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.txt"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题：" prop="title">
        <el-input v-model="ruleForm.title" style="width:350px;"> </el-input>
      </el-form-item>

      <el-form-item label="发布日期：">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          disabled
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="内容:">
        <quillEditor v-model="ruleForm.content" ref="myQuillEditor" />
      </el-form-item>

      <el-form-item>
        <el-button type="danger" @click="back">返回</el-button>
        <el-button type="success" @click="submit" v-loading="isLoadding"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "@vue/composition-api";
import { GetData, Key } from "@u/app";
import { RemoveData, SaveData } from "../../utils/app";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { reviseInfo } from "@/api/Info";
export default {
  name: "detailInfo",
  components: { quillEditor },
  setup(props, { root }) {
    const typeOptions = ref(null);
    const ruleForm = reactive({
      id: "",
      typeOption: "",
      title: "",
      date: "",
      content: "",
      editorOption: []
    });

    const isLoadding = ref(false);

    const rules = reactive({
      region: [
        { required: true, message: "请选择活动区域", trigger: "change" }
      ],
      date1: [
        {
          type: "date",
          required: true,
          message: "请选择日期",
          trigger: "change"
        }
      ],
      date2: [
        {
          type: "date",
          required: true,
          message: "请选择时间",
          trigger: "change"
        }
      ],
      type: [
        {
          type: "array",
          required: true,
          message: "请至少选择一个活动性质",
          trigger: "change"
        }
      ],
      resource: [
        { required: true, message: "请选择活动资源", trigger: "change" }
      ],
      desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
    });

    const submit = function() {
      let d = {
        id: ruleForm.id,
        title: ruleForm.title,
        categoryId: ruleForm.typeOption,
        content: ruleForm.content
      };
      isLoadding.value = true;
      reviseInfo(d)
        .then(data => {
          isLoadding.value = false;
          root.$message.success(data.message);
        })
        .catch(data => {
          isLoadding.value = false;
          root.$message.error(data.message);
        });
    };

    const back = function() {
      RemoveData(Key.infoData);
      root.$router.push({
        name: "infolist"
      });
    };

    onMounted(() => {
      typeOptions.value = root.$store.state.info.category;

      let data = root.$route.params.data || JSON.parse(GetData(Key.infoData));
      SaveData(Key.infoData, data);

      ruleForm.id = data.id;
      ruleForm.typeOption = typeOptions.value.find(
        i => i.id == data.categoryId
      );
      ruleForm.title = data.title;
      ruleForm.date = Date(data.date);
      ruleForm.content = data.content;
    });

    return {
      isLoadding,
      back,
      submit,
      typeOptions,
      ruleForm,
      rules
    };
  }
};
</script>
