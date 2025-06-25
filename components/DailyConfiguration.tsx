import { useThemeColor } from "@/hooks/useThemeColor"
import { StyleSheet, Text, View } from "react-native"
import AnimatedSwitch from "./AnimatedSwitch"
import { useEffect, useRef, useState } from "react"
import Animated, { interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import IconButton from "./IconButton"
import { DaySettings, TimeInterval } from "@/utils/interfaces"

type Props = {
    day: string,
    startDisabled: boolean,
    onChangeDaySetting: (newDaySetting: DaySettings) => void
}
type TimeIntervalProps = TimeInterval & { onClose: () => void, onEdit: (timeInterval: TimeInterval) => void, isCancellable: boolean }
const formatHour = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    const formattedHours = wholeHours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}

function getHoursWithDecimals(date: Date): number {
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const minutesInDecimal = minutes / 60;
    const totalHours = hours + minutesInDecimal;
    return parseFloat(totalHours.toFixed(2));
}

function TimeIntervalComp({ beginHour, endHour, onClose, onEdit, isCancellable }: TimeIntervalProps) {
    const [beginTime, setBeginTime] = useState<Date>(new Date(beginHour * 3600 * 1000))
    const [endTime, setEndTime] = useState<Date>(new Date(endHour * 3600 * 1000))
    const [showBeginTimePicker, setShowBeginTimePicker] = useState<boolean>(false)
    const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false)

    useEffect(() => {
        const newTimeInterval: TimeInterval = {
            beginHour: getHoursWithDecimals(beginTime),
            endHour: getHoursWithDecimals(endTime)
        }
        onEdit(newTimeInterval)
    }, [endTime])

    const onPressEdit = () => {
        setShowBeginTimePicker(true)
    }
    const onChangeBeginTime = (evt: DateTimePickerEvent, selectedTime: Date | undefined) => {
        const currentTime = selectedTime
        setShowBeginTimePicker(false)
        setShowEndTimePicker(true)
        if (currentTime)
            setBeginTime(currentTime)
    }
    const onChangeEndTime = (evt: DateTimePickerEvent, selectedTime: Date | undefined) => {
        const currentTime = selectedTime
        setShowEndTimePicker(false)
        if (currentTime)
            setEndTime(currentTime)
    }

    const textSecondary = useThemeColor("textSecondary")
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '95%',
            height: 40
        },
        closeAndHours: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 20
        },
        hours: {
            fontSize: 16,
            color: textSecondary
        }
    })
    return (<View style={styles.container}>
        <View style={styles.closeAndHours}>
            <IconButton visible={isCancellable} icon="cancel" onPress={onClose} size={19} color={textSecondary} />
            <Text style={styles.hours}>{formatHour(beginHour)} / {formatHour(endHour)} ({endHour - beginHour} h)</Text>
        </View>
        <IconButton icon="edit" onPress={onPressEdit} size={19} color={textSecondary}></IconButton>
        {showBeginTimePicker && <DateTimePicker
            testID="dateBeginTimePicker"
            timeZoneName="GMT"
            value={beginTime}
            mode="time"
            is24Hour={true}
            onChange={onChangeBeginTime}
        />}
        {showEndTimePicker && <DateTimePicker
            testID="dateEndTimePicker"
            timeZoneName="GMT"
            value={endTime}
            mode="time"
            is24Hour={true}
            onChange={onChangeEndTime}
        />}
    </View>)
}

