const TaskList = ({ text, setText, results, unFocus }) => {
  return (
    <div
      className="position-absolute rounded-3 top-100 border shadow-sm col-12 col-md-8"
      style={{ zIndex: 5 }}
    >
      <ul className="list-group list-group-flush font-small">
        {!text && (
          <li
            className="list-group-item py-1 py-md-2 lh-1"
            style={{ backgroundColor: '#fafafa' }}
          >
            Servicios populares
          </li>
        )}

        {results.length > 0 ? (
          results.map((task) => (
            <li
              key={task.value}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                setText(task.value);
                unFocus();
              }}
              className="list-group-item list-group-item-action py-md-2 border-0 cursor-pointer lh-1"
            >
              {task.value}
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
