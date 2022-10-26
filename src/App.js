import { Component } from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';

class App extends Component {
  render() {
    return (
    <div className="App">
      <SortingVisualizer></SortingVisualizer>
    </div>
    );
  }
}

export default App;