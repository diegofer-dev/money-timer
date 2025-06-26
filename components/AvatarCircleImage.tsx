import {Image, ImageSource} from 'expo-image'
import { DimensionValue, Pressable, StyleSheet } from 'react-native'
type Props = {
    onPress: () =>  void,
    size: DimensionValue,
    image: ImageSource
}
export default function AvatarCircleImage({onPress, size, image}: Props) {
    const styles = StyleSheet.create({
        container: {
            borderRadius: 100,
            height: size,
            width: size
        }
    })
    return (
        <Pressable onPress={onPress} >
            <Image style={styles.container} source={image}/>
        </Pressable>
    )
}