import React, { Component } from 'react';
import { BiCommand } from 'react-icons/bi';
import { FaTimesCircle } from 'react-icons/fa';

export default class Command extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commandName: "",
            contentVisible: true
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClickCommand = this.handleClickCommand.bind(this);
    }

    handleNameChange(name) {
        this.setState({
            commandName: name.target.value
        })
    }
    
    handleClickCommand(elmt) {
        if (elmt.target.classList.contains('main')) {
            this.setState({
                contentVisible: !this.state.contentVisible
            })

            this.props.handleSetCommand(this.props.id);
        }
    }

    render() {
        return (
            <div className='command item'>
                <div className={`main${this.props.activeCommand === this.props.id ? " active" : ""}`} onClick={this.handleClickCommand}>
                    <div className="cmd-icon-wrapper">
                        <BiCommand className='icon' />
                    </div>
                    
                    <input type="text" onInput={this.handleNameChange} className="command-name" />

                    <div className="delete-icon-wrapper">
                        <FaTimesCircle className='delete-icon' onClick={() => this.props.handleRemoveCommand(this.props.id)} />
                    </div>
                </div>

                <div className="scripts">

                </div>
            </div>
        )
    }
}