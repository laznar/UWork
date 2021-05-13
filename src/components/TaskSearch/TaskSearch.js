import { useState, useEffect, useRef } from 'react';
import TaskList from './TaskList';
import tasks from '../../utils/tasksUtils';
import { normalizeString } from '../../utils/misc';
import { useHistory } from 'react-router-dom';

const TaskSearch = () => {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const ref = useRef(null);
  const history = useHistory();
  const handleSearch = () => {
    history.push('/resultados');
  };

  useEffect(() => {
    if (!text) {
      setResults(tasks.filter((task) => task.popular));
    } else {
      setResults(
        tasks
          .filter((task) =>
            normalizeString(task.value).includes(normalizeString(text))
          )
          .slice(0, 5)
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
        className="form-control form-control-lg fs-6 home-input border flex-grow-1 rounded-0 rounded-start"
        placeholder={!text ? 'Necesito ayuda con ...' : ''}
      />
      <button
        className="btn btn-primary text-white rounded-0 rounded-end"
        onClick={handleSearch}
      >
        Buscar
      </button>
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
