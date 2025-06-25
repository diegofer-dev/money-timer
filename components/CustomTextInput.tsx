import { useThemeColor } from "@/hooks/useThemeColor"
import { useState } from "react"
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputSubmitEditingEventData, View } from "react-native"

type Props = {
    label: string,
    currencySymbol?: string
    onChangeValue: (value: number) => void,
    keyboardType?: KeyboardTypeOptions
}
export default function CustomTextInput({label, currencySymbol, onChangeValue, keyboardType}: Props) {
    const secondaryColor = useThemeColor('secondary')
    const secondaryColorText = useThemeColor('textSecondary')
    const [value, setValue] = useState<string>('0.0')
    const handleValueChange = (nativeEvent: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const {text} = nativeEvent.nativeEvent
        const parsedValue = parseFloat(text)
        setValue(parsedValue + '')
        onChangeValue(parsedValue)
    
    }
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10
        },
        label: {
            fontSize: 15,
            textAlign: 'center'
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            backgroundColor: secondaryColor,
            paddingRight: 10,
            borderRadius: 50,
        },
        input: {
            textAlign: 'center',
            color: secondaryColorText
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}> 
                <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                onSubmitEditing={handleValueChange}
                keyboardType={keyboardType ?? 'numeric'}
            /><Text style={{color: secondaryColorText}}>{currencySymbol ?? '€'}</Text></View>
            
        </View>
    )
}