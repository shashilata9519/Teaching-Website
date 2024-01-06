import { Input } from "@/common/Input/Input";
import { useForm, SubmitHandler } from "react-hook-form";





 function Form() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  
const onSubmit=(data:any)=>{
console.log(data,'data')
console.log(errors,'error')
}



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Input label="Email" type="text" name="email" errors={errors} register={register} control={'email'}/>
      <Input label="Password" type="text" name="password" errors={errors} register={register} control={'password'}/>
     
      <button type="submit" className="text-white bg-black my-4 py-2 px-5 text-sm font-bold rounded-full mx-auto">Login</button>
       
    </form>
  );
}
export default Form
