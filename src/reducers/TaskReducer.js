import { getAllTasks } from "../data/task";

const defaultTask = getAllTasks();
const initialTasksState = {
  taskData: defaultTask,
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EDIT_TASK":
      if (action.payload.isAdd) {
        return {
          ...state,
          taskData: [...state.taskData, action.payload.newTask],
        };
      } else {
        return {
          ...state,
          taskData: state.taskData.map((task) =>
            task.id === action.payload.newTask.id
              ? action.payload.newTask
              : task
          ),
        };
      }
      break;

    case "DELETE_TASK":
      return {
        ...state,
        taskData: state.taskData.filter(
          (task) => task.id !== action.payload.taskId
        ),
      };
      break;

    case "DELETE_ALL_TASKS":
      return { ...state, taskData: [] };
      break;

    case "TOGGLE_FAVORITE":
      return {
        ...state,
        taskData: state.taskData.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, isFavorite: !task.isFavorite }
            : task
        ),
      };
      break;

    case "SEARCH_TASKS":
      const filteredTasks = state.taskData.filter((task) =>
        task.title
          .toLowerCase()
          .includes(action.payload.searchTerm.toLowerCase())
      );
      return { ...state, taskData: filteredTasks };
      break;

    default:
      return state;
  }
};

export { initialTasksState, tasksReducer };
