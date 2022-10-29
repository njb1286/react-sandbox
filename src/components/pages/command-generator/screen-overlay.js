import React, { Component } from 'react';

import { replaceAll } from './helpers';

export default class ScreenOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            takenNames: this.props.takenNames,
            nameTaken: false,
            text: "",
            available: false
        }

        this.opacity = 5;

        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleHotKey = this.handleHotKey.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleAccept() {
        if (this.state.text && this.state.available) {
            this.props.saveData(this.state.text);
            this.handleClose();
        }
    }

    handleClose() {
        removeEventListener('keyup', this.handleHotKey);
        let count = this.opacity;
        let x = setInterval(
            () => {
                count--;
                this.setState({
                    background: `rgba(0, 0, 0, ${count / 10})`
                })
                if (count <= 0) {
                    clearInterval(x);
                    this.props.handleSetOverlay(false);
                }
            },
            10
        )
    }

    handleHotKey(key) {
        if (key.key === "Escape") this.handleClose();
        if (key.key === "Enter") this.handleAccept();
    }

    handleChangeText(text) {
        this.setState({
            text,
            nameTaken: this.state.takenNames.includes(text) ? true : false,
            available: !this.state.takenNames.includes(text) && text ? true : false
        })
    }

    handleClick(elmt) {
        if (elmt.target.classList.contains('screen-overlay')) this.handleClose();
    }

    componentDidMount() {
        let count = 0;
        let x = setInterval(() => {
            count++;
            this.setState({
                background: `rgba(0, 0, 0, ${count / 10})`
            })
            if (count >= this.opacity) clearInterval(x);
        }, 10);

        addEventListener('keyup', this.handleHotKey);
        document.querySelector('.select-input').focus();
    }

    render() {
        return (
            <div 
                className='screen-overlay' 
                style={{
                    background: this.state.background
                }}
                onClick={this.handleClick}
            >
                <div className="content">
                    <h2 className="title">{this.state.title}</h2>
    
                    <input 
                        type="text" 
                        className={`input select-input${!this.state.available ? " warning-color" : ""}`}
                        placeholder='Name...' 
                        onChange={e => this.handleChangeText(replaceAll(e.target.value.toUpperCase(), ' ', '-'))} 
                        value={this.state.text}
                    />

                    <label className={`warning-text${this.state.nameTaken ? "" : " hidden"}`}>
                        Name has already been taken!
                    </label>

                    <div className="btns">
                        <input type="button" className='cancel' defaultValue="Cancel" onClick={this.handleClose} />
                        <input 
                            type="button" 
                            className={`accept${this.state.available ? " active" : ""}`}
                            defaultValue="Accept" 
                            onClick={this.handleAccept} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}