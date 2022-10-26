import React from "react";
import './SortingVisualizer.css';
import * as SortingAlgorthims from '../SortingAlgorthims/SortingAlgorthims.js';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(10, 700));
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = SortingAlgorthims.mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? 'red' : 'black';
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * 5);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * 5);
          }
        }
      }

    quickSort() {}

    normalSort() {
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
            setTimeout(() => {
                barOneStyle.backgroundColor = 'black';
                barTwoStyle.backgroundColor = 'black';
            }, i * 5);
        }
    }

    selectionSort() {
        const animations = SortingAlgorthims.insertionSort(this.state.array);

        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i].length == 1) {
                const [minIndex] = animations[i];
                const minIndexStyle = arrayBars[minIndex].style;

                setTimeout(() => {
                    minIndexStyle.backgroundColor = 'red';
                }, i * 5);
            }
        }
    }

    insertionSort() {
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

                setTimeout(() => {
                    barOneStyle.backgroundColor = 'black';
                    bartwoStyle.backgroundColor = 'black';
                }, i * 5);
            }else {
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

    }

    render() {
        const {array} = this.state;
        
        return (
            <div>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.normalSort()}>Normal Sort</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button onClick={() => this.resetArray()}>Generate new Array</button>
                <div className="array-container">
                    {array.map((key, idx) => (
                        <div className="array-bar" key={idx} style={{height: `${key}px`}}>
                        </div>
                    ))}
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