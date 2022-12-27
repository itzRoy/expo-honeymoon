import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        width: '27%',
        height: 160,
        marginLeft: 20,
        // aspectRatio: 9 / 14,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 15,
      
      },
      dashed: {
        borderStyle: 'dashed',
        borderColor: '#86939e',
        borderWidth: 2
      },
      dashedText: {
        color: '#86939e',
        fontSize: 26,
        fontWeight: 'bold',
        flexGrow: 1,
        textAlign: 'center',
        marginTop: '50%'
      },
      imageStyle: {
        width: '100%',
        height: '100%',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      optionsContainer: {
        flexDirection: 'row',
        width: 250,
        marginVertical: 10,
        flexWrap: 'wrap',
        borderBottomColor: colors.primaryColor,
        borderBottomWidth: 0.5,
        paddingBottom: 15,
      },
      optionsTitle: {
        alignItems: 'flex-start',
      },
      btnWraper: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10
      },
      modalView: {
        margin: 20,
        backgroundColor: colors.lightGreyHex,
        width: 200,
        height:100,
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: colors.primaryColor,
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        width: '100%'
      },
      seperator: {
        width: '90%',
        height: 0.2,
        backgroundColor: "#000",
      }
})

export default styles