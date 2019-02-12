import React from "react";
import { navigateTo } from "gatsby-link";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    console.log("HANDLESUBMIT", this.state)
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        "selectedOption": this.state.selectedOption
        "name": this.state.name,
        "email": this.state.email,
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  handleOptionChange = e => {
    this.setState({ selectedOption: e.target.value });
  }

  render() {
    return (
      <div>

        <label className="left">
          <p>Can we expect you on August 24, 2019?</p>
        </label>

        <label className="right">
          <input type="radio"
                  name="selectedOption"
                  value="1"
                  checked={this.state.selectedOption === "1"}
                  onChange={this.handleOptionChange}
          />
          Yes! Count me in!
        </label>

        <label className="right">
          <input type="radio"
                  name ="selectedOption"
                  value="0"
                  checked={this.state.selectedOption === "0"}
                  onChange={this.handleOptionChange}
          />
          Sorry, can't make it
        </label>

        {this.state.selectedOption === "1" ? (

        <form
          name="contact"
          className="rsvpForm"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </p>

            <label className="rsvpColumn">
              First & Last Name:
            </label>
            <input className="rsvpColumn input"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    required ></input><br/><br/>

            <label className="rsvpColumn">
              Your Email:
            </label>
            <input className="rsvpColumn input"
                    type="text"
                    name="email"
                    onChange={this.handleChange}
                    required ></input><br/><br/>

            <label className="rsvpColumn">
              # of Seats to Reserve:
            </label>
            <input className="rsvpColumn input"
                    type="text"
                    name="seats"
                    onChange={this.handleChange}></input><br/><br/>

            <label className="rsvpColumn">
              Full Name of Guests:
            </label>
            <input className="rsvpColumn input"
                    type="text"
                    name="guestNames"
                    onChange={this.handleChange}></input><br/><br/>

            <label className="rsvpColumn">
              Mailing Address:
            </label>
            <textarea className="rsvpColumn comment"
                      type="text"
                      name="address"
                      onChange={this.handleChange}></textarea><br/><br/><br/><br/>

            <button className="rsvpButtton" type="submit">Submit Your RSVP</button>

            </form>
            ) : (
            <div>

              <form
                name="contact"
                className="rsvpForm"
                method="post"
                action="/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
                >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Don’t fill this out:{" "}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </p>

                <p>Sorry to hear that you can't make it to our special day!</p>

              <label className="rsvpColumn">
               First & Last Name:
              </label>
              <input className="rsvpColumn input"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    required ></input><br/><br/>

              <label className="rsvpColumn">
                Your Email:
              </label>
              <input className="rsvpColumn input"
                    type="text"
                    name="email"
                    onChange={this.handleChange}
                    required ></input><br/><br/>

              <button className="rsvpButtton" type="submit">Submit Your RSVP</button>
              </form>
            </div>)}
          </div>
    );
  }
}
