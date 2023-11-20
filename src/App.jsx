
import './App.css';
import ChatWidget from './components/ChatWidget';
import ZSBWidget from './components/ZSBWidget';
import Store from './store/store.jsx';

function App(props) {
  return <Store>
    <ZSBWidget {...props} />
  </Store>;
}

export default App;
