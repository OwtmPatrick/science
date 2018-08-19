import React, { Component } from 'react';
import PropTypes from 'prop-types';

class View extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked:false
        }
    }

    setClicked=(event)=> {
        this.setState({
            clicked:!this.state.clicked
        });
        this.props.updateView(this.state.clicked);
    };

    render() {
        return  this.state.clicked
            ?
            null
            :
            <button onClick={this.setClicked}>View more</button>
    }
}

View.propTypes = {
    updateView: PropTypes.func.isRequired
};

export default View