import { rest } from "msw";
import { setupServer } from "msw/node";
import {
    fireEvent,
    renderWithProviders,
    screen,
    waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CastMemberEdit } from "./EditCastMember";

const data = {
    id: 1,
    name: "test",
    type: 1
}

export const handlers = [
    rest.get(`${baseUrl}/cast_members/`, (req, res, ctx) => {
        return res(ctx.delay(150), ctx.status(200), ctx.json({ data: data }));
    }),
    rest.put(`${baseUrl}/cast_members/1`, (req, res, ctx) => {
        return res(ctx.delay(150), ctx.status(201));
    }),
];

const server = setupServer(...handlers);

describe("EditCastMember", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CastMemberEdit />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should handle submit", async () => {
        renderWithProviders(<CastMemberEdit />);
        const name = screen.getByTestId("name");
        await waitFor(() => {
            expect(name).toHaveValue("test");
        })
        await waitFor(() => {
            const submit = screen.getByText("Save");
            expect(submit).toBeInTheDocument();
        });

        const submit = screen.getByText("Save");
        fireEvent.change(name, { target: { value: "Test" } });
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Cast Member has been updated!");
            expect(text).toBeInTheDocument();
        });
    })

    it("should handle submit error", async () => {
        server.use(
            rest.put(`${baseUrl}/cast_members/1`, (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        )
        renderWithProviders(<CastMemberEdit />);
        const name = screen.getByTestId("name");
        await waitFor(() => {
            expect(name).toHaveValue("test");
        })
        await waitFor(() => {
            const submit = screen.getByText("Save");
            expect(submit).toBeInTheDocument();
        });

        const submit = screen.getByText("Save");
        fireEvent.change(name, { target: { value: "Test" } });
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Cast member not updated.");
            expect(text).toBeInTheDocument();
        });
    })
})
