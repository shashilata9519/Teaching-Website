export class Utils {
  static genareteColor = (str: any) => {
    return (
      (str == "Applied" && "#78a194") ||
      (str == "Pending confirmation" && "#f7efe1") ||
      (str == "Paid" && "#ccfcf2") ||
      (str == "Cancelled" && "#e7948b8a") ||
      (str == "Rejected" && "#343a40") ||
      (str == "Payment Due" && "#f7efe1") ||
      "#f7efe1"
    );
  };
  static GenerateTextColor = (str: any) => {
    return (
      (str == "Invited" && "black") ||
      (str == "Paid" && "rgb(50,205,50)") ||
      (str == "Pending confirmation" && "#00BFFF") ||
      (str == "Removed" && "#FF0000") ||
      (str == "Rejected" && "#FF0000") ||
      (str == "Applied" && "#228B22") ||
      (str == "Accepted" && "#7B68EE") ||
      (str == "Payment Due" && "orange") ||
      (str == "Cancelled" && "darkred") ||
      "#f7efe1"
    );
  };
}
