import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini vero, inquam; Qua ex cognitione facilior facta est investigatio rerum occultissimarum.',
      characters: [],
      text: '',
      value: '',
      correct: [],
      incorrect: [],
      index: 0,
      valueIndex: 0,
      backspaceTriggered: false,
      debug: {
        next: ''
      }
    }

    this.handleTyping = this.handleTyping.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    let { original, characters, debug, index } = this.state;
    characters = original.split('');

    this.setState({
      characters,
      text: original,
      debug: {...debug, next: characters[index] }
    })
  }

  handleTyping(e) {
    const value = e.target.value;
    const { characters, index, backspaceTriggered, text, debug, correct, incorrect } = this.state;

    this.setState({
      value,
      index: index + 1,
      debug: { ...debug, next: characters[index + 1] }
    });

  }

  handleKeyPress(e) {
    const { index, backspaceTriggered, characters, debug, text, value } = this.state;
    const isBackspace = (e.key === 'Backspace');

    let newIndex = isBackspace ? ((index - 1) <= 0 ? 0 : index - 2) : index;
    
    if ( value.trim().length === 0 ) {
      newIndex = 0;
    }

    let correct = [];

    if ( text[index] === value[index] ) {
      correct.push(value[index]);
    }

    this.setState({ 
      backspaceTriggered: isBackspace,
      index: newIndex,
      debug: { ...debug, next: characters[newIndex] },
      correct: [...this.state.correct, ...correct]
    });
  }

  render() {
    return (
      <React.Fragment>
        <div style={{width: 250}}>{this.state.text}</div>
        <textarea onKeyUp={this.handleKeyPress} onChange={this.handleTyping} value={this.state.value} />
        <div>
          <h3>debug:</h3>
          <p>Next: {this.state.debug.next}</p>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
