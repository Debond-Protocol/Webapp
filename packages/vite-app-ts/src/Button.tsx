import "./Button.css"

export const Button = (props: { onClick: any, text: string }): any => {
  const {onClick, text} = props

  return (
    <>
      <button className={"rowButton"} onClick={onClick}>{text}</button>
    </>
  )
}