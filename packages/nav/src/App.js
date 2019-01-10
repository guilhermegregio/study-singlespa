import {navigateToUrl} from 'single-spa';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const styles = {
  root: {
    width: 500,
  },
};

class LabelBottomNavigation extends React.Component {
  state = {
    value: 'calendar',
  };

  handleChange = (event, value) => {
    this.setState({value});
    navigateToUrl(value);
  };

  render() {
    const {classes} = this.props;
    const {value} = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        className={classes.root}>
        <BottomNavigationAction
          label="Calendar"
          value="calendar"
          icon={<CalendarToday />}
        />
        <BottomNavigationAction
          label="Checkout"
          value="checkout"
		  icon={<ShoppingCart />}
        />
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);
