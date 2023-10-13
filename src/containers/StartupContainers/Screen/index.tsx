import { IRootState } from '@redux/rootReducer';
import cn from 'classnames';
import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import { Stack } from '@mui/material';
import { MINI_SIDE_BAR_WIDTH, NAVBAR_HEIGHT } from '@appConfig/constants';
const Sidebar = React.lazy(() => import('../SideBar'));
const Navbar = React.lazy(() => import('../NavBar'));

const Screen: React.FC<Props> = ({ isAuthenticated, children }) => {
  return (
    <Stack
      sx={
        isAuthenticated
          ? {
              paddingTop: `${NAVBAR_HEIGHT}px`,
              paddingLeft: `${MINI_SIDE_BAR_WIDTH}px`,
            }
          : {}
      }
    >
      {isAuthenticated && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}

      {children}
    </Stack>
  );
};

type Props = ReturnType<typeof mapStateToProps> & HTMLProps<HTMLDivElement>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, undefined)(Screen);
