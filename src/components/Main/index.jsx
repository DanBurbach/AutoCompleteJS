import React, { Component } from 'react';

import '../../styles/Main.css';
import EnterCity from '../EnterCity';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // async componentDidMount() {
  //     const res = await fetch(
  //       "https://coding-challenge.echoandapex.com/locations?q={event.target.value}"
  //     );
  //     const json = await res.json();
  //     const predictionsList = new DocumentFragment();
  //     json.predictions.forEach(prediction => {
  //       const item = document.createElement("p");
  //       item.innerHTML = prediction.name;
  //       predictionsList.appendChild(item);
  //     });
  //     document.body.appendChild(predictionsList);
  //   };

  handleChange(event) {
    this.setState({location: event.target.value});
    console.log(this.state.location);
  };


  render() {
    return (
      <div className="MainWrapper">
        <h3>Type a city</h3>
        <div className="FormMain">
          <form autoComplete="off">
            <div className="autocomplete">
              <EnterCity
                recommendations={[
                  // current recommendations that need to be replaced with the users chosen item based off list choice
                  "Alligator",
                  "Bask",
                  "Crocodilian",
                  "Death Roll",
                  "Eggs",
                  "Jaws",
                  "Reptile",
                  "Solitary",
                  "Tail",
                  "Wetlands"
                ]}
              />
              {/* <input
                id="myInput"
                type="text"
                name="myCity"
                placeholder="City"
                required="required"
              /> */}
            </div>
            <input type="submit"/>
          </form>
        </div>
        <br/>
        Your location: {this.state.location}
      </div>
    );
  }
}
export default Main;