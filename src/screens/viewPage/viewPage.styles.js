import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '40%',
        marginTop: -30,
        backgroundColor: colors.black

    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 10, 
        borderTopColor: colors.veryLightGrey, 
        borderTopWidth: 1, 
        margin: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: colors.lightGreyHex,
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
      optionsContainer: {
        flexDirection: 'row',
        width: 250,
        marginVertical: 10,
        paddingBottom: 15,
      },
})

export default styles