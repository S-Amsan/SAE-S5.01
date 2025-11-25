import {StyleSheet, Dimensions} from "react-native";

const { width, height} = Dimensions.get("window");
export default StyleSheet.create({
    gradient: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        minHeight: height,
    },
    logo: {
        width: 240,
        height: 240,
    },
    FormContainer:{
        padding: 40,
        borderRadius: 45,
        backgroundColor: 'white',
        width: width * 0.25,
        minHeight: 600,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00DB83',
        marginBottom: 15,
        textAlign: 'center',
    },
    inputGroup: {
        width: '100%',
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 5,
    },
    textInput: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 15,
        padding: 18,
        fontSize: 16,
        color: '#333',
        width: '100%',
    },
    // Styles pour le champ téléphone
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 15,
        overflow: 'hidden',
    },
    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9ECEF',
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderRightWidth: 1,
        borderRightColor: '#DEE2E6',
    },
    countryFlag: {
        fontSize: 16,
        marginRight: 8,
    },
    countryCodeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    phoneInput: {
        flex: 1,
        padding: 18,
        fontSize: 16,
        color: '#333',
    },
    phoneHint: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        marginLeft: 5,
    },
    // Styles pour le champ mot de passe
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 15,
        overflow: 'hidden',
    },
    passwordInput: {
        flex: 1,
        padding: 18,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        padding: 18,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '20%',
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#00DB83',
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    countryName: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    countryDialCode: {
        fontSize: 16,
        color: '#666',
    },
    closeButton: {
        backgroundColor: '#00DB83',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryButton: {
        borderRadius: 25,
        width: '100%',
        marginTop: 20,
        marginBottom: 25,
        overflow: 'hidden',
    },
    gradientButton: {
        padding: 18,
        alignItems: 'center',
        borderRadius: 25,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: 16,
    },
    loginLink: {
        color: '#00DB83',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});