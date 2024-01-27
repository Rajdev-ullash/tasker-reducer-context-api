import { useReducer, useState } from "react";

import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import NoTasksFound from "./NoTasksFound";
import { initialState, modelReducer } from "../reducers/ModelReducer";
import { initialTasksState, tasksReducer } from "../reducers/TaskReducer";

export default function TaskBoard() {
  const [state, dispatch] = useReducer(modelReducer, initialState);
  const [tasksState, dispatchTasks] = useReducer(
    tasksReducer,
    initialTasksState
  );
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const toggleModel = (isOpen) => {
    dispatch({ type: "TOGGLE_MODEL", payload: isOpen });
  };
  //   function handleAddEditTask(newTask, isAdd) {
  //     if (isAdd) {
  //       setTasks([...tasks, newTask]);
  //     } else {
  //       setTasks(
  //         tasks.map((task) => {
  //           if (task.id === newTask.id) {
  //             return newTask;
  //           }
  //           return task;
  //         })
  //       );
  //     }

  //     handleCloseClick();
  //   }

  //   function handleEditTask(task) {
  //     setTaskToUpdate(task);
  //     // setShowAddModal(true);
  //     toggleModel(true);
  //   }

  //   function handleDeleteTask(taskId) {
  //     const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
  //     setTasks(tasksAfterDelete);
  //   }

  //   function handleDeleteAllClick() {
  //     tasks.length = 0;
  //     setTasks([...tasks]);
  //   }

  //   function handleFavorite(taskId) {
  //     setTasks(
  //       tasks.map((task) => {
  //         if (task.id === taskId) {
  //           return { ...task, isFavorite: !task.isFavorite };
  //         } else {
  //           return task;
  //         }
  //       })
  //     );
  //   }

  //   function handleSearch(searchTerm) {
  //     console.log(searchTerm);

  //     const filtered = tasks.filter((task) =>
  //       task.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );

  //     setTasks([...filtered]);
  //   }

  const handleAddEditTask = (newTask, isAdd) => {
    dispatchTasks({
      type: "ADD_EDIT_TASK",
      payload: { newTask, isAdd },
    });
    handleCloseClick();
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    toggleModel(true);
  };

  const handleDeleteTask = (taskId) => {
    dispatchTasks({
      type: "DELETE_TASK",
      payload: { taskId },
    });
  };

  const handleDeleteAllClick = () => {
    dispatchTasks({
      type: "DELETE_ALL_TASKS",
    });
  };

  const handleFavorite = (taskId) => {
    dispatchTasks({
      type: "TOGGLE_FAVORITE",
      payload: { taskId },
    });
  };

  const handleSearch = (searchTerm) => {
    dispatchTasks({
      type: "SEARCH_TASKS",
      payload: { searchTerm },
    });
  };

  const handleCloseClick = () => {
    toggleModel(false);
    setTaskToUpdate(null);
  };

  return (
    <section className="mb-20" id="tasks">
      {state.isOpen && (
        <AddTaskModal
          onSave={handleAddEditTask}
          onCloseClick={handleCloseClick}
          taskToUpdate={taskToUpdate}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => toggleModel(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />
          {tasksState.taskData.length > 0 ? (
            <TaskList
              tasks={tasksState.taskData}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTasksFound />
          )}
        </div>
      </div>
    </section>
  );
}
