import {StyleSheet, Dimensions} from "react-native";
import {isTablet, scale, verticalScale} from "../../../utils/dimensions";

const { width, height} = Dimensions.get("window");

export default StyleSheet.create({
    gradient: {
        flex: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: verticalScale(70),
    },

    title:{
        textAlign:"center",
        fontSize:25,
        color:"#fff",
        fontWeight:"bold",
    },

    sub:{
        marginTop:"5%",
        fontSize:20,
        color:"#fff",
        fontWeight:"500",
        fontStyle:'italic'
    },

    logo: {
        width: isTablet ? scale(180) : scale(160),
        height: isTablet ? scale(180) : scale(160),
        marginBottom: verticalScale(10),
        marginTop: verticalScale(40),
    },

    inputBox:{
        marginTop:"3%",
        width:'90%'
    },

    input:{
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 15,
        padding: 18,
        fontSize: 16,
        color: '#333',
        width: '100%',
        outlineStyle: 'none',
    },

    skip:{
        alignItems:'flex-end',
    },

    text:{
        color:"#fff",
        fontSize:20,
        fontWeight:"500",
    },

    submit:{
        position: "absolute",
        bottom: height * 0.05,
        padding: 20,
        marginTop:"5%",
        width:width*0.9,
        backgroundColor:'#fff',
        borderRadius:25,
    },

    buttonText:{
        textAlign:'center',
        color:'#0AD8A2',
        fontSize:20
    },

    skipText: {
        color: "#fff",
        fontSize: 16,
        marginTop: 10,
    },
});
