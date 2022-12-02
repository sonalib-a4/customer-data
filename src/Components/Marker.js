import React from 'react';
import PropTypes from 'prop-types';

const Marker = (props) => {
  console.log(props)
  return(
    <div
    alt={props.text}
    style={{
      "position": "absolute",
      "top": "50%",
      "left": "50%",
      "width": "20px",
      "height": "20px",
      "backgroundColor": "blue",
      "border": "2px solid #fff",
      "borderRadius": "100%",
      "userSelect": "none",
      "transform": "translate(-50%, -50%)",
      "cursor": `${(props) => (props.onClick ? 'pointer' : 'default')}`,
      "text-align": "center",
      "color": "white",
      "font-weight": "bold",
    }}
  >{props.number}</div>
  )
}


Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Marker;
