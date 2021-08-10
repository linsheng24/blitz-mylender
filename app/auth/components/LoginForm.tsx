import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Grid, makeStyles, Paper } from "@material-ui/core"
import { useSetRecoilState } from "recoil"
import { ShowLoginForm, ShowSignupForm } from "../../core/atoms/common"

type LoginFormProps = {
  onSuccess?: () => void
}

const useStyles = makeStyles((theme) => ({
  loginForm: {
    position: "fixed",
    paddingLeft: "80px",
    paddingRight: "80px",
    paddingBottom: "40px",
    width: "600px",
    marginLeft: "-300px",
    marginTop: "-250px",
    top: "50%",
    left: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      marginLeft: "-40%",
      marginTop: "-200px",
    },
  },
  formField: {
    width: "100%",
    height: "50px",
  },
}))

export const LoginForm = (props: LoginFormProps) => {
  const classes = useStyles()
  const [loginMutation] = useMutation(login)
  const setShowLoginForm = useSetRecoilState(ShowLoginForm)
  const setShowSignupForm = useSetRecoilState(ShowSignupForm)
  const cancelHandler = () => {
    setShowLoginForm(false)
  }
  const successHandler = () => {
    setShowLoginForm(false)
  }
  return (
    <Paper className={classes.loginForm}>
      <Grid container justify="center">
        <h1>登入</h1>
      </Grid>
      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onCancel={cancelHandler}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
            successHandler()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "帳號密碼錯誤" }
            } else {
              return {
                [FORM_ERROR]: "抱歉，發生未預期錯誤，請稍後再試。" + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField
          className={classes.formField}
          name="email"
          label="電子信箱"
          placeholder="Email"
        />
        <LabeledTextField
          className={classes.formField}
          name="password"
          label="密碼"
          placeholder="Password"
          type="password"
        />
        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>忘記密碼?</a>
          </Link>{" "}
          <Link href={Routes.Home()}>
            <a onClick={() => setShowSignupForm(true)}>註冊</a>
          </Link>
        </div>
      </Form>
    </Paper>
  )
}

export default LoginForm
