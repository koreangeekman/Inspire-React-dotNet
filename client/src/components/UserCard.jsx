import React from "react";
import "../assets/scss/components/UserCard.scss"

export default function UserCard(props) {
  return (
  <div className="bgColor rounded p-3">
    <h1>{ props.profile.name }</h1>
    <img className="rounded-circle mt-2 mb-3" src="props.profile.picture" alt="" />
    <p>{ props.profile.email }</p>
    <div className="d-flex justify-content-center">
      <div className="timestamps">
        <span className="d-flex justify-content-between">
          <p className="mb-0 courier"> Created: </p>
          <p className="mb-0 courier">
            { props.profile.createdAt.toLocaleDateString() + ' @ ' + props.profile.createdAt.toLocaleTimeString() }</p>
        </span>
        <span className="d-flex justify-content-between">
          <p className="mb-0 courier">Updated: </p>
          <p className="mb-0 courier">
            { props.profile.updatedAt.toLocaleDateString() + ' @ ' + props.profile.updatedAt.toLocaleTimeString() } </p>
        </span>
      </div>
    </div>
    <p className="pt-3">{ props.profile.bio }</p>
    <div className="fs-1 socials d-flex justify-content-center p-3">
      <a href="props.profile.github" target="_blank"><i className="p-3 mdi mdi-github" title="icon for github"></i></a>
      <a href="props.profile.linkedin" target="_blank"><i className="p-3 mdi mdi-linkedin" title="icon for linked"></i></a>
      <a href="props.profile.resume" target="_blank"><i className="p-3 mdi mdi-file-account"
          title="icon for the user's resume"></i></a>
      <a href="props.profile.website" target="_blank"><i className="p-3 mdi mdi-web" title="icon for the user's website"></i></a>
    </div>
  </div>
  )
}