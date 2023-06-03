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
const SPHERE_URL = "http://172.104.196.152:3000/sphere/create"

import { DemoUseCase } from "../screens/DemoShowroomScreen/DemoUseCase"

export const DemoDebugScreen: FC<DemoTabScreenProps<"DemoDebug">> = function DemoDebugScreen(
  _props,
) {
  const {
    authenticationStore: { logout },
  } = useStores()

  const toggleSpheresFilter = (item) => {
    console.log("SPHERE:", item)
    setLifeSpheres(
      lifeSpheres.map((sphere, index) =>
        index == item.id ? !lifeSpheres[index] : lifeSpheres[index],
      ),
    )
  }

  const toggleType = (item) => {
    setTypes(types.map((type, index) => (index == item.id ? !types[index] : types[index])))
  }
  const toggleSphere = (item) => {
    setLifeSpheres(
      lifeSpheres.map((type, index) =>
        index == item.id ? !lifeSpheres[index] : lifeSpheres[index],
      ),
    )
  }

  // const THOUGHTS = useNotes(0); // pass in user id
  const [thoughts, setThoughts] = useState<any>([{ body: "" }])
  const [mode, setMode] = useState<number>(0)
  const [selThought, setSelThought] = useState<number>(0)
  const [thought, setThought] = useState<Thought>(DefaultThought)
  const [sphere, setSphere] = useState<LifeSphere>({ id: 0, title: "" })
  const [spheres, setSpheres] = useState<LifeSphere[]>()
  const [lifeSpheres, setLifeSpheres] = useState<boolean[]>(
    SPHERES.map((sphere, id) => {
      return id == 0
    }),
  )
  const [types, setTypes] = useState<boolean[]>(
    TYPES.map((sphere, id) => {
      return id == 0
    }),
  )

  const [editedThought, setEditedThought] = useState<Thought>(THOUGHTS[selThought])
  const [title, setTitle] = useState<string>(THOUGHTS[selThought].title)
  const [desc, setDesc] = useState<string>(THOUGHTS[selThought].desc)

  const insertSphere = () => {
    const { id, title } = sphere
    console.log("SPHERE: ", title)
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
        .then((res) => {
          console.log("POST to Spheres,", res)
        })
        .catch((error) => console.log(error))
    }
    setMode(0)
    setSphere({ id: 0, title: "" })
  }

  const insertThought = () => {
    const { id, title, desc } = thought
    const Spheres = lifeSpheres
      .map((val, id) => (lifeSpheres[id] ? id : -1))
      .filter((val, id) => val != -1)
    const Types = types.map((val, id) => (types[id] ? id : -1)).filter((val, id) => val != -1)
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // CHANGE THIS
      body: JSON.stringify({
        desc: desc,
        sphere_id: Spheres[0],
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
      })
      .catch((error) => console.log(error))
  }

  const editThought = () => {
    THOUGHTS[selThought] = { ...THOUGHTS[selThought], title: title, desc: desc }
    setMode(0)
  }

  const openMod = (id: number) => {
    setSelThought(id)
    setMode(2)
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

        let spheres = data[1].spheres.map((sphere, index) => {return {id: index, title: sphere}})
        setThoughts(
          thoughts.filter((t, index) => {
            console.log("T:", t, "life spheres", lifeSpheres, "types", types)
            return lifeSpheres[t.sphere_id] && types[t.type_id]
          }),
        )
        setSpheres(spheres)
        console.log("MY SPHERES:", spheres)
      })
      
      .catch((error) => console.log("ERRORRRRR", error))
  }, [])

  return (
    <Screen preset="scroll" style={styles.container} safeAreaEdges={["top"]}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{ height: 120, marginTop: 75 }}>
            <TextInput style={styles.what} placeholder={"What are you up to?"}></TextInput>

            <FlatList
              data={["hi", "hello"]}
              style={$flatListStyle}
              renderItem={({ item, index }) => (
                <FlatList
                  data={index == 0 ? TYPES : SPHERES}
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
                      selected={index == 0 ? types[item.id] : lifeSpheres[item.id]}
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
            renderItem={({ item }) => <ThoughtCard data={item} openMod={openMod} />}
            // onEndReachedThreshold={0.1}
            // onEndReached={({ distanceFromEnd }) => {this.loadMore()}}
          />
          <Button
            onPress={() => {
              setMode(1)
              setLifeSpheres(
                SPHERES.map((sphere, id) => {
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
                    numColumns={3}
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
                          selected={lifeSpheres[item.id]}
                          singleTap={(valTap) => {
                            setLifeSpheres(
                              lifeSpheres.map((sphere, index) =>
                                index == item.id ? !lifeSpheres[index] : lifeSpheres[index],
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
    width: "70%",
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
