import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//initial value set for Arrow
const upArrow = -1;
const downArrow = 1;

const TransferList = ({ props }) => {
//calling props
    const [propsVal, setStatePropsFun] = useState(props);
//setting states with callings props and updating new values    
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('./myjson.json')
            response = await response.json()
            setStatePropsFun({
                list1: response.itemList1,
                list2: response.itemList2
            });
        }
        fetchMyAPI()
    }, [])

//Handeling Array to set value to checkbox from false to true
    const handleChange = (e) => {
        let value = parseInt(e.target.value);
        propsVal.list1.map((res1) => {
            if (res1.id === value) {
                res1.checked = e.target.checked;
            }
            return (<div>Empty value</div>)
        })

        propsVal.list2.map((res2) => {
            if (res2.id === value) {
                res2.checked = e.target.checked;
            }
            return (<div>Empty value</div>)
        })
        //update list state
        setStatePropsFun({
            list1: propsVal.list1,
            list2: propsVal.list2
        });
    }
    const handleMove = (direction) => {
        if (direction === 'left') {
            propsVal.list1.map((result) => {
                if (result.checked === true) {
                    propsVal.list2.push(result);
                    setStatePropsFun({
                        list1: propsVal.list1.filter(i => !i.checked),
                        list2: [...propsVal.list2]
                    });
                }
                return null
            });

        }
        else {
            if (direction === 'right') {
                propsVal.list2.map((result) => {
                    if (result.checked === true) {
                        propsVal.list1.push(result);
                        setStatePropsFun({
                            list1: [...propsVal.list1],
                            list2: propsVal.list2.filter(i => !i.checked)
                        });
                    }
                    return null
                });
            }
        }
    }

    const moveItems = (id, direction) => {
        const position = propsVal.list2.findIndex((i) => i.id === id)
        if (position < 0) {
            throw new Error("Given item not found.")
        } else if ((direction === upArrow && position === 0) || (direction === downArrow && position === propsVal.list2.length - 1)) {
            return // canot move outside of array
        }

        const itemPosition = propsVal.list2[position] // save item for later
        const filterItems = propsVal.list2.filter((i) => i.id !== id) // remove item from array
        filterItems.splice(position + direction, 0, itemPosition)
        setStatePropsFun({ list2: filterItems,
        list1:[...propsVal.list1] })
    }

    const moveAllData = (direction) => {
        if (direction === 'left') {
            setStatePropsFun({
                list1: [...propsVal.list1, ...propsVal.list2],
                list2: []
            })
        } else {
            setStatePropsFun({
                list2: [...propsVal.list2, ...propsVal.list1],
                list1: []
            })
        }
    }

    const LeftlistDisplay = propsVal.list1.length ? (propsVal.list1.map(leftRes => {
        return (
            <div className="subContainer" key={leftRes.id} >
                <input type="checkbox" checked={leftRes.checked} value={leftRes.id} className="fa fa-checkbox" onChange={handleChange} />
                <span>{leftRes.text}</span>
            </div>
        )
    })
    ) : (
            <div className="error">Empty Content Please enter Data</div>
        )
    const RightlistDisplay = propsVal.list2.length ? (propsVal.list2.map(rightRes => {
        return (
            <div key={rightRes.id}>
                <div className="subContainer" >
                    <input type="checkbox" checked={rightRes.checked} className="fa fa-checkbox" value={rightRes.id} onChange={handleChange} />
                    <span>{rightRes.text}</span>
                    <div className="moveArrows">
                        <Link to="#" className="fa fa-sort-up" onClick={() => moveItems(rightRes.id, upArrow)}></Link>
                        <Link to="#" className="fa fa-sort-down" onClick={() => moveItems(rightRes.id, downArrow)}></Link>
                    </div>
                </div>
            </div>
        )
    })
    ) : (
            <div className="error">Empty Content Please enter Data</div>
        )

    return (

        <div className="container">
            <div className="left-side">{LeftlistDisplay}</div>
            <div className="buttons-container">
                <button className="fa fa-caret-right" onClick={() => { handleMove('left') }}></button><br />
                <button className="fa fa-angle-double-right" onClick={() => { moveAllData('right') }}></button><br />
                <button className="fa fa-caret-left" onClick={() => { handleMove('right') }}></button><br />
                <button className="fa fa-angle-double-left" onClick={() => { moveAllData('left') }}></button><br />
            </div>
            <div className="right-side">{RightlistDisplay}</div>
        </div>
    );


}
export default TransferList