<template>
  <div class="container">
    <TodoList />
    <TodoCtrl />
  </div>
</template>

<script>
import TodoList from "../components/TodoList";
import TodoCtrl from "../components/TodoCtrl";
export default {
  components: {
    TodoList,
    TodoCtrl
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  height: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
