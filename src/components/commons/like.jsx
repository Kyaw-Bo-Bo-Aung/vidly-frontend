import React, { Component } from "react";

class Like extends Component {
  render() {
    let likeClass = "fa fa-heart";
    likeClass += !this.props.isLiked ? "-o" : "";

    return <i class={likeClass} onClick={this.props.onClick}></i>;
  }
}

export default Like;
