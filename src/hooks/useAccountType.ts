import React from "react";


export const useAccountType=()=>{

    const [AccountType, SetAccountType] = React.useState<any>(null);
  React.useEffect(() => {
    const Type = localStorage.getItem("type");
    SetAccountType(Type);
  }, []);



    return {AccountType}
}