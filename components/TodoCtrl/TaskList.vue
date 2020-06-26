<template>
  <ol>
    <li v-for="task in tasks" :key="task.taskID">
      <span> {{ task.taskTitle }} </span>
      <font-awesome-icon
        :icon="['fas', 'times']"
        class="del-task"
        @click="del(task.taskID)"
      />
    </li>
  </ol>
</template>

<script>
export default {
  name: "TaskList",
  props: ["tasks"],
  methods: {
    del(delID) {
      this.$emit("delTask", delID);
    }
  }
};
</script>

<style scoped>
ol {
  text-decoration: none;
}
li {
  width: 80%;
  color: #1ba9f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
span {
  overflow: auto;
  margin-right: 0.5rem;
}
</style>
