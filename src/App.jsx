import { useReducer } from "react";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TaskBoard from "./task/TaskBoard";
import { initialState, modelReducer } from "./reducers/ModelReducer";
import { ModelContext, TaskContext } from "./context";
import { initialTasksState, tasksReducer } from "./reducers/TaskReducer";
export default function App() {
  const [state, dispatch] = useReducer(modelReducer, initialState);
  const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasksState);
  return (
    <>
      <TaskContext.Provider value={{ tasks, dispatchTasks }}>
        <ModelContext.Provider value={{ state, dispatch }}>
          <Header />
          <div className="flex flex-col justify-center items-center">
            <HeroSection />
            <TaskBoard />
          </div>
          <Footer />
        </ModelContext.Provider>
      </TaskContext.Provider>
    </>
  );
}
