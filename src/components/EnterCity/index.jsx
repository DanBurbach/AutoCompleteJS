import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import '../../styles/EnterCity.css'

class EnterCity extends Component {
  static propTypes = {
    recommendations: PropTypes.instanceOf(Array)
  };
  static defaultProps = {
    recommendations: []
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      list: [],
      testList: []
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  async onChange(event) {
    // let userEntry = event.currentTarget.value;

    // await fetch(
    //   `https://coding-challenge.echoandapex.com/locations?q=${userEntry}`
    //   )
    //   .then(response => response.json())
    //   .then(response => {
    //       this.setState({
    //         testList: response.predictions.concat([response])
    //       })
    //   });

    // let array1 = [this.state.testList[0].name];
    // let array2 = [this.state.testList[1].name];
    // let array3 = [this.state.testList[2].name];
    // let array4 = [this.state.testList[3].name];
    // let array5 = [this.state.testList[4].name];

    // const combinedResults = [array1, array2, array3, array4, array5];
    // const flattenedResults = [].concat(...combinedResults);
    // this.setState({
    //     list: flattenedResults
    // });

    const { recommendations } = this.props;
    // const flatList = (this.state.list);
    // const recommendations = flatList.toString();
    // const userInput = this.state.list.toString();
    const userInput = event.currentTarget.value;    
    const filteredSuggestions = recommendations.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    console.log(recommendations);
    console.log(this.state.list);

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: event.currentTarget.value
    });
  };

  onClick = event => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: event.currentTarget.innerText
    });
  };

  onKeyDown = event => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (event.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      
    } else if (event.keyCode === 38) {
        if (activeSuggestion === 0) {
          return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });

    } else if (event.keyCode === 40) {
        if (activeSuggestion - 1 === filteredSuggestions.length) {
          return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    let suggestionList;
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionList = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li 
                  className={className} 
                  key={suggestion} 
                  onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionList = (
          <div className="no-suggestions">
            <em>We don't have any suggestions, give it another try!</em>
          </div>
        );
      }
    }

    return (
        <Fragment>
          <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            placeholder="Enter A Location"
          />
          {suggestionList}
        </Fragment>
    );
  }
}

export default EnterCity;