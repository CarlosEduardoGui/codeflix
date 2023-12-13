import { rest } from "msw";
import { setupServer } from "msw/node";
import {
    fireEvent,
    renderWithProviders,
    screen,
    waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { GenreCreate } from "./GenreCreate";
import { categoryResponse } from "../categories/mocks";

export const handlers = [
    rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
        return res(ctx.json(categoryResponse));
    }),


    rest.post(`${baseUrl}/genre`, (req, res, ctx) => {
        return res(ctx.delay(150), ctx.status(201));
    }),
];

const server = setupServer(...handlers);

describe("CreateCategory", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<GenreCreate />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should handle submit", async () => {
        renderWithProviders(<GenreCreate />);
        const name = screen.getByTestId("name");
        const submit = screen.getByText("Save");

        fireEvent.change(name, { target: { value: "test" } });
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Genre has been created!");
            expect(text).toBeInTheDocument();
        })
    })

    it("should handle submit error", async () => {
        server.use(
            rest.post(`${baseUrl}/genres`, (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        )
        renderWithProviders(<GenreCreate />);
        const name = screen.getByTestId("name");
        
        const submit = screen.getByText("Save");

        fireEvent.change(name, { target: { value: "test" } });
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Category not created");
            expect(text).toBeInTheDocument();
        })
    })
});