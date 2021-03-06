import React, { ReactNode, useState } from "react"
import { Head, Image, Routes, Link, useMutation } from "blitz"
import { Backdrop, Fade, Grid, makeStyles, Menu, MenuItem } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import styled from "styled-components"
import LoginForm from "app/auth/components/LoginForm"
import logout from "../../auth/mutations/logout"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { ShowLoginForm, ShowSignupForm } from "../atoms/common"
import SignupForm from "../../auth/components/SignupForm"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"
import MailOutlineIcon from "@material-ui/icons/MailOutline"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: theme.palette.primary.light,
  },
  footer: {
    backgroundColor: theme.palette.primary.dark,
    paddingTop: "50px",
    paddingBottom: "50px",
    marginTop: "50px",
    textAlign: "center",
  },
  contactBlock: {
    fontSize: "15px",
    paddingBottom: "15px",
    "& span": {
      fontWeight: "bold",
    },
    "& a": {
      color: "black",
      textDecoration: "none",
    },
  },
  aboutBlock: {
    fontSize: "15px",
    paddingBottom: "15px",
    "& a": {
      fontWeight: "bold",
      color: "black",
      display: "block",
      textDecoration: "none",
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  personIcon: {
    cursor: "pointer",
    marginLeft: "auto",
  },
  backdrop: {
    zIndex: 100,
  },
}))

const StyledLink = styled.a`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const LoginLink = styled(StyledLink)`
  margin-left: auto;
`

const Layout = ({ title, children }: LayoutProps) => {
  const classes = useStyles()
  const showLoginForm = useRecoilValue(ShowLoginForm)
  const setShowLoginForm = useSetRecoilState(ShowLoginForm)
  const showSignupForm = useRecoilValue(ShowSignupForm)

  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Head>
        <title>MyLender</title>
      </Head>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.navbar}
      >
        <Grid item container sm={8} xs={12}>
          <Grid className={classes.logo} xs={4}>
            <Image src="/logo.png" alt="Picture of the author" width={130} height={50} />
          </Grid>
          <Grid item container alignItems="center" xs={8}>
            <Link href={Routes.Home()} passHref>
              <StyledLink>????????????</StyledLink>
            </Link>
            <Link href={Routes.Home()} passHref>
              <StyledLink>????????????</StyledLink>
            </Link>
            {currentUser ? (
              <a
                className={classes.personIcon}
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <PersonIcon />
              </a>
            ) : (
              <LoginLink onClick={() => setShowLoginForm(true)}>??????</LoginLink>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>????????????</MenuItem>
        <MenuItem onClick={handleClose}>??????</MenuItem>
        <MenuItem
          onClick={async () => {
            await logoutMutation()
            handleClose()
          }}
        >
          ??????
        </MenuItem>
      </Menu>
      {children}
      <Backdrop open={showLoginForm} className={classes.backdrop}>
        {showLoginForm && (showSignupForm ? <SignupForm /> : <LoginForm />)}
      </Backdrop>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.footer}
      >
        <Grid container item xs={10} sm={8}>
          <Grid xs={12} sm={6}>
            <h2>Contact</h2>
            <Grid className={classes.contactBlock}>
              <span>EMAIL:</span> <span>linsheng@gmail.com</span>
            </Grid>
            <Grid className={classes.contactBlock}>
              <a href="#">
                <FacebookIcon fontSize="large" />
              </a>
              <a href="#">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="#">
                <MailOutlineIcon fontSize="large" />
              </a>
            </Grid>
          </Grid>
          <Grid xs={12} sm={6}>
            <h2>About</h2>
            <Grid className={classes.aboutBlock}>
              <Link href={"#"}>????????????</Link>
              <Link href={"#"}>???????????????</Link>
            </Grid>
            <Grid className={classes.aboutBlock}>MyLender ?? All Rights Reserved.</Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Layout
