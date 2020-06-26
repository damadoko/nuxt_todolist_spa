export const dataMockUp = {
  todos: [
    {
      id: 2,
      title: "Code SSR App",
      completed: false,
      percentage: 67,
      tasks: [
        { taskID: 0, taskTitle: "Learn NuxtJS or NextJS", isDone: false },
        { taskID: 1, taskTitle: "Learn basic SEO", isDone: true },
        { taskID: 2, taskTitle: "Finish App", isDone: true }
      ]
    },
    {
      id: 1,
      title: "Code VueJS SPA App",
      completed: true,
      percentage: 100,
      tasks: [
        { taskID: 0, taskTitle: "Learn VueJS", isDone: true },
        { taskID: 1, taskTitle: "Learn Vuex", isDone: true },
        { taskID: 2, taskTitle: "Finish App", isDone: true }
      ]
    }
  ],
  filter: "all" //all, done, remain
};
