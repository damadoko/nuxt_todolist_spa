<template>
  <div class="filter">
    <label>Filter by:</label>
    <div class="btn-group">
      <button type="button" class="all" @click="filter('all')">All</button>
      <button type="button" class="done" @click="filter('done')">Done</button>
      <button type="button" class="remain" @click="filter('remain')">
        Remain
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskFilter",
  methods: {
    filter: function(status) {
      this.$store.commit("todos/changeFilter", status);
    }
  }
};
</script>

<style scoped>
.filter {
  max-width: 600px;
  margin: 0.5rem 0;
  display: flex !important;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: inline-block;
  border: 1px solid;
  border-radius: 5px;
  background-color: transparent;
  margin: 0 0.5rem;
}

button:focus {
  outline: none;
}

.all {
  color: #1ba9f5;
  border-color: #1ba9f5;
}

.done {
  color: #7de2d1;
  border-color: #7de2d1;
}

.remain {
  color: #ffce7a;
  border-color: #ffce7a;
}

.disabled {
  color: #d2d2d2 !important;
  border-color: #d2d2d2 !important;
}

.current {
  background-color: #629b7d;
}

.clear {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #61c08d;
  color: #ffffff;
  transition: all 0.4s ease-in-out;
  border-radius: 5px;
}

.clear:hover {
  transform: scale(1.1);
}

.clear:focus {
  outline: none;
}

label {
  margin: 0 1rem;
  font-size: 0.75rem;
  color: #535966;
}
</style>
