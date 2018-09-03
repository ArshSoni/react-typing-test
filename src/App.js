import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Text from './Text';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini vero, inquam; Qua ex cognitione facilior facta est investigatio rerum occultissimarum.',
      displayText: '',
      words: [],
      value: '',
      activeWordIndex: 0,
      pastLastCharacter: false,
      activeLetterIndex: 0,
      spaceTriggered: false,
      backspaceTriggered: false
    }

    this.handleTyping = this.handleTyping.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }

  componentDidMount() {
    const { original, activeWordIndex } = this.state;
    let splitByWords = original.split(' ');

    let displayText = this.highlightWordAtIndex(activeWordIndex);

    this.setState({
      displayText,
      words: splitByWords
    })
  }

  highlightWordAtIndex(index = 0) {
    const { original } = this.state; 
    let splitWords = original.split(' ');

    splitWords[index] = `<span class="active-word">${splitWords[index]}</span>`;
    return splitWords.join(' ');
  }


  handleTyping(e) {
    let value = e.target.value;

    let { words, activeLetterIndex, activeWordIndex, displayText, spaceTriggered, pastLastCharacter } = this.state;
    let activeWord = words[activeWordIndex];

    let lastLetterOfActiveWord = activeWord.substr(activeWord.length - 1);
    let lastLetterOfValue = value.substr(value.length - 1);

    let isLastLetterOfWord = (value[activeLetterIndex] === activeWord[activeLetterIndex])
                              && (lastLetterOfActiveWord === lastLetterOfValue);

    if ( pastLastCharacter && spaceTriggered ) {
      activeLetterIndex = 0; 
      activeWordIndex++;
      spaceTriggered = false;
      value = '';
      displayText = this.highlightWordAtIndex(activeWordIndex);
    } else {
      if (value[activeLetterIndex] === activeWord[activeLetterIndex]) {
        pastLastCharacter = isLastLetterOfWord;
        activeLetterIndex++;
      }
    }

    this.setState({ 
      value,
      activeLetterIndex,
      activeWordIndex,
      displayText,
      spaceTriggered,
      pastLastCharacter
    });
  }
  
  handleBackspace(e) {
    const isBackspace = e.key === 'Backspace';
    const isSpace = e.key === ' ';

    if ( isBackspace ) {
      if ( !e.target.value.trim() ) e.preventDefault();
    } else if ( isSpace ) {
      if ( !e.target.value.trim() ) e.preventDefault();
      this.setState({ spaceTriggered: true })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Text text={this.state.displayText} />
        <textarea onKeyDown={this.handleBackspace} onChange={this.handleTyping} value={this.state.value} />
      </React.Fragment>
    )
  }
}

export default App;
