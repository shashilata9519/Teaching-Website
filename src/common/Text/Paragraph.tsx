interface PropsType {
   
    title:string
    align:any
  }

export const Paragraph = ({title,align}:PropsType) => {
  return (
    <div className={`text-sm text-${align} mb-5 mx-9`}>
    {title}
    </div>
  )
}
