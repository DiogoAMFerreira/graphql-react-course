import gql from 'graphql-tag'

export default gql`
    mutation DeleteSong($id: ID) {
        deleteSong(title: $id) {
            id
        }
    }
`
