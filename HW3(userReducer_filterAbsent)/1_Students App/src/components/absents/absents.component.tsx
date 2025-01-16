import { useContext, useEffect, useRef, useReducer, useState } from 'react'
import { IStudent } from '../../types';
import { AuthContext } from '../../providers/authProvider';
import reducer from '../../reducer/reducer';

interface IProps extends IStudent {
  onAbsentChange?: (id: string, change: number) => void;
}

const Absents = (props: IProps) => {
  const [absentColor, setAbsentColor] = useState('#213547');
  const prevAbsents = useRef<number>(props.absents);
  const { user } = useContext(AuthContext);
  const [students, dispatch] = useReducer(reducer, [{ ...props }]);
  const student = students.find(student => student.id === props.id);

  useEffect(() => {
    if (student && student.absents >= 10) {
      setAbsentColor('#ff0000');
    } else if (student && student.absents >= 7) {
      setAbsentColor('#fd9c0e');
    } else if (student && student.absents >= 5) {
      setAbsentColor('#d6c728');
    } else {
      setAbsentColor('#213547');
    }
  }, [student]);

  const addAbsent = () => {
    prevAbsents.current = student ? student.absents : 0;
    dispatch({ type: 'incrementAbsent', id: props.id });
  }

  const removeAbsent = () => {
    if (student && student.absents - 1 >= 0) {
      prevAbsents.current = student.absents;
      dispatch({ type: 'decrementAbsent', id: props.id });
    }
  }

  const resetAbsent = () => {
    prevAbsents.current = student ? student.absents : 0;
    dispatch({ type: 'resetAbsent', id: props.id });
  }

  return (
    <div className="absents">
      <b style={{ color: absentColor }}>Prev Absents:</b> {prevAbsents.current}
      <b style={{ color: absentColor }}>Absents:</b> {student ? student.absents : 0}
      <button disabled={!user} onClick={addAbsent}>+</button>
      <button disabled={!user} onClick={removeAbsent}>-</button>
      <button disabled={!user} onClick={resetAbsent}>Reset</button>
    </div>
  )
}

export default Absents;