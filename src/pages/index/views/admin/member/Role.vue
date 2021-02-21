<template>
  <div class="role">
    <el-row>
      <el-button plain type="primary" @click="chanPage('roleList')">
        查看角色
      </el-button>
      <el-button plain type="success" @click="chanPage('roleAdd')">
        增加角色
      </el-button>
    </el-row>
    <component
      :key="isComponent"
      :ref="isComponent"
      @onshowComponent="showComponent"
      :listId="listId"
      :is="isComponent"
    ></component>
  </div>
</template>

<script>
import roleAdd from "./role/add.vue";
import roleList from "./role/list.vue";
import roleEdit from "./role/edit.vue";
export default {
  name: "role",
  components: {
    roleAdd,
    roleList,
    roleEdit,
  },
  data() {
    return {
      isComponent: "",
      listId: "",
    };
  },
  methods: {
    showComponent(value) {
      if (value.listId) {
        this.listId = value.listId;
      }
      this.isComponent = value.isComponent;
    },
    chanPage(aim) {
      this.isComponent = aim || "roleList";
    },
  },
  created() {
    // this.axios.get("/api/api/member/role.php").then((res) => {
    //   console.log(res);
    // });
    this.chanPage();
  },
};
</script>

<style lang="scss" scoped>
.role {
  padding: 20px;
  .el-row {
    // padding-bottom: 20px;
    // border-bottom: 1px solid #ddd;
  }
}
</style>
