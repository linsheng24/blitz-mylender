import React, { ReactNode, useState } from "react"
import { Head, Image, Routes, Link } from "blitz"
import { Fade, Grid, makeStyles, Menu, MenuItem } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import styled from "styled-components"
import LoginForm from "app/auth/components/LoginForm"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: theme.palette.primary.light,
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
  const [isLogin, setIsLogin] = useState(true)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setIsLogin(false)
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
              <StyledLink>我要出借</StyledLink>
            </Link>
            <Link href={Routes.Home()} passHref>
              <StyledLink>查看產品</StyledLink>
            </Link>
            {isLogin ? (
              <a
                className={classes.personIcon}
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <PersonIcon />
              </a>
            ) : (
              <LoginLink onClick={() => setIsLogin(true)}>登入</LoginLink>
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
        <MenuItem onClick={handleClose}>個人帳務</MenuItem>
        <MenuItem onClick={handleClose}>設定</MenuItem>
        <MenuItem onClick={handleClose}>登出</MenuItem>
      </Menu>
      {children}
      <LoginForm />
    </>
  )
}

export default Layout
