import { StyleSheet, Platform } from 'react-native';
import * as defaultStyle from '../style';

const STYLESHEET_ID = 'stylesheet.calendar.main';

export default function getStyle(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme };
  return StyleSheet.create({
    container: {
      backgroundColor: appStyle.calendarBackground
    },
    subContainer: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
    },
    week: {
      marginTop: 7,
      marginBottom: 7,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    arrow: {
      padding: 10
    },
    arrowImage: {
      ...Platform.select({
        ios: {
          tintColor: appStyle.arrowColor
        },
        android: {
          tintColor: appStyle.arrowColor
        }
      }),
      height: 15,
    },
    week: {
      //marginTop: 7,
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: 7
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 32,
      textAlign: 'center',
      fontSize: appStyle.textDayHeaderFontSize,
      fontFamily: appStyle.textDayHeaderFontFamily,
      color: appStyle.textSectionTitleColor
    },

    shiftTypeContainer: {
      flexDirection: 'row'
    },
    shiftTypeColorContainer: {
      width: 15,
      height: 15,
      marginLeft: 10,
      marginRight: 10
    },

    shiftTypeText: {
      fontFamily: 'voestalpine-light',
      color: '#4A4A4A',
      fontSize: 14
    },

    morning: {
      backgroundColor: '#87D25A',
    },

    afternoon: {
      backgroundColor: '#A5A5A5',
    },

    night: {
      backgroundColor: '#E2CF30'
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}

