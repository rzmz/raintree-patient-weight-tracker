import * as Module from "../features/home"

describe("Home route", () => {
	it("should render the home page text properly in english", async ({ renderStub }) => {
		const { getByText } = await renderStub({
			entries: [
				{
					id: "home",
					path: "/",
					Component: () => Module.default(),
				},
			],
		})

		expect(
			getByText("Hello from React Router!", {
				exact: true,
			})
		).not.toBeNull()
	})
})
