import { useState, ReactNode, PropsWithoutRef } from "react"
import { Formik, FormikProps } from "formik"
import { validateZodSchema } from "blitz"
import { z } from "zod"
import { Grid, makeStyles } from "@material-ui/core"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: FormikProps<z.infer<S>>["initialValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

const useStyles = makeStyles((theme) => ({
  formButton: {
    fontWeight: "bold",
    fontSize: "20px",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
  },
  success: {
    background: theme.palette.primary.dark,
  },
  cancel: {
    background: theme.palette.primary.light,
  },
}))

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  additionalContent,
  ...props
}: FormProps<S>) {
  const classes = useStyles()
  const [formError, setFormError] = useState<string | null>(null)
  return (
    <Formik
      initialValues={initialValues || {}}
      validate={validateZodSchema(schema)}
      onSubmit={async (values, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}
          <Grid container>
            {formError && (
              <div role="alert" style={{ color: "red" }}>
                {formError}
              </div>
            )}
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={6}>
              <button className={`${classes.formButton} ${classes.success}`} type="submit">
                確認
              </button>
            </Grid>
            <Grid item xs={6}>
              <button className={`${classes.formButton} ${classes.cancel}`}>取消</button>
            </Grid>
          </Grid>
          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    </Formik>
  )
}

export default Form
