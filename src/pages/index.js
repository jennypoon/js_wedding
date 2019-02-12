import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import RSVP from "../components/rsvp.js"

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Hi people</h1>
        <p>
          This is an example site integrating Netlify’s form handling with Gatsby
        </p>
        <RSVP />
      </div>
    );
  }
}
