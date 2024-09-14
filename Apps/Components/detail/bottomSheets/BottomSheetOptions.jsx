import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import React, { useMemo, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../Shared/bottomSheets/CustomBackdrop";
import { Ionicons, Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import useReportAction from "../../../../Hooks/useReportAction";
import useDeletePost from "../../../../Hooks/useDeletePost";
import useSharePost from "../../../../Hooks/useSharePost";
import useSavePost from "../../../../Hooks/useSavePost";
import useDownloadReel from "../../../../Hooks/useDownloadMedia";

const BottomSheetOptions = ({
  bottomSheetRef,
  navigation,
  post,
  currentUser,
}) => {
  const { handleReportPost } = useReportAction();
  const { deletePost } = useDeletePost();
  const { sharePost } = useSharePost();
  const { savePost } = useSavePost();
  const {downloadReel, downloading} = useDownloadReel()

  const snapPoints = useMemo(() => [370], []);

  const handleSavePost = async () => {
    await savePost(post, currentUser);
  };

  const handleSharePost = async () => {
    bottomSheetRef.current.close();
    await sharePost(post);
  };

  const handleEditPost = () => {
    navigation.popToTop();
    navigation.navigate("EditPost", {
      post: post,
    });
  };

  const handleDownloadPost = async() => {
    for (let i = 0; i < post?.imageUrl.length; i++) {
      console.log('download', post?.imageUrl[i])
     await downloadReel(post.imageUrl[i], i+post?.id)
    }

  };

  const handleDeletePost = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          navigation.goBack();
          deletePost(post);
        },
      },
    ]);
  };

  const handleAboutAccount = () => {
    if (currentUser.email === post.email) {
      navigation.navigate("Profile");
    } else {
      navigation.popToTop();
      navigation.navigate("UserDetail", {
        email: post.email,
      });
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      backgroundStyle={{ borderRadius: 25, backgroundColor: "#232325" }}
      backdropComponent={CustomBackdrop}
      handleComponent={() => (
        <View style={styles.closeLineContainer}>
          <View style={styles.closeLine}></View>
        </View>
      )}
      enablePanDownToClose
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => handleSavePost()}
            style={styles.opacityContainer}
          >
            <View style={styles.buttonContainer}>
              {currentUser.saved_posts.includes(post.id) ? (
                <Ionicons name="bookmark" size={24} color="#fff" />
              ) : (
                <Feather name="bookmark" size={24} color="#fff" />
              )}
            </View>
              <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSharePost()}
            style={styles.opacityContainer}
          >
            <View style={styles.buttonContainer}>
              <Feather name="send" size={24} color="#fff" />
            </View>
              <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {post.email === currentUser.email && (
          <View style={styles.verticalGroup}>
            <TouchableOpacity
              onPress={() => handleEditPost()}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
                <MaterialIcons name="edit" size={24} color="#fff" />
                <Text style={styles.optionText}>Edit</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => handleDownloadPost()}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
              {
                  downloading?<ActivityIndicator color={'#fff'} /> :<Feather name="download" size={24} color="#fff" />
                }
                <Text style={styles.optionText}>Download</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => handleDeletePost()}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
                <Ionicons name="trash-outline" size={24} color="#f00" />
                <Text style={styles.optionRedText}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {post.email !== currentUser.email && (
          <View style={styles.verticalGroup}>
            <TouchableOpacity
              onPress={() => handleAboutAccount()}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
              <Octicons name="info" size={22} color="#fff" />
                <Text style={styles.optionText}>About this account</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => handleDownloadPost()}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
              {
                  downloading?<ActivityIndicator color={'#fff'} /> :<Feather name="download" size={22} color="#fff" />
                }
                <Text style={styles.optionText}>Download</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => handleReportPost(post, currentUser)}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
                <Octicons name="report" size={22} color="#f00" />
                <Text style={styles.optionRedText}>Report</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default BottomSheetOptions;

const styles = StyleSheet.create({
  closeLineContainer: {
    alignSelf: "center",
  },
  closeLine: {
    width: 50,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#777",
    marginTop: 10,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  opacityContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer: {
    borderRadius: 100,
    width:70,
    height:70,
    borderWidth:1,
    borderColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 12,
    paddingVertical: 10,
  },
  verticalGroup: {
    marginTop: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  columnContainer: {
    flexDirection: "row",
  },
  optionContainer: {
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    height: 58,
    flex: 1,
    gap: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#444",
  },
  optionText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  optionRedText: {
    color: "#f00",
    fontWeight: "500",
    fontSize: 16,
  },
  unfollowIcon: {
    transform: [{ scaleX: -1 }],
  },
});
