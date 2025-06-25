import { ColorValue, DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import Animated from "react-native-reanimated"

type Props = {
    color: ColorValue,
    size: DimensionValue,
    top: DimensionValue,
    left: DimensionValue,
    zIndex: number,
    animatedStyle?: StyleProp<ViewStyle>,
}
export default function CirclePlacer({color, size, top, left, zIndex, animatedStyle}: Props) {
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            backgroundColor: color,
            borderRadius: 200,
            height: size,
            width: size,
            top,
            left,
            zIndex
        }
    })
    return (<Animated.View style={[styles.container, animatedStyle ?? {} ]}/>)
}