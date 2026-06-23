import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { addFormData } from '../redux/reducers/formSlice';
import { showModal } from '../redux/reducers/modalSlice';

/**
 * @typedef {Object} SurveyFormValues
 * @property {string} name - Respondent's name.
 * @property {number} age - Respondent's age.
 * @property {string} gender - Respondent's gender.
 * @property {string} smoke - Smoking status. Value: "Ya" or "Tidak".
 * @property {string[]} merkSmoke - List of cigarette brands selected by the respondent.
 */

/**
 * @typedef {Object} SurveyResponse
 * @property {string} name - Respondent's name.
 * @property {number} age - Respondent's age.
 * @property {string} gender - Respondent's gender.
 * @property {string} smoke - Smoking status.
 * @property {string} merkSmoke - Cigarette brands in string format.
 */

// const STORAGE_KEY = "surveyResponses";

const genderOptions = [
  {
    id: "female",
    label: "Perempuan",
    value: "Perempuan",
  },
  {
    id: "man",
    label: "Laki-laki",
    value: "Laki-laki",
  },
];

const smokeOptions = [
  {
    id: "yes",
    label: "Ya",
    value: "Ya",
  },
  {
    id: "no",
    label: "Tidak",
    value: "Tidak",
  },
];

const merkSmokeOptions = [
  {
    id: "gudangGaram",
    label: "Gudang Garam Filter",
    value: "Gudang Garam Filter",
  },
  {
    id: "luckyStrike",
    label: "Lucky Strike",
    value: "Lucky Strike",
  },
  {
    id: "marlboro",
    label: "Marlboro",
    value: "Marlboro",
  },
  {
    id: "esse",
    label: "Esse",
    value: "Esse",
  },
];

/**
 * Validation schema for the survey form.
 *
 * @type {yup.ObjectSchema}
 */
const surveySchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Nama wajib diisi"),

  age: yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined;
      }

      return value;
    })
    .typeError("Umur wajib diisi dengan angka yang valid")
    .positive("Umur wajib diisi dengan angka yang valid")
    .integer("Umur harus berupa angka bulat")
    .required("Umur wajib diisi dengan angka yang valid"),

  gender: yup
    .string()
    .required("Mohon isi jenis kelamin"),

  smoke: yup
    .string()
    .required("Mohon isi status perokok"),

  merkSmoke: yup
    .array()
    .of(yup.string())
    .when("smoke", {
      is: "Ya",
      then: (schema) =>
        schema.min(1, "Mohon pilih merk rokok jika Anda perokok"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

/**
 * Checks whether the respondent selected smoker status.
 *
 * @param {string} smokeValue - The value from the smoke field.
 * @returns {boolean} Returns true if the respondent selects "Ya".
 */
function checkIsSmoker(smokeValue) {
  return smokeValue === "Ya";
}

/**
 * Converts form data into a format ready to be saved to localStorage.
 *
 * @param {SurveyFormValues} data - Data from React Hook Form.
 * @returns {SurveyResponse} Normalized survey response data.
 */
// function createResponseData(data) {
//   const merkSmoke = Array.isArray(data.merkSmoke) ? data.merkSmoke : [];

//   return {
//     name: data.name,
//     age: data.age,
//     gender: data.gender,
//     smoke: data.smoke,
//     merkSmoke: data.smoke === "Ya" ? merkSmoke.join(", ") : "",
//   };
// }

/**
 * Gets saved survey responses from localStorage.
 *
 * @returns {SurveyResponse[]} Saved survey responses.
 */
// function getSurveyResponses() {
//   const savedData = JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
//   return savedData;
// }

/**
 * Saves a new survey response to localStorage.
 *
 * @param {SurveyResponse} responseData - New survey response data.
 * @returns {void}
 */
// function saveSurveyResponse(responseData) {
//   const existingData = getSurveyResponses();

//   existingData.push(responseData);

//   window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
// }

/**
 * Gets the first error message from React Hook Form errors.
 *
 * @param {Object} errors - Error object from React Hook Form.
 * @returns {string} First error message.
 */
function getFirstErrorMessage(errors) {
  const firstError = Object.values(errors)[0];

  return firstError?.message || "Mohon lengkapi form dengan benar";
}

function SurveyForm() {
  const navigate = useNavigate();
  // const [modalMessage, setModalMessage] = React.useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(surveySchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      smoke: "",
      merkSmoke: [],
    },
  });

  const smokeValue = useWatch({
    control,
    name: "smoke",
    defaultValue: "",
  });

  const isSmoker = checkIsSmoker(smokeValue);

  React.useEffect(() => {
    if (!isSmoker) {
      setValue("merkSmoke", []);
    }
  }, [isSmoker, setValue]);

  // /**
  //  * Shows the error message modal.
  //  *
  //  * @param {string} message - Message to display in the modal.
  //  * @returns {void}
  //  */
  // function showModal(message) {
  //   setModalMessage(message);
  // }

  /**
   * Closes the error message modal.
   *
   * @returns {void}
  //  */
  // function closeModal() {
  //   setModalMessage("");
  // }

  /**
   * Handles the form submission when validation succeeds.
   *
   * @param {SurveyFormValues} data - Valid form data.
   * @returns {void}
   */
  // Fungsi submit yang sebenarnya (disimpan setelah konfirmasi)
  const handleSubmitData = (data) => {
    const newData = {
      id: crypto.randomUUID(),
      ...data,
    };
    dispatch(addFormData(newData));
    navigate('/response');
  };

  // Handler untuk onSubmit dari react-hook-form
  function onSubmit(data) {
    // Tampilkan modal konfirmasi dengan callback
    dispatch(
      showModal({
        type: 'confirm',
        message: 'Apakah Anda yakin data sudah benar dan ingin menyimpan?',
        onConfirm: () => handleSubmitData(data), // callback akan dijalankan saat user klik Konfirmasi
      })
    );
  }

  /**
   * Handles the form submission when validation fails.
   *
   * @param {Object} formErrors - Error object from React Hook Form.
   * @returns {void}
   */
  function onInvalid(formErrors) {
    const errorMessage = getFirstErrorMessage(formErrors);
    dispatch(showModal({
      type: 'alert',
      message: errorMessage
    }));
  }

  /**
   * Handles form reset and clears selected cigarette brands.
   *
   * @returns {void}
   */
  function handleResetForm() {
    reset({
      name: "",
      age: "",
      gender: "",
      smoke: "",
      merkSmoke: [],
    });

  }

  return (
    <main className="grid min-h-screen place-items-center bg-pink-200 p-6">
      <form
        className="my-4 grid w-full max-w-2xl justify-center gap-2"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <div className="container-form">
          <div className="h-2.5 w-full bg-pink-500"></div>

          <div className="p-6">
            <h1 className="mb-3 text-3xl font-normal text-gray-900">
              Form Survey Perokok
            </h1>

            <p className="text-sm text-gray-900">
              Form ini untuk menentukan banyaknya perokok
            </p>
          </div>
        </div>

        <div className="container-form">
          <div className="p-6">
            <label
              className="label-form"
              htmlFor="name"
            >
              Siapa nama anda?
            </label>

            <input
              id="name"
              type="text"
              placeholder="Your Answer"
              className="input-text"
              {...register("name")}
            />
          </div>
        </div>

        <div className="container-form">
          <div className="p-6">
            <label
              className="label-form"
              htmlFor="age"
            >
              Berapa umur anda?
            </label>

            <input
              id="age"
              type="number"
              placeholder="Your Answer"
              className="input-text"
              {...register("age")}
            />
          </div>
        </div>

        <div className="container-form">
          <div className="p-6">
            <p className="label-form">
              Apa jenis kelamin anda?
            </p>

            <div className="flex flex-col gap-4">
              {genderOptions.map((gender) => (
                <label
                  key={gender.id}
                  htmlFor={gender.id}
                  className="label-radio"
                >
                  <input
                    id={gender.id}
                    type="radio"
                    value={gender.value}
                    className="input-radio"
                    {...register("gender")}
                  />

                  <span className="text-[15px] text-gray-900">
                    {gender.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="container-form">
          <div className="p-6">
            <p className="label-form">
              Apakah anda Perokok?
            </p>

            <div className="flex flex-col gap-4">
              {smokeOptions.map((smoke) => (
                <label
                  key={smoke.id}
                  htmlFor={smoke.id}
                  className="label-radio"
                >
                  <input
                    id={smoke.id}
                    type="radio"
                    value={smoke.value}
                    className="input-radio"
                    {...register("smoke")}
                  />

                  <span className="text-[15px] text-gray-900">
                    {smoke.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="container-form">
          <div className="p-6">
            <p className="label-form">
              Jika anda perokok, rokok apa yang anda pernah coba?
            </p>

            <div className="flex flex-col gap-4">
              {merkSmokeOptions.map((merk) => (
                <label
                  key={merk.id}
                  htmlFor={merk.id}
                  className={`flex h-full w-full items-center gap-2.5 text-sm text-gray-900 ${isSmoker
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                    }`}
                >
                  <input
                    id={merk.id}
                    type="checkbox"
                    value={merk.value}
                    disabled={!isSmoker}
                    className="h-4.5 w-4.5 cursor-pointer rounded accent-pink-500 disabled:cursor-not-allowed"
                    {...register("merkSmoke")}
                  />

                  <span className="text-[15px] text-gray-900">
                    {merk.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-1 my-2 flex items-center justify-start gap-4">
          <div className="flex gap-3">
            <button
              type="submit"
              className="btn bg-pink-500 px-6 py-2.5 text-white hover:bg-pink-600"
            >
              Submit
            </button>

            <Link
              to="/response"
              className="btn bg-pink-500 px-6 py-2.5 text-white no-underline hover:bg-pink-600"
            >
              Lihat Data
            </Link>
          </div>

          <button
            type="button"
            onClick={handleResetForm}
            className="ml-auto btn bg-transparent px-4 py-2.5 text-pink-500 transition-colors duration-200 hover:bg-pink-100"
          >
            Reset
          </button>
        </div>
      </form>

      {/* {modalMessage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
          >
            <p className="mb-5 text-sm text-gray-700">{modalMessage}</p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )} */}

      <footer className="mt-6 flex w-full max-w-2xl flex-col items-center gap-2 pb-6">
        <p className="text-center text-xs leading-relaxed text-gray-500">
          This content is neither created nor endorsed by Google.
        </p>

        <div className="flex items-center gap-1.5 text-xs">
          <a
            href="#"
            className="cursor-pointer text-gray-500 underline hover:text-gray-900"
          >
            Report Abuse
          </a>

          <span className="text-gray-500">-</span>

          <a
            href="#"
            className="cursor-pointer text-gray-500 underline hover:text-gray-900"
          >
            Terms of Service
          </a>

          <span className="text-gray-500">-</span>

          <a
            href="#"
            className="cursor-pointer text-gray-500 underline hover:text-gray-900"
          >
            Privacy Policy
          </a>
        </div>

        <div className="mt-4 flex select-none items-center gap-0.5 font-sans text-[18px] text-gray-500">
          <span className="font-bold tracking-tight">Google</span>
          <span className="font-normal">Forms</span>
        </div>
      </footer>
    </main>
  );
}

export default SurveyForm;