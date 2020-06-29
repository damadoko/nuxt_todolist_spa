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
  compareID: state => id => {
    return state.updatedState.todos.filter(item => item.id === id).length;
  },
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
    if (!todo) {
      return { all: 0, done: 0, remain: 0 };
    }
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
  updateConnection({ commit }, status) {
    commit("UPDATE_CONNECTION", status);
  }
};

export const mutations = {
  COMPLETE_TODO: (state, id) => {
    // console.log({ state, id });
    return { state, id };
  },
  DELETE_TODO: (state, id) => {
    // console.log({ state, id });
    return { state, id };
  },
  ADD_TODO: (state, newTodo) => {
    // console.log({ state, newTodo });
    return { state, newTodo };
  },
  CLEAR_DONE_TODO: state => {
    // console.log({ state });
    return { state };
  },
  CHANGE_FILTER: (state, status) => {
    // console.log({ state, status });
    return { state, status };
  },
  DELETE_TASK: (state, loadID) => {
    return { state, loadID };
  },
  COMPLETE_TASK: (state, loadID) => {
    return { state, loadID };
  },
  UPDATE_STATE: (state, newState) => {
    // console.log("Received from socket server:", newState);
    state.updatedState = newState;
  },
  LOG_ERROR: (state, error) => {
    console.log(error);
    state.error = error;
  },
  UPDATE_CONNECTION: (state, status) => {
    state.connection = status;
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
