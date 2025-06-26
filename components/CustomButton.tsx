import { PropsWithChildren } from "react";
import { Platform, StyleProp, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
    style: StyleProp<ViewStyle>,
    onPress: () => void,
}>
const Touchable: typeof TouchableNativeFeedback | typeof TouchableOpacity =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
export default function CustomButton({ style, onPress, children }: Props) {

    return (
        <Touchable  onPress={onPress}>
            <View style={style}>
                {children}
            </View>
        </Touchable>
    )
}