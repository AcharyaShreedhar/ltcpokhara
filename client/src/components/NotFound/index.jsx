import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import './NotFound.scss'

const NotFound = (props) => (
   
  <div className="not-found">
    <span className="dsl-w36 text-400 mb-3 z1">Tune-up underway.</span>
    <span className="dsl-w18 text-200 mb-5 z1">
      This page will be improved and back on the track soon.
    </span>
    <Button className="ds-btn go-back z1" onClick={() => props.history.goBack()}>
      GO BACK
    </Button>
    <span className="dsl-w12 text-200 text-center error-code z1">error code: </span>
  </div>
)

NotFound.propTypes = {
  description: PropTypes.string,
}

NotFound.defaultProps = {
  description: 'पशु सेवा तालिम केन्द्र पोखरा, नेपाल',
}

export default NotFound
