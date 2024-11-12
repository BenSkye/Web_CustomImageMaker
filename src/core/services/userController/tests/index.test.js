import api from "@/config/axios";
const ENDPOINT = '/user';

jest.mock('api');

describe('[UT-01] Check can get user', () => {
  let mockApiGet;

  beforeEach(() => {
    mockApiGet = jest.fn();
    api.get.mockImplementation(mockApiGet);
  });

  it('should return users with correct content length, pageNo, and existance of other attributes', async () => {
    const expectedPage = 0;
    const expectedSize = 1;
    const expectedResponse = {
      content: [
        {
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
          dob: expect.any(String),
          roleName: expect.any(String),
          male: expect.any(Boolean),
        }
      ],
      pageNo: expectedPage,
      pageSize: expectedSize,
      totalElement: expect.any(Number),
      totalPage: expect.any(Number),
      lastPage: expect.any(Boolean),
      firstPage: expect.any(Boolean),
    };

    mockApiGet.mockResolvedValueOnce(expectedResponse);

    const response = await getUsers(expectedPage, expectedSize);

    expect(api.get).toHaveBeenCalledWith(`${ENDPOINT}/`, {
      params: {
        page: expectedPage,
        size: expectedSize,
      },
    });
    expect(response.content.length).toBeLessThanOrEqual(expectedSize);
    expect(response.pageNo).toBe(expectedPage);
    expect(response).toMatchObject(expectedResponse);
  });
});
