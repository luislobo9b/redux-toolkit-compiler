import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"

const environment = (process.env.NODE_ENV || "production").trim(),
	isMinified = environment === "production",
	format = (process.env.REDUX_FILE_FORMAT || "esm").trim()

export default {
	input: "src/compiler.js",
	output: {
		file: "dist/" + "redux-toolkit" + (isMinified ? ".min" : "") + "." + (format === "cjs" ? "c" : "") + "js",
		format
	},
	plugins: [
		nodeResolve(),
		replace({
			"process.env.NODE_ENV": JSON.stringify(environment),
			preventAssignment: true
		}),
		isMinified ? terser() : null
	].filter(Boolean)
}