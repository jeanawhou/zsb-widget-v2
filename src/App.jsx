
import './App.css';
import ChatWidget from './components/ChatWidget';
import Store from './store/store.jsx';

function App(props) {
  return <Store>
    <ChatWidget {...props} />
  </Store>;
}

export default App;
