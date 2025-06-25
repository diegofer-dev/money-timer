import { useThemeColor } from "@/hooks/useThemeColor"
import { DimensionValue, Pressable, StyleProp, StyleSheet } from "react-native"
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

type Props = {
    value: 0 | 1,
    onPress: () => void,
    duration: number,
    style: any,
}
export default function AnimatedSwitch({ value, onPress, duration, style }: Props) {
    const height = useSharedValue(0)
    const width = useSharedValue(0)
    const primaryColor = useThemeColor('primary')
    const secondaryColor = useThemeColor('secondary')

    const trackAnimatedStyle = useAnimatedStyle(() => {
        const color = interpolateColor(value, [0, 1], [primaryColor, secondaryColor])
        const colorValue = withTiming(color, { duration })

        return {
            backgroundColor: colorValue,
            borderRadius: height.value / 2
        }
    })

    const thumbAnimatedStyle = useAnimatedStyle(() => {
        const moveValue = interpolate(value, [0, 1], [0, width.value - height.value])
        const translateValue = withTiming(moveValue, { duration })
        return {
            transform: [{ translateX: translateValue }],
            borderRadius: height.value / 2
        }
    })

    const switchStyles = StyleSheet.create({
        track: {
            alignItems: 'flex-start',
            width: 100,
            height: 40,
            padding: 5,
        },
        thumb: {
            height: '100%',
            aspectRatio: 1,
            backgroundColor: 'white',
        },
    });

    return <Pressable onPress={onPress}>
        <Animated.View
            onLayout={(e) => {
                height.value = e.nativeEvent.layout.height
                width.value = e.nativeEvent.layout.width
            }}
            style={[switchStyles.track, style, trackAnimatedStyle]}>
            <Animated.View style={[switchStyles.thumb, thumbAnimatedStyle]}>
            </Animated.View>
        </Animated.View>
    </Pressable>
}