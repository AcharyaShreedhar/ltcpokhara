import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'
import {Icon} from '../../components'

class CustomInput extends Component {
  render() {
    const { value, onClick, placeholder } = this.props
    return (
      <button className="custom-input" onClick={onClick}>
        {isEmpty(value) ? <Fragment>{placeholder}</Fragment> : <Fragment>{value}</Fragment>}
        <Icon name="fal fa-angle-down mx-1" color="#969faa" size={15} />
      </button>
    )
  }
}

CustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
}

CustomInput.defaultProps = {
  onClick: () => {},
  value: '',
  placeholder: 'Select',
}

export default CustomInput
