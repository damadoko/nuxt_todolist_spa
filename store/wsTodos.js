export const state = () => {
  return {
    socket: null,
    updatedState: {
      filter: "all",
      Todos: []
    }
  };
};

export const getters = {
  getWSState: state => state,
  getTodos: state => state.todos,
  curentFilter: state => state.filter,
  getTodoRecord: state => {
    return {
      all: state.todos.length,
      done: state.todos.filter(item => item.completed).length,
      remain: state.todos.filter(item => !item.completed).length
    };
  },
  getSelectedTodo: state => id => {
    return state.todos.filter(item => item.id === id)[0];
  },
  getTaskRecord: state => id => {
    const todo = state.todos.filter(item => item.id == id)[0];
    return {
      all: todo.tasks.length,
      done: todo.tasks.filter(item => item.isDone).length,
      remain: todo.tasks.filter(item => !item.isDone).length
    };
  }
};

export const actions = {};

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
  addTodo: (state, newTodo) => {
    newTodo.id = state.todos[0].id + 1;
    state.todos.unshift(newTodo);
  },
  clearDoneTodo: state => {
    state.todos = state.todos.filter(item => !item.completed);
  },
  changeFilter: (state, status) => {
    state.filter = status;
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
  createWS: state => {
    state.socket = new WebSocket("ws://localhost:8001/ws");
    state.socket.onopen = function(event) {
      console.log({ event });
      console.log("Successfully connect to Websocket Server!");
    };
    state.socket.onmessage = function(event) {
      console.log(event.data);
    };
    console.log(state.socket);
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
