import React, { ReactNode } from "react"
import { Head, Image, Routes, Link } from "blitz"
import { Grid, makeStyles } from "@material-ui/core"
import styled from "styled-components"

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
}))

const StyledLink = styled.a`
  padding: 10px;
  font-size: 15px;
  text-decoration: none;
  border-radius: 5px;
  margin-right: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const LoginLink = styled(StyledLink)`
  margin-left: auto;
`

const Layout = ({ title, children }: LayoutProps) => {
  const classes = useStyles()
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
            <Link href={Routes.Home()} passHref>
              <LoginLink>登入</LoginLink>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      {children}
    </>
  )
}

export default Layout
