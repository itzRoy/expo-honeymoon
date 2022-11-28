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
        marginBottom: 5,
        backgroundColor: colors.bluey
    },
    date: {
        fontSize: 12,
        color: colors.caption,
        textAlign: 'center',
        marginBottom: 15
    },
    textParent: { 
        width: '100%', 
        flexDirection: 'column',
        height: 70,
        position: 'absolute', 
        bottom: 0, 
        left: 0,
        backgroundColor: colors.black, 
        opacity: .3,
        },
        text: {
            marginBottom: 10,
            fontSize: 15,
            color: colors.white,
        },
        category: {
            textAlign: 'right',
            marginLeft: 10,
            fontSize: 10,
            color: colors.white
        },
    indicator: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        left: 10,
        zIndex: 3,
    },
    bgColor: {
        padding: 5,
        marginRight: 5,
        borderRadius: 50,

    },
    insideView: {
        position: 'absolute',
        whidth: '100%',
    },
    insideContainer: {
        justifyContent: 'space-between',
        height: '100%',
        padding: 5,
    },
    topContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    marginTop: {
        marginTop: 5,
    },
});

export default styles