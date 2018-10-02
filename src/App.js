import React, { Component } from 'react';
import './App.css'
import Profile from './Profile';
import Gallery from './gallery';
import {FormGroup,FormControl,InputGroup,Glyphicon} from 'react-bootstrap';


class App extends Component{
        constructor(props){
            super(props);
            this.state={
                query: '',
                artist: null,
                tracks: []

            }
        }

search(){
    console.log('this.state',this.state);
    const BASE_URL='https://api.spotify.com/v1/search?';
    let FETCH_URL=`${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL='https://api.spotify.com/v1/artists/';
    var accessToken='BQC0nSq7Q_cN3eEYnlEoOqIQ4XjMxNqXAfmGK4UKhw5ldb4Mu6nZAMMILlnin3G7lw5YweTm_aEx2OcTmmYll_rXwTfDZsulz7JBUFQQY64hvEnV8PavNLHTp4zmqCHD1EI93DtBvNPOmdwXhMxcna6BNtFCZGUuuPVKpJTAO12uCXegY9cCTKhc&refresh_token=AQD7zjZgJ6uLGxZf_3xo__wKiUyQXhtx_NP-qjc0O4emTaDKmQNP8brHgVODUjvvNYuRCdiy14U2bjbvL4IrFSlMv2Be2FjC3ZkDSvxfVohzA0H-5N3e6i0_xUs3tWOuQrXx0w';
    var myOptions={
      method: 'GET',
      headers :{
        'Authorization' : 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };
    var myOptions1={
      method: 'GET',
      headers :{
        'Authorization' : 'Bearer ' + accessToken
      }}
    
    fetch(FETCH_URL,myOptions)
    .then(response =>response.json())
    .then(json=>
      {
        const artist=json.artists.items[0];
        console.log(artist);
        this.setState({artist});

        FETCH_URL=`${ALBUM_URL}${artist.id}/top-tracks?country=US&`


        fetch(FETCH_URL,myOptions1)
        .then(response => response.json())
        .then(json => {
          console.log('artist\'s top tracks :' ,json );
          const tracks=json.tracks;
          this.setState({tracks})
        })
      
    });
  }
        render(){
            return(
                <div className="App">
                    <div className="App-title">Music Master</div>
                    <FormGroup>
                        <InputGroup>
                        <FormControl
                        type="text"
                        placeholder="Search for an Artist" 
                        value={this.state.query}
                        onChange={event =>{this.setState({query:event.target.value})}}
                        onKeyPress={event =>{
                            if (event.key ==='Enter'){
                                this.search()
                            }
                        }}
                        />
                        <InputGroup.Addon>
                            <Glyphicon glyph="search" onClick={()=>this.search()}></Glyphicon>
                        </InputGroup.Addon>
                        
                        </InputGroup>
                    </FormGroup>
                    {
                      this.state.artist !==null ?
                    <div>
                    <Profile 
                    artist={this.state.artist}/>
                    <Gallery
                    tracks={this.state.tracks}
                    />
                    </div>
                    : <div></div>
                    }

                </div>
            )
        }

}
export default App

