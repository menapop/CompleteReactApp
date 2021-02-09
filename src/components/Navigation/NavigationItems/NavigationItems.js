import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact active>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/Orders">Orders</NavigationItem>: null}
        {!props.isAuthenticated ?
          <NavigationItem link="/Auth">Authentication</NavigationItem>
         :<NavigationItem link="/logout">logout</NavigationItem>
        }
    </ul>

);

export default navigationItems;