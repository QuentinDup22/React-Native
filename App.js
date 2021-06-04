import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import dummy from './assets/dummy-image-landscape.jpg'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

export default function App() {
    const [selectedImage, setSelectedImage] = useState(null)
    // notre fonction pour récupérer l'image dans la bibliothèque
    const openImagePicker = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permission.granted === false) {
            alert('Permission needed')
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync()
        if (pickerResult.cancelled === true) {
            return;
        }
        setSelectedImage(pickerResult.uri)
    }
    // notre fonction pour partager l'image
    const openShareDialog = async () => {
        if (!(await Sharing.isAvailableAsync())){
            alert('Oups no sharing available on your device')
            return;
        }
        await Sharing.shareAsync(selectedImage)
    }
    // notre nouveau rendu si l'image est bien disponible
    if(selectedImage !== null){
        return(
            <View style={styles.container}>
                <Text style={styles.titleText}>Sharing Photo</Text>
                <Image 
                    style={{width:300, height:300}}
                    source={{uri:selectedImage}} />
                <TouchableOpacity style={styles.button} onPress={() => {
                    setSelectedImage(null)
                }}>
                    <Text style={styles.white}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={openShareDialog(null)}>
                    <Text style={styles.white}>Share this photo</Text>
                </TouchableOpacity>
            </View>
        )
    }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sharing Photo</Text>

      <Image 
      style={{width:300, height:300}}
      source={dummy} />

      <TouchableOpacity style={styles.button} onPress={openImagePicker}>
          <Text style={styles.white}>Pic a Photo</Text>

      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 40,
  },
  button: {
      backgroundColor: "blue",
      padding: 10,
  },
  white: {
      color: "#fff"
  }
});
