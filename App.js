import React, {Suspense, useRef} from "react";
import {StyleSheet} from "react-native";
import {Canvas} from "@react-three/fiber";
import "react-native-gesture-handler";
import {GestureDetector, GestureHandlerRootView, Gesture} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import Model from "./components/Model";

const MIN_SCALE = 1.5;
const DEFAULT_SCALE = 4;
const MAX_SCALE = 10;

export default function App() {
    const rotationX = useRef(-25);
    const rotationY = useRef(0);
    const scale = useRef(DEFAULT_SCALE);

    const gesture = Gesture.Pan()
        .runOnJS(true)
        .onChange((e) => {
            rotationX.current += e.changeX;
            rotationY.current += e.changeY;
        })

    const zoomGesture = Gesture.Pinch()
        .runOnJS(true)
        .onUpdate((event) => {
            const currentZoom = scale.current * event.scale;
            const inRange = currentZoom > MIN_SCALE && currentZoom < MAX_SCALE;

            if (inRange) {
                scale.current = scale.current * event.scale;
            }
        })

    const composed = Gesture.Simultaneous(gesture, zoomGesture);

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={composed}>
                <Animated.View style={{flex: 1}}>
                    <Canvas
                        pointerEvents="none"
                        camera={{fov: 75, near: 0.1, far: 1000, position: [0, (180 * Math.PI) / 180, 10]}}
                    >
                        <ambientLight intensity={1} />
                        <Suspense fallback={null}>
                            <Model rotationX={rotationX} rotationY={rotationY} scale={scale}></Model>
                        </Suspense>
                    </Canvas>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: "pink",
    }
});
