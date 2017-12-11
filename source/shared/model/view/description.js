import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setField, commitNames } from 'shared/model/reducer';
import {
    getNodeForDescription,
    getPreview } from 'shared/model/selectors';

import {
    NODE_NAME,
    NODE_DESCRIPTION,
    NODE_NAME_ID } from 'shared/model/constants';

import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const Description = styled(Paper)`
    display: flex;
    flex-direction: column;
    padding: 10px;
    marginTop: 10px;
`;

const Text = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    min-height: 130px;
    border: solid ${props => props.error ? '2px #ff1744' : '1px rgba(0, 0, 0, 0.42)'};
    margin: ${props => props.error ? 'none' : '1px'};
`;
// TODO: remove props

const styles = () => ({
    formControl: {
        paddingBottom: 20,
    },
    textareaContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    textarea: {
        flex: 1,
        border: 'none',
        paddingTop: 10,
        outline: 'none',
    },
    input: {
        paddingLeft: 10,
    },
});

const DescriptionContainer = ({
    name,
    description,
    onChangeField,
    disabled,
    classes,
    onFocusOut,
}) =>
    <Description>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="title">Name</InputLabel>
            <Input
                className={classes.input}
                id="title"
                onChange={onChangeField(NODE_NAME)}
                value={name}
                disabled={disabled}
                id={NODE_NAME_ID}
                onBlur={onFocusOut}
            />
        </FormControl>
        <FormControl className={classes.textareaContainer}>
            <Text>
                <Typography type="caption">
                    Description
                </Typography>
                <textarea
                    className={ classes.textarea }
                    value={ description }
                    onChange={onChangeField(NODE_DESCRIPTION)}
                    onBlur={onFocusOut}
                />
            </Text>
        </FormControl>
    </Description>;

const mapStateToProps = state => ({
    name: getNodeForDescription(state)[NODE_NAME],
    description: getNodeForDescription(state)[NODE_DESCRIPTION],
    preview: getPreview(state),
});

const mapDispatchToProps = dispatch => ({
    onChangeField: field => e => dispatch(setField({ field, value: e.target.value })),
    onFocusOut: () => dispatch(commitNames()),
});

const noop = () => () => {};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    disabled: stateProps.preview,
    name: stateProps.name,
    description: stateProps.description,
    onFocusOut: dispatchProps.onFocusOut,
    onChangeField: stateProps.preview ? noop : dispatchProps.onChangeField,
});

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(
        DescriptionContainer
    )
);

