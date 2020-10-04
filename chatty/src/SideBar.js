import React from 'react';
import "./SideBar.css";
import SidebarChat from "./SidebarChat"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
// import { makeStyles } from '@material-ui/core/styles';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';

// const useStyles = makeStyles((theme) => ({
//     margin: {
//       margin: theme.spacing(1),
//     },
//     extendedIcon: {
//       marginRight: theme.spacing(1),
//     },
// }));

const SideBar = () => {
    return (
        <div className = "sidebar">
            <div className="sidebar__header">
                <Avatar src="" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <YoutubeSearchedForIcon />
                    <input placeholder="Search or Start new Chat..." type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>

            {/* <div className="sidebar__footer">
                <div className="sidebar__footerAdd">
                    <IconButton color="#000000">
                        <AddIcon />
                    </IconButton>
                </div>
            </div> */}
        </div>
    );
}

export default SideBar;

