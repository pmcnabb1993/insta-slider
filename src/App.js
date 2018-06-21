import React, { Component } from 'react';
import request from 'superagent';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.css';

require('dotenv').config()

const BackArrow = (props) => (
  <div onClick={props.previousImage} style={{fontSize: '2em', marginRight: '12px'}}>
    <i className="fa fa-angle-left fa-2x" aria-hidden="true"></i>
  </div>
)

const NextArrow = (props) => (
  <div onClick={props.nextImage} style={{fontSize: '2em', marginLeft: '12px'}}>
    <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      slideCount: 0
    }
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
  }

  componentWillMount() {
    this.fetchPhotos();
  }


  fetchPhotos() {
    request
      .get('https://api.instagram.com/v1/users/self/media/recent/?access_token=13513630.1677ed0.6a4397a93e4e493994d966a7fa09aeae')
      .then((res) => {
        this.setState({
          photos: res.body.data
        })
      })
  }

  nextImage() {
    this.setState({ slideCount: this.state.slideCount + 1 })
    
  }

  previousImage() {
    this.setState({ slideCount: this.state.slideCount - 1 })
    
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to InstaSlider</h1>
        </header>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop: '30px'}}>
          {this.state.slideCount !== 0 ? <BackArrow previousImage={this.previousImage}/> : ''}
          {this.state.photos.map((photo, key) => {
            if (this.state.photos.indexOf(photo) === this.state.slideCount) {
            return (
              <div key={photo.id} style={{margin: '0 auto'}}>
              <img src={photo.images.standard_resolution.url} alt=''/>
              <div style={{width:'600px', margin: '24px auto', fontStyle: 'italic'}}>
               {photo.caption !== null ? photo.caption.text : ''}
             </div>
           </div>
         )
       }
     return ''
   })}
   {this.state.slideCount !== (this.state.photos.length - 1) ? <NextArrow nextImage={this.nextImage}/> : ''} </div>
    </div>
    );

  }
}

export default App;
