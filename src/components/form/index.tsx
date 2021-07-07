import { useState } from "react";
import { Task } from "../../entities/Task";

interface formProps {
  submit: (task: Task) => void;
}

export const Form: React.FC<formProps> = (props) => {
  const [newTask, setNewTask] = useState(new Task("", "", new Date()));

  const handleChangeTitle = (e: string) => {
    setNewTask({ ...newTask, title: e });
  };

  const handleChangeDesc = (e: string) => {
    setNewTask({ ...newTask, desc: e });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    props.submit(newTask);
    setNewTask(new Task("", "", new Date()));
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 justify-center">
        <div>Add New Task</div>
        <div className="grid grid-cols-2 gap-2 border border-gray-600 bg-gray-700 p-2 rounded">
          <div className="flex border rounded bg-gray-300 items-center p-2 ">
            <input
              type="text"
              placeholder="Enter task title here..."
              value={newTask.title}
              onChange={(e) => handleChangeTitle(e.target.value)}
              className="bg-gray-300 max-w-full focus:outline-none text-gray-700"
            />
          </div>
          <div className="flex border rounded bg-gray-300 items-center p-2 ">
            <input
              type="text"
              value={newTask.desc}
              onChange={(e) => handleChangeDesc(e.target.value)}
              placeholder="Enter description here..."
              className="bg-gray-300 max-w-full focus:outline-none text-gray-700"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="p-2 border w-1/4 rounded-md bg-gray-700 shadow-md text-white"
            value="Submit"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
