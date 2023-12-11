import { rest } from "msw";
import { setupServer } from "msw/node";
import {
    fireEvent,
    renderWithProviders,
    screen,
    waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { ListCastMembers } from "./ListCastMembers";
import { castMemberResponse, castMemberResponsePage2 } from "./mocks"

export const handlers = [
    rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
        if (req.url.searchParams.get("page") === "2") {
            return res(ctx.json(castMemberResponsePage2), ctx.delay(150))
        }
        return res(ctx.delay(150), ctx.status(200), ctx.json(castMemberResponse));
    }),

    rest.delete(`${baseUrl}/cast_members/f55fca48-d422-48bf-b212-956215eddcaf`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(204));
    })
];

const server = setupServer(...handlers);

describe("ListCastMembers", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<ListCastMembers />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render loading state", () => {
        renderWithProviders(<ListCastMembers />);
        const loading = screen.getByRole("progressbar");
        expect(loading).toBeInTheDocument();
    });

    it("should render success state", async () => {
        renderWithProviders(<ListCastMembers />);
        await waitFor(() => {
            const table = screen.getByText("Teste");
            expect(table).toBeInTheDocument();
        })
    })

    it("should render error state", async () => {
        server.use(
            rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        );
        renderWithProviders(<ListCastMembers />);
        await waitFor(() => {
            const error = screen.getByText("Erro ao carregar");
            expect(error).toBeInTheDocument();
        });
    });

    it("should handle OnPageChange", async () => {
        renderWithProviders(<ListCastMembers />);

        await waitFor(() => {
            const name = screen.getByText("Teste");
            expect(name).toBeInTheDocument();
        });

        const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
        fireEvent.click(nextButton);

        await waitFor(() => {
            const name = screen.getByText("Teste 2");
            expect(name).toBeInTheDocument();
        });
    })

    it("sould handle filter change", async () => {
        renderWithProviders(<ListCastMembers />);

        await waitFor(() => {
            const name = screen.getByText("Teste")
            expect(name).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Search...");
        fireEvent.change(input, { tagert: { value: "Teste 2" } });

        await waitFor(() => {
            const loading = screen.getByRole("progressbar");
            expect(loading).toBeInTheDocument();
        });
    });

    it("should handle Delete Category successfully", async () => {
        renderWithProviders(<ListCastMembers />);

        await waitFor(() => {
            const name = screen.getByText("Teste");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByAltText("delete-button")[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const name = screen.getByText("Cast Member has been deleted!");
            expect(name).toBeInTheDocument();
        })
    })

    it("should handle Delete Category error", async () => {
        server.use(
            rest.delete(`${baseUrl}/cast_members/f55fca48-d422-48bf-b212-956215eddcaf`, (_, res, ctx) => {
                return res(ctx.status(500));
            })
        )

        renderWithProviders(<ListCastMembers />)

        await waitFor(() => {
            const name = screen.getByText("Teste")
            expect(name).toBeInTheDocument();
        })

        const deleteButton = screen.getAllByAltText("delete-button")[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const name = screen.getByText("Cast member not deleted.");
            expect(name).toBeInTheDocument();
        })
    })
})