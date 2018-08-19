import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Video from './Video';

import images from '../data/images';
import play from '../data/img/play.png';

class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
            videoOpen:false
        }
    }

    setVideoOpen=(event)=> {
        this.setState({
            videoOpen:!this.state.videoOpen
        });
    };

    getImage = (url) => {
        let index = url[11];
        if (typeof index !== 'undefined') return images[Number(index)];
        return images[0];
    };

    render() {
        return  <li className="article" >
            <div onClick={this.setVideoOpen}>
                <img  className={
                    this.props.video ?
                        "article-video"
                        :
                        "article-image"
                }
                      src={this.getImage(this.props.image)}
                      width="900"
                      height="600"
                />
                {
                    this.props.video ?
                        <img className="play" src={play}/>
                        :
                        null
                }
            </div>
            <div className="article-info">
                <div className="article-name">{this.props.section}</div>
                <div className="article-title">{this.props.title}</div>
                <div className="article-content">{this.props.content}</div>
            </div>
            {this.state.videoOpen&&this.props.video
                ?
                <div onClick={this.setVideoOpen}>
                    <Video videoSrc={this.props.video}/>
                </div>
                :
                null
            }
        </li>
    }
}

Article.propTypes = {
    image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default Article