import type React from "react";
import { useCssHandles } from "vtex.css-handles";

import "./styles.css";
import ErrorBoundary from "./utils/ErrorBoundary";
import WidgetButton from "./utils/WidgetButton";

const CSS_HANDLES = ["container"] as const;

type AppProps = React.PropsWithChildren;

const Content = (props: AppProps) => {
	const { handles } = useCssHandles(CSS_HANDLES);

	return (
		<div className={handles.container}>
			<p>Valtech Challenge</p>
		</div>
	);
};

const App = (props: React.PropsWithChildren) => (
	<ErrorBoundary
		fallback={
			<p style={{ color: "darkred", fontStyle: "italic" }}>
				Error al obtener app_name
			</p>
		}
	>
		<Content {...props} />
	</ErrorBoundary>
);

App.schema = {
	title: "CookieFortune",
	type: "object",
	properties: {
		documentation: {
			type: "string",
			widget: {
				"ui:widget": WidgetButton,
				"ui:options": {
					link: "https://doc-link-from-confluence.com",
					text: "Documentation",
				},
			},
		},
	},
};

export default App;
