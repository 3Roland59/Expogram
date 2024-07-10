import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import RoomScreen from "./RoomScreen";
import CallScreen from "./CallScreen";
import JoinScreen from "./JoinScreen";

// Just to handle navigation
export default function VideoCall({route}) {
  const { user } = route.params;

  const screens = {
    ROOM: "JOIN_ROOM",
    CALL: "CALL",
    JOIN: "JOIN",
  };

  const [screen, setScreen] = useState(screens.ROOM);
  const [roomId, setRoomId] = useState("");

  let content;

  switch (screen) {
    case screens.ROOM:
      content = (
        <RoomScreen
          roomId={roomId}
          setRoomId={setRoomId}
          screens={screens}
          setScreen={setScreen}
          user={user}
        />
      );
      break;

    case screens.CALL:
      content = (
        <CallScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      );
      break;

    case screens.JOIN:
      content = (
        <JoinScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      );
      break;

    default:
      content = <Text className='text-white'>Wrong Screen</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-black justify-center ">{content}</SafeAreaView>
  );
}