import React from 'react';

import { BiCommand } from 'react-icons/bi';
import { HiOutlineCommandLine } from 'react-icons/hi2';

export default props => {
    return (
        <div className="actions-bar-wrapper item">
            <div className="actions-bar">
                <div className="top">
                    <div className="create-icon-wrapper" onClick={props.handleNewCommand}>
                        <BiCommand className='icon' />
                        <div className="subtitle">New Command</div>
                    </div>
                </div>

                <div className="bottom">
                    <div className="create-icon-wrapper">
                        <HiOutlineCommandLine className='icon' />
                        <div className="subtitle">New Script</div>
                    </div>
                    
                    <div className="create-icon-wrapper">
                        <div className='icon'>?</div>
                        <div className="subtitle">New Condition</div>
                    </div>
                </div>
            </div>
        </div>
    )
}