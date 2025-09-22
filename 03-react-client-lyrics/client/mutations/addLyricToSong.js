import gql from 'graphql-tag'

export default gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(songId: $songId, content: $content) {
            id
            lyrics {
                content
            }
        }
    }
`
