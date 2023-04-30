import React, { FC, useState } from "react"
import * as Application from "expo-application"
import { Linking, Platform, FlatList, TextStyle, Modal, SafeAreaView, View, ViewStyle, TextInput, StyleSheet, Button } from "react-native"
import { ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { Thought, SPHERES, THOUGHTS, TYPES, DefaultThought } from "app/Types";
import {Picker} from '@react-native-picker/picker';
import ThoughtCard from "../components/ThoughtCard";
import {
  SelectMultipleButton,
  SelectMultipleGroupButton
} from "react-native-selectmultiple-button";

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

export const DemoDebugScreen: FC<DemoTabScreenProps<"DemoDebug">> = function DemoDebugScreen(
  _props,
) {
  const {
    authenticationStore: { logout },
  } = useStores()

  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [thought, setThought] = useState<Thought>(DefaultThought);
  const [lifeSpheres, setLifeSpheres] = useState<boolean[]>(SPHERES.map((sphere, id) => {return false}))

  const insertThought = () => {
    const {id, title, desc, type} = thought;
    const spheres = lifeSpheres.filter((val, id) => lifeSpheres[id]);
    if (title != '' && desc != '')
    {
      // send thought to server
      THOUGHTS.push({...thought});
    }
    setThought(DefaultThought);
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
                  value={thought.title}
                  onChangeText={(text) => setThought({...thought, title: text})} />
                <TextInput 
                  style={styles.text}
                  value={thought.desc}
                  underlineColorAndroid="transparent"
                  placeholder="Add Description..."
                  onChangeText={(text) => setThought({...thought, desc: text})}
                  multiline={true} />
                
                <View style={{height: "45%"}}>
                  <Text style={{marginTop: "5%"}}>Type</Text>
                  <Picker selectedValue={thought.type} onValueChange={(val: any, index: number) => { console.log("INDEX:", index); setThought({...thought, type: val})}}>
                    {TYPES.map((type, index) => 
                    <Picker.Item key={index} label = {type.title} value = {type.title} />)}
                  </Picker>
                </View>
                <View style={{height: "20%"}}>
                  <FlatList
                    data={SPHERES}
                    numColumns={3}
                    keyExtractor={(item, index) => {return (item.title)}}
                    renderItem={({item}) => <SelectMultipleButton multiple={true}
                    value={item.title} key={item.id}
                    selected={lifeSpheres[item.id]}
                    singleTap={(valTap) => { setLifeSpheres(lifeSpheres.map((sphere, index) => (index == item.id) ? !lifeSpheres[index] : lifeSpheres[index]))}}
                    />}
                    />
                  
                </View>
                
                <Button
                onPress={insertThought}
                title="Add Thought"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
              </View>
            </View>
          </View>
        </Modal>
        <FlatList
          style={styles.noteList}
          data={THOUGHTS}
          keyExtractor={(item, index) => {return (item.title)}}
          numColumns={2}
          // onRefresh={._onRefresh}
          // refreshing={this.props.notes.isLoading}
          renderItem={({item}) => <ThoughtCard data={item}/>}
          // onEndReachedThreshold={0.1}
          // onEndReached={({ distanceFromEnd }) => {this.loadMore()}}
        />
        <Button
                onPress={() => setModalVisible(true)}
                title="Add Thought"
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
    margin: 20,
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
  types: {
    // flex: 1, 
    // justifyItems: 'center',
    height: '20%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
})