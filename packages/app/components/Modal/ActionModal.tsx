import { FlatList, View, Text } from "dripsy";
import React, { useState } from "react";
import { Formik } from "formik";
import { Th } from "app/theme/components";
import { TModal } from "app/components/Modal";
import { selectFlPathsWithTitles } from "app/store/slices/bmShelfSlice";
import Fuse from "fuse.js";
import { ListRenderItemInfo, Platform } from "react-native";
import logr from "app/utils/logr";
import { useAppSelector } from "app/store/hooks";

type Props = {
	title: string;
	type: TModal;
	onClose: () => void;
	initialUrl?: string;
};

export type TSearchResults = Fuse.FuseResult<{
	path: string;
	id: string;
	pathArr: string[];
}>[];

const ActionModal = (props: Props) => {
	const [searchResults, setSearchResults] = useState<TSearchResults>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (text: string) => {
		setSearchQuery(text);
		const options = {
			includeScore: true,
			keys: [["path"]],
		};
		const fuse = new Fuse(foldersSelector, options);
		const results = fuse.search(text);
		setSearchResults(results);
		console.log(
			"Results----------------------------------------->",
			JSON.stringify(results),
		);
	};

	const foldersSelector = useAppSelector(selectFlPathsWithTitles);
	logr("Folder Selector", foldersSelector);
	const handleSubmit = value => {
		console.log(value);
		if (props.type === "add-bookmark") {
		}
		if (props.type === "edit-bookmark") {
		}
		if (props.type === "add-folder") {
		}
		if (props.type === "edit-folder") {
		}
	};
	return (
		<View sx={{ m: "$4" }}>
			<Formik
				initialValues={{
					title: "",
					url: props.initialUrl ? props.initialUrl : "",
				}}
				// validationSchema={loginSchema}
				// validateOnMount
				onSubmit={values => handleSubmit(values)}
			>
				{p => (
					<>
						<Th.TextInput
							value={p.values.title}
							onChangeText={p.handleChange("title")}
							autoCorrect={false}
							onBlur={p.handleBlur("title")}
							placeholder="Enter the title"
						/>
						<View sx={{ marginTop: "$4" }} />
						{(props.type === "add-bookmark" ||
							props.type === "edit-bookmark") && (
							<Th.TextInput
								value={p.values.url}
								onChangeText={p.handleChange("url")}
								autoCorrect={false}
								onBlur={p.handleBlur("url")}
								placeholder="Enter URL"
							/>
						)}
						{(props.type === "add-bookmark" ||
							props.type === "edit-bookmark") && (
							<View sx={{ height: 100, marginTop: "$4" }}>
								<Th.TextInput
									value={searchQuery}
									onChangeText={handleSearch}
									autoCorrect={false}
									// onBlur={p.handleBlur("search")}
									placeholder="Search Folders"
								/>
								<FlatList
									data={searchResults}
									keyExtractor={(
										item: Fuse.FuseResult<{
											path: string;
											id: string;
											pathArr: string[];
										}>,
									) => item.item.id}
									renderItem={({
										item,
										index,
									}: ListRenderItemInfo<
										Fuse.FuseResult<{
											path: string;
											id: string;
											pathArr: string[];
										}>
									>) => {
										return (
											<View
												sx={{
													marginTop: 10,
													height: 40,
													backgroundColor: "#cccccc",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<Text sx={{ color: "white" }}>{item.item.path}</Text>
											</View>
										);
									}}
								/>
							</View>
						)}
						<View
							sx={{
								flexDirection: "row",
								justifyContent: "space-evenly",
								paddingBottom: Platform.OS === "web" ? 80 : 0,
							}}
						>
							<Th.ButtonSecondary
								onPress={() => props.onClose()}
								sx={{ flex: 1, marginRight: "$3" }}
							>
								Cancel
							</Th.ButtonSecondary>
							<Th.ButtonPrimary
								onPress={handleSubmit}
								sx={{ flex: 1, marginLeft: "$3" }}
							>
								Add
							</Th.ButtonPrimary>
						</View>
					</>
				)}
			</Formik>
		</View>
	);
};

export default ActionModal;
