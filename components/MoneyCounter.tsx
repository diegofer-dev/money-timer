import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    initialValue: number,
    incrementValue: number
}
export default function MoneyCounter({ initialValue, incrementValue }: Props) {
    const [money, setMoney] = useState<number>(initialValue)

    useEffect(() => {
        const timer = setInterval(() => {
            setMoney(money + incrementValue)
        }, 10)
        return () => clearInterval(timer)
    })

    const formatMoney = (money: number, digits: number) => {
        const factor = 10 ** digits
        const trunkMoney = Math.trunc(money * factor) / factor
        const parsedMoney = (trunkMoney + '').split('.')
        
        return parsedMoney[0] + '.' + (parsedMoney[1]? parsedMoney[1].padEnd(digits, '0'.repeat(digits)) : '0'.repeat(digits))
    }

    const textColor = useThemeColor('text')
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        counter: {
            color: textColor,
            fontSize: 40,
            fontWeight: 'bold',
        },
        currencySymbol: {
            color: textColor,
            fontSize: 40,
            fontWeight: 'bold',
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.counter}>{formatMoney(money, 8)}</Text>
            <Text style={styles.currencySymbol}> €</Text>
            <Text style={{top: -20, position: 'absolute', color: '#ff0000'}}>DEBUG: {initialValue} € iniciales, {(incrementValue * 100).toFixed(7)} € / seg</Text>
        </View>
    )
}