import React, { useState } from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function ProfileDropdown({ userType, onLogout }) {
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
  const navigate = useNavigate(); // Hook to navigate

  const handleMenuClick = (action) => {
    switch (action) {
      case 'profile':
        navigate('/profile'); // Navigate to profile page
        break;
      case 'dashboard':
        navigate('/AdminDashboard'); // Navigate to dashboard
        break;
      case 'settings':
        navigate('/settings'); // Navigate to settings
        break;
      case 'logout':
        setOpenModal(true); // Open the modal when logout is clicked
        break;
      default:
        break;
    }
  };

  const handleLogoutConfirmation = (confirm) => {
    if (confirm) {
      onLogout(); // Call the logout function if confirmed
    }
    setOpenModal(false); // Close the modal after the confirmation
  };

  return (
    <div className="flex items-center gap-3">
      <Dropdown>
        <MenuButton>
          <img
            src="/api/placeholder/40/40"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </MenuButton>
        <Menu slots={{ listbox: AnimatedListbox }}>
          <MenuItem onClick={() => handleMenuClick('profile')}>
            Profile
          </MenuItem>
          {userType === 'admin' && (
            <MenuItem onClick={() => handleMenuClick('dashboard')}>
              Dashboard
            </MenuItem>
          )}
          <MenuItem onClick={() => handleMenuClick('settings')}>
            Settings
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('logout')} className="text-red-600">
            Logout
          </MenuItem>
        </Menu>
      </Dropdown>

      {/* Logout Confirmation Modal */}
      <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="sm" // Adjusted to 'sm' for a better balance of size
            fullWidth={true} // Ensure the modal stretches to full width (or adjust to a specific width as needed)
            PaperProps={{
              style: {
                minWidth: '400px', // Ensure the dialog has a minimum width
                padding: '16px', // Optional: Add some padding around the modal content
              },
            }}
>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogContent sx={{ padding: '24px' }}> {/* Larger padding for content */}
              Are you sure you want to logout?
            </DialogContent>
            <DialogActions sx={{ padding: '16px' }}> {/* Adjust padding of actions */}
              <Button
                onClick={() => handleLogoutConfirmation(false)}
                sx={{ backgroundColor: '#f0f0f0', color: '#555' }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleLogoutConfirmation(true)}
                sx={{ backgroundColor: '#d32f2f', color: '#fff' }}
              >
                Logout
              </Button>
            </DialogActions>
        </Dialog>


    </div>
  );
}

// Styled components remain the same as in your original code.
const grey = {
  50: '#F8F5F2',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'Product Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: #fff;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  box-shadow: 0px 4px 30px ${grey[200]};
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      'The `AnimatedListbox` component cannot be rendered outside a `Popup` component'
    );
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

const MenuItem = styled(BaseMenuItem)`
  list-style: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  font-family: 'Product Sans', sans-serif;

  &:hover {
    background-color: ${grey[50]};
  }

  &:focus {
    background-color: ${grey[100]};
    outline: none;
  }

  &.${menuItemClasses.disabled} {
    color: ${grey[400]};
  }
`;

const MenuButton = styled(BaseMenuButton)`
  padding: 0;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  background: transparent;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid #C21807;
    outline-offset: 2px;
  }
`;
