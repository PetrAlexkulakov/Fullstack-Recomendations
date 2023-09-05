import { ValidateResult } from "react-hook-form"

const ErrorComponent = ({children}: { children: ValidateResult }) => {
  return (
    <div className="text-danger mt-3">{children}</div>
  )
}

export default ErrorComponent
