const { styled, Button } = require('@mui/material')

export const StandardButton = styled(Button)(({ theme }) => ({
    color: '#FFFFFF',
    width: ['max-content'],
    backgroundColor: '#393E46',
    fontStyle: 'normal',
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 16,
    textTransform: ['none'],
    textAlign: 'center',
    '&:hover': {
        color: '#393E46',
        backgroundColor: '#EEEEEE',
    }
}))
