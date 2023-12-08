import { render } from "@testing-library/react"
import { CategoryForm } from "./CategoryForm"
import { BrowserRouter } from "react-router-dom"

const Props = {
    category: {
        id: "123",
        name: "test",
        description: "test",
        is_active: true,
        created_at: "2021-03-01T00:00:00.000000Z",
        updated_at: "2021-03-01T00:00:00.000000Z",
        deleted_at: null,
    },
    isdisabled: false,
    isLoading: false,
    handleSubmit: () => { },
    handleChange: () => { },
    handleToggle: () => { },
};

describe("CategoryForm", () => {
    it("should render correctly", () => {
        const { asFragment } = render(<CategoryForm {...Props} />, {
            wrapper: BrowserRouter
        });

        expect(asFragment()).toMatchSnapshot();
    })

    it("should render CategoryForm with loading", () => {
        const { asFragment } = render(<CategoryForm
            {...Props}
            isLoading={true}
            isdisabled={true}
        />, 
        {
            wrapper: BrowserRouter
        });

        expect(asFragment()).toMatchSnapshot();
    })
})