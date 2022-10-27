import React from "react";
import './SortingVisualizer.css';
import * as SortingAlgorthims from '../SortingAlgorthims/SortingAlgorthims.js';
import { useState } from "react";

let time = 0;
let oldProperties;
export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            animationSpd: 5,
            arraySize: 125,
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    handleChange(event){
        this.setState({animationSpd: event});
    }

    handleSize(event) {
        this.setState({arraySize: event});
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < this.state.arraySize; i++) {
            array.push(randomIntFromInterval(10, 700));
        }
        this.setState({array: array });
    }

    disableButtons() {
        const buttons = document.getElementsByClassName('b');
        const slider = document.getElementsByClassName('slider');
        oldProperties = buttons[0].style;
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
            buttons[i].style.backgroundColor = 'grey';
        }

        for(let i = 0; i < slider.length; i++) {
            slider[i].disabled = true;
            slider[i].style.backgroundColor = 'grey';
        }
    }

    enableButtons() {
        const buttons = document.getElementsByClassName('b');
        const slider = document.getElementsByClassName('slider');
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
            buttons[i].style = oldProperties;
        }

        for(let i = 0; i < slider.length; i++) {
            slider[i].disabled = false;
            slider[i].style.backgroundColor = 'white';
        }
    }

    mergeSort() {
        this.disableButtons();
        const animations = SortingAlgorthims.mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? 'red' : 'black';
            time = i * this.state.animationSpd;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * this.state.animationSpd);
          } else {
            time = i * this.state.animationSpd;
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * this.state.animationSpd);
          }
        }

        setTimeout(() => {
            this.enableButtons();
        }, time);

    }

    normalSort() {
        this.disableButtons();
        const animations = SortingAlgorthims.normalSort(this.state.array);

        for(let i = 0; i < animations.length;) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, bartwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[bartwoIdx].style;

            setTimeout(() => {
                barOneStyle.backgroundColor = 'red';
                barTwoStyle.backgroundColor = 'red';
            }, i * 5);
            i++;
            if(i >= animations.length) {
                break;
            }
            const [animationMode1,animationMode2] = animations[i];
            if(animationMode1 === -1) {
                i++;

                if(i >= animations.length) {
                    break;
                }
                const [barOne, newHeight1] = animations[i];
                const barSwapStyle1 = arrayBars[barOne].style;
                setTimeout(() => {
                    barSwapStyle1.height = `${newHeight1}px`;
                }, i * 5);
                i++;

                if(i >= animations.length) {
                    break;
                }

                const [barTwo, newHeight2] = animations[i];
                const barSwapStyle2 = arrayBars[barTwo].style;
                setTimeout(() => {
                    barSwapStyle2.height = `${newHeight2}px`;
                }, i * 5);
                i++;
            }
            time = i * 5;
            setTimeout(() => {
                barOneStyle.backgroundColor = 'black';
                barTwoStyle.backgroundColor = 'black';
            }, i * 5);
        }

        setTimeout(() => {
            this.enableButtons();
        }, time);
    }

    selectionSort() {
        this.disableButtons();
        const animations = SortingAlgorthims.selectionSort(this.state.array);
        let smallest;
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i].length === 1) {

                let [animationFrame] = animations[i];

                if(animationFrame === -2) {
                    i++;
                    [animationFrame] = animations[i];
                    const BarStyle = arrayBars[animationFrame].style;
                    setTimeout(() => {
                        BarStyle.backgroundColor = 'red';
                    }, i * 5);
                    smallest = animationFrame;
                }else if(animationFrame === -1) {
                    i++;
                    [animationFrame] = animations[i];
                    const BarStyle = arrayBars[animationFrame].style;
                    const oldBar = arrayBars[smallest].style;

                    time = i * 5;
                    setTimeout(() => {
                        oldBar.backgroundColor = 'black';
                        BarStyle.backgroundColor = 'red';
                    }, i * 5);
                    smallest = animationFrame;
                }
                else {

                    //TODO comparison animation

                }
            }else {
                const [barOneIdx, newHeight] = animations[i];
                if(barOneIdx >= 0){
                    const barOneStyle = arrayBars[barOneIdx].style;

                    setTimeout(() => {
                        barOneStyle.height = `${newHeight}px`;
                    }, i * 5);
                    i++;
                    const [barTwoIdx, newHeight1] = animations[i];
                    const barTwoStyle = arrayBars[barTwoIdx].style;

                    time = i * 5;
                    setTimeout(() => {
                        barTwoStyle.height = `${newHeight1}px`;
                        barTwoStyle.backgroundColor = 'black';
                        barOneStyle.backgroundColor = 'black';
                    }, i * 5);
                    
                }
            }
        }
        setTimeout(() => {
            this.enableButtons();
        }, time);
    }

    insertionSort() {
        this.disableButtons();
        const animations = SortingAlgorthims.insertionSort(this.state.array);

        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [animationMode1,animationMode2] = animations[i];
            if(animationMode2 === -2) {
                i++;
                const [barOneIdx, bartwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const bartwoStyle = arrayBars[bartwoIdx].style;
                setTimeout(() => {
                   
                    barOneStyle.backgroundColor = 'red';
                    bartwoStyle.backgroundColor = 'red';
                }, i * 5);
                i++;
                setTimeout(() => {
                    const [swapBar, newHeight] = animations[i];
                    const barSwap = arrayBars[swapBar].style;
                    barSwap.height = `${newHeight}px`;
                }, i * 5);

                time = i * 5;
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'black';
                    bartwoStyle.backgroundColor = 'black';
                }, i * 5);
            }else {
                time = i * 5;
                setTimeout(() => {
                    i++;
                    const [barOneIdx, newHeight] = animations[i];
                    if(barOneIdx >= 0){
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }
                }, i * 5);
            }
        }
        
        setTimeout(() => {
            this.enableButtons();
        }, time);
    }

    quickSort() {

    }

    render() {
        const {array} = this.state;
        const {animationSpd} = this.state.animationSpd;
        return (
            <div>
                <nav className="navbar">
                    <div style={{color: "white"}}>Animation Speed</div>
                    <input type="range" min="1" max="30" value={animationSpd} className="slider" onChange={(e) => this.handleChange(e.target.valueAsNumber)}></input>
                    <div style={{color: "white"}}>Array Size</div>
                    <input type="range" min="50" max="150" value={animationSpd} className="slider" id="myRange" onChange={(e) => this.handleSize(e.target.valueAsNumber)}></input>
                    <div className="navbar__container">
                        <button className="b" onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button className="b" onClick={() => this.normalSort()}>Normal Sort</button>
                        <button className="b" onClick={() => this.selectionSort()}>Selection Sort</button>
                        <button className="b" onClick={() => this.insertionSort()}>Insertion Sort</button>
                        <button className="b" onClick={() => this.resetArray()}>Generate new Array</button>
                    </div>

                </nav>
                <div>
                    <div className="array-container">
                        {array.map((key, idx) => (
                            <div className="array-bar" key={idx} style={{height: `${key}px`}}>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    Developed by: Hussien Mostafa
                </div>
            </div>
        );
    }

}

function isEqual(array1, array2) {

    if(array1.length !== array2.length) return false;

    for(let i = 0, j = 0; i < array1.length && j < array2.length; i++, j++) {
        if(array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}