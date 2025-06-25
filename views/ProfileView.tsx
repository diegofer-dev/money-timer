import { StyleSheet, Text, View } from "react-native"
import CardView from "./CardView"
import AvatarCircleImage from "@/components/AvatarCircleImage"
import { ImageSource } from "expo-image"
import { useThemeColor } from "@/hooks/useThemeColor"
import IconButton from "@/components/IconButton"

type Props = {
    avatarImage: ImageSource,
    isOpen: boolean,
    onClose: () => void,
    onChangeImage: () => void
}
export default function ProfileView({ avatarImage, isOpen, onClose, onChangeImage }: Props) {
    const primary = useThemeColor('primary')
    const styles = StyleSheet.create({
        avatarContainer: {
            flex: 1 / 2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        userNameContainer: {
            textAlign: 'center',
            marginTop: 10,
            paddingLeft: 40,
            paddingRight: 40,
            backgroundColor: '#FFDC4A',
            borderRadius: 50,
            color: primary
        },
        infoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        infoRow: {
            display: 'flex',
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
        },
        infoTitle: {
            fontSize: 16,
            textAlign: 'left'
        },
        infoValue: {
            fontSize: 16,
            textAlign: 'right'
        }
    })
    return (
        <CardView isOpen={isOpen} onClose={onClose} fromSide="left" width={'95%'} height={'83%'}>
            <View style={styles.avatarContainer}>
                <AvatarCircleImage image={avatarImage} onPress={onChangeImage} size={100}/>
                <Text style={styles.userNameContainer}>dinosaurio.csim</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoTitle}>Σ minuto:</Text>
                    <Text style={styles.infoValue}>1,2739475 €</Text>
                </View>
                <View style={{height: 30}}></View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoTitle}>Σ semana:</Text>
                    <Text style={styles.infoValue}>41,2739475 €</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoTitle}>Σ mes:</Text>
                    <Text style={styles.infoValue}>41,2739475 €</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoTitle}>Σ año:</Text>
                    <Text style={styles.infoValue}>411,2739475 €</Text>
                </View>
                <View style={{height: 30}}></View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoTitle}>Σ tiempo trabajado:</Text>
                    <Text style={styles.infoValue}>00:866:40:30</Text>
                </View>
                <View style={{height: 30}}></View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoTitle}>Trabajas el 28,56% de tu vida útil</Text>
                    <IconButton icon="help-outline" onPress={() => {}} size={18}/>
                </View>
            </View>
        </CardView>
    )
}