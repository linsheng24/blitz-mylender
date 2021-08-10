import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Grid, makeStyles, Paper } from "@material-ui/core"
import { useSetRecoilState } from "recoil"
import { ShowLoginForm, ShowSignupForm } from "../../core/atoms/common"

type SignupFormProps = {
  onSuccess?: () => void
}

const useStyles = makeStyles((theme) => ({
  signupForm: {
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

export const SignupForm = (props: SignupFormProps) => {
  const classes = useStyles()
  const [signupMutation] = useMutation(signup)
  const setShowLoginForm = useSetRecoilState(ShowLoginForm)
  const setShowSignupForm = useSetRecoilState(ShowSignupForm)
  const cancelHandler = () => {
    setShowLoginForm(false)
    setShowSignupForm(false)
  }
  const successHandler = () => {
    setShowLoginForm(false)
    setShowSignupForm(false)
  }
  return (
    <Paper className={classes.signupForm}>
      <Grid container justify="center">
        <h1>註冊</h1>
      </Grid>
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onCancel={cancelHandler}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
            successHandler()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField
          className={classes.formField}
          name="email"
          label="Email"
          placeholder="Email"
        />
        <LabeledTextField
          className={classes.formField}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
      </Form>
    </Paper>
  )
}

export default SignupForm
