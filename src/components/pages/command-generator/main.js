import React, { Component } from 'react';
import hotkeys from 'hotkeys-js';

import ActionsBar from './actions-bar';
import Command from './command';
import Script from './script';
import ScreenOverlay from './screen-overlay';
import LeftColumn from './left';

export default class CommandGenerator extends Component {
    constructor() {
        super();

        this.state = {
            commands: [

            ],
            activeCommand: "",
            activeCommandScripts: [],
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
        this.addScript = this.addScript.bind(this);
    }

    addScript(name) {
        let activeCommandScripts = this.state.activeCommandScripts;
        activeCommandScripts.push(
            <Script key={name} />
        );
        this.setState({ activeCommandScripts })
    }
    
    handleDetectCommands() {
        this.setState({
            hasCommand: this.state.commands.length > 0 ? true : false
        })
    }

    componentDidMount() {
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
                scripts={this.state.activeCommandScripts}
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
                    {/* <div className="left">
                        <ActionsBar 
                            handleNewCommand={this.handleNewCommand} 
                            hasCommand={this.state.hasCommand}  
                            handleScreenOverlay={this.handleScreenOverlay}  
                            handleSetOverlay={this.handleSetOverlay}
                            addScript={this.addScript}
                        />
                        
                        <div className="commands">
                            {this.state.commands }
                        </div>
                    </div> */}
                    
                    <LeftColumn />

                    <div className="center">

                    </div>

                    <div className="right">

                    </div>
                </div>
            </div>
        );
    }
}
