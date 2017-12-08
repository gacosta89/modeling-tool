import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Button from 'material-ui/Button';

const FileInput = styled.input`
    display: none;
`;

class FileButtonContainer extends Component {
    onClick = () => {
        this.setState({
            value: '',
        });
        if (this.inputNode) {
            this.inputNode.click();
            this.inputNode.value = ''; // flush the value of input type file
        }
    }

    componentDidMount () {
        this.inputNode = ReactDOM.findDOMNode(this.input);
    }

    render () {
        const { children, onFiles, ...props } = this.props; // eslint-disable-line
        return (
            <Button {...props} onClick={this.onClick}>
                { children }
                <FileInput
                    type="file"
                    ref={ input => { this.input = input; }}
                    onChange={onFiles}
                />
            </Button>
        );
    }
}

export default FileButtonContainer;
