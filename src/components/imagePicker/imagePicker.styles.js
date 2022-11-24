import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        width: '30%',
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
      }
})

export default styles