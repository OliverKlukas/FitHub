const { styled, Button } = require('@mui/material')

export const LinkButton = styled(Button)(({ theme }) => ({
    color: '#222831',
    width: ['max-content'],
    backgroundColor: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    textTransform: ['none'],
    textAlign: 'center',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        color: '#393E46'
    }
}))
