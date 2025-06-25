import AvatarCircleImage from "@/components/AvatarCircleImage";
import IconButton from "@/components/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View, Text, StyleSheet } from "react-native";
import { Image, ImageSource } from "expo-image";

type Props = {
    avatarImage: ImageSource,
    onPressSettings: () => void,
    onPressProfile: () => void
}
export default function HeaderView({ avatarImage, onPressSettings, onPressProfile }: Props) {
    const textColor = useThemeColor('text')
    const styles = StyleSheet.create({
        header: {
            flex: 1 / 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#fff',
            zIndex: 30
        },
        headerText: {
            fontSize: 30,
            fontWeight: "bold",
            color: textColor
        },
    })
    return (
        <View style={styles.header}>
            <AvatarCircleImage image={avatarImage} onPress={onPressProfile} size={40} />
            <Text style={styles.headerText}>MoneyTimer</Text>
            <IconButton icon="code" onPress={onPressSettings} size={40}></IconButton>
        </View>
    )
}