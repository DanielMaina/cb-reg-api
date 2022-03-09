import ReactDOM from 'react-dom';
// import './styles/index.css';
import './assets/styles/style.scss';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store'


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);