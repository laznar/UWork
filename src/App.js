import AppRouter from './routes/AppRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
