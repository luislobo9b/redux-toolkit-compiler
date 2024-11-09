import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"

const environment = (process.env.NODE_ENV || "production").trim(),
    isMinified = environment === "production"

export default {
	input: "src/compiler.js",
	output: {
		file: "dist/" + "redux-toolkit" + (isMinified ? ".min" : "") + ".js",
		format: "es"
	},
	plugins: [
		nodeResolve(),
		replace({
			"process.env.NODE_ENV": JSON.stringify(environment),
			preventAssignment: true
		})
	]
}