interface PropsType {
   
    title:string
    align:any
  }

export const Heading = ({title,align}:PropsType) => {
  return (
    <div className={` text-2xl md:text-5xl font-semibold text-${align} mt-8 mb-4`}>
    {title}
    </div>
  )
}
