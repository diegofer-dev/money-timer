import { PropsWithChildren, useEffect } from "react";
import { DimensionValue, Pressable, StyleSheet, View } from "react-native";
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type Props = PropsWithChildren<{
    height: DimensionValue,
    width: DimensionValue,
    fromSide: 'right' | 'left'
    isOpen: boolean,
    onClose: () => void,
}>
export default function CardView({height, width, children, fromSide, isOpen, onClose}: Props) {
    const translation = useSharedValue(100)

    useEffect(() => {
        if(isOpen){
            translation.value = withTiming(0, {duration: 500, easing: Easing.elastic(1.2)})
        } else {
            translation.value = withTiming(100, {duration: 500, easing: Easing.elastic(1.2)})
        }
    }, [isOpen])

    const leftStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: `${-translation.value}%`
                }
            ]
        }
    })

    const rightStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: `${translation.value}%`
                }
            ]
        }
    })
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            top: '15%',
            height,
            width,
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 10,
            zIndex: 20
        },
        presseableZone: {
            position: 'absolute',
            height: '100%',
            width: '20%',
            //backgroundColor: 'rgba(255.0, 0.0, 0.0, 0.5)'
        }
    })
    switch(fromSide){
        case "left":
            return (
                <Animated.View style={[{left: 0}, leftStyle, styles.container]}>
                    <Pressable style={[!isOpen && {display: 'none'}, {right: '-20%'}, styles.presseableZone]} onPress={onClose}></Pressable>
                    {children}
                </Animated.View>
            )
        case "right":
            return (
                <Animated.View style={[{right: 0}, rightStyle, styles.container]}>
                    <Pressable style={[!isOpen && {display: 'none'}, {left: '-20%'}, styles.presseableZone]} onPress={onClose}></Pressable>
                    {children}
                </Animated.View>
            )
    }
}