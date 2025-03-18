import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
//import Animated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

import { Link } from 'expo-router';
import { Image, type ImageSource} from 'expo-image' 
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import ImageViewer from '@/components/ImageViewer.tsx/ImageViewer';
import Button from '@/components/ImageViewer.tsx/Button';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() { 
  const [selectedImage,setSelectedImage] = useState<string|undefined> (undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean> (false);
  const [isModalVisible, setisModalVisible] = useState<boolean> (false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource|undefined> (undefined);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(
      { mediaTypes:['images'], allowsEditing:true, quality:1, }
    )
    if (!result.canceled) { setSelectedImage(result.assets[0].uri); } 
    else { alert('You did not select any image.'); }
  }
  //invokes when the user presses the reset button, 
  // causing the Choose_photo button to appear again.
  const onReset = () => { setShowAppOptions(false) };
  const onAddSticker = () => { setisModalVisible(true) };
  const onModalClose = () => { setisModalVisible(false) };
  const onSaveImageAsync = async () => {     
    if (Platform.OS !== 'web') { //keep using native platforms logic
      try {
        const localUri = await captureRef(imageRef, {height:440, quality:1,} );
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) { alert('Saved!'); } } 
      catch (e) { console.log(e); }

    } else {
    {/*If Platform is 'web', use the domtoimage.toJpeg() method 
      to convert and capture the current <View> as a JPEG image*/}
        try {
          const dataUrl = await domtoimage.toJpeg( 
            imageRef.current, 
            { quality:0.95, width:320, height:440, }
          );
          let link = document.createElement('a');
          link.download = 'sticker-smash.jpeg';
          link.href = dataUrl;
          link.click(); } 
        catch (e) { console.log(e); }
    }
  }; 

  const imageRef = useRef<View>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null) { requestPermission(); }

  return (
    // This View is main container for the entire SCREEN
    // It provides overall styling and layout properties, such as alignment and background color.
    // It ensures that all child components are centered and properly aligned within the screen.
    <GestureHandlerRootView style={styles.container}>  

      {/* OLD stuff from the first scratch
      <Text style={styles.text}>Home IScreeem</Text>
      <Link style={styles.button} href="/about">Go to About screen</Link> */}

      {/* This View is specifically used to contain and manage the layout of the IMAGE-related components.
      It provides additional styling and layout properties specific to the image and its related elements.
      It helps in organizing the image and the EmojiSticker component within a dedicated section of the screen. */}    
      <View style={styles.imageContainer}>
        
        {/* collapsable prop is set to false. This allows the <View> component 
        to screenshot only of the background image and emoji sticker. */}
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />

          {/* This is a logical AND (&&) operator used for conditional rendering in JSX. 
          It checks if pickedEmoji is truthy (not null, undefined, false, 0, or empty string). 
          If pickedEmoji is truthy, the expression AFTER the && operator will be rendered. 
          If pickedEmoji is falsy, nothing will be rendered. */}
          { pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/> }
        </View>
      </View>

      {/* ternary operator block
      if false render 3buttons View - if true render Choose_photo View */}  
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>

            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />

          </View>
        </View>
      ) : (          
        <View style={styles.footerContainer}> 
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={()=>setShowAppOptions(true)} />
        </View> ) 
      }

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {/* onSelect prop selects the emoji and after selecting it, 
            onCloseModal closes the modal. */}
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    borderColor: "black",
    // backgroundColor: '#fff', // WHITE
    backgroundColor: "#25292e", // BLACK?
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },

  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },

  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  // OLD stuff from chapter 1-2
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  text: {
    fontSize: 28,
    color: "papayawhip",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "cyan"
  },
});
