import './App.css';
import ZSBWidget from './components/ZSBWidget';
import Store from './store/store.jsx';

function App(props) {
  return (
    <Store>
      <ZSBWidget {...props} />
    </Store>
  );
}

export default App;
