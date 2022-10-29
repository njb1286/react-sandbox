import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { BiCommand } from 'react-icons/bi';
import { FaTimesCircle } from 'react-icons/fa';

export default class Command extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            commandName: this.props.name,
            contentVisible: true,
            content: [],
            active: this.props.activeCommand === this.props.name ? true : false,
            path: `/command-generator/${this.props.name.toLowerCase()}`
        }

        this.safeNames = [
            "main",
            "cmd-icon-wrapper",
            "command-name",
            'icon',
            'content',
            'expand-wrapper',
            'arrow'
        ]

        this.handleClickCommand = this.handleClickCommand.bind(this);
        this.handleClickCommand = this.handleClickCommand.bind(this);
    }

    compareArray(arr1, arr2) {
        let array1 = [];
        let array2 = [];

        for (let i = 0; i < arr1.length; i++) array1.push(arr1[i]);
        for (let i = 0; i < arr2.length; i++) array2.push(arr2[i]);

        for (let i of array1)
            for (let j of array2)
                if (i === j) return true

        return false
    }
    
    handleClickCommand(elmt) {
        if (this.compareArray(elmt.target.classList, this.safeNames)) {
            this.setState({
                contentVisible: !this.state.contentVisible
            })
        }

        console.log("Click!");
    }

    render() {
        

        return (
            <div className='command item'>
                <NavLink 
                    className={`main${this.state.active ? " active" : ""}`} 
                    onClick={this.handleClickCommand}
                    to={this.state.path}
                >
                    <div className="content">
                        <div className="expand-wrapper">
                            <div 
                                className={`arrow${this.state.contentVisible ? " expanded" : ""}`} 
                            />
                        </div>

                        <div className="cmd-icon-wrapper">
                            <BiCommand className='icon' />
                        </div>
                        
                        <div 
                            type="text" 
                            onInput={this.handleNameChange} 
                            className="command-name"
                        >
                            {this.state.commandName}
                        </div>

                        <div className="delete-icon-wrapper">
                            <FaTimesCircle className='delete-icon' onClick={() => this.props.handleRemoveCommand(this.state.commandName)} />
                        </div>
                    </div>
                </NavLink>

                <div className="scripts">

                </div>
            </div>
        )
    }
}