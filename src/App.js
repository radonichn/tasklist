import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import TodoList from "./components/todolist.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: "",
      allTicked: false,
      placeholder: "Add a task"
    };
  }
  componentDidMount() {
    const items = JSON.parse(window.localStorage.getItem("items"));
    if (items) this.setState({ items });
  }
  handleChange = e => {
    this.setState({ text: e.target.value });
  };
  handleClick = () => {
    if (!this.state.text.length) return;
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      done: false
    };
    const items = [...this.state.items];
    items.push(newItem);
    this.setState({ items, text: "" });
  };
  enterKey = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.handleClick();
    }
  };
  handleDelete = itemId => {
    const items = this.state.items.filter(c => c.id !== itemId);
    this.setState({ items });
  };
  handleClean = () => {
    if (this.state.items.length) {
      const items = [];
      this.setState({ items });
    }
  };
  handleDone = doneId => {
    const items = [...this.state.items];
    const index = items.findIndex(c => c.id === doneId);
    items[index].done = !items[index].done;
    this.setState({ items });
  };
  handleTickAll = () => {
    const ticked = this.state.allTicked;
    const items = [...this.state.items];
    items.forEach(function(e) {
      e.done = !ticked;
    });
    this.setState({ items, allTicked: !ticked });
  };
  componentDidUpdate() {
    const state = this.state.items;
    window.localStorage.setItem("items", JSON.stringify(state));
  }
  render() {
    return (
      <div className="App container">
        <div className="d-flex justify-content-center flex-column align-items-center todo_container">
          <div className="d-flex flex-column align-items-end form">
            <input
              type="text"
              className="form-control"
              placeholder={this.state.placeholder}
              onChange={this.handleChange}
              onKeyPress={this.enterKey}
              value={this.state.text}
            />
            <div className="d-flex flex-wrap btn_container">
              <button
                className="btn btn-md btn-primary mr-2"
                type="button"
                onClick={this.handleClick}
              >
                Add task
              </button>
              <button
                className="btn btn-md btn-warning mr-2"
                type="button"
                onClick={this.handleClean}
                disabled={this.state.items.length === 0 ? "disabled" : null}
              >
                Clean tasks
              </button>
              <button
                className="btn btn-md btn-success"
                type="button"
                onClick={this.handleTickAll}
                disabled={this.state.items.length === 0 ? "disabled" : null}
              >
                Tick all
              </button>
            </div>
          </div>
          <TodoList
            items={this.state.items}
            onDelete={this.handleDelete}
            onDone={this.handleDone}
          />
        </div>
      </div>
    );
  }
}

export default App;
