import * as Module from "./_index"

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
			getByText("React Router is awesome!", {
				exact: false,
			})
		).not.toBeNull()
	})
})
