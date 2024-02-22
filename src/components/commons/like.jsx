import React, { Component } from "react";

const Like = ({isLiked, onClick}) => {
  let likeClass = "fa fa-heart";
    likeClass += !isLiked ? "-o" : "";

  return <i style={{cursor:"pointer"}} className={likeClass} onClick={onClick}></i>;
}
 
export default Like;