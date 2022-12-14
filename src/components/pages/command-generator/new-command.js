import React, { Component } from 'react';

export default class NewCommand extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            background: "rgba(0, 0, 0, 0)",
            takenName: false
        }

        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleHotKey = this.handleHotKey.bind(this);
        this.handleAccept = this.handleAccept.bind(this);

        this.opacity = 5;

        this.hotkey = "";
    }

    handleAccept() {
        if (this.state.text && !this.state.takenName) {
            this.props.handleSaveCommand(this.state.text);
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
                    this.props.handleStartNewCommand(false);
                }
            },
            10
        )
    }

    handleClick(elmt) {
        if (elmt.target.classList.contains('screen-overlay')) this.handleClose();
    }

    handleChangeText(text) {
        this.setState({
            text,
            takenName: this.props.takenNames.includes(text) ? true : false
        })
    }

    handleHotKey(key) {
        if (key.key === "Escape") this.handleClose();
        if (key.key === "Enter") this.handleAccept();
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

        this.hotkey = addEventListener('keyup', this.handleHotKey);     
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
                    <h2 className="title">New Command</h2>
    
                    <input type="text" className='input select-input' placeholder='Command name...' onInput={e => this.handleChangeText(e.target.value)} />

                    <label className={`warning-text${this.state.takenName ? "" : " hidden"}`}>
                        Name has already been taken!
                    </label>

                    {this.state.takenName}

                    <div className="btns">
                        <input type="button" className='cancel' defaultValue="Cancel" onClick={this.handleClose} />
                        <input type="button" className='accept' defaultValue="Accept" onClick={this.handleAccept} />
                    </div>
                </div>
            </div>
        )
    }
}