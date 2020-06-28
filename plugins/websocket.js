const socket = new WebSocket("ws://localhost:8001/ws");
export default function newSocket() {
  return store => {
    socket.onopen = function(event) {
      console.log("Successfully connect to Websocket Server!");
      socket.send(
        JSON.stringify({
          type: "initial"
        })
      );
      store.dispatch("wsTodos/updateConnection");
    };

    socket.onerror = function(event) {
      store.dispatch("wsTodos/logError", event.error);
    };

    socket.onmessage = function(event) {
      // console.log("message from the server", event.data);
      store.dispatch("wsTodos/updateState", JSON.parse(event.data));
    };

    // Send message to socket server
    store.subscribe((mutation, state) => {
      if (state.wsTodos.connection) {
        switch (mutation.type) {
          case "wsTodos/ADD_TODO":
            console.log(
              "Sendding",
              JSON.stringify({
                type: "add",
                todo: mutation.payload
              })
            );
            return socket.send(
              JSON.stringify({
                type: "add",
                todo: mutation.payload
              })
            );

          case "DELETE_TODO":
            return socket.send("delete", mutation.payload);

          case "CLEAR_TODO":
            return socket.send("clear");

          case "CHANGE_FILTER":
            return socket.send("changeFilter", mutation.payload);

          case "CLEAR_TODO":
            return socket.send("clear");

          case "COMPLETE_TODO":
            return socket.send("completeTodo", mutation.payload);

          case "COMPLETE_TASK":
            return socket.send("completeTask", mutation.payload);

          case "DELETE_TASK":
            return socket.send("completeTask", mutation.payload);
        }
      }
    });
  };
}

const formatRequest = (type, loadID, filter, todo) => {};
