import { useReducer, useEffect, useRef } from "react";
import { IStudent } from "../../types";
import CoursesList from "../courses-list/courses-list.component";
import "./student.css";
import reducer from "../../reducer/reducer";

interface IProps extends IStudent {
  onAbsentChange: (id: string, change: number) => void;
}

const Student = (props: IProps) => {
  const prevAbsents = useRef<number>(props.absents); // useRef(initialValue)

  const [students, dispatch] = useReducer(reducer, [{ ...props }]);

  const student = students[0];

  const updateAbsentColor = (absents: number) => {
    if (absents >= 10) return "#ff0000";
    if (absents >= 7) return "#fd9c0e";
    if (absents >= 5) return "#d6c728";
    return "#213547";
  };

  const absentColor = updateAbsentColor(student.absents);

  useEffect(() => {
    console.log("Hello from Student component!");

    return () => {
      console.log(`Student ${props.name}, has been deleted!`);
    };
  }, []);

  const addAbsent = () => {
    prevAbsents.current = student.absents;
    dispatch({ type: "incrementAbsent", id: props.id });
    props.onAbsentChange(props.id, +1);
  };

  const removeAbsent = () => {
    if (student.absents - 1 >= 0) {
      prevAbsents.current = student.absents;
      dispatch({ type: "decrementAbsent", id: props.id });
      props.onAbsentChange(props.id, -1);
    }
  };

  const resetAbsent = () => {
    prevAbsents.current = student.absents;
    dispatch({ type: "resetAbsent", id: props.id });
    props.onAbsentChange(props.id, -student.absents);
  };

  return (
    <div className="std-wrapper">
      <div className="data-field">
        <b>Student:</b> {props.name.toUpperCase() + "!"}
      </div>
      <div className="data-field">
        <b>Age:</b> {props.age}
      </div>
      <div
        className="data-field"
        style={{ color: props.isGraduated ? "green" : "orange" }}
      >
        <b>Is Graduated:</b> {props.isGraduated ? "Yes" : "No"}
      </div>
      <div className="data-field">
        <b>Courses List:</b>
        <CoursesList list={props.coursesList} />
      </div>
      <div className="absents">
        <b style={{ color: absentColor }}>Prev Absents:</b>{" "}
        {prevAbsents.current}
        <b style={{ color: absentColor }}>Absents:</b> {student.absents}
        <button onClick={addAbsent}>+</button>
        <button onClick={removeAbsent}>-</button>
        <button onClick={resetAbsent}>Reset</button>
      </div>
    </div>
  );
};

export default Student;
