import {StyleSheet, Dimensions} from "react-native";

const { width, height} = Dimensions.get("window");

export default StyleSheet.create({
    gradient: {
        flex: 1,
    },

    container:{
        alignItems:'center',
    },

    title:{
        fontSize:30,
        color:"#fff",
        fontWeight:"bold",
    },

    sub:{
        marginTop:"2%",
        fontSize:25,
        color:"#fff",
        fontWeight:"500",
        fontStyle:'italic'
    },

    logo: {
        marginTop:"2%",
        width: 220,
        height: 220,
    },

    inputBox:{
        marginTop:"2%",
        width:'30%'
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

    nextStep:{
        alignItems:'flex-end',
    },

    text:{
        color:"#fff",
        fontSize:20,
        fontWeight:"500",
    },

    submit:{
        marginTop:"5%",
        width:width*0.15,
        backgroundColor:'#fff',
        padding:15,
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
