import React from "react";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import "../assets/scss/pages/AboutPage.scss"
import UserCard from "../components/UserCard";
import { accountService } from "../services/AccountService";

export default function AboutPage() {

  const authors = AppState.appAuthors;
  async function _getAppAuthors() {
    try {
      await accountService.getAppAuthors();
    } catch (error) { Pop.error(error); }
  }

  if (!authors) {
    _getAppAuthors();
  }

  return (
  // <div className="about-page" style={{ display: 'grid', height: '80vh', placeContent: 'center' }}>
      <div className="container-fluid">
        <section className="row justify-content-center p-4 pt-5">
          <div className="col-auto d-flex flex-column justify-content-center align-items-center rounded bgBlur py-2 px-3">
            <p className="fs-1 p-2 rounded mb-1 fw-bold">TOpomoDOro</p>
            <p className="fs-4 p-2 rounded">[ TO-DO + pomodoro ]</p>
            <p className="fs-5 p-2 rounded text-center">
              Personal project to create a ToDo & Pomodoro blended <br />
              application with additional custom functionality
            </p>
            <p className="fs-5 p-2 m-2 rounded text-center">
              Full Stack Application <br />
            </p>
            <p className="fs-5 p-2 m-2 rounded text-center">
              MongoDB, Mongoose, Node.js & Express<br />
              HTML, CSS, JavaScript, Vue
            </p>
            <p className="p-2 m-2 rounded text-center">
              - Weather info pulled from the <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">OpenWeather</a> API - <br />
              - Background Image & Quote pulled from <a href="https://boisecodeworks.com/" target="_blank" rel="noreferrer">Boise Codework&apos;s</a> Sandbox -
            </p>
          </div>
        </section>
      {authors.length > 0 ?
        (
        <section className="row justify-content-evenly align-items-center">
          <div className="col-12 d-flex justify-content-center">
            <p className="fs-3 py-2 px-3 mt-3 mb-5 bgBlur rounded text-center">
              Like the app? <br />
              Find out more about the creator below!
            </p>
          </div>
        
          {authors.map(author =>{
            return (
              <div key={author.email} className="col-12 col-md-6 mb-5 px-4 text-center text-light">
                <UserCard profile={author} />
              </div>
            )
          })}
      </section>
        ) : null}
      </div>
  // </div>
  )
}
