import * as React from "react";
import {
	View,
	StyleSheet,
	Button,
	Dimensions,
	TextInput,
	SafeAreaView,
	Text,
	Platform,
} from "react-native";
import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";

export default function App() {
	const video = React.useRef(null);
	const [url, setUrl] = React.useState();
	const [loading, setLoading] = React.useState(false);

	return (
		<SafeAreaView
			style={[
				{
					paddingTop: Platform.OS === "android" ? 30 : 0,
				},
			]}
		>
			<View style={[styles.content]}>
				<View style={styles.header}>
					<View style={styles.meta}>
						<Text style={styles.title}>PTZOptics</Text>
					</View>
				</View>
			</View>
			<View style={styles.searchContainer}>
				<TextInput
					style={styles.search}
					value={url}
					placeholder='Enter url here...'
					onChangeText={(v) => {
						setUrl(v);
						setLoading(false);
					}}
				/>
				<Button
					disabled={!url}
					title={loading ? "Clear" : "Search"}
					onPress={() => {
						if (loading) {
							setLoading(false);
							setUrl("");
						} else {
							setLoading(true);
						}
					}}
				/>
			</View>
			<View>
				{url && loading ? (
					<Video
						ref={video}
						style={styles.video}
						source={{ uri: url }}
						useNativeControls
						resizeMode='contain'
						isLooping
					/>
				) : null}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	video: {
		alignSelf: "center",
		width: Dimensions.get("window").width,
		height: 350,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	searchContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 5,
	},
	search: {
		flex: 1,
		backgroundColor: "#fefefe",
		borderColor: "#eee",
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 16,
		marginHorizontal: 10,
		fontSize: 16,
		color: "#000",
		marginVertical: 10,
		height: 50,
	},
	content: {
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		borderBottomWidth: 1,
		borderStyle: "solid",
		borderBottomColor: "#eee",
	},
	header: {
		flexDirection: "row",
		height: 30,
	},
	meta: {
		marginHorizontal: 8,
		justifyContent: "flex-start",
	},
	title: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 24,
	},
});
