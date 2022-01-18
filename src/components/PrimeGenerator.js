import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const PrimeGenerator = () => {
    const [Low, setLow] = useState(0);
    const [High, setHigh] = useState(0);
    const [Choice, setChoice] = useState("Intermediate");
    const handleLow = (e) => {
        setLow(e.target.value);
    }
    const handleHigh = (e) => {
        setHigh(e.target.value);
    }
    const handleChoice = (e) => {
        setChoice(e.target.value);
    }
    const handleonMouseEnter = (e) => {
        e.target.style.backgroundColor = 'red';
    }
    const handleonMouseLeave = (e) => {
        e.target.style.backgroundColor = 'green';
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(`ur low is ${Low} , ur high is ${High} and ur choice is ${Choice} `);
    }
    return (
        <div className='myclass'>
            <form onSubmit={submitHandler} style={{ paddingTop: "50px", paddingLeft: "20px" }}>
                <h5>Hey There ! Welcome to Prime Generator App</h5><br />
                <label >Enter the Range </label><span> : </span>
                <input type="number" value={Low} onChange={handleLow} required />
                <span> - </span>
                <input type="number" value={High} onChange={handleHigh} required />
                <br /><br /><br />
                <h5>Currently we have three types of PRIME GENERATOR </h5><br />
                <label >Choose your choice</label><br />
                <div >
                    <input type="radio" value="Brute" checked={Choice === "Brute"} onChange={handleChoice} /> Brute Generator
                    <input type="radio" value="Intermediate" checked={Choice === "Intermediate"} onChange={handleChoice} /> Intermediate Generator
                    <input type="radio" value="Efficient" checked={Choice === "Efficient"} onChange={handleChoice} /> Efficient Generator
                </div>
                <br /><br /><br />
                <Link to={`/primegenerator/${Low}/${High}/${Choice}`} ><button style={{ backgroundColor: "green", borderRadius: "5px" }} onMouseEnter={handleonMouseEnter} onMouseLeave={handleonMouseLeave} >Get the Primes</button></Link>
                {/* <button style={{ backgroundColor: "green", borderRadius: "5px" }} onMouseEnter={handleonMouseEnter} onMouseLeave={handleonMouseLeave} >Get the Primes</button> */}
            </form>
        </div>
    )
}

export default PrimeGenerator
