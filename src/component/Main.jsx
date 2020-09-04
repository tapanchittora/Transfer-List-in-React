import React, { Component } from 'react';
import './style.scss'
import Transferlist from './Transferlist'


export default class MainTransIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list1: [],
            list2: []
        }
    }

    render() {
        return (
            <><Transferlist props={this.state} /></>
        )
    }

}