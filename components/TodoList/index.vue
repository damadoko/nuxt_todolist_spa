<template>
  <div class="todo-list">
    <Todo v-for="todo in getTodos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import Todo from "./Todo";
import { mapGetters } from "vuex";

export default {
  name: "TodoList",
  components: { Todo },
  computed: mapGetters({
    getTodos: "wsTodos/getTodos"
  })
};
</script>

<style scoped>
.todo-list {
  max-height: 80%;
  overflow-y: auto;
  background-color: transparent;
  border: 1px solid transparent;
  margin: 1rem 0;
  max-width: 600px;
}
</style>
