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
    this.state = {
      rsvpComing: true
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  handleRsvp = e => {
    this.setState({ rsvpComing: !this.state.rsvpComing });
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    console.log("THIS STATE", this.state)
    return (
      <div>
        <h1>RSVP</h1>
        <form
          name="test"
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

          <p>
            <label>
              First and Last Name:<br />
              <input type="text" name="guest_name" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your email:<br />
              <input type="email" placeholder="email@email.com" name="email" onChange={this.handleChange} />
            </label>
          </p>
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
          {this.state.rsvpComing ? (
          <div>
          <p>
            <label>
              Number of Seats to Reserve<br />
              <input name="seat_count" placeholder="#" onChange={this.handleChange} required/>
            </label>
          </p>

          <p>
            <label>
              Guests Full Name<br />
              <input name="plus_ones" onChange={this.handleChange} />
            </label>
          </p>

          <p>
            <label>
              Mailing Address:<br />
              <textarea name="address" placeholder="111 Abc Street, City, X1X 1X1" onChange={this.handleChange} />
            </label>
          </p>
          </div>) : (<p>Sorry to hear you won't be attending :( </p>)}
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </div>
    );
  }
}
