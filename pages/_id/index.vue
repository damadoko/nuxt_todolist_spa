<template>
  <div class="container">
    <h1>{{ selectedTodo.title }}</h1>
    <span>Process: {{ selectedTodo.percentage }}%</span>
    <div class="detail-list">
      <TodoDetail
        v-for="task in selectedTodo.tasks"
        :key="task.taskId"
        :task="task"
        :todoID="selectedTodo.id"
      />
    </div>
    <button @click="$router.go(-1)">&#8592; Back</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoDetail from "../../components/TodoDetail";
export default {
  components: { TodoDetail },
  computed: {
    ...mapGetters({
      getSelectedTodo: "todos/getSelectedTodo"
    }),
    selectedTodo: function() {
      return this.getSelectedTodo(parseInt(this.$route.params.id));
    }
  },
  created: function() {
    this.$store.commit("todos/changeFilter", "all");
  },
  head: {
    title: "Your Todo Detail"
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  height: 60%;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  justify-content: flex-start;
}
.detail-list {
  max-height: 80%;
  overflow-y: auto;
  background-color: transparent;
  border: 1px solid transparent;
  margin: 1rem 0;
  max-width: 600px;
}

h1 {
  color: #1ba9f5;
  margin: 1rem 0;
}

button {
  color: #1ba9f5;
  display: inline-block;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  text-transform: capitalize;
  font-weight: bold;
  position: absolute;
  top: 25%;
  left: 5%;
}

span {
  color: #1ba9f5;
  font-weight: bold;
}
</style>
