import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  render,
  renderWithProviders,
  screen,
  waitFor,
} from "../../../utils/test-utils";
import { baseUrl } from "../../api/apiSlice";
import GenresTable from "./GenresTable";
import { BrowserRouter } from "react-router-dom";
import { genreResponse } from "../mocks";

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
  data: undefined,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 25, 50],
  handleOnPageChange: () => { },
  handleFilterChange: () => { },
  handleOnPageSizeChange: () => { },
  handleDelete: () => { },
};

export const handlers = [
  rest.post(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("GenresTable", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenresTable {...Props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render GenresTable with loading", () => {
    const { asFragment } = render(<GenresTable
      {...Props}
      isFetching={true}
    />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render GenresTable wit data", () => {
    const { asFragment } = render(<GenresTable
      {...Props}
      data={mockData}
    />,
      {
        wrapper: BrowserRouter
      });

    expect(asFragment()).toMatchSnapshot();
  })

  it("should render Genre table with Delete button", () => {
    const { asFragment } = render(<GenresTable
      {...Props}
      data={mockData}
      handleDelete={() => { }}
    />,
      {
        wrapper: BrowserRouter
      });

    expect(asFragment()).toMatchSnapshot();
  })

  it("should render GenresTable with data Categories", () => {
    const { asFragment } = render(<GenresTable
      {...Props}
      data={{
        ...mockData,
        data: [
          {
            ...mockData.data[0],
            categories: [
              {
                id: "1",
                name: "test",
                description: "test",
                is_active: true,
                created_at: "",
                updated_at: "",
                deleted_at: "",
              }
            ],
          },
        ],
      }}
      handleDelete={() => { }}
    />,
      {
        wrapper: BrowserRouter
      });

    expect(asFragment()).toMatchSnapshot();
  })
})