import React from "react"

class ProfileClass extends React.Component{
  constructor (props) {
    super(props);
    console.log("constructor");

    this.state = {
      count: 0,
      count2: 0,
    }
  }

  componentDidMount() {
    console.log("component Did Mount")
  }


  render(){
    console.log("render")
    const {count} = this.state;
    return (
    <div>
      <h2>This is a class based Profile Component</h2>
      <h3>Name: {this.props.name}</h3>
      <h3>Count: {count}</h3>
      <button onClick={()=>{
        this.setState({
          count: 1,
        });
      }}>Click here</button>
    </div>
    )
  }
}

export default ProfileClass