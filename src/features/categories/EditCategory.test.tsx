import { rest } from "msw";
import { setupServer } from "msw/node";
import {
    fireEvent,
    renderWithProviders,
    screen,
    waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CategoryEdit } from "./EditCategory";

const data = {
    id: "1",
    name: "Category 1",
    is_active: true,
    deleted_at: null,
    created_at: "2022-09-27T17:10:33+0000",
    updated_at: "2022-09-27T17:10:33+0000",
};

export const handlers = [
    rest.get(`${baseUrl}/categories/undefined`, (req, res, ctx) => {
        return res(ctx.delay(150), ctx.json(data));
    }),
    rest.get(`${baseUrl}/categories/1`, (req, res, ctx) => {
        return res(ctx.delay(150), ctx.status(200));
    }),
];

const server = setupServer(...handlers);

describe("CategoryEdit", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CategoryEdit />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should handle submit", async () => {
        renderWithProviders(<CategoryEdit />);
        const name = screen.getByTestId("name");
        const description = screen.getByTestId("description");
        const isActive = screen.getByTestId("is_active");

        await waitFor(() => {
            expect(name).toHaveValue("Category 1");
        });
        fireEvent.change(name, { target: { value: "Category 2" } })
        fireEvent.change(description, { target: { value: "Description 2" } })
        fireEvent.click(isActive)
        await waitFor(() => {
            const text = screen.getByText("Category updated successfully");
            expect(text).toBeInTheDocument();
        })
    })

    it("should handle submit error", async () => {
        server.use(
            rest.put(`${baseUrl}/categories/1`, (req, res, ctx) => {
                return res(ctx.status(400));
            }),

        )
        renderWithProviders(<CategoryEdit />);
        const name = screen.getByTestId("name");
        const description = screen.getByTestId("description");
        const isActive = screen.getByTestId("is_active");
        const submit = screen.getByTestId("Save");

        await waitFor(() => {
            expect(name).toHaveValue("Category 1");
        })
        fireEvent.change(name, { target: { value: "Category 2" } });
        fireEvent.change(description, { target: { value: "Description 2" } });
        fireEvent.click(isActive);
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Category not updated");
            expect(text).toBeInTheDocument();
        })
    })
})