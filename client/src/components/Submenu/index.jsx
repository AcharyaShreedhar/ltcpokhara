import React from 'react'
import PropTypes from 'prop-types'
import {  addMenuItems } from '../../services/config.js'
import './Submenu.scss'

const Submenu = ({ role, onClick, onClose }) => (
  <div className="sub-menu">
    <div className="sub-menu-backdrop" onClick={() => onClose()} />
    <ul className="list-group py-5 px-4 m-0">
     

       <p className="dsl-w14 mt-3">Add</p>
      {addMenuItems.map((menu, index) => (
        <a
          key={`add-menu-${index}`}
          className="list-group-item dsl-w14"
          href={menu.url}
          onClick={() => onClick(menu)}
        >
          {menu.label}
        </a>
      ))}
    </ul>
  </div>
)

Submenu.propTypes = {
  role: PropTypes.number,
  onClose: PropTypes.func,
  onClick: PropTypes.func.isRequired,
}

Submenu.defaultProps = {
  role: 1,
  onClose: () => {},
  onClick: () => {},
}

export default Submenu
