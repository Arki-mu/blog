<template>
  <el-row class="artpost" :gutter="0">
    <el-divider content-position="left">文章发布</el-divider>
    <el-col :span="23" :offset="0">
      <el-form
        :model="artiform"
        ref="artiform"
        :rules="artirules"
        label-width="100px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="文章标题：" prop="title">
          <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="8" :offset="0">
            <el-input v-model="artiform.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="文章分类：" prop="classid">
          <el-select
            v-model="artiform.classid"
            placeholder="请选择文章分类"
            clearable
            filterable
          >
            <el-option
              v-for="item in artiform.articlass"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容：" prop="article">
          <quill-editor
            class="ql-editor-class"
            v-model="artiform.article"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="formSubmit('artiform')">
            立即创建
          </el-button>
          <el-button @click="resetForm('artiform')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { error, success } from "../../../../../plugin/element/response";
export default {
  data() {
    return {
      artiform: {
        title: "",
        classid: "",
        articlass: "",
        article: "",
      },
      artirules: {},
      editorOption: {
        placeholder: "请在这里输入",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image"], //上传图片、上传视频
          ],
        },
      },
    };
  },
  methods: {
    onEditorReady() {
      // 准备编辑器
    },
    onEditorBlur() {
      // 失去焦点事件
    },
    onEditorFocus() {
      // 获得焦点事件
    },
    onEditorChange() {
      // 内容改变事件
    },
    formSubmit(form) {
      let _this = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          let userid = JSON.parse(localStorage.getItem("userinfo")).user.id;
          let data = {
            userid: userid,
            title: _this.artiform.title,
            classid: _this.artiform.classid,
            body: _this.artiform.article,
          };
          this.$api.article
            .articlePost(data)
            .then((res) => {
              let { verify, msg } = res.data;
              if (verify) {
                _this.$refs[form].resetFields();
                success(msg);
              } else {
                error(msg);
              }
            })
            .catch((err) => {
              error(err);
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.$api.article
      .classShow()
      .then((res) => {
        // console.log(res);
        let { verify, msg, classType } = res.data;
        if (verify) {
          this.artiform.articlass = classType;
        } else {
          error(msg);
        }
      })
      .catch((err) => {
        error(err);
      });
  },
};
</script>
<style lang="scss" scoped>
.ql-editor-class {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.42;
  height: 100%;
  outline: none;
  padding: 0 !important;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  word-wrap: break-word;
}
</style>