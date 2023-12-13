import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { GenreEdit } from "./GenreEdit";
import { categoryResponse } from "../categories/mocks";

const mockData = {

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

}

export const handlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(ctx.json(categoryResponse));
  }),

  rest.get(`${baseUrl}/genres/undefined`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.json({ data: mockData }));
  }),

  rest.get(`${baseUrl}/genres/1`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe("CreateCategory", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<GenreEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("Genre 1");
    });
    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "Genre 2" } })
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre updated successfully");
      expect(text).toBeInTheDocument();
    })
  })

  it("should handle submit", async () => {
    server.use(
      rest.put(`${baseUrl}/genres/1`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      })
    )
    renderWithProviders(<GenreEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("Genre 1");
    });
    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "Genre 2" } })
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre updated successfully");
      expect(text).toBeInTheDocument();
    })
  })
});