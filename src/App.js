import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Text from './Text';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original: 'olor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini vero, inquam; Qua ex cognitione facilior facta est investigatio rerum occultissimarum.',
      displayText: '',
      words: [],
      value: '',
      activeWordIndex: 0,
      wordCounter: 0,
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
    let lastWord = splitByWords[splitByWords.length - 1];
    let displayText = this.highlightWordAtIndex(activeWordIndex);

    this.setState({
      displayText,
      lastWord,
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

    let { words, activeLetterIndex, activeWordIndex, displayText, spaceTriggered, pastLastCharacter, wordCounter } = this.state;
    let activeWord = words[activeWordIndex];


    let lastLetterOfActiveWord = activeWord.substr(activeWord.length - 1);
    let lastLetterOfValue = value.substr(value.length - 1);

    let isLastLetterOfWord = (value[activeLetterIndex] === activeWord[activeLetterIndex])
    && (lastLetterOfActiveWord === lastLetterOfValue);

    if ( pastLastCharacter && spaceTriggered ) {
      value = '';

      if ( wordCounter === activeWordIndex && value.trim() === words[words.length - 1]) {
        console.log('completed');
        return false;
      }

      activeLetterIndex = 0;
      activeWordIndex++;
      spaceTriggered = false;
      displayText = this.highlightWordAtIndex(activeWordIndex);
      wordCounter++;
    } else {
      if (value[activeLetterIndex] === activeWord[activeLetterIndex]) {
        console.log('right letter')
        // debugger;
        displayText = this.highlightCharacter(displayText, activeLetterIndex, true);
        pastLastCharacter = isLastLetterOfWord;
        activeLetterIndex++;
      } else {
        console.log('wrong letter');
        displayText = this.highlightCharacter(displayText, activeLetterIndex, false)
      }
    }


    this.setState({
      value,
      activeLetterIndex,
      activeWordIndex,
      displayText,
      spaceTriggered,
      pastLastCharacter,
      words: this.state.original.split(' '),
      wordCounter
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

  setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
  }

  highlightCharacter(text = this.state.original, letterIndex, correct = false) {
    let { words, activeWordIndex } = this.state; 
    let activeWord = words[activeWordIndex];

    activeWord = this.setCharAt(activeWord, letterIndex, `<span class="is-${!correct ? 'in' : ''}correct">${activeWord[letterIndex]}</span>`)
    words[activeWordIndex] = `<span class="active-word">${activeWord}</span>`;
    return words.join(' ');
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
