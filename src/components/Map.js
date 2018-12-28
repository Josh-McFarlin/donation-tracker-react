import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


class Map extends React.Component {
    render() {
        const { markers, onMarkerClick, center, ...rest } = this.props;

        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={center}
                {...rest}
            >
                {
                    markers.map((marker, index) =>
                        <Marker
                            position={{
                                lat: marker.latitude,
                                lng: marker.longitude
                            }}
                            onClick={() => onMarkerClick(marker)}
                            key={'marker' + index}
                        />
                    )
                }
            </GoogleMap>
        );
    }
}

Map.propTypes = {
    markers: PropTypes.array.isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }).isRequired
};

Map.defaultProps = {
    center: {           // Atlanta's coordinates
        lat: 33.7490,
        lng: -84.3880
    }
};

export default withScriptjs(withGoogleMap(Map));
