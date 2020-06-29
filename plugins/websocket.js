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
      console.log("Message from the server", JSON.parse(event.data));
      store.dispatch("wsTodos/updateState", JSON.parse(event.data));
    };

    // Send message to socket server
    store.subscribe((mutation, state) => {
      if (state.wsTodos.connection) {
        switch (mutation.type) {
          case "wsTodos/ADD_TODO":
            // console.log(
            //   "Sendding",
            //   JSON.stringify({
            //     type: "add",
            //     todo: mutation.payload
            //   })
            // );
            return socket.send(
              JSON.stringify({
                type: "add",
                todo: mutation.payload
              })
            );

          case "wsTodos/DELETE_TODO":
            return socket.send(
              JSON.stringify({
                type: "delete",
                loadID: [mutation.payload, 0]
              })
            );

          case "wsTodos/CLEAR_DONE_TODO":
            return socket.send(
              JSON.stringify({
                type: "clear"
              })
            );

          case "wsTodos/CHANGE_FILTER":
            return socket.send(
              JSON.stringify({
                type: "changeFilter",
                filter: mutation.payload
              })
            );

          case "wsTodos/COMPLETE_TODO":
            return socket.send(
              JSON.stringify({
                type: "completeTodo",
                loadID: [mutation.payload, 0]
              })
            );

          case "wsTodos/COMPLETE_TASK":
            return socket.send(
              JSON.stringify({
                type: "completeTask",
                loadID: mutation.payload
              })
            );

          case "wsTodos/DELETE_TASK":
            return socket.send(
              JSON.stringify({
                type: "delTask",
                loadID: mutation.payload
              })
            );
        }
      }
    });
  };
}

const formatRequest = (type, loadID, filter, todo) => {};
