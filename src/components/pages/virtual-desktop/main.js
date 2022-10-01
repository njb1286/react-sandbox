import React, { Component } from 'react';

// Apps requirements
import NotepadIcon from "../../../../static/images/virtual-desktop/apps/notepad.png";
import Notepad from "./apps/notepad";

import RenderApps from "./apps";
import Window from "./window";

export default class VirtualDesktop extends Component {
    constructor(props) {
        super(props);
        
        this.openApp = this.openApp.bind(this);
        this.closeApp = this.closeApp.bind(this);

        this.state = {
            windowIsOpen: false,
            openApp: {

            },

            apps: [
                {
                    name: "Notepad",
                    icon: NotepadIcon,
                    content: <Notepad closeApp={this.closeApp} />
                }
            ]
        }

    }

    openApp(app) {
        this.setState({
            windowIsOpen: true,
            openApp: app
        })
    }

    closeApp() {
        this.setState({
            windowIsOpen: false,
            openApp: {

            }
        })
    }

    render() {
        return (
            <div className='virtual-desktop-site'>     
                <div className="apps">
                    <RenderApps apps={this.state.apps} openApp={this.openApp} />
                </div>

                {this.state.windowIsOpen ? <Window app={this.state.openApp} closeApp={this.closeApp} /> : null}
            </div>
        )
    }
}