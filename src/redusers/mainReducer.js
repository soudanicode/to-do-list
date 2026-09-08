import { v4 as uuidv4 } from "uuid";

export default function mainReducer(state, action) {
  const { type, payload } = action;
  const newList = [...state.globalList];
  let counter = 0;
  let currentIndex = 0;
  switch (type) {
    case "SET_NAME":
      return { ...state, formOutputs: { ...state.formOutputs, name: payload } };
    case "SET_DATE":
      return { ...state, formOutputs: { ...state.formOutputs, date: payload } };
    case "SET_PRIORITY":
      return {
        ...state,
        formOutputs: { ...state.formOutputs, priority: payload },
      };

    // »»»»»»
    case "ADD_TASK":
      const newTask = { ...state.formOutputs, id: uuidv4() };

      return {
        ...state,
        globalList: [newTask, ...state.globalList],
        formOutputs: {
          name: "",
          date: new Date().toISOString().split("T")[0],
          priority: "m",
        },
      };
    // »»»»»»
    case "CHECKING_TASK":
      const currentList = Array.isArray(state.checkedList)
        ? state.checkedList
        : [];
      const getIndex = currentList.indexOf(payload.id); //return index or -1
      const newCheckedList1 = [...state.checkedList];
      if (getIndex === -1) {
        newCheckedList1.unshift(payload.id);
      } else {
        newCheckedList1.splice(getIndex, 1);
      }
      return { ...state, checkedList: newCheckedList1 };
    // »»»»»»
    case "DELETED_TASK":
      const newCheckedList2 = [...state.checkedList];
      // delet task in storage
      let i = 0;
      let index = 0;
      for (let task of [...state.checkedList]) {
        if (task === payload.id) {
          index = i;
        }
        i++;
      }

      newCheckedList2.splice(index, 1);
      // deleted task
      for (let task of newList) {
        if (task.id === payload.id) {
          currentIndex = counter;
          counter = 0;
          break;
        }
        counter++;
      }

      newList.splice(currentIndex, 1);

      return { ...state, globalList: newList, checkedList: newCheckedList2 };
    // »»»»»»
    case "EDIT_TASK":
      return {
        ...state,
        formOutputs: {
          ...state.formOutputs,
          name: payload.task.name,
          date: payload.task.date,
          id: payload.task.id,
          priority: payload.task.priority,
        },
      };
    // »»»»»»

    case "SUBMIT_EDIT":
      for (let task of [...state.globalList]) {
        if (task.id === payload.params.title) {
          currentIndex = counter;
          break;
        }
        counter++;
      }
      // console.log(counter);

      const editTask = {
        ...state.formOutputs,
      };
      newList[currentIndex] = editTask;

      return {
        ...state,
        globalList: newList,
        formOutputs: {
          name: "",
          date: new Date().toISOString().split("T")[0],
          priority: "m",
        },
      };

    case "CANCEL_ACTION":
      return {
        ...state,
        formOutputs: {
          ...state.formOutputs,
          name: "",
          date: new Date().toISOString().split("T")[0],
          priority: "m",
        },
      };

    //   END SWITCH
    default:
      return { ...state };
  }
}
