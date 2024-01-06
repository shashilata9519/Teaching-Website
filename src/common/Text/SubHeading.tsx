interface PropsType {
   
    title:string
    align?:any
    
  }

export const SubHeading = ({title,align}:PropsType) => {
  return (
    <div className={`text-2xl md:text-3xl font-semibold text-${align} my-3`}>
    {title}
    </div>
  )
}
