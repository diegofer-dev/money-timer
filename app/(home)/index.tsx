import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CirclePlacer from "@/components/CirclePlacer";
import * as MediaLibrary from 'expo-media-library'
import MoneyCounter from "@/components/MoneyCounter";
import ProfileView from "@/views/ProfileView";
import SettingsView from "@/views/SettingsView";
import TimeCalculationSelector from "@/components/TimeCalculationSelector";
import TimeCounter from "@/components/TimeCounter";
import { useThemeColor } from "@/hooks/useThemeColor";
import HeaderView from "@/views/HeaderView";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image, ImageSource } from 'expo-image';
import { mediaPicker } from '@/utils/mediaPicker';
import { Settings } from '@/utils/interfaces';
import { defaultSettings } from '@/utils/defaults';
import { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const calculateIncrement = (settings: Settings) => {
  return settings.monthlySalary/(settings.weeklyHours * 4 * 3600 * 100)
}
export default function Index() {
  const [settings, setSettings] = useState<Settings>(defaultSettings) 
  const [status, requestPermissions] = MediaLibrary.usePermissions()
  const imagePlaceHolder = require('@/assets/images/avatar-placeholder.png')
  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined)
  const plant = require('@/assets/images/plant.png')
  const textSecondaryColor = useThemeColor('textSecondary')
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)
  const topCirclesMovement = useSharedValue<number>(0)

  
  useEffect(() => {
    const animationLoop = setInterval(() => {
      topCirclesMovement.value = withTiming(topCirclesMovement.value + 1,{duration: 100})
    }, 1000)
    return () => clearInterval(animationLoop)
  }, [])

  const onSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings)
  }
  const onPressSettings = () => {
    setIsSettingsOpen(true)
  }
  const onCloseSettings = () => {
    setIsSettingsOpen(false)
  }
  const onPressProfile = () => {
    setIsProfileOpen(true)
  }
  const onCloseProfile = () => {
    setIsProfileOpen(false)
  }
  const onChangeImage = async () => {
    if(status == null)
      requestPermissions()
    const image = await mediaPicker()
    if (image.uri) {
      setAvatarImage(image.uri)
    }
  }
  const backgroundColor = useThemeColor("background")
  const secondaryColor = useThemeColor("secondary")
  const topCirclesMovementStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: `${Math.cos(topCirclesMovement.value) * 100}%`
        }, 
        {
          translateY: `${Math.sin(topCirclesMovement.value) * 100}%`
        }
      ]
    }
  })
  const styles = StyleSheet.create({
    conatiner: {
      flex: 1,
      backgroundColor: backgroundColor
    },
    timeCarousel: {
      flex: 1 / 7,
      flexDirection: 'column',
      alignItems: 'center',
      gap: 50
    },
    moneyCounter: {
      marginTop: 20,
      flex: 1 / 6,
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageAnimation: {
      flex: 3/7,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textAnimation: {
      flex: 1/8,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
  return (

    <GestureHandlerRootView style={styles.conatiner}>
      <HeaderView avatarImage={avatarImage ? avatarImage : imagePlaceHolder} onPressProfile={isProfileOpen? onCloseProfile : onPressProfile} onPressSettings={isSettingsOpen? onCloseSettings : onPressSettings} />
      <View style={styles.moneyCounter}>
        {settings.monthlySalary?  (<MoneyCounter initialValue={0.001} incrementValue={calculateIncrement(settings)}/>) : (<Text>SIN SALARIO ...</Text>)}
        
      </View>
      <View style={styles.timeCarousel}>
        <TimeCalculationSelector onChange={(calculation) => { }}></TimeCalculationSelector>
        <TimeCounter startTime={0}></TimeCounter>
      </View>
      <View style={styles.imageAnimation}>
        <Image source={plant} style={{borderRadius: 100, height: 170, width: 170, zIndex: 1}}/>
        <CirclePlacer color={secondaryColor} size={37} top={'30%'} left={'25%'} zIndex={5} />
        <CirclePlacer color={secondaryColor} size={27} top={'70%'} left={'38%'} zIndex={5} />
        <CirclePlacer color={secondaryColor} size={78} top={'20%'} left={'55%'} zIndex={0} />
      </View>
      <View style={styles.textAnimation}>
        <Text style={{color: textSecondaryColor}}>WAITING TO START ...</Text>
      </View>

      
      <SettingsView onSaveSettings={onSaveSettings} onClose={onCloseSettings} isOpen={isSettingsOpen} />
      <ProfileView avatarImage={avatarImage ? avatarImage : imagePlaceHolder} onChangeImage={onChangeImage} onClose={onCloseProfile} isOpen={isProfileOpen} />
      <CirclePlacer color={secondaryColor} animatedStyle={topCirclesMovementStyle} size={37} top={'10%'} left={'15%'} zIndex={35} />
      <CirclePlacer color={secondaryColor} size={27} top={'13%'} left={'20%'} zIndex={35} />
      <CirclePlacer color={secondaryColor} size={78} top={'7%'} left={'22%'} zIndex={25} />
      <CirclePlacer color={secondaryColor} size={37} top={'10%'} left={'86%'} zIndex={35} />
      <CirclePlacer color={secondaryColor} size={27} top={'11%'} left={'71%'} zIndex={35} />
      <CirclePlacer color={secondaryColor} size={78} top={'8%'} left={'74%'} zIndex={25} />
    </GestureHandlerRootView>
  );
}
