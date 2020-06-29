// const socket = new WebSocket("ws://localhost:8001/ws");
const socket = new WebSocket("ws:peaceful-retreat-82156.herokuapp.com/ws");
export default function newSocket() {
  return store => {
    store.commit("wsTodos/UPDATE_CONNECTION", false);
    socket.onopen = function(event) {
      console.log("Successfully connect to Websocket Server!");
      socket.send(
        JSON.stringify({
          type: "initial"
        })
      );
      // Prevent server close connection when it not receive any request
      const timer = setInterval(function() {
        socket.send(
          JSON.stringify({
            type: "initial"
          })
        );
      }, 50000);
      store.commit("wsTodos/UPDATE_CONNECTION", true);
    };

    socket.onerror = function(event) {
      store.dispatch("wsTodos/logError", event.error);
      store.commit("wsTodos/UPDATE_CONNECTION", false);
    };

    socket.onmessage = function(event) {
      // console.log("Message from the server", JSON.parse(event.data));
      store.dispatch("wsTodos/updateState", JSON.parse(event.data));
    };

    socket.onclose = function(event) {
      console.log("Connection closed!");
      store.commit("wsTodos/UPDATE_CONNECTION", false);
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
