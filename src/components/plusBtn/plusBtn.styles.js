import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
    parent:{
        width: 24,
        height: 24,
        marginLeft: 5,
    },
    hor:{
        width: '100%',
        height: 1.5,
        backgroundColor: colors.black,
        top: 10.75,
        position: 'absolute'
    },
    ver: {
    
            height: '100%',
            width: 1.5,
            backgroundColor: colors.black,
            left: 10.75,
            position: 'absolute'
        
    }
})

export default styles