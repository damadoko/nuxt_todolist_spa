<template>
  <div class="task" :class="{ hide: taskFilter() }">
    <div class="task-info" :class="{ done: task.isDone }">
      <font-awesome-icon
        v-if="task.isDone"
        :icon="['fas', 'check-circle']"
        @click="completeTask"
      />
      <font-awesome-icon
        v-else
        :icon="['fas', 'check']"
        @click="completeTask"
      />
      <p>{{ task.taskTitle }}</p>
    </div>
    <font-awesome-icon
      :icon="['fas', 'times']"
      class="icon-del"
      v-show="task.isDone"
      @click="delTask"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TodoDetail",
  props: ["task", "todoID"],
  computed: mapGetters({ curentFilter: "todos/curentFilter" }),
  methods: {
    delTask: function() {
      const loadID = {
        todoID: this.todoID,
        taskID: this.task.taskID
      };
      this.$store.commit("todos/delTask", loadID);
    },
    completeTask: function() {
      const loadID = {
        todoID: this.todoID,
        taskID: this.task.taskID
      };
      this.$store.commit("todos/completeTask", loadID);
    },
    taskFilter: function() {
      if (
        (this.curentFilter === "done" && !this.task.isDone) ||
        (this.curentFilter === "remain" && this.task.isDone)
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #1ba9f5;
  transition: all 0.4s ease-in-out;
  width: 100%;
  color: #1ba9f5;
}
.done {
  color: #535966;
}

.delete {
  display: inline-block !important;
}

.hide {
  display: none !important;
}

.task-info {
  display: flex;
  max-width: 80%;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.task-info p {
  margin-left: 2rem;
  overflow: hidden;
  text-align: justify;
  border: 0;
  background: transparent;
  font-size: 1.25rem;
  color: inherit;
  width: 70vw;
}

.icon-del {
  color: #535966;
  transition: all 0.25s ease-in-out;
  display: inline-block;
}
</style>
