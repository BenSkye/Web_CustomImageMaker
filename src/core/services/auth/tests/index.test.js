const axios = require('axios');
const { signIn } = require('@/core/services/auth/index.js');

jest.mock('axios');

const ENDPOINT = '/auth/authenticate';

describe('[UT-01] Check Sign-in success', () => {
  let mockAxiosPost;

  beforeEach(() => {
    mockAxiosPost = jest.fn();
    axios.post.mockImplementation(mockAxiosPost);
  });

  it('Success - Response with status code 200 and expected attributes', async () => {
    const username = 'vuong@gmail.com';
    const password = 'cfP9mYW5!';

    const expectedResponse = {
      timeStamp: expect.any(String),
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
      roles: expect.any(String),
    };

    mockAxiosPost.mockResolvedValueOnce({
      data: expectedResponse,
      status: 200,
    });

    const response = await signIn(username, password);

    expect(axios.post).toHaveBeenCalledWith(`${ENDPOINT}`, {
      username,
      password,
    });

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject(expectedResponse);
  });

  it('Failure - Throw an error for unsuccessful responses (not 200)', async () => {
    const username = 'invalid_user';
    const password = 'wrong_password';

    mockAxiosPost.mockRejectedValueOnce(new Error('Unauthorized'));

    expect(signIn(username, password)).rejects.toThrowError('Unauthorized');
  });
});
