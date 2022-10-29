import React, { Component } from 'react';

import { BiCommand } from 'react-icons/bi';
import { HiOutlineCommandLine } from 'react-icons/hi2';

// handleScreenOverlay

export default class ActionsBar extends Component {
    constructor(props) {
        super(props);

        this.handleScriptClick = this.handleScriptClick.bind(this);
    }

    handleScriptClick() {
        this.props.handleScreenOverlay(
            "New Script",
            [],
            this.props.handleSetOverlay,
            () => {
                
            }
        )
    };

    render() {
        const iconWrapper = `create-icon-wrapper${this.props.hasCommand ? " active" : ""}`;

        return (
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
                            className={iconWrapper}
                            onClick={this.handleScriptClick}
                            title="(ctrl + s)"
                        >
                            <HiOutlineCommandLine className='icon' />
                            <div className="subtitle">New Script</div>
                        </div>
                        
                        <div 
                            className={iconWrapper}
                            title="(ctrl + f)"
                        >
                            <div className='icon'>?</div>
                            <div className="subtitle">New Condition</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}