import React, { Component } from 'react';

import ActionsBar from './actions-bar';
import Command from './command';
import NewCommand from './new-command';

export default class CommandGenerator extends Component {
    constructor() {
        super();

        this.state = {
            commands: [

            ],
            activeCommand: 0,
            creatingCommand: false
        }

        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleNewCommand = this.handleNewCommand.bind(this);
        this.handleRemoveCommand = this.handleRemoveCommand.bind(this);
        this.handleStartNewCommand = this.handleStartNewCommand.bind(this);
    }

    handleSaveCommand(name) {
        this.setState({

        })
    }

    handleStartNewCommand(value) {
        this.setState({
            creatingCommand: value
        })
    }

    handleChangeContent(content) {
        this.setState({ content })
    }

    handleRemoveCommand(id) {
        this.setState({
            commands: this.state.commands.filter(elmt => parseInt(elmt.key) !== id)
        })
    }

    handleNewCommand() {
        this.setState({
            creatingCommand: true
        })
    }

    render() {
        return (
            <div className='command-generator'>
                { this.state.creatingCommand ? <NewCommand handleStartNewCommand={this.handleStartNewCommand} /> : null }
                
                <div className="header">
                    <h1>Command Generator</h1>
                </div>

                <div className="columns">
                    <div className="left">
                        <ActionsBar handleNewCommand={this.handleNewCommand} />
                        
                        <div className="commands">
                            {this.state.commands }
                        </div>
                    </div>

                    <div className="center">

                    </div>

                    <div className="right">

                    </div>
                </div>
            </div>
        );
    }
}
