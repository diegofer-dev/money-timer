import { Platform, Pressable, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import CardView from "./CardView";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useState } from "react";
import DailyConfiguration from "@/components/DailyConfiguration";
import { DaySettings, Settings } from "@/utils/interfaces";
import { defaultDaySettings } from "@/utils/defaults";
import CustomButton from "@/components/CustomButton";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    onSaveSettings: (newSettings: Settings) => void
}

const computeHours = (daySettings: DaySettings[]) => {
    return daySettings
        .map(daySetting => {
            if(daySetting.disabled)
                return 0
            else
                return daySetting.timeIntervals.map(timeInterval => (timeInterval.endHour - timeInterval.beginHour)).reduce((acc, dayHours) => acc + dayHours)
        })
        .reduce((acc, hours) => acc + hours)
} 
export default function SettingsView({ isOpen, onClose, onSaveSettings }: Props) {
    const [daySettings, setDaySettings] = useState<DaySettings[]>(defaultDaySettings)
    const [monthlySalary, setMonthlySalary] = useState<number>(0.0)

    useEffect(() => {
        const newSettings: Settings = {
            days: daySettings,
            monthlySalary,
            weeklyHours: computeHours(daySettings)
        }
        console.log(newSettings)
        onSaveSettings(newSettings)
    }, [daySettings, monthlySalary])
    const onChangeMonthlySalary = (salary: number) => {
        console.log(salary)
        setMonthlySalary(salary)
    }

    const onChangeDailySettings = (idx: number) => (newDaySetting: DaySettings) => {
        setDaySettings((prevState: DaySettings[]) => {
            const newDaySettings = [...prevState]
            newDaySettings[idx] = newDaySetting
            return newDaySettings
        })
    }

    const onPressSave = () => {
        onClose()
    }


    const secondaryText = useThemeColor('textSecondary')
    const secondary = useThemeColor('secondary')

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        headerText: {
            padding: 30,
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: secondaryText
        },
        salaryAndHoursInputContainer: {
            marginBottom: 30,
            gap: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        weeklyConfigurationContainer: {
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        saveButtonContainer: {
            padding: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'

        },
        saveButton: {
            width: '70%',
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: secondary,
            borderRadius: 10
        },
        saveButtonText: {
            color: secondaryText,
            fontSize: 15
        }
    })
    return (
        <CardView isOpen={isOpen} onClose={onClose} fromSide="right" width={'93%'} height={'83%'}>
            <View style={styles.container}>
                <View style={styles.headerText}>
                    <Text style={{ color: secondaryText, fontSize: 16, fontWeight: 'bold' }}>Personaliza tu jornada</Text>
                    <Text style={{ color: secondaryText, fontSize: 16, fontWeight: 'bold' }}>Horas semanales computadas: {computeHours(daySettings).toFixed(2)} h</Text>
                </View>
                <ScrollView>
                    <View style={styles.salaryAndHoursInputContainer}>
                        <CustomTextInput label={'¿Cuánto cobras al mes (neto)?'} onChangeValue={onChangeMonthlySalary} currencySymbol="€" />
                    </View>
                    <View style={styles.weeklyConfigurationContainer}>
                        {daySettings && daySettings.map((daySetting, idx) => (<DailyConfiguration key={'day-' + idx} day={daySetting.name} startDisabled={daySetting.disabled} onChangeDaySetting={onChangeDailySettings(idx)}/>))}
                    </View>
                    <View style={styles.saveButtonContainer}>

                        <CustomButton style={styles.saveButton} onPress={onPressSave}>
                            <Text style={styles.saveButtonText}>Guardar</Text>
                        </CustomButton>
                    </View>
                </ScrollView>

            </View>

        </CardView>
    )
}