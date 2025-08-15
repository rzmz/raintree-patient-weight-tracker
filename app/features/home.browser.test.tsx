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

		const homeText = getByText("Welcome to the Patient Weight Tracker!")

		// TODO: this is always green no matter the text
		expect(homeText).not.toBeNull()
	})
})
