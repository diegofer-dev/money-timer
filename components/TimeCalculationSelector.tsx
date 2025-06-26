import { useThemeColor } from "@/hooks/useThemeColor"
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import Animated, { interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"


type Props = {
    onChange: (calculation: 'yearly' | 'monthly' | 'daily') => void
}
export default function TimeCalculationSelector({ onChange }: Props) {
    const secondaryColor = useThemeColor('secondary')
    const [calculation, setCalculation] = useState<'daily' | 'monthly' | 'yearly'>('daily')
    const [calculationIndex, setCalculationIndex] = useState<number>(0)
    const translationBall1 = useSharedValue(200) // Valores: 
    const translationBall2 = useSharedValue(300)

    const onPressBall1 = () => {
        if (calculationIndex === 0) {
            setCalculationIndex(1)
            translationBall1.value = withTiming(-200, { duration: 200 })
            translationBall2.value = withTiming(200, { duration: 200 })
        } else if(calculationIndex === 1){
            setCalculationIndex(0)
            translationBall1.value = withTiming(200, { duration: 200 })
            translationBall2.value = withTiming(300, { duration: 200 })
        } else if (calculationIndex === 2) {
            setCalculationIndex(0)
            translationBall1.value = withTiming(200, { duration: 200 })
            translationBall2.value = withTiming(300, { duration: 200 })
        }
    }

    const onPressBall2 = () => {
        if (calculationIndex === 0) {
            setCalculationIndex(2)
            translationBall1.value = withTiming(-300, { duration: 200 })
            translationBall2.value = withTiming(-200, { duration: 200 })
        } else if(calculationIndex === 1) {
            setCalculationIndex(2)
            translationBall1.value = withTiming(-300, { duration: 200 })
            translationBall2.value = withTiming(-200, { duration: 200 })
        } else if(calculationIndex === 2){
            setCalculationIndex(1)
            translationBall1.value = withTiming(-200, { duration: 200 })
            translationBall2.value = withTiming(200, { duration: 200 })
        }
    }

    useEffect(() => {
        if (calculationIndex === 0) {
            setCalculation('daily')
            
        } else if (calculationIndex === 1) {
            setCalculation('monthly')
        } else if (calculationIndex === 2) {
            setCalculation('yearly')
        }
    }, [calculationIndex])
    useEffect(() => onChange(calculation), [calculation])

    const formatDate = (calculation: 'daily' | 'monthly' | 'yearly') => {
        const date = new Date();

        const options: Record<typeof calculation, Intl.DateTimeFormatOptions> = {
            daily: { day: 'numeric', month: 'long', year: 'numeric' },
            monthly: { month: 'long', year: 'numeric' },
            yearly: { year: 'numeric' }
        };
        const formatted = date.toLocaleDateString('es-ES', options[calculation]);
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }
    const translateBall1Style = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: `${translationBall1.value}%`
                },
                {
                    scale: Math.abs(translationBall1.value)/300
                }
            ]
        }
    })
    const translateBall2Style = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: `${translationBall2.value}%`
                },
                {
                    scale: Math.abs(translationBall2.value)/300
                }
            ]
        }
    })
    const textColor = useThemeColor('text')
    const dayColor = useThemeColor('dayColor')
    const monthColor = useThemeColor('monthColor')
    const yearColor = useThemeColor('yearColor')
    const setBackgroundColorBall1 = (index: number): StyleProp<ViewStyle> => {
        if (index === 0) {
            return {
                backgroundColor: monthColor
            }
        } else if(index === 1){
            return {
                backgroundColor: dayColor
            }
        } else if (index === 2) {
            return {
                backgroundColor: dayColor
            }
        }
    }

    const setBackgroundColorBall2 = (index: number): StyleProp<ViewStyle> => {
        if (index === 0) {
            return {
                backgroundColor: yearColor
            }
        } else if(index === 1){
            return {
                backgroundColor: yearColor
            }
        } else if (index === 2) {
            return {
                backgroundColor: monthColor
            }
        }
    }
    const setBackgroundColorText = (index: number): StyleProp<ViewStyle> => {
        if (index === 0) {
            return {
                backgroundColor: dayColor
            }
        } else if(index === 1){
            return {
                backgroundColor: monthColor
            }
        } else if (index === 2) {
            return {
                backgroundColor: yearColor
            }
        }
    }
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: 10
        },

        textContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 50,
            backgroundColor: secondaryColor,
            width: 150,
            zIndex: 2
        },
        imageStyle: {
            height: 57,
            width: 57,
            borderRadius: 60
        }
    })

    return (
        <View style={styles.container}>  
            <View style={[styles.textContainer, setBackgroundColorText(calculationIndex)]}><Text style={{ color: textColor, fontSize: 12 }}>{formatDate(calculation)}</Text></View>
            <Animated.View style={[{position: 'absolute'}, translateBall1Style]}>
                <Pressable onPress={onPressBall1}>
                    <View style={[styles.imageStyle, setBackgroundColorBall1(calculationIndex)]} />
                </Pressable>
            </Animated.View>
            <Animated.View style={[{position: 'absolute'}, translateBall2Style]}>
                <Pressable onPress={onPressBall2}>
                    <View style={[styles.imageStyle, setBackgroundColorBall2(calculationIndex)]} />
                </Pressable>
            </Animated.View>
        </View>)
}