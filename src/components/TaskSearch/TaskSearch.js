import { useState, useEffect, useRef } from 'react';
import TaskList from './TaskList';
import tasks, { normalizeString } from '../../utils/tasksUtils';

const TaskSearch = () => {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (!text) {
      setResults(tasks.filter((task) => task.popular));
    } else {
      setResults(
        tasks.filter((task) =>
          normalizeString(task.name).includes(normalizeString(text))
        )
      );
    }
  }, [text]);

  const unFocus = () => {
    if (ref.current) {
      ref.current.blur();
    }
  };

  return (
    <div className="d-flex position-relative">
      <input
        ref={ref}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        type="text"
        className="form-control form-control-lg fs-6 home-input border me-2 flex-grow-1"
        placeholder={!text ? 'Necesito ayuda con ...' : ''}
      />

      <button className="btn btn-primary text-white btn-lg">Buscar</button>
      {focused && (
        <TaskList
          text={text}
          setText={setText}
          results={results}
          unFocus={unFocus}
        ></TaskList>
      )}
    </div>
  );
};

export default TaskSearch;
