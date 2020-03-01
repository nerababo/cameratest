import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [pic, setPic] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera
        .takePictureAsync({
          onPictureSaved: this.onPictureSaved,
          quality: 0.5
        })
        .then(data => {
          this.resizePic(data.uri);
        });

      // this.camera.pausePreview();
    }
  };

  resizePic = async uri => {
    const resizedPic = await ImageManipulator.manipulateAsync(uri, [], {
      // compsress: 0.5,
      format: "jpeg"
    });
    setPic(resizedPic);
  };

  //   onPictureSaved = async () => {
  // if (this.camera) {

  //}
  //   await FileSystem.copyAsync({
  //     from: photo.uri,
  //     to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`
  //   });
  //   alert("Picture save");
  //   this.setState({ newPhotos: true });
  //};

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ratio={"16:9"}
        ref={ref => {
          this.camera = ref;
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center"
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: "flex-end",
              alignItems: "center"
            }}
            onPress={() => this.takePicture()}
          >
            <Text style={{ fontSize: 18, marginBottom: 22, color: "red" }}>
              {" "}
              Snap{" "}
            </Text>
          </TouchableOpacity>
          <Image source={pic} style={{ width: 100, height: 100 }}></Image>
        </View>
      </Camera>
    </View>
  );
}
