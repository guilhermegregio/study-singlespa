import {navigateToUrl} from 'single-spa';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Dashboard from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  root: {
    width: 500,
  },
};

const menu = [
  {
    label: 'Calendário',
    value: 'calendar',
    Icon: () => <CalendarToday />,
  },
  {
    label: 'Checkout',
    value: 'checkout',
    Icon: () => <ShoppingCart />,
  },
  {
    label: 'Dashboard',
    value: 'dashboard',
    Icon: () => <Dashboard />,
  }
];

class LabelBottomNavigation extends React.Component {
  state = {
    value: 'calendar',
  };

  handleChange = value => event => {
    this.setState({value});
    navigateToUrl(value);
  };

  render() {
    return (
      <List>
        {menu.map((item, index) => (
          <ListItem
            button
            key={item.value}
            onClick={this.handleChange(item.value)}>
            <ListItemIcon>{item.Icon()}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);