export default function DailyConfiguration({ day, startDisabled, onChangeDaySetting }: Props) {
    const didMount = useRef(false)
    const [letIntervalsRender, setLetIntervalsRender] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<0 | 1>(startDisabled? 1 : 0)
    const [isConfigurationOpen, setIsConfigurationOpen] = useState<boolean>(false)
    const [timeIntervals, setTimeIntervals] = useState<TimeInterval[]>([{ beginHour: 9, endHour: 17 }])
    const defaultHeight = 50
    const currentHeight = useSharedValue(defaultHeight)
    const primaryColor = useThemeColor('primary')
    const secondaryColor = useThemeColor('secondary')
    const disabledColor = useThemeColor('background')
    const textSecondary = useThemeColor("textSecondary")

    useEffect(() => {
        if (!didMount.current)
            didMount.current = true
        else {
            if (isConfigurationOpen) {
                if (timeIntervals.length == 1) {
                    currentHeight.value = withTiming(130, { duration: 200 }, () => { runOnJS(setLetIntervalsRender)(true) })
                }
                else {
                    currentHeight.value = withTiming((40 * (timeIntervals.length + 2)) + 10, { duration: 200 }, () => { runOnJS(setLetIntervalsRender)(true) })
                }
            }
            else {
                setLetIntervalsRender(false)
            }
        }
    }, [isConfigurationOpen])

    useEffect(() => {
        if (!didMount.current)
            didMount.current = true
        if (!letIntervalsRender)
            currentHeight.value = withTiming(defaultHeight, { duration: 200 })
    }, [letIntervalsRender])

    useEffect(() => {
        if(isDisabled)
            return
        const newDaysetting: DaySettings = {
            name: day,
            disabled: isDisabled !== 0,
            timeIntervals
        }
        onChangeDaySetting(newDaysetting)
    }, [timeIntervals])

    const handlePressConfiguration = () => {
        setIsConfigurationOpen(!isConfigurationOpen)

    }

    const handleSwitchPress = () => {
        if (isDisabled) {
            setIsDisabled(0)
            const newDaysetting: DaySettings = {
                name: day,
                disabled: false,
                timeIntervals
            }
            onChangeDaySetting(newDaysetting)
        }
        else {
            setIsDisabled(1)
            const newDaysetting: DaySettings = {
                name: day,
                disabled: true,
                timeIntervals
            }
            onChangeDaySetting(newDaysetting)
        }
    }

    const handleAddNewTimeInterval = () => {
        currentHeight.value = withTiming((40 * (timeIntervals.length + 3)) + 10, { duration: 200 })
        setTimeout(() => setTimeIntervals((prevState: TimeInterval[]) => {
            const { beginHour, endHour } = prevState[prevState.length - 1]
            const newHours = [...prevState, { beginHour: endHour + 1, endHour: (endHour + 1) + 4 }]
            return newHours
        }), 200)

    }

    const handleEditTimeInterval = (idx: number) => (timeInterval: TimeInterval) => {
        setTimeIntervals((prevState: TimeInterval[]) => {
            const newHours = [...prevState]
            newHours[idx] = timeInterval
            return newHours
        })
    }

    const handleCancelTimeInterval = (idx: number) => () => {
        setTimeIntervals((prevState: TimeInterval[]) => {
            prevState.splice(idx, 1)
            const newHours = [...prevState]
            return newHours
        })
        currentHeight.value = withTiming((40 * (timeIntervals.length + 1)) + 10, { duration: 200 })
    }

    const heightStyle = useAnimatedStyle(() => {
        return {
            height: currentHeight.value,
        }
    })
    const backgroundStyle = useAnimatedStyle(() => {
        const color = interpolateColor(isDisabled, [0, 1], [secondaryColor, disabledColor])
        const colorValue = withTiming(color, { duration: 200 })
        return {
            backgroundColor: colorValue
        }
    })

    
    const styles = StyleSheet.create({
        container: {
            width: '90%',
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            borderRadius: 20,
            backgroundColor: secondaryColor,
            display: 'flex',
            justifyContent: 'space-between',
        },
        infoContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        dayContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 5
        },
        hourContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        hourText: {
            fontSize: 14,
            color: textSecondary
        },
        dayText: {
            fontSize: 16
        },
        switch: {
            width: 48,
            height: 29
        },
        configurationContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

        },
        addNewTimeInterval: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: disabledColor,
            borderRadius: 30,
            width: '95%',
            height: 40
        }

    })
    return (
        <Animated.View style={[backgroundStyle, heightStyle, styles.container]}>
            <View style={styles.infoContainer}>
                <View style={styles.dayContainer}>
                    <AnimatedSwitch value={isDisabled} onPress={handleSwitchPress} duration={200} style={styles.switch} />
                    <Text style={styles.dayText}>{day}</Text>
                </View>
                {!isDisabled && (
                    <View style={styles.hourContainer}>
                        <Text style={styles.hourText}>{formatHour(timeIntervals[0].beginHour)} / {formatHour(timeIntervals[timeIntervals.length - 1].endHour)} ({timeIntervals.map(timeInterval => (timeInterval.endHour - timeInterval.beginHour)).reduce((acc, timeInterval) => (acc + timeInterval))} h)</Text>
                        <IconButton style={{ transform: [{ rotate: isConfigurationOpen ? '-90deg' : '0deg' }] }} icon="arrow-left" onPress={handlePressConfiguration} size={25} color={primaryColor} />
                    </View>
                )}
            </View>
            {letIntervalsRender && (
                <View style={styles.configurationContainer}>
                    <View>
                        {
                            timeIntervals.map((timeInterval, idx) => (<TimeIntervalComp key={idx} isCancellable={timeIntervals.length > 1} onClose={handleCancelTimeInterval(idx)} onEdit={handleEditTimeInterval(idx)} beginHour={timeInterval.beginHour} endHour={timeInterval.endHour} />))
                        }
                    </View>
                    <View style={styles.addNewTimeInterval}>
                        <IconButton icon="add-circle-outline" onPress={handleAddNewTimeInterval} size={19} color={primaryColor} />
                    </View>
                </View>)
            }
        </Animated.View>
    )
}
