import React, { Component } from "react"

class DisableBodyScroll extends Component {
  componentDidMount() {
    document.documentElement.style.overflow = "hidden" // Apply to the html element
  }

  componentWillUnmount() {
    document.documentElement.style.overflow = "" // Reset to default
  }

  render() {
    return null
  }
}

export default DisableBodyScroll
