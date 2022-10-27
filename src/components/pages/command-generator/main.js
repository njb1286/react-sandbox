import React, { Component } from 'react';
import { BiCommand } from 'react-icons/bi';
import { HiOutlineCommandLine } from 'react-icons/hi2';

export default class CommandGenerator extends Component {
    constructor() {
        super();

        this.state = {
            content: "",
            commands: [

            ]
        }

        this.handleChangeContent = this.handleChangeContent.bind(this);
    }

    handleChangeContent(content) {
        this.setState({ content })
    }

    handleRemoveCommand(index) {
        this.setState({
            commands: this.state.commands.filter((_, i) => i !== index)
        })
    }

    render() {
        return (
            <div className='command-generator'>
                <div className="header">
                    <h1>Command Generator</h1>
                </div>

                <div className="columns">
                    <div className="left">
                        <div className="actions-bar-wrapper">
                            <div className="actions-bar">
                                <div className="top">
                                    <BiCommand className='create-icon' />
                                </div>

                                <div className="bottom">
                                    <HiOutlineCommandLine className='create-icon' />
                                    <div className='create-icon'>?</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="commands">
                            
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
