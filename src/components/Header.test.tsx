import { render } from "@testing-library/react"
import { Header } from "./Header"
import { BrowserRouter } from "react-router-dom"

describe("Layout", () => {
    it("should render header correctly", () => {
        const { asFragment } = render(<Header toggle={() => { }} theme=""/>, {
            wrapper: BrowserRouter
        })

        expect(asFragment()).toMatchSnapshot();
    })
})