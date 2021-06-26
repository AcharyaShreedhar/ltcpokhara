import React from 'react'
import PropTypes from 'prop-types'
import { isNil } from 'ramda'

function Icon(props) {
  let color = '#376caf'
  if (isNil(props.color)) {
    color = props.active ? '#376caf' : '#969faa'
  } else {
    color = props.color
  }
  const styles = {
    color,
    fontSize: props.size,
  }

  return <i className={props.name} style={styles} onClick={() => props.onClick()} />
}

Icon.propTypes = {
  name: PropTypes.string,
  active: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  name: 'fa fa-bell-o',
  active: false,
  color: null,
  size: 12,
  onClick: () => {},
}

export default Icon
