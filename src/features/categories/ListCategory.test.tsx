import { rest } from "msw";
import { setupServer } from "msw/node";
import {
    fireEvent,
    renderWithProviders,
    screen,
    waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse, categoryResponsePage2 } from "../categories/mocks";
import { CategoryList } from "./ListCategory";

export const handlers = [
    rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
        if (req.url.searchParams.get("page") === "2") {
            return res(ctx.json(categoryResponsePage2), ctx.delay(150));
        }
        return res(ctx.json(categoryResponse), ctx.delay(150));
    }),

    rest.delete(
        `${baseUrl}/categories/cbdd550c-ad46-4e50-be8d-a8266aff4162`,
        (_, res, ctx) => {
            return res(ctx.delay(150), ctx.status(204));
        }
    ),
];

const server = setupServer(...handlers);

describe("CategoryList", () => {
    afterAll(() => server.close());
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CategoryList />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render loading state", () => {
        renderWithProviders(<CategoryList />);
        const loading = screen.getByRole("progressbar");
        expect(loading).toBeInTheDocument();
    });

    it("should render success state", async () => {
        renderWithProviders(<CategoryList />);
        await waitFor(() => {
            const name = screen.getByText("PaleTurquoise");
            expect(name).toBeInTheDocument();
        });
    });

    it("should render error state", async () => {
        server.use(
            rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const error = screen.getByText("Error fetching categories");
            expect(error).toBeInTheDocument();
        });
    });

    it("should handle On PageChange", async () => {
        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const name = screen.getByText("PaleTurquoise");
            expect(name).toBeInTheDocument();
        });

        const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
        fireEvent.click(nextButton);

        await waitFor(() => {
            const name = screen.getByText("SeaGreen");
            expect(name).toBeInTheDocument();
        });
    });

    it("should handle filter change", async () => {
        renderWithProviders(<CategoryList />);
        await waitFor(() => {
            const name = screen.getByText("PaleTurquoise");
            expect(name).toBeInTheDocument();
        });
        const input = screen.getByPlaceholderText("Search…");

        fireEvent.change(input, { target: { value: "PapayaWhip" } });

        await waitFor(() => {
            const loading = screen.getByRole("progressbar");
            expect(loading).toBeInTheDocument();
        });
    });

    it("should handle Delete Category success", async () => {
        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const name = screen.getByText("PaleTurquoise");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByTestId("delete-button")[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const name = screen.getByText("Category deleted");
            expect(name).toBeInTheDocument();
        });
    });

    it("should handle Delete Category error", async () => {
        server.use(
            rest.delete(
                `${baseUrl}/categories/cbdd550c-ad46-4e50-be8d-a8266aff4162`,
                (_, res, ctx) => {
                    return res(ctx.delay(150), ctx.status(500));
                }
            )
        );

        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const name = screen.getByText("PaleTurquoise");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByTestId("delete-button")[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const name = screen.getByText("Category not deleted");
            expect(name).toBeInTheDocument();
        });
    });
});