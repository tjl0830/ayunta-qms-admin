import Style from "./AdminFunctions.module.css";
import ChangeCounter from "./ChangeCounter/ChangeCounter";
import NextCustomer from "./NextCustomer/NextCustomer";
import TransferCustomer from "./TransferCustomer/TransferCustomer";

function AdminFunctions() {
  return (
    <div className={Style.FunctionsContainer}>
      <div className={Style.ChangeCounterContainer}>
        <ChangeCounter />
      </div>
      <div className={Style.NextCustomerContainer}>
        <NextCustomer />
      </div>
      <div className={Style.TransferCustomerContainer}>
        <TransferCustomer />
      </div>
    </div>
  );
}


export default AdminFunctions;
