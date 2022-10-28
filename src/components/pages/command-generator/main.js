import React, { Component } from 'react';
import hotkeys from 'hotkeys-js';

import ActionsBar from './actions-bar';
import Command from './command';
import NewCommand from './new-command';
import ScreenOverlay from './screen-overlay';

export default class CommandGenerator extends Component {
    constructor() {
        super();

        this.state = {
            commands: [

            ],
            activeCommand: "",
            screenOverlay: false
        }

        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleNewCommand = this.handleNewCommand.bind(this);
        this.handleRemoveCommand = this.handleRemoveCommand.bind(this);
        this.handleOpenOverlay = this.handleOpenOverlay.bind(this);
        this.handleCloseOverlay = this.handleCloseOverlay.bind(this);
        this.handleSaveCommand = this.handleSaveCommand.bind(this);
        this.handleSelectCommand = this.handleSelectCommand.bind(this);
        this.handleActiveCommand = this.handleActiveCommand.bind(this);
    }

    componentDidMount() {
        hotkeys(
            'ctrl+c,ctrl+f,ctrl+s',
            (event, handler) => {
                event.preventDefault();
                switch(handler.key) {
                    case 'ctrl+c': this.handleOpenOverlay();
                break;
                    case 'ctrl+f': console.log('You pressed ctrl + f');
                break;
                    case 'ctrl+s': console.log('You pressed ctrl + s');
                break;
                }
            }
        )
    }

    handleActiveCommand(name) {
        return name === this.state.activeCommand ? true : false;
    }

    handleSelectCommand(name) {
        this.setState({
            activeCommand: name
        })
    }

    handleSaveCommand(name) {
        let commands = this.state.commands;

        commands.push(
            <Command 
                key={name} 
                name={name} 
                handleRemoveCommand={this.handleRemoveCommand}
            />
        )
        this.setState({
            commands
        })
    }

    handleCloseOverlay() {
        this.setState({
            screenOverlay: false
        })
    }

    handleOpenOverlay() {
        this.setState({
            screenOverlay: true
        })
    }

    handleChangeContent(content) {
        this.setState({ content })
    }

    handleRemoveCommand(name) {
        let commands = this.state.commands.filter(command => command.key !== name);
        this.setState({ commands })
    }

    handleNewCommand() {
        this.setState({
            screenOverlay: true
        })
    }

    render() {
        return (
            <div className='command-generator'>
                { this.state.screenOverlay ? (
                    // <NewCommand 
                    //     takenNames={this.state.commands.map(command => command.key)}
                    //     handleStartNewCommand={this.handleStartNewCommand} 
                    //     handleSaveCommand={this.handleSaveCommand} 
                    // />
                    <ScreenOverlay
                        title="New Command"
                        takenNames={this.state.commands.map(command => command.key)}
                        closeScreenOverlay={this.handleCloseOverlay}
                        saveData={this.handleSaveCommand}
                    />
                    ) : null }
                
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
