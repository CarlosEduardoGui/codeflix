import { rest } from "msw";
import { setupServer } from "msw/node";
import {
    fireEvent,
    renderWithProviders,
    screen,
    waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CastMemberCreate } from "./CreateCastMember";

export const handlers = [
    rest.post(`${baseUrl}/cast_members`, (req, res, ctx) => {
        return res(ctx.delay(150), ctx.status(201));
    }),
];

const server = setupServer(...handlers);

describe("CreateCastMember", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render correct", () => {
        const { asFragment } = renderWithProviders(<CastMemberCreate />);
        expect(asFragment()).toMatchSnapshot();
    })

    it("should handle submit", async () => {
        renderWithProviders(<CastMemberCreate />);
        const name = screen.getByTestId("name");
        const submit = screen.getByText("submit");

        fireEvent.change(name, { tagert: { value: "Test" } });

        await waitFor(() => {
            const text = screen.getByText("Cast Member has been created successfully!");
            expect(text).toBeInTheDocument();
        });
    })

    it("should handle submit errors", async () => {
        server.use(
            rest.post(`${baseUrl}/cast_members`, (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        )
        renderWithProviders(<CastMemberCreate />);
        const name = screen.getByTestId("name");
        const submit = screen.getByText("submit");

        fireEvent.change(name, { tagert: { value: "Test" } });
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Something  went wrong");
            expect(text).toBeInTheDocument();
        });
    })
})