import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        width: 160,
        marginLeft: 25,
        aspectRatio: 9 / 14,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 15,
        backgroundColor: colors.bluey 
      },
      imageStyle: {
        width: '100%',
        height: '100%',
      },
      inputContainer: {
        flexDirection: 'row',
        width: '95%',
        alignItems: 'baseline',
        paddingVertical: 10,
      },
      textLabel: {
        fontSize: 20,
        marginHorizontal: 10,
        color: '#86939e',
        
      },
      textInput: {
        backgroundColor: colors.lightGrey,
        borderBottomColor: colors.veryLightGrey,
        borderBottomWidth: 2,
        fontSize: 22,
        width: '100%',
        marginHorizontal: 10
      }
})

export default styles