import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Rootlayout() {
  return ( 
    // <Fragment>, often used via <>...</> syntax, 
    // lets you group elements without a wrapper node.
    <>    
    <Stack> 
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="+not-found" />
    </Stack>
    <StatusBar style='light' />
    </>
  );
}