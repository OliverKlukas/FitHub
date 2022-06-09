const { styled, Button } = require('@mui/material')

export const HighlightButton = styled(Button)(({ theme }) => ({
    color: '#FFFFFF',
    width: ['max-content'],
    backgroundColor: '#00ADB5',
    fontStyle: 'normal',
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 16,
    textTransform: ['none'],
    textAlign: 'center',
    '&:hover': {
        color: '#00ADB5',
        border: '1px solid',
        borderColor: '#00ADB5',
        backgroundColor: '#FFFFFF'
    }
}))
