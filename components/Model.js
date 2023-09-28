import {useGLTF, useTexture} from "@react-three/drei/native";
import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";

const modelPath = require('../assets/models/model.glb');

const textureTopPath = require('../assets/textures/textures1/top.png');
const textureBottomPath = require('../assets/textures/textures1/bottom.png');

const MAX_X_ROTATION = 90;
const MIN_X_ROTATION = -90;
const DEFAULT_SCALE = 4;

const Model =({rotationX, rotationY, scale}) => {
    const obj = useGLTF(modelPath);
    const [textureTop, textureBottom] = useTexture([textureTopPath, textureBottomPath]);
    const meshHead = useRef(null);
    const meshTop = useRef(null);
    const meshBottom = useRef(null);

    useFrame(() => {

        if (meshTop.current) {

            const inRange = rotationY.current > MIN_X_ROTATION && rotationY.current < MAX_X_ROTATION;

            if (inRange) {
                meshHead.current.rotation.x =
                    meshBottom.current.rotation.x =
                        meshTop.current.rotation.x =
                            (rotationY.current * Math.PI) / 180;
            }
            meshHead.current.rotation.y =
                meshBottom.current.rotation.y =
                    meshTop.current.rotation.y =
                        ((rotationX.current) * Math.PI) / 180;

            meshHead.current.scale.x =
                meshBottom.current.scale.x =
                    meshTop.current.scale.x =
                        scale.current;
            meshHead.current.scale.y =
                meshBottom.current.scale.y =
                    meshTop.current.scale.y =
                        scale.current;

            meshHead.current.scale.z =
                meshBottom.current.scale.z =
                    meshTop.current.scale.z =
                        scale.current;
        }
    })

    return (
        <group>
            <mesh geometry={obj.nodes.N00b3_1.geometry} ref={meshHead} rotation={[0.5, 0, 0]} scale={DEFAULT_SCALE}>
                <meshBasicMaterial map={obj.nodes.N00b3_1.material.map} map-flipY={false} />
            </mesh>
            <mesh geometry={obj.nodes.roblox_model_top.geometry} ref={meshTop} rotation={[0.5, 0, 0]} scale={DEFAULT_SCALE}>
                <meshBasicMaterial map={textureTop} map-flipY={false} />
            </mesh>
            <mesh geometry={obj.nodes.roblox_model_bot.geometry} rotation={[0.5, 0, 0]} ref={meshBottom} scale={DEFAULT_SCALE}>
                <meshBasicMaterial map={textureBottom} map-flipY={false} />
            </mesh>
        </group>
    );
}

export default Model;
