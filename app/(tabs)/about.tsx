import { StyleSheet, Text, View } from 'react-native';
// import { Link } from "expo-router";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>this is About screen </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderColor: "black",
    // backgroundColor: '#fff', // WHITE
    backgroundColor: "#25292e", // 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    fontStyle: 'italic',

    //color: 'hsl(0, 0.00%, 100.00%)',
    // color: 'hsla(360, 100%, 100%, 1.0)', 
    //color: 'rgb(255,255,2555)',
    color: "cyan"
  },
});