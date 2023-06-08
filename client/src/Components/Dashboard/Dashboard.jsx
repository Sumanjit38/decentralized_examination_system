import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SIDEBAR_OPTIONS } from "../../constants/sidebarOptions";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';

import "./dashboard.css";
import { Avatar, ListItemAvatar, Popover } from "@mui/material";
import {  } from '@mui/material/colors';

const drawerWidth = 240;

const Dashboard = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [user, setUser] = useState({
		role: "Admin",
		first_name: "Sanjit",
		last_name: "Setua",
	});
	const { window } = props;
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);
	const isMenuOpen = Boolean(anchorEl);
	const [popOverAnchorEl, setPopOverAnchorEl] = useState(null);
    const isPopOverOpen = Boolean(popOverAnchorEl);
    const id = isPopOverOpen ? "simple-popover" : undefined;

	const handleMenuClose = () => {
        setAnchorEl(null);
        const menuArrowElement = document.getElementById("menuArrow");
        if (menuArrowElement) {
            menuArrowElement.style.display = "none";
        }
    };

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleSidebarOptionClick = useCallback(
		(route) => {
			navigate(route);
		},
		[navigate]
	);

	const menuId = "primary-search-account-menu";
	console.log("Wrapped Compine", props.WrappedComponent)
	const renderMenu = (
		<Popover
			id={menuId}
			open={isMenuOpen}
			anchorEl={anchorEl}
			onClose={handleMenuClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
			style={
				{
					//scrollbar: 5
				}
			}
		>
			<div className="profile-menu">
				<List>
					<ListItem button >
						<ListItemAvatar>
							<Avatar className="list-avatar" sx={{ backgroundColor: "white",color: "#6242BC" }}>
								<PermIdentityIcon className="icons"/>
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="My Profile" />
					</ListItem>
					<ListItem button >
						<ListItemAvatar >
							<Avatar className="list-avatar"sx={{ backgroundColor: "white",color: "#6242BC" }}>
								<LogoutIcon className="icons" /* style={{ color: "#44b700"}} */ />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Logout" style={{ fontWeight: "bold" }}/>
					</ListItem>
				</List>
			</div>
		</Popover>
	);

	const drawer = (
		<div>
			<Toolbar />
			<div className="avatar-cont">
				<div
					className="role-cont"
					style={{
						marginBottom: "20px",
						marginTop: "-40px",
					}}
				>
					<h2>{user?.role}</h2>
				</div>
				<Avatar
					style={{
						textAlign: "center",
						width: 103,
						height: 101,
						fontSize: "3.5rem",
						color: "#6242BC",
						backgroundColor: "#d1ceff",
					}}
				>
					{user?.first_name[0] + user?.last_name[0]}
				</Avatar>
				<div
					className="name-cont"
					style={{
						marginTop: "20px",
						marginBottom: "20px",
					}}
				>
					<h3>{user?.first_name + " " + user?.last_name}</h3>
				</div>
			</div>
			<Divider />
			<List>
				{SIDEBAR_OPTIONS.map((sidebarOption, idx) => {
					const { caption, route, icon } = sidebarOption;
					return (
						<ListItem
							key={idx}
							disablePadding
							style={{ fontWeight: "bold", color: "red" }}
						>
							<ListItemButton onClick={() => handleSidebarOptionClick(route)}>
								<ListItemIcon>{icon}</ListItemIcon>
								<ListItemText
									primary={caption}
									style={{ fontWeight: "bold", color: "red" }}
									primaryTypographyProps={{
										color: "#47464B",
										fontWeight: "medium",
									}}
								/>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</div>
	);

	const handleProfileMenuOpen = (event) => {
		const { currentTarget } = event;
		setAnchorEl(currentTarget);
		const menuArrowElement = document.getElementById("menuArrow");
		if (menuArrowElement) {
			menuArrowElement.style.display = "block";
		}
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className="sidebar">
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` },
					}}
				>
					<Toolbar style={{ backgroundColor: "white", boxShadow: "none" }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" }, backgroundColor: "white" }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap component="div">
							Students
						</Typography>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
							style={{
								position: "absolute",
								right: 30
							}}
						>
							
							<AccountCircleIcon className="icons" style={{ color: "#6242BC", fontSize: "30px" }} />
						</IconButton>
					</Toolbar>
				</AppBar>
				{renderMenu}
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: "none", sm: "block" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
						open
					>
						{drawer}
					</Drawer>
				</Box>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
						width: { sm: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					{<props.WrappedComponent />}
				</Box>
			</Box>
		</div>
	);
};

Dashboard.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default Dashboard;
