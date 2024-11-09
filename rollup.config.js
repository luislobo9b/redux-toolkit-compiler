import nodeResolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"
import commonjs from "@rollup/plugin-commonjs"

const environment = (process.env.NODE_ENV || "production").trim(),
	isMinified = environment === "production",
	format = (process.env.REDUX_FILE_FORMAT || "esm").trim(),
	isUmd = format === "umd"

export default {
	input: "src/" + (isUmd ? "compiler-umd.js" : "compiler.js"),
	output: {
		file: "dist/" + "redux-toolkit" + (isMinified ? ".min" : "") + (isUmd ? ".umd" : "") + ".js",
		format
	},
	plugins: [
		nodeResolve(),
		replace({
			"process.env.NODE_ENV": JSON.stringify(environment),
			preventAssignment: true
		}),
		isUmd ? commonjs() : null,
		isMinified ? terser() : null
	].filter(Boolean)
}