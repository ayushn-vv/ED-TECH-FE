
import PropTypes from 'prop-types';
import MUILoadingButton from '@mui/lab/LoadingButton';

const LoadingButton = ({ onClick, label, sx, ...restProps }) => (
  <MUILoadingButton
    color="primary"
    onClick={onClick}
    variant="contained"
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
      fontFamily: 'Poppins',
      fontSize:'14px',
      lineHeight:'21px',
      fontWeight:500,
      boxShadow: 'none',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      height:45,
      ...sx,
    }}
    {...restProps}
  >
    {label}
  </MUILoadingButton>
);

LoadingButton.defaultProps = {
  label: '',
  onClick: () => {},
  sx: {},
  
};

LoadingButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  sx: PropTypes.objectOf(),
};

export default LoadingButton;
