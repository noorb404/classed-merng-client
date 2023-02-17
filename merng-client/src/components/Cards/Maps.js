import React , {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
   
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
   
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
   
    render() {
      return (
        <div style={{width:'50vw',height:'50vh'}}>

                <Map google={this.props.google}
                    initialCenter={{
                        lat:32.7785455,
                        lng:35.0264707
                    }}
                    >
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
        
                
                </Map>

        </div>

      )
    }
  }
  export default GoogleApiWrapper({
    apiKey: ('AIzaSyDA7AxoJQJFC1SGB-xhrhY-IjswJtLn98k')
  })(MapContainer)