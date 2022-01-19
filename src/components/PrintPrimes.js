import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
const PrintPrimes = () => {

    //Prime generator function (Brute Approach)
    const getprimeBrute = (L, R) => {
        let output = [];
        for (let i = L; i <= R; i++) {
            let flag = true;
            for (let j = 2; j < i; j++) {
                if (i % j === 0) {
                    flag = false; break;
                }
            }
            if (flag && i !== 0 && i !== 1) {
                output.push(i);
            }
        }
        const sz = output.length;
        return { output, sz };
    }

    //Prime generator function (Sqrt Approach)
    const getprimeSqrt = (L, R) => {
        let output = [];
        for (let i = L; i <= R; i++) {
            let flag = true;
            for (let j = 2; j <= Math.sqrt(i); j++) {
                if (i % j === 0) {
                    flag = false; break;
                }
            }
            if (flag && i !== 0 && i !== 1) {
                output.push(i);
            }
        }
        const sz = output.length;
        return { output, sz };
    }

    //Function to find prime till root R (basic prime seive)
    const find = () => {
        let Assumed_max_root_R = 100003;
        let prime = [];
        for (let i = 0; i <= Assumed_max_root_R; i++) {
            prime.push(true);
        }
        for (let i = 2; i * i <= Assumed_max_root_R; i++) {
            if (prime[i]) {
                for (let j = i * i; j <= Assumed_max_root_R; j += i) {
                    prime[j] = false;
                }
            }
        }
        let output = [];
        for (let i = 2; i <= Assumed_max_root_R; i++) {
            if (prime[i]) {
                output.push(i);
            }
        }
        return output;
    }

    //Prime generator function (Segmented Seive Approach)
    const getprimeSegmentedSeive = (L, R) => {
        //find prime till root R
        let PrimeTillRoot_R = find();

        //Applying segmented seive for range L to R (quite similar to basic seive)
        let prime = [];
        for (let i = 0; i <= (R - L); i++) {
            prime.push(true);
        }
        for (let i = 0; (PrimeTillRoot_R[i] * PrimeTillRoot_R[i]) <= R; i++) {
            let currPrime = PrimeTillRoot_R[i];
            let base = (Math.floor(L / currPrime)) * currPrime;
            if (base < L) base += currPrime;
            if (base === currPrime) base += currPrime;
            for (let j = base; j <= R; j += currPrime) {
                prime[j - L] = false;
            }
        }
        let output = [];
        for (let i = L; i <= R; i++) {
            if (i !== 1 && prime[i - L] === true) {
                output.push(i);
            }
        }
        const sz = output.length;
        return { output, sz };
    }

    let { Low, High, Choice } = useParams();
    Low = parseInt(Low); High = parseInt(High);
    let newChoice;
    if (Choice === "Brute") newChoice = 1;
    else if (Choice === "Intermediate") newChoice = 2;
    else newChoice = 3;
    let flag = true;
    if (High < Low) flag = false;
    const [Output, setOutput] = useState([]);
    const [Size, setSize] = useState(0);
    const [isLoading, setisLoading] = useState(true);
    const [timeTaken, settimeTaken] = useState(0);
    useEffect(() => {
        if (isLoading === false) {
            const data = { Low, High, timeTaken, Choice, Size };
            axios.post(`https://robust-prime-generator.herokuapp.com/primegenerator/${Low}/${High}/${Choice}`, data)
                .then(() => console.log("Data sent Successfully"))
                .catch((err) => console.log("Error got while axios post from react"))
        }
        const start = window.performance.now();
        let myLow = Low; if (myLow < 2) myLow = 2;
        let myHigh = High;
        if (myHigh >= myLow) {
            if (newChoice === 1) {
                const Ans = getprimeBrute(myLow, myHigh);
                setOutput(Ans.output); setSize(Ans.sz);
            }
            else if (newChoice === 2) {
                const Ans = getprimeSqrt(myLow, myHigh);
                setOutput(Ans.output); setSize(Ans.sz);
            }
            else {
                const Ans = getprimeSegmentedSeive(myLow, myHigh);
                setOutput(Ans.output); setSize(Ans.sz);
            }
        }
        const end = window.performance.now();
        setisLoading(false);
        const time_elapsed = end - start;
        settimeTaken(time_elapsed);

        // console.log(`Time taken is ${time_elapsed} ms`);

    }, [isLoading])
    return (
        <div className='myclass' style={{ paddingTop: "20px", paddingLeft: "20px" }}>
            <br />
            {flag === false ? (<h1>Oops !! Invalid Input</h1>) : (
                <div >
                    {isLoading === true ? (<div className='centering'><ClipLoader color={"36D7B7"} size={150} loading={isLoading} /></div>) : (
                        <div>{Size === 0 ? (<h1>No Prime Numbers in the range of {Low} to {High}</h1>) : (
                            <div>
                                <h4 style={{}}>Number of Prime Numbers in the range {Low} to {High} is {Size} </h4>
                                <h4>Below is the list : </h4>
                                <ul>
                                    {
                                        Output.map((item) => <li key={item}>{item}</li>)
                                    }
                                </ul>
                            </div>
                        )}</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PrintPrimes
