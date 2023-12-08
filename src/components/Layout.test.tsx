import { render } from "@testing-library/react"
import { Layout } from "./Layout"
import { BrowserRouter } from "react-router-dom"

describe("Layout", () => {
    it("should render layout correctly", () => {
        const { asFragment } = render(
        <Layout>
            <div>Test</div>
        </Layout>, {
            wrapper: BrowserRouter
        })

        expect(asFragment()).toMatchSnapshot();
    })
})