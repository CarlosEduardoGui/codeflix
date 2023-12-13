import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import GenreForm from "./GenreForm";

const mockData = {
    data: [
        {
            id: "1",
            name: "test",
            isActive: true,
            deleted_at: null,
            created_at: "2021-09-01T00:00:00.000000Z",
            updated_at: "2021-09-01T00:00:00.000000Z",
            categories: [],
            description: "test",
            pivot: {
                genre_id: "1",
                category_id: "1",
            },
        },
    ],
    links: {
        first: "http://localhost:8000/api/genres?page=1",
        last: "http://localhost:8000/api/genres?page=1",
        prev: "",
        next: "",
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        path: "http://localhost:8000/api/genres",
        per_page: 15,
        to: 1,
        total: 1,
    },
};

const Props = {
    genre: {
        id: "123",
        name: "test",
        categories: [],
        isActive: true,
        description: "Action",
        created_at: "2021-03-01T00:00:00.000000Z",
        updated_at: "2021-03-01T00:00:00.000000Z",
        deleted_at: null,
        pivot: {
            genre_id: "1",
            category_id: "1",
        }
    },
    isDisabled: false,
    isLoading: false,
    handleSubmit: () => { },
    handleChange: () => { },
    handleToggle: () => { },
};


describe("GenreForm", () => {
    it("should render correctly", () => {
        const { asFragment } = render(<GenreForm {...Props} />, {
            wrapper: BrowserRouter
        });

        expect(asFragment()).toMatchSnapshot();
    })

    it("should render GenreForm with loading", () => {
        const { asFragment } = render(<GenreForm
            {...Props}
            isLoading={true}
            isDisabled={true}
        />,
            {
                wrapper: BrowserRouter
            });

        expect(asFragment()).toMatchSnapshot();
    })

    it("should render GenreForm with data", () => {
        const { asFragment } = render(<GenreForm {...Props} genre={mockData.data[0]} />,
            {
                wrapper: BrowserRouter
            });

        expect(asFragment()).toMatchSnapshot();
    })
})