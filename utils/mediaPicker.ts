import * as ImagePicker from 'expo-image-picker';

export async function mediaPicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Solo deja seleccionar imagenes
        allowsEditing: true, // Te permite cropearlas
        quality: 1
    })
    if(result.canceled){
        alert('No image was selected')
        return {
            uri: '',
            height: 0,
            width: 0
        }
    } 
    const {uri, width, height} = result.assets[0]
    return {
        uri,
        width,
        height
    }
    

}