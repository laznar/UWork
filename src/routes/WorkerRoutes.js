import { Switch, Route, Redirect } from 'react-router-dom';
import WorkerInitial from '../views/worker/WorkerInitial';
import ToBeWorker from '../views/worker/ToBeWorker';

const WorkerRoutes = () => {
  return (
    <div>
      <div
        className="container"
        style={{ paddingTop: 100, paddingBottom: 100 }}
      >
        <Switch>
          <Route exact path="/worker" component={WorkerInitial} />
          <Route exact path="/worker/to-be-worker" component={ToBeWorker} />
          <Redirect to="/worker" />
        </Switch>
      </div>
    </div>
  );
};

export default WorkerRoutes;
