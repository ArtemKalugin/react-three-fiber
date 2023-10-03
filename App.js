import React, {Suspense} from "react";
import {StyleSheet, View} from "react-native";
import {Canvas} from "@react-three/fiber";
import useControls from "r3f-native-orbitcontrols"
import "react-native-gesture-handler";

import Model from "./components/Model";

export default function App() {
    const [OrbitControls, events] = useControls()

    return (
        <View style={{flex: 1}} {...events}>
            <Canvas>
                <OrbitControls enablePan={false} minZoom={2} maxZoom={10}/>
                <ambientLight intensity={1} />
                <Suspense fallback={null}>
                    <Model></Model>
                </Suspense>
            </Canvas>
        </View>
    );
}
