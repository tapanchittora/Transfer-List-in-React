import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss'
import axios from 'axios'

const upArrow = -1;
const downArrow = 1;

export default class TransferList extends Component {
    state = {
        list1: [],
        list2: []
    }

    componentDidMount() {
        axios.get("./myjson.json").then(res => {
            this.setState({
                list1: res.data.itemList1,
                list2: res.data.itemList2
            });
        }
        ).catch(() => {
            console.log("Error loading data");
        });
    }

    handleChange = (e) => {
        let isBoxVisible = true;
        let value = parseInt(e.target.value);
        this.state.list1.map((res1) => {
            if (res1.id === value) {
                res1.checked = e.target.checked;
            }
            return (<div>Empty value</div>)
        })

        this.state.list2.map((res2) => {
            if (res2.id === value) {
                res2.checked = e.target.checked;
            }
            return (<div>Empty value</div>)
        })
        //update list state
        this.setState({
            list1: this.state.list1,
            list2: this.state.list2
        });
    }

    handleMove = (direction) => {
        if (direction === 'left') {
            this.state.list1.map((result) => {
                if (result.checked === true) {
                    this.state.list2.push(result);
                    this.setState({
                        list1: this.state.list1.filter(i => !i.checked),
                        list2: [...this.state.list2]
                    });
                }
                return null
            });

        }
        else {
            if (direction === 'right') {
                this.state.list2.map((result) => {
                    if (result.checked === true) {
                        this.state.list1.push(result);
                        this.setState({
                            list1: [...this.state.list1],
                            list2: this.state.list2.filter(i => !i.checked)
                        });
                    }
                    return null
                });
            }
        }
    }
    moveItems = (id, direction) => {
        const position = this.state.list2.findIndex((i) => i.id === id)
        if (position < 0) {
            throw new Error("Given item not found.")
        } else if ((direction === upArrow && position === 0) || (direction === downArrow && position === this.state.list2.length - 1)) {
            return // canot move outside of array
        }

        const itemPosition = this.state.list2[position] // save item for later
        const filterItems = this.state.list2.filter((i) => i.id !== id) // remove item from array
        filterItems.splice(position + direction, 0, itemPosition)
        this.setState({ list2: filterItems })
    }

    moveAllData = (direction) => {
        if (direction === 'left') {
            this.setState({
                list1: [...this.state.list1, ...this.state.list2],
                list2: []
            })
        } else {
            this.setState({
                list2: [...this.state.list2, ...this.state.list1],
                list1: []
            })
        }
    }


    render() {
        const LeftlistDisplay = this.state.list1.map(leftRes => {
            return (
                <div className="subContainer" key={leftRes.id} >
                    <input type="checkbox" checked={leftRes.checked} value={leftRes.id} className="fa fa-checkbox" onChange={this.handleChange} />
                    <span>{leftRes.text}</span>
                </div>
            )
        })
        const RightlistDisplay = this.state.list2.map(rightRes => {
            return (
                <div key={rightRes.id}>
                    <div className="subContainer" >
                        <input type="checkbox" checked={rightRes.checked} className="fa fa-checkbox" value={rightRes.id} onChange={this.handleChange} />
                        <span>{rightRes.text}</span>
                        <div className="moveArrows">
                            <Link to="#" className="fa fa-sort-up" onClick={() => this.moveItems(rightRes.id, upArrow)}></Link>
                            <Link to="#" className="fa fa-sort-down" onClick={() => this.moveItems(rightRes.id, downArrow)}></Link>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="container">
                <div className="left-side">{LeftlistDisplay}</div>
                <div className="buttons-container">
                    <button className={'fa fa-caret-right ${ isBoxVisible ? "" : "hidden"}'} onClick={() => { this.handleMove('left') }}></button><br />
                    <button className="fa fa-angle-double-right" onClick={() => { this.moveAllData('right') }}></button><br />
                    <button className="fa fa-caret-left" onClick={() => { this.handleMove('right') }}></button><br />
                    <button className="fa fa-angle-double-left" onClick={() => { this.moveAllData('left') }}></button><br />
                </div>
                <div className="right-side">{RightlistDisplay}</div>
            </div>
        );
    }

}
    