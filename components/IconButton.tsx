import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Platform, StyleProp, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
type Props = {
    icon: keyof typeof MaterialIcons.glyphMap,
    size: number,
    style?: StyleProp<ViewStyle>,
    color?: string,
    onPress: () => void,
    visible?: boolean
}

const Touchable: typeof TouchableNativeFeedback | typeof TouchableOpacity =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  
export default function IconButton({ icon, size, style, color, onPress, visible }: Props) {
    const iconColor = color ?? useThemeColor('icons')
    const appliedStyles = style ?? StyleSheet.create({})
    const styles = StyleSheet.create({
        iconButton: {
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
    const isVisible = visible ?? true
    return (
        <Touchable style={{borderRadius: size}} onPress={onPress}>
            <View style={isVisible? [appliedStyles, styles.iconButton] : [appliedStyles, {opacity: 0}, styles.iconButton]}>
                <MaterialIcons name={icon} size={size} color={iconColor} />
            </View>
        </Touchable>
    )
}