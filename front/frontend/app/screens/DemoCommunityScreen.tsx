import React, { FC, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity, 
  Pressable, Modal, TextInput
} from "react-native"
import { ListItem, Screen } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { LifeSphere } from "app/Types";

const chainReactLogo = require("../../assets/images/cr-logo.png")
const reactNativeLiveLogo = require("../../assets/images/rnl-logo.png")
const reactNativeRadioLogo = require("../../assets/images/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../assets/images/rnn-logo.png")


const SPHERES: LifeSphere[] = [
  { id: '0', title: 'Gym' },
  { id: '1', title: 'Gymnastics' },
  { id: '', title: 'Orchestra' },
];

type SphereProps = {
  sphere: LifeSphere;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Sphere = ({sphere, onPress, backgroundColor, textColor}: SphereProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{sphere.title}</Text>
  </TouchableOpacity>
);

export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function DemoCommunityScreen(_props) {
    const [selectedId, setSelectedId] = useState<string>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [lifeSphere, setLifeSphere] = useState<string>();
    const [spheres, setSpheres] = useState<LifeSphere[]>(SPHERES);

    const renderSphere = (sphere) => {
      console.log("SPHERE:", sphere)
      const backgroundColor = sphere.item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
      const color = sphere.item.id === selectedId ? 'white' : 'black';
  
      return (
        <Sphere
          sphere={sphere.item}
          onPress={() => setSelectedId(sphere.item.id)}
          backgroundColor={backgroundColor}
          textColor={color}
        />
      );
    };

    return (
      <Screen preset="scroll" style={styles.container} safeAreaEdges={["top"]}>
        <SafeAreaView style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setLifeSphere}
              value={lifeSphere}
              placeholder="Add a new life sphere"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible); setLifeSphere(""); if(lifeSphere.length > 0) setSpheres([...spheres, {id: '01', title: lifeSphere}]) }}>
              <Text style={styles.textStyle}>Add Modal</Text>
            </Pressable>
          </View>
        </View>
        </Modal>

        <FlatList
          data={spheres}
          renderItem={renderSphere}
          keyExtractor={sphere => sphere.title}
          extraData={selectedId}
        />
        <Pressable style={[styles.item, {backgroundColor: '#121212'}]} onPress={() => {setModalVisible(true)}}>
          <Text style={styles.title}>{"Add category"}</Text>
        </Pressable>
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
      marginTop: 22,
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
  