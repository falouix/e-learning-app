import React, { Component } from 'react';
import { render } from 'react-dom';     
import Message from './Message'
import $ from "jquery"
class Checkbox extends Component {
  constructor() {
    super();
    this.state = {
      i_agree: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
     
  handleChange(event) {
    this.setState({i_agree: !this.state.i_agree});
    
    fetch("https://uism-tn.com/api/DeleteMessage.php?id="+(this.props.id))
    .then(res => res.json())
    .then(
      (result) => {
      },
    )
  }
  
  
  render() {
    if(JSON.parse(sessionStorage.session).type == 'user'){
        return (
            <div>
                <div className="div_checkbox" id={this.props.id}> 
                <input
                 id="trigger" 
                 type="checkbox"
                 defaultChecked={this.state.i_agree}
                 onChange={this.handleChange}
                 className="inpt_checkbox"
                 /> 
                  <label  className="checker"></label>
                </div>
            </div>
          );  
    }else{
        return (
            <div>
            </div>
          );
    }
    
    
  }
}
export default Checkbox