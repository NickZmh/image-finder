export const FetchError = ({ error, onRetry }) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Typography color="error" mb={2}>
      {error}
    </Typography>
    <Button variant="contained" color="secondary" onClick={onRetry}>
      Try Again
    </Button>
  </Box>
)
