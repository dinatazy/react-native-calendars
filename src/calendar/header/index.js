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
    weekNumbers: PropTypes.bool,
    onTodayPress: PropTypes.func,
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

  onTodayPress() {
    if (this.props.onTodayPress) {
      this.props.onTodayPress(XDate());
    }
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
          <Text style={this.style.monthText}>
            {this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'MMMM yyyy')}
          </Text>
          <TouchableOpacity
            style={this.style.todayBtn}
            onPress={() => { this.onTodayPress() }}
          >
            <Text style={this.style.todayText}>Heute</Text>
          </TouchableOpacity>
          <View style={{ width: 100 }}></View>
        </View>
      </View>
    );
  }
}

export default CalendarHeader;
