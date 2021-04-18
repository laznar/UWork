const TaskList = ({ text, setText, results, unFocus }) => {
  return (
    <div className="position-absolute rounded-3 top-100 border shadow-sm w-50">
      <ul className="list-group list-group-flush">
        {!text && (
          <li
            className="list-group-item"
            style={{ backgroundColor: '#fafafa' }}
          >
            Servicios populares
          </li>
        )}

        {results.length > 0 ? (
          results.map((task) => (
            <li
              key={task.name}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                setText(task.name);
                unFocus();
              }}
              className="list-group-item list-group-item-action border-0 cursor-pointer"
            >
              {task.name}
            </li>
          ))
        ) : (
          <li
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={() => {
              setText(text);
            }}
            className="list-group-item border-0 cursor-pointer"
          >
            No hay resultados
          </li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
