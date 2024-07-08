import React from 'react'
// import React,{useContext, useEffect} from 'react'
// import noteContext from '../context/Notes/noteContext'

const About = () => {
  //the below was written just to show the use of context api
  // const a=useContext(noteContext);
  // //useEffect uses the function that will change the name and class after 1sec
  // //so we can use both objects and functions through context api
  // useEffect(()=>{
  //   a.update();
  // })
  return (
    <div>
      {/* This is about {a.state.name} and she is in class {a.state.class} */}
      {/* a.state.name done instead of a.name because it was put under state(so value is inside state thats why) */}
      this is about page
    </div>
  )
}

export default About
