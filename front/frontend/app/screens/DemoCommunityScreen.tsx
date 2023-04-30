import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity, 
  Pressable, Modal, TextInput
} from "react-native";
import { Icon, ListItem, Screen, Toggle, ToggleProps } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { LifeSphere } from "app/Types";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useCountdown } from 'react-native-countdown-circle-timer';
import { TextField } from "../components/TextField";
import { colors, typography } from "../../app/theme"
import { Button } from "@react-native-material/core";

const chainReactLogo = require("../../assets/images/cr-logo.png")
const reactNativeLiveLogo = require("../../assets/images/rnl-logo.png")
const reactNativeRadioLogo = require("../../assets/images/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../assets/images/rnn-logo.png")


function ControlledToggle(props: any) {
  const [value, setValue] = useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => {setValue(!value); props.toggleState()}} />
}

const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    isPlaying
    duration={20}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[15, 10, 5, 0]}
  >
    {({ remainingTime }) => <Text>{remainingTime}</Text>}
  </CountdownCircleTimer>
)

export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function DemoCommunityScreen(_props) {
    const duration = 360;

  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: true, duration, colors: 'url(#your-unique-id)' })

  const [state, setState] = useState("Focus")
  const [rest, setRest] = useState<string>("")

  

    return (
      <Screen preset="scroll" style={styles.container} safeAreaEdges={["top"]}>
        <SafeAreaView style={styles.container}>
        <View style={styles.centeredView}>
        <TextInput style={styles.what} placeholder={"What are you up to?"}></TextInput>
        <UrgeWithPleasureComponent/> 
        <Modal visible={state == "Rest"}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TextField
        label="Supports Multiline"
        helper="30 seconds to go crazy - write whatever's on your mind!"
        placeholder="Eiusmod exercitation mollit elit magna occaecat eiusmod Lorem minim veniam. Laborum Lorem velit velit minim irure ad in ut adipisicing consectetur."
        value={rest}
        onChange={(val: string) => setRest(val)}
        multiline
        
      />
       <Button onPress={() => {alert("Brain Dump Logged!"); setState("Focus")}} style={{margin: 10, marginLeft: 0, alignSelf: 'left'}} title="Log Brain Dump" color="pink" tintColor="red" />
      
            <ControlledToggle
        variant="switch"
        label={state}
        toggleState={() => setState(state == "Focus" ? "Rest" : "Focus")}
        helper="Turn on or off to focus or take a brain break!"
      />
            </View>
          </View>
        </Modal>
      <ControlledToggle
        variant="switch"
        label={state}
        toggleState={() => setState(state == "Focus" ? "Rest" : "Focus")}
        helper="Turn on or off to focus or take a brain break!"
      />
        
        
        </View>
        
        </SafeAreaView>
        
      </Screen>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
    },
    title: {
      fontSize: 32,
      color: 'white'
    },
    what: {
      fontSize: 32,
      color: '#2196F3',
      marginBottom: 20
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },

    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
  });
  

