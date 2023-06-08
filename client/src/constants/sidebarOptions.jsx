import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

const sidebarOptions = [
    {
        caption: "Teachers",
        route: "/teachers",
        icon: <RecordVoiceOverOutlinedIcon style={{color: "#7e96cf"}}/>
    },
    {
        caption: "Departments",
        route: "/departments",
        icon: <SchoolOutlinedIcon />
    },
    {
        caption: "Students",
        route: "/students",
        icon: <PeopleAltOutlinedIcon />
    },
    {
        caption: "User Management",
        route: "/user-management",
        icon: <SettingsSuggestOutlinedIcon />
    },
];

export const SIDEBAR_OPTIONS = sidebarOptions;