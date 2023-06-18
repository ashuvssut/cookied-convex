import Screen from "app/components/Screen";
import { Header } from "app/components/Header";
import { TreePanel } from "app/screens/HomeScreen/TreePanel";
import { View, Pressable } from "dripsy";
import { WebpageViewer } from "app/screens/HomeScreen/WebpageViewer";
import { MdMenu } from "app/assets/icons";
import { usePressabilityApiStyles } from "app/hooks/usePressabilityApiStyles";
import {
	ISlideInViewRefProps,
	XSlideInView,
} from "app/components/XSlideInView";
import { useRef } from "react";
import { isWeb } from "app/utils/constants";

export default function HomeScreen() {
	const style = usePressabilityApiStyles();
	const ref = useRef<ISlideInViewRefProps>(null);
	return (
		<XSlideInView ref={ref}>
			<Screen>
				{!isWeb && (
					<View sx={{ position: "absolute", top: 14, right: 20 }}>
						<Pressable
							variant="layout.center"
							onPress={() => ref.current?.triggerToggle()}
							sx={{ width: 35, height: 35 }}
							style={style}
							android_ripple={{ borderless: true, color: "#fff" }}
						>
							<MdMenu size={30} color="white" />
						</Pressable>
					</View>
				)}
				<View sx={{ height: isWeb ? "100vh" : "100%" }}>
					<Header />
					<View sx={{ flex: 1 }}>
						{isWeb ? (
							<View sx={{ flexDirection: "row", flex: 1 }}>
								<TreePanel />
								<WebpageViewer />
							</View>
						) : (
							<>
								<TreePanel />
								<WebpageViewer />
							</>
						)}
					</View>
				</View>
			</Screen>
		</XSlideInView>
	);
}
