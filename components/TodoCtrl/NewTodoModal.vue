<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <h2>New Todo</h2>
      </header>
      <section class="modal-body">
        <form>
          <p>
            <label>Todo title:</label>
            <span>
              <input type="text" v-model="title" />
              <span v-show="err.onTitle.length" class="validate">{{
                err.onTitle
              }}</span>
            </span>
          </p>
          <p>
            <label>Process:</label>
            <span>
              <input type="text" v-model="taskTitle" />
              <font-awesome-icon
                :icon="['fas', 'plus-circle']"
                class="add-task"
                @click="addTask"
              />
              <span v-show="err.onProcess.length" class="validate">{{
                err.onProcess
              }}</span>
            </span>
          </p>
        </form>
        <TaskList :tasks="tasks" @delTask="delTask" />
      </section>
      <footer class="modal-footer">
        <button @click="close">Cancel</button>
        <button @click="onSubmitTodo">Save</button>
      </footer>
    </div>
  </div>
</template>

<script>
import TaskList from "./TaskList";

export default {
  name: "NewTodoModal",
  components: { TaskList },
  data() {
    return {
      err: {
        onTitle: "",
        onProcess: ""
      },
      title: "",
      tasks: [],
      taskTitle: ""
    };
  },
  methods: {
    resetForm: function() {
      this.title = "";
      this.exp = { date: "", time: "" };
      this.tasks = [];
      this.taskTitle = "";
      this.err.onTitle = "";
      this.err.onExp = "";
      this.err.onProcess = "";
    },
    close: function() {
      this.resetForm();
      this.$emit("close");
    },
    addTask: function() {
      if (this.taskTitle.length) {
        const newTask = {};
        // NewID = lastElement ID + 1 or NewId = 0 if Tasks array is empty
        newTask.taskID = this.tasks.length
          ? this.tasks[this.tasks.length - 1].taskID + 1
          : 0;
        newTask.taskTitle = this.taskTitle;
        newTask.isDone = false;
        this.tasks = [...this.tasks, newTask];
        this.taskTitle = "";
        this.err.onProcess = "";
      } else {
        this.err.onProcess = "Invalid task!";
      }
    },
    delTask: function(delID) {
      this.tasks = this.tasks.filter(item => item.taskID !== delID);
    },
    checkSubmition: function(todo) {
      const d = new Date();

      let result = true;
      if (!todo.title.length) {
        this.err.onTitle = "Title is required!";
        result = false;
      }

      if (!todo.tasks.length) {
        this.err.onProcess = "At least one task is required!";
        result = false;
      }
      return result;
    },
    onSubmitTodo: function() {
      const newTodo = {};
      newTodo.title = this.title;
      newTodo.completed = false;
      newTodo.tasks = this.tasks;
      newTodo.percentage = 0;
      if (this.checkSubmition(newTodo)) {
        this.$store.commit("wsTodos/ADD_TODO", newTodo);
        this.close();
      }
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.modal {
  background: #25262e;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  min-width: 400px;
}

.modal-header,
.modal-footer {
  padding: 1rem;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #1ba9f5;
  color: #1ba9f5;
  justify-content: center;
}

.modal-footer {
  border-top: 1px solid #1ba9f5;
  justify-content: flex-end;
}

.modal-footer button {
  display: inline-block;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  margin: 0 0.5rem;
  font-weight: bold;
}

.modal-footer button:first-child {
  background-color: transparent;
  color: #1ba9f5;
}

.modal-footer button:last-child {
  background-color: #1ba9f5;
  color: #ffffff;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.modal-body p {
  margin: 0.5rem 0;
}

form {
  display: flex;
  flex-direction: column;
}

form p {
  display: flex;
}

form p > span {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.5rem;
}

form p:first-child > span {
  grid-template-columns: 1fr;
}

span[class="validate"] {
  font-size: 0.75rem;
  color: #ffce7a;
  text-align: left;
  margin-top: 0.25rem;
}

label {
  display: inline-block;
  text-align: left;
  width: 90px;
  margin-right: 1rem;
  color: #ffffff;
}

.add-task {
  color: #7de2d1;
  background-color: #ffffff;
  border-radius: 50%;
}
</style>
