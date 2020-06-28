import newSocket from "../plugins/websocket";
import createPersistedState from "vuex-persistedstate";

export const plugins = [newSocket(), createPersistedState()];
