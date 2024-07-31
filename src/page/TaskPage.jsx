import { Header } from "../components/Header";
import { TaskCreateForm } from "../components/TaskForm";
import TaskList from "../components/TasksList";


const TaskPage = () => {
    return (
        <>
            <Header/>
            <main className="page_container">
                <TaskList/>
            </main>
        </>
        
    );
};

export default TaskPage