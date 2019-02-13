import React from "react";
// import Link from "gatsby-link";
// import Helmet from "react-helmet";
import Yes from "../components/rsvpYes.js"
import No from "../components/rsvpNo.js"

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rsvpComing: true
    };
  }

  handleRsvp = e => {
    this.setState({ rsvpComing: !this.state.rsvpComing });
  }


  render() {
    return (
      <div>
       <h1>RSVP</h1>
        <p>
          <label>
            Can we expect you on September 2, 2019?
            <input
            type="radio"
            name="rsvp"
            onChange={this.handleRsvp}
            checked={this.state.rsvpComing}
             />{" "}
            Yes{" "}
          </label>
          <label>
            <input
              type="radio"
              name="rsvp"
              onChange={this.handleRsvp}
              checked={!this.state.rsvpComing}
            />{" "}
            No{" "}
          </label>
          </p>
        {this.state.rsvpComing ? (<Test />) : <No /> }
      </div>
    );
  }
}
