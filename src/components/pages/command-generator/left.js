import React, { Component } from 'react';
import hotkeys from 'hotkeys-js';

import { BiCommand } from 'react-icons/bi';
import { HiOutlineCommandLine } from 'react-icons/hi2';

import ScreenOverlay from './screen-overlay';

export default class LeftColumn extends Component {
    constructor() {
        super();

        this.state = {
            overlay: {
                visible: false,
                title: "New Command",
                takenNames: [],
                saveEvent
            }
        }

        this.handleOverlay = this.handleOverlay.bind(this);
    }
    
    handleOverlay(title = new String, takenNames = new Array, saveEvent = new Function) {
        this.setState({
            overlay: {
                visible: true,
                title,
                takenNames,
                saveEvent
            }
        })
    }

    componentDidMount() {
        hotkeys(
            'ctrl+c,ctrl+f,ctrl+s',
            (event, handler) => {
                event.preventDefault();
                switch(handler.key) {
                    case 'ctrl+c': console.log("You pressed ctrl + c");
                break;
                    case 'ctrl+f': console.log('You pressed ctrl + f');
                break;
                    case 'ctrl+s': console.log('You pressed ctrl + s');
                break;
                }
            }
        );
    }

    render() {
        return (
            <div className="left">
                {
                    this.state.overlay.visible ? (
                        <ScreenOverlay 
                            title={this.state.overlay.title}
                        />
                    ) : null
                }

                <div className="actions-bar-wrapper item">
                    <div className="actions-bar">
                        <div className="top">
                            <div 
                                className="create-icon-wrapper active" 
                                onClick={this.props.handleNewCommand} 
                                title="(ctrl + c)"    
                            >
                                <BiCommand className='icon' />
                                <div className="subtitle">New Command</div>
                            </div>
                        </div>

                        <div className="bottom">
                            <div 
                                className="create-icon-wrapper"
                                onClick={this.handleNewScript}
                                title="(ctrl + s)"
                            >
                                <HiOutlineCommandLine className='icon' />
                                <div className="subtitle">New Script</div>
                            </div>
                            
                            <div 
                                className="create-icon-wrapper"
                                title="(ctrl + f)"
                            >
                                <div className='icon'>?</div>
                                <div className="subtitle">New Condition</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}