import React, { Component } from 'react';

import Filter from './components/Filter';
import Article from './components/Article';
import View from './components/View';

import ARTICLES from './data/articles';

import './style.css';

const FILTER1 = ["All specialities", "Spine", "Trauma","Ortho", "Dental"];
const FILTER2 = ["All sections", "Case Study", "Product Information", "Abstract summary"];
const FILTER3 = ["All audiences","Physics","Chemists"];


export default class ArticlesList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: ARTICLES,
            filterText: '',
            filterSpeciality: '',
            filterSection: '',
            filterAudience: '',
            viewAll: false
        }
    }

    setFilterText=(event)=> {
        this.setState({
            filterText: event.target.value.toLowerCase()
        });
    };

    setFilterSpeciality=(event)=> {
        this.setState({
            filterSpeciality: event.target.value.toLowerCase()
        });
    };

    setFilterSection=(event)=> {
        this.setState({
            filterSection: event.target.value.toLowerCase()
        });
    };

    setFilterAudience=(event)=> {
        this.setState({
            filterAudience: event.target.value.toLowerCase()
        });
    };

    setViewAll=()=> {
        this.setState({
            viewAll:!this.state.viewAll
        });
    };

    filterUsers=()=> {
        let articles = this.state.data;

        if(this.state.filterText.length){
            articles = articles.filter((article)=>{
                var handleSearch=this.state.filterText;
                return (article.title.toLowerCase().indexOf(handleSearch)!==-1
                ||
                article.content.toLowerCase().indexOf(handleSearch)!==-1);
            });
        }
        if (this.state.filterSpeciality!=="all specialities") {
            articles =articles.filter((article)=>{
                var handleSearch=this.state.filterSpeciality;
                return (article.speciality.toLowerCase().indexOf(handleSearch)!==-1);
            });
        }
        if (this.state.filterSection!=="all sections") {
            articles =articles.filter((article)=>{
                var handleSearch=this.state.filterSection;
                return (article.section.toLowerCase().indexOf(handleSearch)!==-1);
            });
        }
        if (this.state.filterAudience!=="all audiences") {
            articles =articles.filter((article)=>{
                var handleSearch=this.state.filterAudience;
                return (article.audience.toLowerCase().indexOf(handleSearch)!==-1);
            });
        }
        return articles;
    };

    render() {
        let articles = this.state.viewAll
            ?
            this.filterUsers()
            :
            this.filterUsers().slice(0, 3);

        return  <div>
            <div className="filter">
                <div className="container">
                    <div className="container-filter">
                        <p className="filter-name">Search the Academy by keyword:</p>
                        <input  type="text" className="filter-text" placeholder="Enter keyword" onChange={this.setFilterText} />
                    </div>
                    <div className="container-filter">
                        <p className="filter-name">Filter content by:</p>
                        <Filter filterName={this.setFilterSpeciality} filterData={FILTER1}/>
                        <Filter filterName={this.setFilterSection}    filterData={FILTER2}/>
                        <Filter filterName={this.setFilterAudience}   filterData={FILTER3}/>
                    </div>
                </div>
            </div>
            <div className="container">
                <p className="title-articles">Study materials</p>
                <ul className="articles-list">
                    {
                        articles.map(function(el,i){
                            return   <Article key={i}
                                              image={el.image}
                                              section={el.section}
                                              title={el.title}
                                              content={el.content}
                                              video={el.video}
                            />;
                        })
                    }
                </ul>
                <View updateView={this.setViewAll} />
            </div>
        </div>;
    }
};