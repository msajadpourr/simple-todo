import React from "react";
import { useState, useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../features/ui/uiSlice";
// styles
import Styles from "./task.module.scss";


// main component 
const Task = ({ title, priority, done, id }) => {
    const [priorityClassName, setPriorityClassName] = useState(Styles.high);
    // redux
    const dispatch = useDispatch();
    let tasksList = useSelector(store => store.ui.counter);


    useEffect(() => {
        handleDynamicClassName();
    }, []);
    // handlers
    const handleCheckBox = e => {
        tasksSorter(e.target.checked);
    };
    const tasksSorter = checkedStatus => {
        let tasks = [...tasksList];
        if (checkedStatus) {
            // when task is become DONE
            let doneTask = {};
            for (let i in tasks) {
                if (tasks[i].id === id) {
                    doneTask = { ...tasks[i] };
                    doneTask.done = true;
                    tasks.splice(i, 1);
                    tasks.push(doneTask);
                    break;
                }
            }
            dispatch(uiActions.setCounter(tasks));
        } else {
            // when task is become UNDONE
            let unDoneTask = {};
            for (let i in tasks) {
                if (tasks[i].id === id) {
                    unDoneTask = { ...tasks[i] };
                    unDoneTask.done = false;
                    tasks.splice(i, 1);
                    tasks.unshift(unDoneTask);
                    break;
                }
            }
            dispatch(uiActions.setCounter(tasks));
        }
    };
    const handleDynamicClassName = () => {
        switch (priority) {
            case "high":
                setPriorityClassName(Styles.high);
                break;
            case "medium":
                setPriorityClassName(Styles.medium);
                break;
            case "low":
                setPriorityClassName(Styles.low);
                break;
            case "none":
                setPriorityClassName(Styles.none);
            default:
            case "none":
                setPriorityClassName(Styles.none);
        }
    };
    return (
        <>
            <div className={Styles.task}>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={`anime${id}`}
                        name={`task${id}`}
                        defaultChecked={done}
                        onChange={e => handleCheckBox(e)}
                    />
                    <label
                        className={`form-check-label ${priorityClassName}`}
                        htmlFor={`anime${id}`}
                    >
                        {title}
                    </label>
                </div>
            </div>
        </>
    );
};

export default Task;
