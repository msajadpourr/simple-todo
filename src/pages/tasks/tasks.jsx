import React from "react";
import { useEffect } from "react";
// packages
import axios from "axios";
// redux
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../features/ui/uiSlice";
// styles
import Styles from "./tasks.module.scss";
import Task from "../../components/task/task";
import Loader from "../../components/loader/loader";

// main component
const Tasks = () => {
    // base url
    const API_URL = process.env.REACT_APP_API_URL;

    // redux
    const dispatch = useDispatch();
    let tasksList = useSelector(store => store.ui.counter);
    let loading = useSelector(store => store.ui.loading);

    useEffect(() => {
        handleGetTasks();
    }, []);
    // handlers
    const handleGetTasks = async () => {
        dispatch(uiActions.setLoading(true));
        try {
            const res = await axios.get(
                `${API_URL}/caf3faf8-e18f-4dfb-8cd9-0c75fd76746b`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            dispatch(uiActions.setLoading(false));
            // to generate id for any task in array
            idGenerator(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    const idGenerator = tasks => {
        // to generate id for any task in array
        let tasksWithId = [];
        let counter = 1;
        for (let i in tasks) {
            let taskWithId = tasks[i];
            taskWithId.id = counter;
            tasksWithId.push(taskWithId);
            counter++;
        }
        dispatch(uiActions.setCounter(tasksWithId));
    };
    return (
        <React.Fragment>
            <div className={Styles.main}>
                <div className="row align-items-center justify-content-center">
                    <div className="col-11 col-md-8">
                        <div className={Styles.taskWraper}>
                            <h3 className="pb-5 text-end">task today</h3>
                            {loading && <Loader />}
                            {tasksList &&
                                tasksList.map(task => (
                                    <Task
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        priority={task.priority}
                                        done={task.done}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Tasks;
