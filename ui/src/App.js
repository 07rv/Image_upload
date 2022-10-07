import './App.css';
import axois from 'axios';
import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.base64String = ''
  }

  componentWillMount() {
    axois.get('http://localhost:8080')
      .then((res) => {
        console.log(res.data)
        this.setState({ data: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Image uploading react</h1>
        {
          this.state.data.map((res) => (
            this.base64String = btoa(String.fromCharCode(...new Uint8Array(res.img.data))),
            console.log('rv', this.base64String[0]),
            <div>{res.name}</div>
          ))
        }
      </div>
    );
  }
};

export default App;

