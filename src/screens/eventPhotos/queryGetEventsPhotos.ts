import {gql} from '../../utils/apolloClient';

export const queryGetEventsPhotos = gql`
  query GetEventsPhotos($page: Int!, $pageSize: Int!) {
    niceEvents(
      sort: ["createdAt:desc"]
      pagination: {pageSize: $pageSize, page: $page}
    ) {
      data{
        attributes{
          EventName
          Photo{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }
`;
