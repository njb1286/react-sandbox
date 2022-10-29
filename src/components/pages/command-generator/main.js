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
            screenOverlay: false,
            screenOverlayType: "",
            hasCommand: false
        }

        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleNewCommand = this.handleNewCommand.bind(this);
        this.handleRemoveCommand = this.handleRemoveCommand.bind(this);
        this.handleSaveCommand = this.handleSaveCommand.bind(this);
        this.handleSelectCommand = this.handleSelectCommand.bind(this);
        this.handleActiveCommand = this.handleActiveCommand.bind(this);
        this.handleDetectCommands = this.handleDetectCommands.bind(this);
        this.handleScreenOverlay = this.handleScreenOverlay.bind(this);
        this.handleSetOverlay = this.handleSetOverlay.bind(this);
    }
    
    handleDetectCommands() {
        this.setState({
            hasCommand: this.state.commands.length > 0 ? true : false
        })
    }

    componentDidMount() {
        hotkeys(
            'ctrl+c,ctrl+f,ctrl+s',
            (event, handler) => {
                event.preventDefault();
                switch(handler.key) {
                    case 'ctrl+c': this.handleNewCommand();
                break;
                    case 'ctrl+f': console.log('You pressed ctrl + f');
                break;
                    case 'ctrl+s': console.log('You pressed ctrl + s');
                break;
                }
            }
        );

        this.handleDetectCommands();
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
        },
        this.handleDetectCommands())
    }

    handleSetOverlay(screenOverlay) {
        this.setState({ screenOverlay });
    }

    handleChangeContent(content) {
        this.setState({ content })
    }

    handleRemoveCommand(name) {
        let commands = this.state.commands.filter(command => command.key !== name);
        this.setState({ 
            commands,
            hasCommand: commands.length > 0 ? true : false
        });
    }

    handleNewCommand() {
        this.setState({
            screenOverlay: true,
            screenOverlayType: (
                <ScreenOverlay
                    title="New Command"
                    takenNames={this.state.commands.map(command => command.key)}
                    handleSetOverlay={this.handleSetOverlay}
                    saveData={this.handleSaveCommand}
                />
            )
        })
    }

    handleScreenOverlay(title, takenNames, handleSetOverlay, saveData) {
        this.setState({
            screenOverlay: true,
            screenOverlayType: (
                <ScreenOverlay
                    title={title}
                    takenNames={takenNames}
                    handleSetOverlay={handleSetOverlay}
                    saveData={saveData}
                />
            )
        })
    }

    render() {
        return (
            <div className='command-generator'>
                { this.state.screenOverlay ? this.state.screenOverlayType : null }
                
                <div className="header">
                    <h1>Command Generator</h1>
                </div>

                <div className="columns">
                    <div className="left">
                        <ActionsBar 
                            handleNewCommand={this.handleNewCommand} 
                            hasCommand={this.state.hasCommand}  
                            handleScreenOverlay={this.handleScreenOverlay}  
                            handleSetOverlay={this.handleSetOverlay}
                        />
                        
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
