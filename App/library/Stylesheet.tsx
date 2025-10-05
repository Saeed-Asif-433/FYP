import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    username: {
        fontSize: 15,
        fontWeight: 'ultralight',
        color: "#c6121f", // Your chosen text color
        textShadowColor: "#980307", // Your chosen shadow color
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        textTransform: "uppercase", // Optional for a bold look
        letterSpacing: 1, // Adds spacing for better readability
    },
    image: {
        width: '100%',
        height: '100%'
    },
    shaheen: {
        width: '100%',
        height: '110%',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,


    },
    playonline_image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,

    },
    active_friends_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 5,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    online_indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'lime',
        shadowColor: 'lime',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 6,
    },




})