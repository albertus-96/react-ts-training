import { Task } from "entities/Task";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

interface taskProps {
  task: Task;
  id: Number;
  remove: (task: Task) => void;
  edit: (task: Task) => void;
  update: (id: number) => void;
}

export const TaskList: React.FC<taskProps> = (props) => {
  const [task, setTask] = useState(props.task);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTask(props.task);
  }, [props.task]);

  const handleChangeTitle = (e: string) => {
    setTask({ ...task, title: e });
  };

  const handleChangeDesc = (e: string) => {
    setTask({ ...task, desc: e });
  };

  const handleChangeStatus = () => {
    setTask({ ...task, isDone: !task.isDone });
    props.update(task.id);
  };

  const removeTask = (e: { preventDefault: () => void }) => {
    props.remove(task);
    e.preventDefault();
  };

  const editTask = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const saveTask = (e: { preventDefault: () => void }) => {
    setIsEditing((isEditing) => !isEditing);
    props.edit(task);
    e.preventDefault();
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={`https://picsum.photos/id/${props.id}/160`}
              alt=""
            />
          </div>
          <div className="ml-3">
            {isEditing ? (
              <p>
                <input
                  type="text"
                  placeholder="Enter task tile here..."
                  value={task.title}
                  onChange={(e) => handleChangeTitle(e.target.value)}
                  className="bg-gray-200 max-w-full focus:outline-none text-gray-700"
                />
              </p>
            ) : task.isDone ? (
              <p className="text-black line-through whitespace-no-wrap">
                {task.title}
              </p>
            ) : (
              <p className="text-gray-900 whitespace-no-wrap">{task.title}</p>
            )}
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {isEditing ? (
          <input
            type="text"
            value={task.desc}
            onChange={(e) => handleChangeDesc(e.target.value)}
            placeholder="Enter task description here..."
            className="bg-gray-300 max-w-full focus:outline-none text-gray-700"
          />
        ) : task.isDone ? (
          <p className="text-gray-900 line-through whitespace-no-wrap">
            {task.desc}
          </p>
        ) : (
          <p className="text-gray-900 whitespace-no-wrap">{task.desc}</p>
        )}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-gray-800 leading-tight mr-4">
          {task.isDone ? (
            <span>
              <span
                aria-hidden
                className="absolute inset-0 bg-green-400 opacity-50 rounded-full"
              ></span>
              <span
                className="relative cursor-pointer"
                onClick={handleChangeStatus}
              >
                Mark as WIP
              </span>
            </span>
          ) : (
            <span>
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span
                className="relative cursor-pointer"
                onClick={handleChangeStatus}
              >
                Mark as Done
              </span>
            </span>
          )}
        </span>
        <span className="relative inline-block px-3 py-1 font-semibold text-gray-800 leading-tight mr-4">
          {isEditing ? (
            <span>
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span className="relative cursor-pointer" onClick={saveTask}>
                Done
              </span>
            </span>
          ) : (
            <span>
              <span
                aria-hidden
                className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
              ></span>
              <span className="relative cursor-pointer" onClick={editTask}>
                Edit
              </span>
            </span>
          )}
        </span>
        <span className="relative inline-block px-3 py-1 font-semibold text-gray-800 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative cursor-pointer" onClick={removeTask}>
            Remove
          </span>
        </span>
      </td>
    </tr>
  );
};
