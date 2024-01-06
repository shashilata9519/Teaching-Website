interface PropsType {
   
    title:string
    
  }

export const Header = ({title}:PropsType) => {
  return (
    <div className="text-2xl font-semibold text-left my-3 mx-2">
    {title}
    </div>
  )
}
