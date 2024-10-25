import React from 'react'
import Hero from '../components/Hero'
import t1 from "../assets/1.jpeg"
function Home() {
  return (
    <Hero
    cname="hero"
    heroimg={t1}
    title="Rule Engine"
    btntext="enter details"
    url="/datarule"
    btnclass="show"/>
  )
}

export default Home