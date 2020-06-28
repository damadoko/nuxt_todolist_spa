export const state = () => {
  return {
    connection: false,
    error: "",
    updatedState: {
      filter: "all",
      todos: []
    }
  };
};

export const getters = {
  getWSState: state => state,
  getTodos: state => state.updatedState.todos,
  curentFilter: state => state.updatedState.filter,
  getTodoRecord: state => {
    return {
      all: state.updatedState.todos.length,
      done: state.updatedState.todos.filter(item => item.completed).length,
      remain: state.updatedState.todos.filter(item => !item.completed).length
    };
  },
  getSelectedTodo: state => id => {
    return state.updatedState.todos.filter(item => item.id === id)[0];
  },
  getTaskRecord: state => id => {
    const todo = state.updatedState.todos.filter(item => item.id == id)[0];
    return {
      all: todo.tasks.length,
      done: todo.tasks.filter(item => item.isDone).length,
      remain: todo.tasks.filter(item => !item.isDone).length
    };
  }
};

export const actions = {
  updateState({ commit }, data) {
    commit("UPDATE_STATE", data);
  },
  logError({ commit }, data) {
    commit("LOG_ERROR", data);
  },
  updateConnection({ commit }) {
    commit("UPDATE_CONNECTION");
  }
};

export const mutations = {
  setInitState: (state, data) => {
    state.todos = data.todos;
    state.filter = data.filter;
  },
  setComplete: (state, id) => {
    const index = state.todos.findIndex(item => item.id === id);
    // Change todo complete status
    state.todos[index].completed = !state.todos[index].completed;
    // Change Tasks complete status && percentage
    if (state.todos[index].completed) {
      state.todos[index].tasks.map(item => (item.isDone = true));
      state.todos[index].percentage = 100;
    } else {
      state.todos[index].tasks.map(item => (item.isDone = false));
      state.todos[index].percentage = 0;
    }
  },
  deleteTodo: (state, id) => {
    state.todos = state.todos.filter(item => item.id !== id);
  },
  ADD_TODO: (state, newTodo) => {
    console.log({ state, newTodo });
  },
  clearDoneTodo: state => {
    state.todos = state.todos.filter(item => !item.completed);
  },
  changeFilter: (state, status) => {
    state.updatedState.filter = status;
  },
  delTask: (state, loadID) => {
    // Find selected todo index
    const index = state.todos.findIndex(item => item.id === loadID.todoID);
    // Delete selected todo
    state.todos[index].tasks = state.todos[index].tasks.filter(
      item => item.taskID !== loadID.taskID
    );
    // Update todo percentage
    updatePercentage(state, index);
  },
  completeTask: (state, loadID) => {
    // Find selected task index in selected todo
    const todoIndex = state.todos.findIndex(item => item.id === loadID.todoID);
    const taskIndex = state.todos[todoIndex].tasks.findIndex(
      item => item.taskID === loadID.taskID
    );
    // Toggle selected task 'isDone' status
    state.todos[todoIndex].tasks[taskIndex].isDone = !state.todos[todoIndex]
      .tasks[taskIndex].isDone;
    // Update todo percentage
    updatePercentage(state, todoIndex);
  },
  UPDATE_STATE: (state, newState) => {
    // console.log("Received from socket server:", newState);
    state.updatedState = newState;
  },
  LOG_ERROR: (state, error) => {
    state.error = error;
  },
  UPDATE_CONNECTION: state => {
    state.connection = true;
  }
};

// Helper function
const updatePercentage = (state, index) => {
  const completedTaskNum = state.todos[index].tasks.filter(item => item.isDone)
    .length;
  const totalTasknNum = state.todos[index].tasks.length;
  state.todos[index].percentage = parseInt(
    (completedTaskNum / totalTasknNum).toFixed(2) * 100
  );
};
