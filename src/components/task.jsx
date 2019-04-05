import React, { Component } from "react";
class Task extends Component {
  //   onDone = () => {
  //     this.setState({ active: !this.state.active });
  //   };
  toggleClass = () => {
    let classes = "d-flex align-items-start item_container";
    // console.log(this.props);
    return this.props.item.done ? classes + " done" : classes;
  };
  render() {
    const { id, text } = this.props.item;
    return (
      <div className={this.toggleClass()}>
        <p
          key={id}
          className="list-group-item d-flex"
          onClick={() => this.props.onDone(id)}
        >
          {text}
        </p>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => this.props.onDelete(id)}
        >
          &times;
        </button>
      </div>
    );
  }
}

export default Task;
