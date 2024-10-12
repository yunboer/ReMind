import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

export default function NavBar({ navListL, navListR }) {

    return (
        <div className="nav-bar">
            <div>
                {
                    navListL.map((nav, i) => {
                        return <NavLink key={i} to={nav.to}>{nav.text}</NavLink>
                    })
                }
            </div>
            <div>
                {
                    navListR.map((nav, i) => {
                        return <NavLink key={i} to={nav.to}>{nav.text}</NavLink>
                    })
                }
            </div>
        </div>
    )
}
