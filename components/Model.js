import React from "react";
import {useGLTF, useTexture} from "@react-three/drei/native";

const modelPath = require("../assets/models/model.glb");
const textureTopPath = require("../assets/textures/textures1/top.png");
const textureBottomPath = require("../assets/textures/textures1/bottom.png");

const DEFAULT_SCALE = 2;
const DEFAULT_ROTATE_Y = -25 * Math.PI / 180;

const Model =() => {
    const obj = useGLTF(modelPath);
    const [textureTop, textureBottom] = useTexture([textureTopPath, textureBottomPath]);

    return (
        <group>
            <mesh geometry={obj.nodes.N00b3_1.geometry} rotation={[0, DEFAULT_ROTATE_Y, 0]} scale={DEFAULT_SCALE}>
                <meshBasicMaterial map={obj.nodes.N00b3_1.material.map} map-flipY={false} />
            </mesh>
            <mesh geometry={obj.nodes.roblox_model_top.geometry} rotation={[0, DEFAULT_ROTATE_Y, 0]} scale={DEFAULT_SCALE}>
                <meshBasicMaterial map={textureTop} map-flipY={false} />
            </mesh>
            <mesh geometry={obj.nodes.roblox_model_bot.geometry} rotation={[0, DEFAULT_ROTATE_Y, 0]} scale={DEFAULT_SCALE}>
                <meshBasicMaterial map={textureBottom} map-flipY={false} />
            </mesh>
        </group>
    );
}

export default Model;
