import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import styleConstructor from './style';
import { weekDayNames } from '../../dateutils';

class CalendarHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
    weekNumbers: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.month.toString('yyyy MM') !==
      this.props.month.toString('yyyy MM')
    ) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    if (nextProps.isCalendarVisible !== this.props.isCalendarVisible) {
      return true;
    }
    return false;
  }

  render() {
    console.log('my week days', this.props.isCalendarVisible)
    let weekDaysNames = []
    if (this.props.isCalendarVisible) {
      weekDaysNames = weekDayNames(this.props.firstDay);
    }
    let indicator;
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator />;
    }
    return (
      <View>
        <View style={this.style.header}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => this.props.toggleCalendar()}
          >
            <Text style={this.style.monthText}>
              {this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'MMMM yyyy')}
            </Text>
            <Image style={{ width: 20, height: 20 }} source={require('../img/arrowDown.png')} />
            {indicator}
          </TouchableOpacity>
        </View>
        {
          !this.props.hideDayNames &&
          <View style={this.style.week}>
            {this.props.weekNumbers && <Text style={this.style.dayHeader}></Text>}
            {weekDaysNames.map((day, idx) => (
              <Text key={idx} style={this.style.dayHeader} numberOfLines={1}>{day}</Text>
            ))}
          </View>
        }
      </View>
    );
  }
}

export default CalendarHeader;
