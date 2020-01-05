import 'babel-polyfill';

import * as React from "react";
import { AppConfig } from './data/config';
import { BrowserRouter, Route, Switch, NavLink, useParams, useHistory } from 'react-router-dom';
import { makeStyles, Container, Toolbar, Button, Typography, IconButton, Paper, createStyles, Box, List, ListItem, ListItemIcon, Grid } from '@material-ui/core';
import { Search, Dashboard } from '@material-ui/icons';
import { Guest } from './models';
import { AdminGuestView } from './pages/AdminGuestView';
import { HostHomeDataProvider } from './data/data-context';
import { AdminView } from './pages/AdminView';

export interface AppProps {
}

const useStyles = makeStyles(theme => (
    createStyles({
        root: {
            flexGrow: 1
        },
        toolbar: {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        toolbarTitle: {
            flex: 1,
        },
        toolbarSecondary: {
            justifyContent: 'space-between',
            overflowX: 'auto',
        },
        toolbarLink: {
            padding: theme.spacing(1),
            flexShrink: 0,
        },
        mainFeaturedPost: {
            position: 'relative',
            backgroundColor: theme.palette.grey[800],
            color: theme.palette.common.white,
            marginBottom: theme.spacing(4),
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
        },
        mainFeaturedPostContent: {
            position: 'relative',
            padding: theme.spacing(3),
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(6),
                paddingRight: 0,
            },
        },
        mainGrid: {
            marginTop: theme.spacing(3),
        },
        card: {
            display: 'flex',
        },
        cardDetails: {
            flex: 1,
        },
        cardMedia: {
            width: 160,
        },
        markdown: {
            ...theme.typography.body2,
            padding: theme.spacing(3, 0),
        },
        sidebarAboutBox: {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.grey[200],
        },
        sidebarSection: {
            marginTop: theme.spacing(3),
        },
        footer: {
            backgroundColor: theme.palette.background.paper,
            marginTop: theme.spacing(8),
            padding: theme.spacing(6, 0),
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }
    })));



export const PlaceholderView = () => {
    const classes = useStyles({});
    return (
        <Typography
            component='h2'
            variant='h5'
            color='inherit'
            align='center'
            noWrap
            className={classes.toolbarTitle}
        >
            Nothing here yet
        </Typography>
    );
}

export const PlaceholderWithIdView = () => {
    const classes = useStyles({});
    const { id } = useParams();
    return (
        <Typography
            component='h2'
            variant='h5'
            color='inherit'
            align='center'
            noWrap
            className={classes.toolbarTitle}
        >
            Nothing here yet for ID: {id}
        </Typography>
    );
}


export const WelcomeView = () => {
    const classes = useStyles({});
    const history = useHistory();
    return (
        <React.Fragment>
            <Typography
                component='h2'
                variant='h5'
                color='inherit'
                align='center'
                noWrap
                className={classes.toolbarTitle}
            >
                Welcome
            </Typography>
            {
                [1, 2, 3].map((id) => <Button onClick={() => { history.push(`/admin/guest/${id}`); }}>Go to guest id: {id}</Button>)
            }

        </React.Fragment>
    );
}
export const App = () => {

    const classes = useStyles({});

    let a: JSX.Element;

    return (
        <React.Fragment>
            <HostHomeDataProvider>
                <BrowserRouter>
                    <Container maxWidth='lg'>
                        <Toolbar className={classes.toolbar}>
                            <Typography
                                component='h2'
                                variant='h5'
                                color='inherit'
                                align='center'
                                noWrap
                                className={classes.toolbarTitle}
                            >
                                {AppConfig.AppName}
                            </Typography>
                        </Toolbar>
                        <Toolbar
                            className={classes.toolbar}
                        >
                            <List style={{
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 0,
                            }}>
                                <ListItem
                                    button
                                    key='home'
                                    component={NavLink}
                                    to='/'
                                >
                                    <ListItemIcon>
                                        <Dashboard />
                                    </ListItemIcon>
                                    <span>Home</span>
                                </ListItem>
                                <ListItem
                                    button
                                    key='home'
                                    component={NavLink}
                                    to='/admin/guests'
                                >
                                    <ListItemIcon>
                                        <Dashboard />
                                    </ListItemIcon>
                                    <span>Guests</span>
                                </ListItem>
                                <ListItem
                                    button
                                    key='home'
                                    component={NavLink}
                                    to='/admin/guest/1'
                                >
                                    <ListItemIcon>
                                        <Dashboard />
                                    </ListItemIcon>
                                    <span>Guest 1</span>
                                </ListItem>
                            </List>
                        </Toolbar>
                        
                        <main>
                            <Switch>
                                <Route exact path='/' component={WelcomeView} />
                                <Route path='/admin/guests' component={AdminView} />
                                <Route path='/admin/guest/:id' component={AdminGuestView} />
                                <Route path='/guests/:id' component={PlaceholderWithIdView} />
                                <Route path='/hosts/:id' component={PlaceholderWithIdView} />
                            </Switch>
                        </main>
                    </Container>

                </BrowserRouter>
            </HostHomeDataProvider>
        </React.Fragment>

    );
};