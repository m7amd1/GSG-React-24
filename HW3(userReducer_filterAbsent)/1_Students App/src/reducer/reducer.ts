import { IStudent } from "../types";

type Action =
  | { type: "incrementAbsent"; id: string }
  | { type: "decrementAbsent"; id: string }
  | { type: "resetAbsent"; id: string }
  | { type: "setAbsents"; id: string; absents: number }
  | { type: "filterAbsent"; minAbsents: number };

const reducer = (state: IStudent[], action: Action): IStudent[] => {
  switch (action.type) {
    case "incrementAbsent":
      return state.map((student) =>
        student.id === action.id
          ? { ...student, absents: student.absents + 1 }
          : student
      );
    case "decrementAbsent":
      return state.map((student) =>
        student.id === action.id && student.absents > 0
          ? { ...student, absents: student.absents - 1 }
          : student
      );
    case "resetAbsent":
      return state.map((student) =>
        student.id === action.id ? { ...student, absents: 0 } : student
      );
    case "setAbsents":
      return state.map((student) =>
        student.id === action.id
          ? { ...student, absents: action.absents }
          : student
      );
    case "filterAbsent":
      return state.filter((student) => student.absents >= action.minAbsents);
    default:
      return state;
  }
};

export default reducer;
