import React, { Component } from 'react'

class DisableBodyScroll extends Component {
  componentDidMount(): void {
    document.body.classList.add('overflow-y-hidden')
  }

  componentWillUnmount(): void {
    document.body.classList.remove('overflow-y-hidden')
  }

  render(): React.ReactNode {
    return null
  }
}

export default DisableBodyScroll
