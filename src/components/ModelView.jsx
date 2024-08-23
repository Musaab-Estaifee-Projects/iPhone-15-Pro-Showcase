import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import Lights from "./Lights";
import IPhone from "./IPhone";
import { Suspense } from "react";
import * as THREE from "three";
import Loader from "./Loader";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {

  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient Light: is a source of light which lights up all the objects in scene equally*/}
      <ambientLight intensity={0.3} />
      {/* A type of Camera that simulates the perspective of the humans eye */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      {/* We will wrap the suspense with OrbitControls which allow us to move the camera using the mouse. */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        // To targer the center of the screen.
        target={new THREE.Vector3(0, 0, 0)}
        // we try to get the angel of the camera to know where we are in the space
        onEnd={() => setRotationState(controlRef.currnet.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large'`}
        // the array of [0, 0, 0] is used to position the model in the center of the screen.
        position={[0, 0, 0]}
      >
        {/* Provides a loader until the model loads */}
        <Suspense
          fallback={
            <Loader />
          }
        >
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
