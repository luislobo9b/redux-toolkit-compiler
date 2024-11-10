import nodeResolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"
import commonjs from "@rollup/plugin-commonjs"

const environment = (process.env.NODE_ENV || "production").trim(),
	isMinified = environment === "production",
	format = (process.env.REDUX_FILE_FORMAT || "esm").trim(),
	isIife = format === "iife"

export default {
	input: "src/" + (isIife ? "compiler-iife.js" : "compiler.js"),
	output: {
		file: "dist/" + "redux-toolkit" + (isIife ? ".iife" : "") + (isMinified ? ".min" : "") + ".js",
		format
	},
	plugins: [
		nodeResolve(),
		replace({
			"process.env.NODE_ENV": JSON.stringify(environment),
			preventAssignment: true
		}),
		isIife ? commonjs() : null,
		isMinified ? terser() : null
	].filter(Boolean)
}