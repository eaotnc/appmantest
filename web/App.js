import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import axios from 'axios'
import logo from "./logo.svg";

class App extends Component {   

    constructor(props) {
        super(props);
        this.state = {          
          email: '',
          password:'',   
          status:'',
          spinlogo:'false',
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChangeEmail(event) {
        this.setState({email: event.target.value});
        console.log("email:",this.state.email);
      }

      handleChangePassword(event) {
        this.setState({password: event.target.value});
        console.log("password:",this.state.password);
      }
     
      handleSubmit(event) {       
        event.preventDefault();      
        this.setState({status: '',spinlogo:'ture'});
          axios.post(`http://localhost:3000/api/login`, 
            { email: this.state.email, password: this.state.password }
            )
            .then(res => {
              console.log("res:",res.status);
              console.log("res.data:",res.data.msg);
              this.setState({status: res.status,spinlogo:'false'});
              if(this.state.status === 200){
                alert('login Success');
              }
            })
            .catch( error => {
                console.log("error",error);
                this.setState({status: 'fail',spinlogo:'false'});
                console.log("status:",this.state.status);
              });
        
        }

      renderfail(){
        if (this.state.status === "fail"){
            return <div className="redtext">E-mail or password is incorrect</div>
        }
        return <div> </div>
      }

      RenderLogo(){
          if (this.state.spinlogo === 'ture'){
            return <img  className="logo-spin logo" src={logo}/>   
          }
          return <img  src={logo} className="logo" alt="fireSpot"/>      
      }
    render() {     
        return (
        <div className="outner" >   
            <div className="large-box" >    
                {this.RenderLogo()}
                <form onSubmit={this.handleSubmit}>
                    Email Address                                     
                    <input 
                        className="Input-Text"                         
                        type="email"
                        placeholder="example@hotmail.com"
                        value={this.state.email} 
                        onChange={this.handleChangeEmail}
                     /> 
                    Password                      
                    <input
                        value={this.state.password} 
                        className="Input-Text" 
                        type="password" 
                        placeholder="your password"
                        onChange={this.handleChangePassword}
                    />  
                    {this.renderfail() } 
                    <input 
                        className="buttonblue"   
                        type="submit" 
                        value="Submit"
                    />                     
                </form> 
                <br/>
              
                
                    
                
                <br/>
                <br/>
                <span className="bluetext">  
                    forget password ?
                </span>
                <span className="bluetext right">  
                    Creat a new account
                </span>
            </div>
        </div> );
    }
}

export default App;
