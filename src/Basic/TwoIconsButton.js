import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const TwoIconsButton = ({
  isFirstIcon=true,
  firstIcon,
  secondIcon,
  onClickFirstIcon,
  onClickSecondIcon,
  firstIconTooltip,
  secondIconTooltip,
  buttonStyle={},
}) => {
  const handleOnClick = () => {
    isFirstIcon ? onClickFirstIcon() : onClickSecondIcon();
  };

  return (
    <Tooltip title={isFirstIcon ? firstIconTooltip: secondIconTooltip}>
      <IconButton onClick={handleOnClick} style={{...buttonStyle}}>
        {isFirstIcon ? firstIcon : secondIcon}
      </IconButton>
    </Tooltip>
  );
};

TwoIconsButton.propTypes = {
  isFirstIcon: PropTypes.bool,
  firstIcon: PropTypes.node.isRequired,
  secondIcon: PropTypes.node.isRequired,
  onClickFirstIcon: PropTypes.func,
  onClickSecondIcon: PropTypes.func,
  firstIconTooltip: PropTypes.string,
  secondIconTooltip: PropTypes.string,
  buttonStyle: PropTypes.object,
};

export default TwoIconsButton;