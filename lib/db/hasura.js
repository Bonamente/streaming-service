const queryHasuraGQL = async (
  operationsDoc,
  operationName,
  variables,
  token
) => {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });

  const data = await result.json();

  return data;
};

export const isNewUser = async (token, issuer) => {
  const operationsDoc = `
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        id
        email
        issuer
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    'isNewUser',
    { issuer },
    token
  );

  return response?.data?.users?.length === 0;
};

export const createNewUser = async (token, metadata) => {
  const operationsDoc = `
    mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
      insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
        returning {
          email
          id
          issuer
        }
      }
    }
  `;

  const { issuer, email, publicAddress } = metadata;

  const response = await queryHasuraGQL(
    operationsDoc,
    'createNewUser',
    {
      issuer,
      email,
      publicAddress,
    },
    token
  );

  return response;
};

export const findVideoIdByUser = async (token, userId, videoId) => {
  const operationsDoc = `
    query findVideoIdByUserId($userId: String!, $videoId: String!) {
      stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {
        id
        userId
        videoId
        favourited
        watched
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    'findVideoIdByUserId',
    {
      videoId,
      userId,
    },
    token
  );

  return response?.data?.stats;
};

export const insertStats = async (
  token,
  { favourited, userId, watched, videoId }
) => {
  const operationsDoc = `
    mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
      insert_stats_one(object: {
        favourited: $favourited, 
        userId: $userId, 
        watched: $watched, 
        videoId: $videoId
      }) {
          favourited
          id
          userId
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    'insertStats',
    { favourited, userId, watched, videoId },
    token
  );

  return response;
};

export const updateStats = async (
  token,
  { favourited, userId, watched, videoId }
) => {
  const operationsDoc = `
    mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
      update_stats(
        _set: {watched: $watched, favourited: $favourited}, 
        where: {
          userId: {_eq: $userId}, 
          videoId: {_eq: $videoId}
        }) {
        returning {
          favourited,
          userId,
          watched,
          videoId
        }
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    'updateStats',
    { favourited, userId, watched, videoId },
    token
  );

  return response;
};

export const getWatchedVideos = async (userId, token) => {
  const operationsDoc = `
    query watchedVideos($userId: String!) {
      stats(where: {
        watched: {_eq: true}, 
        userId: {_eq: $userId},
      }) {
        videoId        
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    'watchedVideos',
    { userId },
    token
  );

  return response?.data?.stats;
};
