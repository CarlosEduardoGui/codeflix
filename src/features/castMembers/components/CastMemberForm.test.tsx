import { render } from "@testing-library/react"
import { CastMemberForm } from "./CastMemberForm"
import { BrowserRouter } from "react-router-dom"

const Props = {
    castMember: {
        id: "1",
        name: "test",
        type: 1,
        deleted_at: null,
        created_at: "2023-03-03T00:00:00.000000Z",
        updated_at: "2023-03-03T00:00:00.000000Z",
    },
    isdisabled: false,
    isLoading: false,
    handleSubmit: jest.fn(),
    handleChange: jest.fn()
}

describe("CastMemberForm", () => {
    it("should render cast member form correctly", () => {
        const { asFragment } = render(<CastMemberForm {...Props} />, {
            wrapper: BrowserRouter
        })

        expect(asFragment()).toMatchSnapshot();
    })

    it("should render cast member form with loading state", () => {
        const { asFragment } = render(<CastMemberForm {...Props} isLoading={true} />, {
            wrapper: BrowserRouter
        })

        expect(asFragment()).toMatchSnapshot();
    })

    it("should render cast member form with disabled state", () => {
        const { asFragment } = render(<CastMemberForm {...Props} 
            isdisabled={true}
            isLoading={false} 
            />, {
            wrapper: BrowserRouter
        })

        expect(asFragment()).toMatchSnapshot();
    })
})