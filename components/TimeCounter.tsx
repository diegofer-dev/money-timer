import { useThemeColor } from "@/hooks/useThemeColor"
import { useEffect, useState } from "react"
import { StyleSheet, View, Text } from "react-native"

type Props = {
    startTime: number
}
export default function TimeCounter({ startTime }: Props) {
    const [time, setTime] = useState<number>(startTime)
    const textColor = useThemeColor('text')
    const formatTime = (time: number) => {
        const hrs = Math.floor(time / 3600);
        const mins = Math.floor((time % 3600) / 60);
        const secs = time % 60;
        const paddedHrs = String(hrs).padStart(2, '0');
        const paddedMins = String(mins).padStart(2, '0');
        const paddedSecs = String(secs).padStart(2, '0'); 
        return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time + 1)
        }, 1000)
        return () => clearInterval(timer)
    })

    const styles = StyleSheet.create({
        timerContainer: {
            color: textColor
        }
    })

    return (
        <View>
            <Text style={styles.timerContainer}>{formatTime(time)}</Text>
        </View>
    )

}