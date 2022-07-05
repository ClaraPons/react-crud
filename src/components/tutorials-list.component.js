import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service.js";
import { Link } from "react-router-dom";
import { confirmable } from 'react-confirm';

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.searchDescription = this.searchDescription.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);
    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      description: "",
      confirmAlert: true
    };
  }
  

  componentDidMount() {
    this.retrieveTutorials();
  }
   
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }
  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }
  // removeAllTutorials() {
  //   TutorialDataService.deleteAll()
  //     .then(response => {
  //       console.log(response.data);
  //       this.refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }


  alertBeforeRemoveAll() {
    if (window.confirm("Êtes-vous sûr de vouloir tout effacer ?")) {
      TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
       
      })
      .catch(e => {
        console.log(e);
      });
    }
    window.location.reload();
  }


  searchDescription(e) {
    TutorialDataService.findByDescription(this.state.description)
    const description = e.target.value;
    this.setState({
            description: description.toLowerCase()
        })
      }


  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {
    const { searchDescription, tutorials, currentTutorial, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by description"
              value={searchDescription}
              onChange={this.searchDescription}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByDescription}
              >
                Search
              </button>
              
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tutorials List</h4>
          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.alertBeforeRemoveAll}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}