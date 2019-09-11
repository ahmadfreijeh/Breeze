import { StyleSheet,Dimensions } from "react-native"
import colors from '../Colors'

const MainStyles = StyleSheet.create({
    container: {},
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
  
    mainWrapper: {
      flex: 1,
      padding: 8,
    },
    childWrapper: {
      flex: 1,
      alignItems: 'center',
    },
    topWrapper: {
      justifyContent: 'center',
    },
    midWrapper: {
      flexDirection: 'row',
      paddingBottom: 10,
    },
    bottomWrapper: {
      alignItems: 'center',
      borderTopWidth: 0.7,
      borderTopColor: colors.WHITE,
      paddingBottom: 10,
      paddingTop: 10,
      paddingRight: 10,
      paddingLeft: 7,
    },
    tempText: {
      color: colors.WHITE,
      fontSize: 70,
    },
    dateText: {
      color: colors.WHITE,
      paddingBottom: 10,
    },
    summaryText: {
      color: colors.WHITE,
      fontSize: 20,
    },
    countryText: {
      color: colors.WHITE,
      fontSize: 15,
    },
  
    /**
     * Modal Styles
     */
    modalWrapper: {
      height: Math.round(Dimensions.get('window').height),
      backgroundColor: colors.WHITE,
      justifyContent: 'center',
      paddingLeft: 12,
      paddingRight: 12,
    },
    modalPicker: {
      height: 50,
      width: '100%',
    },
    modalActionsWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingTop: 10,
      paddingRight: 20,
    },
    modalText: {
      color: colors.MATERIAL_GREEN,
      fontSize: 16,
    },
});

export { MainStyles }    