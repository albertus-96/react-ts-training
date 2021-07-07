import axios from "axios";
import React, { useEffect } from "react";
import { Task } from "../../entities/Task";
import { useState } from "react";
import { TaskList } from "../task";
import { Form } from "components/form";

export const Board: React.FC = () => {
  const [board, setBoard] = useState([new Task("", "", null)]);

  //fetch all task when start
  useEffect(() => {
    fetchAllTask();
  }, []);

  //fetch all task from database
  const fetchAllTask = () => {
    axios
      .get(`http://localhost:4000/tasks/`)
      .then((res) => {
        const result = res.data.map(
          (data: any) =>
            new Task(data.title, data.desc, data.date, data.isDone, data.id)
        );
        setBoard(result);
      })
      .catch((err) => console.error(err));
  };

  const handleAddTask = (newTask: Task) => {
    axios
      .post(`http://localhost:4000/tasks`, newTask)
      .then((res: any) => {
        if (res.status === 201) setBoard([...board, res.data]);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const handleUpdateTask = (id: Number) => {
    let targetTask = board.find((it) => it.id === id);
    targetTask.isDone = !targetTask.isDone;
    axios
      .patch(`http://localhost:4000/tasks/${id}`, targetTask)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const markAllDone = () => {
    let updatedBoard = board;
    updatedBoard.forEach((it) => {
      it.isDone = true;
      axios
        .patch(`http://localhost:4000/tasks/${it.id}`, it)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  };

  const handleEditTask = (task: Task) => {
    axios
      .patch(`http://localhost:4000/tasks/${task.id}`, task)
      .then((res) => {
        if (res.status === 200) {
          const prevState = board;
          const targetUpdate = board.findIndex((it) => it.id === task.id);
          prevState[targetUpdate] = new Task(
            res.data.title,
            res.data.desc,
            res.data.date,
            res.data.id,
            res.data.isDone
          );
          setBoard(prevState);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRemoveTask = (task: Task) => {
    axios
      .delete(`http://localhost:4000/tasks/${task.id}`)
      .then((res: any) => {
        if (res.status === 200) {
          setBoard(board.filter((it) => it.id !== task.id));
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Desc
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="grid grid-cols-2 justify-items-stretch">
                    <div>Action</div>
                    <div
                      onClick={markAllDone}
                      className="cursor-pointer text-green-600"
                    >
                      Mark All as Done
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {board.map((it, key) => {
                return (
                  <TaskList
                    task={it}
                    remove={handleRemoveTask}
                    update={handleUpdateTask}
                    edit={handleEditTask}
                    id={key}
                    key={key}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <Form submit={handleAddTask} />
      </div>
    </div>
  );
};
