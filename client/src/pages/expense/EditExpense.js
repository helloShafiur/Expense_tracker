import React from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateExpAction } from "../../redux/slices/expense/expensesSlices";
import DisabledButton from "../../components/DisableButton";
import moneySVG from "../../img/money.svg";

//Form Validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});
const EditExpense = () => {
  const location = useLocation();

  //Dispatch
  const dispatch = useDispatch();

  //Formik Form
  const formik = useFormik({
    initialValues: {
      title: location?.state?.expense?.title,
      description: location?.state?.expense?.description,
      amount: location?.state?.expense?.amount,
    },
    onSubmit: (values) => {
      const data = { ...values, id: location?.state?.expense?._id };
      dispatch(updateExpAction(data));
    },
    validationSchema: formSchema,
  });

  //Get data from Store
  const expenseData = useSelector((state) => state?.expepnses);
  // console.log("expenseData", expenseData);
  const { loading, appErr, serverErr } = expenseData;
  console.log(loading, appErr, serverErr);

  return (
    <section className="py-5 bg-secondary vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5" href="https://www.w3schools.com">
          <img
            className="img-fluid"
            src={moneySVG}
            alt="SVGeXPENSES"
            width="200"
          />
        </a>
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">
                  {/* {data?.type === "income" ? " Income" : " Expense"} */}
                  {appErr || serverErr ? <div>Error</div> : null}
                </span>
                <h2 className="mb-4 fw-light">
                  {/* {data?.type === "income"
                    ? " Update Income"
                    : " Update Expense"} */}
                </h2>
                {/* Display Err */}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.title && formik.errors.title}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Description"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.description && formik.errors.description}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.amount}
                    onChange={formik.handleChange("amount")}
                    onBlur={formik.handleBlur("amount")}
                    className="form-control"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.amount && formik.errors.amount}
                </div>
                {loading ? (
                  <DisabledButton />
                ) : (
                  <button type="submit" className="btn btn-primary mb-4 w-100">
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditExpense;
