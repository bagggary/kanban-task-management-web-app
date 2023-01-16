import React from 'react'
import darkLogo from '/src/assets/icons/logo-dark.svg'
import lightLogo from '/src/assets/icons/logo-light.svg'
import mobileLogo from '/src/assets/icons/logo-mobile.svg'

export default function Navbar(){
return (
    <nav>
        <div className="logo">
        <picture>
                    <source 
                        srcset={darkLogo}
                        media="(min-width: 600px)"
                    />
                    <img 
                        src={mobileLogo}
                        alt="logo"
                    />
        </picture>
        </div>
    </nav>
)
}
