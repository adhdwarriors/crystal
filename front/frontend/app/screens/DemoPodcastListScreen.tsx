import React, { FC, useState } from "react"
import * as Application from "expo-application"
import { Linking, Platform, FlatList, TextStyle, Modal, SafeAreaView, View, ViewStyle, TextInput, StyleSheet, Button } from "react-native"
import { ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { Thought, LifeSphere, DefaultSphere, SPHERES, THOUGHTS, DefaultThought } from "app/Types";
import LifeSphereCard from "../components/LifeSphereCard";

export const DemoPodcastListScreen: FC<DemoTabScreenProps<"DemoDebug">> = function DemoDebugScreen(
  _props,
) {
  const {
    authenticationStore: { logout },
  } = useStores()

  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [sphere, setSphere] = useState<LifeSphere>(DefaultSphere);

  const insertSphere = () => {
    const {id, title} = sphere;
    if (title != '')
    {
      // send thought to server
      SPHERES.push(sphere);
    }
    setSphere(DefaultSphere);
    setModalVisible(false);
  }
  return (
    <Screen preset="scroll" style={styles.container} safeAreaEdges={["top"]}>
      <SafeAreaView style={styles.container}>
        <Modal visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <TextInput style={styles.text} placeholder="ADD TITLE..."
                  value={sphere.title}
                  onChangeText={(text) => setSphere({...sphere, title: text})} />
                {/* <TextInput 
                  style={styles.text}
                  value={thought.desc}
                  underlineColorAndroid="transparent"
                  placeholder="Add Description..."
                  onChangeText={(text) => setThought({...thought, desc: text})}
                  multiline={true} /> */}
                <Button
                onPress={insertSphere}
                title="Add Life Sphere"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
              </View>
            </View>
          </View>
        </Modal>
        <FlatList
          style={styles.noteList}
          data={SPHERES}
          keyExtractor={(item, index) => {return (item.title)}}
          numColumns={2}
          // onRefresh={._onRefresh}
          // refreshing={this.props.notes.isLoading}
          renderItem={({item}) => <LifeSphereCard data={item}/>}
          // onEndReachedThreshold={0.1}
          // onEndReached={({ distanceFromEnd }) => {this.loadMore()}}
        />
        <Button
                onPress={() => setModalVisible(true)}
                title="Add Life Sphere"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
      </SafeAreaView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  noteList: {

  }, 
  modalView: {
    // margin: 20,
    // width: "80%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: "5%",
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
})