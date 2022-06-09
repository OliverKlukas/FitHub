const { styled, Button } = require('@mui/material')

export const CancelButton = styled(Button)(({ theme }) => ({
    color: '#222831',
    width: ['max-content'],
    backgroundColor: '#EEEEEE',
    fontStyle: 'normal',
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 16,
    textTransform: ['none'],
    textAlign: 'center',
    '&:hover': {
        border: '1px solid',
        borderColor: '#393E46',
        backgroundColor: '#EEEEEE'
    }
}))
