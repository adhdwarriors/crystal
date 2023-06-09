import React, { FC, useState, useCallback, useEffect } from "react"
import * as Application from "expo-application"
import {
  Linking,
  Platform,
  FlatList,
  TextStyle,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
  ViewStyle,
  TextInput,
  StyleSheet,
  Button,
} from "react-native"
import { ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { Thought, THOUGHTS, SPHERES, TYPES, DefaultThought, LifeSphere } from "app/Types"
import { Picker } from "@react-native-picker/picker"
import ThoughtCard from "../components/ThoughtCard"
import ThoughtCardMag from "../components/ThoughtCardMag"
import { SelectMultipleButton } from "react-native-selectmultiple-button"
import useNotes, { filterOnTopics, filterOnTypes } from "../services/backend/userNotes"
const GET_URL = "http://172.104.196.152:3000/user?user_id=1&token=blah"
const GET_SPHERE_URL = "http://172.104.196.152:3000/sphere"

const URL = "http://172.104.196.152:3000/note/create"
const EDIT_URL = "http://172.104.196.152:3000/note/edit"
const SPHERE_URL = "http://172.104.196.152:3000/sphere/create"

import { DemoUseCase } from "./DemoShowroomScreen/DemoUseCase"

export const ThoughtsScreen: FC<DemoTabScreenProps<"Thoughts">> = function ThoughtsScreen(
  _props,
) {
  const {
    authenticationStore: { logout },
  } = useStores()

  const toggleType = (item) => {
    setTypes(types.map((type, index) => (index == item.id ? !types[index] : types[index])))
  }
  const toggleSphere = (item) => {
    setSelSpheres(
      selSpheres.map((type, index) =>
        index == item.id ? !selSpheres[index] : selSpheres[index],
      ),
    )
  }

  const [thoughts, setThoughts] = useState<any>([{ body: "" }])
  const [reload, setReload] = useState<boolean>(false)
  const [mode, setMode] = useState<number>(0)
  const [thought, setThought] = useState<Thought>(DefaultThought)
  const [sphere, setSphere] = useState<LifeSphere>({ id: 0, title: "" })
  const [spheres, setSpheres] = useState<LifeSphere[]>([])
  const [selSpheres, setSelSpheres] = useState<boolean[]>(
    spheres.map((sphere, id) => {
      return id == 0
    }),
  )
  const [types, setTypes] = useState<boolean[]>(
    TYPES.map((type, id) => {
      return id == 0
    }),
  )
  
  // editing thoughts 
  const [selThought, setSelThought] = useState<number>(0)
  const [selTitle, setSelTitle] = useState<string>("")
  const [selDesc, setSelDesc] = useState<string>("")

  const insertSphere = () => {
    const { id, title } = sphere
    if (title != "") {
      fetch(SPHERE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      })
        .then((res) => res.json())
        .catch((error) => console.log(error))
    }
    setMode(0)
    setSphere({ id: 0, title: "" })
  }

  const insertThought = () => {
    const { id, title, desc } = thought
    const chosenSphere = selSpheres.findIndex((sphere) => sphere)
    console.log("CHOSEN SPHERE for", title, ", ", chosenSphere)
    const Types = types.map((val, id) => (types[id] ? id : -1)).filter((val, id) => val != -1)
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // CHANGE THIS
      body: JSON.stringify({
        desc: desc,
        sphere_id: chosenSphere,
        type_id: Types[0],
        title: title,
        user_id: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        setThought(DefaultThought)
        setMode(0)
        setReload(!reload)
      })
      .catch((error) => console.log(error))
  }

  const editThought = () => {
    // use selTitle, selDesc, and selThought to edit !! 
    console.log("SEL THOUGHT", thoughts[selThought])
    const thought = thoughts[selThought]
    const th = {
      note_uuid: thought.id,
      sphere_id: thought.sphere_id,
      title: selTitle,
      desc: selDesc,
      type_id: thought.type_id,
      user_id: 0}
      console.log("TH:", th)
    fetch(EDIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_uuid: thought.id,
        sphere_id: thought.sphere_id,
        title: selTitle,
        desc: selDesc,
        type_id: thought.type_id,
        user_id: 0
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log("SUCCESSFUL EDIT:", res))
      .catch((error) => console.log(error))
    setMode(0)
    setReload(!reload)
  }

  
  useEffect(() => {
    const getThoughts = fetch(GET_URL)
    const getSpheres = fetch(GET_SPHERE_URL)

    Promise.all([getThoughts, getSpheres])
      .then((res) => Promise.all(res.map((r) => r.json())))
      .then((data) => {
        console.log("DATA:", data)
        console.log("DATA0, ", data[0])
        console.log("DATA1, ", data[1])

        let thoughts = data[0].notes.map((note, index) => {
          return {
            id: note.id,
            sphere_id: parseInt(note.sphere_id),
            desc: note.desc,
            title: note.title,
            type_id: parseInt(note.type_id),
            type: TYPES[parseInt(note.type_id)],
          }
        })

        let dataSpheres = data[1].spheres.map((sphere, index) => {return {id: index, title: sphere}})
        console.log("THOUGHTS:", thoughts);
        setThoughts(
          thoughts.filter((t, index) => {
            return selSpheres[t.sphere_id] && types[t.type_id]
          }),
        )
        setSpheres(dataSpheres)
      })
      
      .catch((error) => console.log("ERRORRRRR", error))
  }, [selSpheres, types, reload])

  return (
    <Screen preset="scroll" style={styles.container} safeAreaEdges={["top"]}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{ height: 110, marginTop: 75 }}>
            <Text style={styles.what} text={"What's on your mind?"}></Text>

            <FlatList
              data={["types", "spheres"]}
              style={$flatListStyle}
              renderItem={({ item, index }) => (
                <FlatList
                  data={index == 0 ? TYPES : spheres}
                  style={styles.typesList}
                  numColumns={4}
                  keyExtractor={(item) => {
                    return item.title
                  }}
                  renderItem={({ item: item }) => (
                    <SelectMultipleButton
                      multiple={true}
                      value={item.title}
                      key={item.id}
                      selected={index == 0 ? types[item.id] : selSpheres[item.id]}
                      singleTap={
                        index == 0
                          ? (valTap) => {
                              toggleType(item)
                            }
                          : (valTap) => {
                              toggleSphere(item)
                            }
                      }
                    />
                  )}
                />
              )}
            />
          </View>
          <FlatList
            style={styles.notesList}
            data={thoughts}
            keyExtractor={(item, index) => {
              return item.title
            }}
            numColumns={2}
            // onRefresh={._onRefresh}
            // refreshing={this.props.notes.isLoading}
            renderItem={({ item, index}) => <ThoughtCard data={item} index={index} openMod={async (index: any) => {
              setSelThought(index)
              console.log("INDEX: ", index)
              console.log("THOUGHTS: ", thoughts)
              if (index < thoughts.length)
              {
                console.log("THE THOUGHT", thoughts[index])
                console.log("to set title:", thoughts[index].title)
                setSelTitle(thoughts[index].title)
                setSelDesc(thoughts[index].desc)
              }
              setMode(3)
            }} />}
          />
          <Button
            onPress={() => {
              setMode(1)
              setSelSpheres(
                spheres.map((sphere, id) => {
                  return id == 0
                }),
              )
              setTypes(
                TYPES.map((type, id) => {
                  return id == 0
                }),
              )
            }}
            title="Add a thought"
            // style={styles.bbutton}
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => setMode(2)}
            title="Add Sphere"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          {/* ADD A THOUGHT MODAL */}
          <Modal visible={mode == 1}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ height: "70%" }}>
                  <TextInput
                    style={styles.text}
                    placeholder="ADD TITLE..."
                    value={thought.title}
                    onChangeText={(text) => setThought({ ...thought, title: text })}
                  />
                  <TextInput
                    style={styles.text}
                    value={thought.desc}
                    underlineColorAndroid="transparent"
                    placeholder="Add Description..."
                    onChangeText={(text) => setThought({ ...thought, desc: text })}
                    multiline={true}
                  />
                  <Text style={styles.head}>Type</Text>
                  <FlatList
                    data={TYPES}
                    numColumns={4}
                    keyExtractor={(item, index) => {
                      return item.title
                    }}
                    renderItem={({ item }) => (
                      <SelectMultipleButton
                        multiple={true}
                        value={item.title}
                        key={item.id}
                        selected={types[item.id]}
                        singleTap={(valTap) => {
                          console.log("TYPES!!!!", types)
                          setTypes(
                            types.map((type, index) =>
                              index == item.id ? !types[index] : types[index],
                            ),
                          )
                        }}
                      />
                    )}
                  />
                  <Text style={styles.categories}>Categories</Text>
                  <View style={{ height: "30%" }}>
                    <FlatList
                      data={spheres}
                      numColumns={3}
                      keyExtractor={(item, index) => {
                        return item.title
                      }}
                      renderItem={({ item }) => (
                        <SelectMultipleButton
                          multiple={true}
                          value={item.title}
                          key={item.id}
                          selected={selSpheres[item.id]}
                          singleTap={(valTap) => {
                            setSelSpheres(
                              selSpheres.map((sphere, index) =>
                                index == item.id ? !selSpheres[index] : selSpheres[index],
                              ),
                            )
                          }}
                        />
                      )}
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
          
          {/* ADD A SPHERE MODAL */}
          <Modal visible={mode == 2}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ height: "30%" }}>
                  <TextInput
                    style={styles.text}
                    placeholder="ADD TITLE..."
                    value={sphere.title}
                    onChangeText={(text) => setSphere({ ...sphere, title: text })}
                  />

                  <Button
                    onPress={insertSphere}
                    title="Add Sphere"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              </View>
            </View>
          </Modal>
          <Modal visible={mode == 3}>
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ height: "30%" }}>
                  <TextInput
                    style={styles.text}
                    value={selTitle}
                    onChangeText={(text) => setSelTitle(text)}
                  />
                  <TextInput
                    style={styles.text}
                    value={selDesc}
                    onChangeText={(text) => setSelDesc(text)}
                  />
                  <Button
                    onPress={editThought}
                    title="Edit Note"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  head: {
    fontSize: 20,
    marginTop: 20,
  },
  categories: {
    fontSize: 20,
    translateY: -20,
  },
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  typesList: {},
  notesList: {},
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "5%",
    alignItems: "center",
    shadowColor: "#000",
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
    justifyContent: "center",
    alignItems: "center",
  },
  types: {
    flex: 1,
    justifyItems: "center",
    height: "10%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 10,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    borderRadius: 5,
    margin: 20,
    paddingRight: 20,
    width: 138,
    height: 136,
    color: "#fff",
  },
  bbutton: {
    backgroundColor: "#841584",
  },
  note: {
    color: "#fff",
    fontSize: 16,
    top: 10,
    left: 10,
  },
  what: {
    fontSize: 20,
    color: "#2196F3",
    marginBottom: 10,
    marginLeft: 15,
  },
})

const $flatListStyle: ViewStyle = {
  paddingHorizontal: spacing.extraSmall,
  backgroundColor: colors.palette.neutral200,
  flex: 1,
  overflow: "scroll",
}
