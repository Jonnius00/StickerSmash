import { View, StyleSheet  } from "react-native";
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Oops! PaGe Not Found' }} />
      <View style={styles.container}>
        <Link href='/' style={styles.button}> GO back home </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //borderColor: "black",
      // backgroundColor: '#fff', // WHITE
      backgroundColor: "#25292e", // 
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      // color: 'rgb(255, 255, 255)',
      // color: 'hsla(360, 100%, 100%, 1.0)', 
      color: "darkcyan"
    },
    button: {
        fontSize: 20,
        textDecorationLine: "underline",
        color: "#FFF123"
    },
  });