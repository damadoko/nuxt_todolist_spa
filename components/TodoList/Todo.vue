<template>
  <div class="todo" :class="{ hide: taskFilter() }">
    <div class="todo-info" :class="{ done: todo.completed }">
      <font-awesome-icon
        v-if="todo.completed"
        :icon="['fas', 'check-circle']"
        @click="completeTodo"
      />
      <font-awesome-icon v-else :icon="['fas', 'check']" @click="completeTodo" />
      <p>{{ todo.title }}</p>
      <span>{{ todo.percentage + "%" }}</span>
    </div>
    <font-awesome-icon
      :icon="['fas', 'times']"
      class="icon-del"
      v-show="todo.completed"
      @click="deleteTodo"
    />
    <nuxt-link :to="'/' + todo.id" v-show="!todo.completed">
      <font-awesome-icon :icon="['fas', 'info']" />
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Todo",
  props: ["todo"],
  computed: mapGetters({
    curentFilter: "wsTodos/curentFilter",
    getTodos: "wsTodos/getTodos"
  }),
  methods: {
    completeTodo: function() {
      this.$store.commit("wsTodos/COMPLETE_TODO", this.todo.id);
    },
    deleteTodo: function() {
      this.$store.commit("wsTodos/DELETE_TODO", this.todo.id);
    },
    taskFilter: function() {
      if (
        (this.curentFilter === "done" && !this.todo.completed) ||
        (this.curentFilter === "remain" && this.todo.completed)
      ) {
        return true;
      }
      return false;
    }
  },
  created: function() {
    this.$store.commit("wsTodos/CHANGE_FILTER", "all");
  }
};
</script>

<style scoped>
.todo {
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

.todo-info {
  display: flex;
  max-width: 80%;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.todo-info p {
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

a {
  text-decoration: none;
  color: #1ba9f5;
}
</style>
